(function(){
    'use strict';

    angular
        .module('app')
        .directive('header', function () {
            return {
                restrict: 'E',
                templateUrl: "app-templates/header.html"
            };
        });
})();