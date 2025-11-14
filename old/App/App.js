var app = angular.module('ubbGenerator',['ngMaterial','ngRoute','appControllers','appServices','appDirectives'])
app.config(function($mdThemingProvider,$routeProvider){
	$mdThemingProvider.theme('default').primaryPalette('red').accentPalette('lime');
	
	var neonRedMap = $mdThemingProvider.extendPalette('red', {
	    '500': 'a61e39'
	  });
	 $mdThemingProvider.definePalette('neonRed', neonRedMap);
	 $mdThemingProvider.theme('default').primaryPalette('neonRed');
	 
	 $routeProvider.when('/Gallery',{
		 templateUrl: 'App/partials/movieposters.html',
		 controller: 'moviePosterController'
	 }).otherwise({
		 templateUrl: 'App/partials/generator.html',
		 controller: 'AppCtrl'
	 });
});
