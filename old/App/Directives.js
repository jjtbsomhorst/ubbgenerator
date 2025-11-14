var d = angular.module('appDirectives',['ngMaterial','appServices','ngMessages']);


d.directive('reviewList',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/reviewList.html',
		controller: 'reviewListController'
	}
});
d.directive('movieCard',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/movieCard.html',
		controller: 'movieCardController',
	}
});
d.directive('ubbCard',function(){
	return{
		restrict: 'AEC',
		templateUrl: 'App/partials/UbbCard.html',
		controller: 'ubbCardController'
	}
});

d.directive('lazyImage',function(){
	return{
		restrict: 'C',
		controller: function(){
			
		},
	}
});