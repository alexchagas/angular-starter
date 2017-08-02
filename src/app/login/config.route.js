(function (angular) {
    'use strict';

    angular
        .module('app.login')
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.tpl.html',
                controller: 'LoginCtrl'
            })
    }


})(angular);