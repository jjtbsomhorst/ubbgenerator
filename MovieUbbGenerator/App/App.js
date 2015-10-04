var app = angular.module('ubbGenerator',['ngMaterial','ngRoute','appControllers','appServices'])
app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default').primaryPalette('red').accentPalette('lime');
});