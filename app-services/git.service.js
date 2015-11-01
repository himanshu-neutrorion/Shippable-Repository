(function(){
    'use strict';
    angular
        .module('app')
        .factory('GitService', GitService);

    GitService.$inject = ['$http'];
    /*This service deals with making all the rest api calls to the git service. It helps keeping the call out of controllers*/
    function GitService($http){

        var service = {};
        service.SearchRepositories = SearchRepositories;
        service.FetchIssues = FetchIssues;

        return service;

        function SearchRepositories(searchRepoResource){
            return $http.get(searchRepoResource).then(handleSuccess, handleError('Could not search repositories.'));
        }

        function FetchIssues(fetchIssuesResource){
            return $http.get(fetchIssuesResource).then(handleSuccess, handleError('Could not search repositories.'));
        }

        function handleSuccess(response){
            return response.data;
        }

        function handleError(error){
            return function(){
                return {success: false, message: error};
            }
        }
    }
})();