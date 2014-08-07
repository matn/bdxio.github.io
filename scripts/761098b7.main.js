"use strict";var bdxioModule=angular.module("bdxioModule",["ngRoute","bdxioControllers"]);bdxioModule.config(["$routeProvider",function(a){a.when("/home",{templateUrl:"templates/pages/home.html",controller:"HomeController"}).when("/partners",{templateUrl:"templates/pages/partners.html",controller:"PartnersController"}).otherwise({redirectTo:"/home"})}]),bdxioModule.run(["$rootScope","$location","$anchorScroll","$timeout",function(a,b,c,d){a.goto=function(a,e){a!==b.path()&&ga("send","screenview",{screenName:a}),b.path(a),e?(b.hash(e),c(),d(function(){var a=$("body").css("padding-top");scrollBy(0,-parseInt(a,10))},100)):b.hash("")},a.genMailTo=function(a){return"mailto:"+a+"@bdx.io"}}]);var bdxioControllers=angular.module("bdxioControllers",[]);bdxioControllers.controller("HomeController",["$scope",function(a){a.themes=[{className:"coding",hints:["Langages","Frameworks","Tooling"],detailedHints:["Java, PHP, C#, Javascript","Groovy, Scala, Dart ...","Et les autres librairies et outils de productivité au quotidien"]},{className:"medias",hints:["Web","Jeux","Mobile"],detailedHints:["Les différents médias","sur lesquels développer aujourd'hui"]},{className:"future",hints:["Startups","Objets connectés"],detailedHints:["Où découvrir les idées","disruptives du monde de demain"]},{className:"design",hints:["Design","Pratiques","Architectures","Cloud"],detailedHints:["Architecture REST","Bases NOSQL","Développement dans le cloud","Pratiques telles que SCRUM ou Kanban"]}]}]),bdxioControllers.controller("PartnersController",function(){});