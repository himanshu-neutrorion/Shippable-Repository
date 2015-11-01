(function(){
    'use strict';
    angular
        .module('app', ['ngRoute'] )
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider){
        /*Setup routes here*/
        $routeProvider

            /*Define the home route with its controller and alias*/
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            /*In case someone tries to access a different route which is not mentioned here*/
            .otherwise({redirectTo: '/'});

    }

    run.$inject = ['$rootScope', '$location'];
    function run($rootScope, $location){
        /*Run can contain on route changed event listener to control and authenticate the routes
        * For now we keep it empty*/
        $rootScope.$on('$locationChangeStart', function (event, next, current){
            /*We don't want to do anything on location change yet*/
        });
    }
})();