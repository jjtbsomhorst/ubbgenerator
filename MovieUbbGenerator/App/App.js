var app = angular.module('ubbGenerator',['ngMaterial','ngRoute','appControllers','appServices','appDirectives'])
app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default').primaryPalette('red').accentPalette('lime');
	
	var neonRedMap = $mdThemingProvider.extendPalette('red', {
	    '500': 'a61e39'
	  });
	 $mdThemingProvider.definePalette('neonRed', neonRedMap);
	 $mdThemingProvider.theme('default')
	    .primaryPalette('neonRed')
});
