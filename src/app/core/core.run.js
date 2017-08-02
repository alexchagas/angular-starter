(function(angular) {
    'use strict';

    angular
    .module('app.core')
    .run(CoreRun);

    CoreRun.$inject = ['$rootScope'];

    function CoreRun($rootScope) {
        console.log("core run")
    }

})(angular);
