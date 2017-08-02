(function (angular) {
    'use strict';

    angular
        .module('app.core')
        .config(RouteConfig);

    RouteConfig.$inject = ['$urlRouterProvider', '$sceProvider', '$mdIconProvider'];

    function RouteConfig($urlRouterProvider, $sceProvider, $mdIconProvider) {
        $urlRouterProvider.otherwise('/login')

        $mdIconProvider
            .defaultFontSet('material-icons')

        $sceProvider.enabled(false)
    }

})(angular);
