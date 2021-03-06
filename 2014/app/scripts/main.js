/* global angular, ga */
'use strict';

var bdxioModule = angular.module('bdxioModule', ['ngRoute', 'ngAnimate', 'bdxioControllers']);

bdxioModule.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'templates/pages/home.html',
            controller: 'HomeController'
        })
        .when('/partners', {
            templateUrl: 'templates/pages/partners.html',
            controller: 'PartnersController'
        })
        .when('/people', {
            templateUrl: 'templates/pages/people.html',
            controller: 'PeopleController'
        })
        .otherwise({
            redirectTo: '/home'
        });

    $locationProvider.hashPrefix('!');
});

bdxioModule.run(function($rootScope, $location, $anchorScroll, $timeout, $q, SharedData) {
    $rootScope.goto = function(path, targetAnchorName) {
        if(path !== $location.path()) {
            ga('send', 'screenview', { 'screenName': path });
        }

        $location.path(path);

        if(targetAnchorName) {
            $location.hash(targetAnchorName);
            $anchorScroll();

            // Hackish here... allows to anchorscroll and take into consideration menu header
            // because of https://github.com/angular/angular.js/issues/2070
            $timeout(function(){
                var bodyPaddingTop = $('body').css('padding-top');
                scrollBy(0, -parseInt(bodyPaddingTop, 10));
            }, 100);
        } else {
            $location.hash('');
        }
    };

    $rootScope.genMailTo = function(name) {
        return 'mailto:'+name+'@bdx.io';
    };

    SharedData.init({
        offline: $location.search().offline===true
    });

    // It would be nice if we could have run() return a promise
    // It would avoid to have to rely on SharedData.dataLoaded() on every controllers...
});
