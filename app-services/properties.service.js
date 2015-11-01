(function(){
    'use strict';

    angular
        .module('app')
        .factory('PropertiesService', PropertiesService);

    PropertiesService.$inject = ['$http'];
    /*This service is used to read and inject properties into the controllers*/
    function PropertiesService($http){

        var service = {};
        service.GetProperties = GetProperties;

        return service;

        function GetProperties(){
            return $http.get('ui.properties').then(handleSuccess, handleError('Could not load properties. Please try again'));
        }

        function handleSuccess(response){
            return response.data;
        }

        function handleError(error){
            return function(){
                return {success: false, message: error};
            };
        }
    }
})();