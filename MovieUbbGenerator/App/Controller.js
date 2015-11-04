var c = angular.module('appControllers',['ngMaterial','ngMessages','appServices']);
c.controller('AppCtrl',['$scope','$location','$http','$mdToast','movieService','reviewService',function($scope,$location,$http,$mdToast,movieService,reviewService){
	
	$scope.reviews = reviewService.reviews;
	$scope.copyaction = false;
	$scope.getMovies = function(text){
		$scope.showLoading=true
		
		text = text.replace(" ","+");
		return movieService.getMovies(text).then(function(data){
			$scope.showLoading = false;
			return data;
		},function(response){
			$scope.showLoading=false;
			console.error('response failed');
			console.error(response);
		});
	}
	
	$scope.$watch('selectedMovie',function(n,o){
		
		if(n!=o && n!=null){
			
			$scope.showLoading = false;
			if(n.hasOwnProperty('imdbID')){
				$scope.showLoading= true;
				movieService.getDetails(n.imdbID).then(function(response){
					$scope.movie = response;
					$scope.showLoading = false;
				},function(response){
					$scope.showLoading = false;
				});
			}			
		}
	});
	
	$scope.generateUbb = function(){
		
		if(reviewService.reviews.length == 0){
			$scope.ubbcode = reviewService.generateUbbFromEntry({
				Title: $scope.movie.Title,
				reviewScore: $scope.reviewscore,
				reviewText: $scope.reviewtext,
				movie: $scope.movie
			});
			$scope.ubbGenerated= true;
		}else{
			
			reviewService.addReview({
				Title: $scope.movie.Title,
				reviewScore: $scope.reviewscore,
				reviewText: $scope.reviewtext,
				movie: $scope.movie
			});
			
			$scope.ubbcode = reviewService.generateUbbCode();
			$scope.ubbGenerated=true;
		}
	}
		
	$scope.showMovieData = function(){
		$scope.ubbGenerated = false;
		$scope.ubbcode=null;
	}
	
	$scope.showMovieCard = function(){
		if($scope.hasOwnProperty('movie')){
			return !$scope.ubbGenerated;
		}
		return false;
	}
	$scope.$watch('reviewtext',function(n,o){
		$scope.showubbbutton = false;
		if(n != null && n != ""){
			$scope.showubbbutton = true;
		}
	});
	
	$scope.showToast = function(){
		
		$mdToast.show($mdToast.simple().content('UBB code succesvol naar klembord gekopieerd.'));
	}
	
	$scope.saveAndReset = function(){
		
		reviewService.addReview({
			Title: $scope.movie.Title,
			reviewScore: $scope.reviewscore,
			reviewText: $scope.reviewtext,
			movie: $scope.movie
		});
		
		delete $scope.movie;
		delete $scope.reviewtext;
		delete $scope.reviewscore;
		delete $scope.selectedMovie;	
		delete $scope.searchText;
	}
	
	//new Clipboard('#clipboard');
	
}]);
