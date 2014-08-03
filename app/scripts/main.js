console.log('Hello Bordeaux !');

var bdxioModule = angular.module('bdxioModule', ['ngRoute', 'bdxioControllers']);

bdxioModule.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/pages/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/home'
        })
});

bdxioModule.run(function($rootScope, $location, $anchorScroll) {
    $rootScope.goto = function(path, targetAnchorName) {
        $location.path(path);

        if(targetAnchorName) {
            $location.hash(targetAnchorName);
            $anchorScroll();
        }
    };
    $rootScope.genMailTo = function(name) {
        return "mailto:"+name+"@bdx.io";
    };
});
