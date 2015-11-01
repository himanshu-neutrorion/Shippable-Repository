(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'GitService', 'PropertiesService', 'FlashService'];
    /*This is home page controller, deals with the data obtained via GitService using PropertiesService*/
    function HomeController($rootScope, GitService, PropertiesService, FlashService) {

        var vm = this;
        vm.properties = {};
        vm.myIssues = {};
        vm.repos = [];
        vm.searchFactor = '';
        vm.searchRepo = searchRepo;

        initController();

        /*Initialize the defaults and properties*/
        function initController() {
            vm.requestProcessed = false;
            PropertiesService.GetProperties()
                .then(function (response) {
                    vm.properties = response;
                    /*Check if properties were loaded properly*/
                    if (angular.isUndefined(vm.properties.GIT_REST_URL)) {
                        /*Show error in case of failure to load property file*/
                        FlashService.Error('Could not load property file.');
                    }
                });
        }

        /*This function is called on form submit action. Fetches data and does rest of processing*/
        function searchRepo() {
            vm.requestProcessed = false;
            vm.searching = true;
            /*Get the repo name out of the address*/
            var repositoryName = vm.searchFactor.slice(vm.searchFactor.lastIndexOf('/') + 1);
            /*Get the repo details from git api*/
            GitService.SearchRepositories(vm.properties.GIT_REST_URL + vm.properties.GET_REPO_RESOURCE + '?q=' + repositoryName)
                .then(function (response) {
                    /*There won't be any success attribute on the object sent by git api*/
                    if (angular.isUndefined(response.success) && angular.isUndefined(response.message) && response.total_count != 0 ) {
                        /*We have our rep listings*/
                        vm.repos = response.items;
                        /*Check for our repo in these listings*/
                        for (var i = 0, len = vm.repos.length; i < len; i++) {
                            if (vm.repos[i].html_url.toLowerCase() == vm.searchFactor.toLowerCase()) {
                                /*We have found our repository, lets fetch the issues and do the calculation*/
                                vm.myIssues.open = vm.repos[i].open_issues;
                                vm.myIssues.openedToday = 0;
                                vm.myIssues.openedThisWeek = 0;
                                vm.myIssues.openedEarlier = 0;
                                var fetchOpenIssuesResource = vm.repos[i].issues_url.slice(0, vm.repos[i].issues_url.indexOf('{'));
                                fetchOpenIssues(fetchOpenIssuesResource, 100, 1);
                                break;
                            }
                        }
                        vm.searching = false;
                    }
                    else if(!angular.isUndefined(response.message)) {
                        /*We hit a roadblock*/
                        vm.searching = false;
                        FlashService.Error('Error while searching repositories. ' + response.message);
                    } else if(response.total_count == 0){
                        /* There are no such repos */
                        vm.searching = false;
                        FlashService.Error('There is no such repository.');
                    }
                });
        }


        function fetchOpenIssues(issueResource, pageLength, pageNumber) {
            vm.searching = true;
            var issuesRes = issueResource + '?page=' + pageNumber + '&per_page=' + pageLength + '&state=open';
            GitService.FetchIssues(issuesRes)
                .then(function (response) {
                    if (angular.isUndefined(response.success)) {
                        vm.issues = response;
                        /*Compute required data to be displayed on page*/
                        issueCalculator(vm.issues);
                        /*Increase the page number to get rest of the issues and call function recursively*/
                        pageNumber += 1;
                        if (vm.issues.length == pageLength) {
                            /*There are still some pages left. Fetch them*/
                            fetchOpenIssues(issueResource, pageLength, pageNumber);
                        }
                        /*We are done with the processing*/
                        vm.searching = false;
                        vm.requestProcessed = true;
                    } else {
                        vm.searching = false;
                        /*Show error message in case of failure*/
                        FlashService.Error('Could not fetch issues for this url.');
                    }
                });
        }

        /*This function calculates the number of issues based on criteria*/
        function issueCalculator(issues) {
            angular.forEach(issues, function (value, key) {

                var dayDifferenceFromToday = differenceInDays(new Date(value.created_at), new Date());
                var hourDifference = differenceInHours(new Date(value.created_at), new Date());
                if (hourDifference <= 1) {
                    vm.myIssues.openedToday += 1;
                }

                if (hourDifference > 1 && dayDifferenceFromToday <= 7) {
                    vm.myIssues.openedThisWeek += 1;
                }

                if (dayDifferenceFromToday > 7) {
                    vm.myIssues.openedEarlier += 1;
                }
            });
        }

        /*Calculates the difference in days without time elements*/
        function differenceInDays(startingDate, endDate) {
           startingDate.setHours(0,0,0,0);
            endDate.setHours(0,0,0,0);
            var millisecondsPerDay = 1000.0 * 60 * 60 * 24;
            var millisBetween = endDate.getTime() - startingDate.getTime();
            var days = millisBetween / millisecondsPerDay;
            return days;
        }
        /*Calculates the difference in days with time elements*/
        function differenceInHours(startingDate, endDate){
            var milliseconds = 1000 * 60 * 60 * 24;
            var millisBetwn = endDate.getTime() - startingDate.getTime();
            var days = millisBetwn / milliseconds;
            return Math.floor(days);
        }
    }
})();