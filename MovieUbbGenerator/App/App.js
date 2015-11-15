var app = angular.module('ubbGenerator',['ngMaterial','ngRoute','appControllers','appServices'])
app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default').primaryPalette('red').accentPalette('lime');
	
	var neonRedMap = $mdThemingProvider.extendPalette('red', {
	    '500': 'a61e39'
	  });
	 $mdThemingProvider.definePalette('neonRed', neonRedMap);
	 $mdThemingProvider.theme('default')
	    .primaryPalette('neonRed')
});

app.directive('reviewList',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/reviewList.html',
		controller: 'reviewListController'
	}
});
app.directive('movieCard',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/movieCard.html',
		controller: 'movieCardController',
	}
});
app.directive('ubbCard',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/UbbCard.html',
		controller: 'ubbCardController'
	}
});