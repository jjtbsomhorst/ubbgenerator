var c = angular.module('appControllers',['ngMaterial','ngMessages','appServices']);

c.controller('moviePosterController',['$scope','posterService','$mdToast',function($scope,service,$mdToast){
	
	$scope.loading = true;
	
	service.getPosters().then(function(data){
		$scope.posters = data;
		$mdToast.show($mdToast.simple().content('Succesfully loaded '+data.length+' movie posters'));
		$scope.loading=false;
	},function(){
		$scope.loading=false;
		$mdToast.show($mdToast.simple().content('Could not load movie posters'));
	});
	
	
}]);
c.controller('ubbCardController',['$scope','$mdToast',function($scope,$mdToast){
	$scope.copyUbbCode = function(){
		window.getSelection().removeAllRanges();
		var node = document.querySelector("#ubbcode");
		node.select();
		var result = document.execCommand('copy');
		var msg = "UBB Code could not be copied to clipboard";
		if(result){
				msg = "UBB code succesfully copied to clipboard.";	
		};
		
		$mdToast.show($mdToast.simple().content(msg));
		window.getSelection().removeAllRanges();
		
	};
}]);

c.controller('movieCardController',['$scope','reviewService','stylingService',function($scope,reviewService,stylingService){
		
	$scope.setMarkup = function(tag){
		var updatedStyling = stylingService.addStyling(document.getElementById("reviewContent"),tag);
		if(updatedStyling != null){
			$scope.reviewtext = updatedStyling;
		}
	}
	
	
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
	
	$scope.$watch('reviewtext',function(n,o){
		$scope.showubbbutton = false;
		if(n != null && n != ""){
			
			if(reviewService.hasReview($scope.movie.imdbID)){
				reviewService.getReview($scope.movie.imdbID).reviewText = n;
			}
			
			$scope.showubbbutton = true;
		}
	});

	$scope.$watch('reviewscore',function(n,o){
		if(n!=o && n!=null && reviewService.hasReview($scope.movie.imdbID)){
			reviewService.getReview($scope.movie.imdbID).reviewScore = n;
		}
	});
	
}]);

c.controller('reviewListController',['$scope','reviewService',function($scope,reviewService){
	
	$scope.reviews = reviewService.reviews;
	
	$scope.removeFromList = function(review){
		reviewService.removeReview(review);
	}
	
	$scope.openReview = function(review){
		$scope.reviewtext = review.reviewText;
		$scope.reviewscore = review.reviewScore;
		$scope.movie = review.movie;
		$scope.ubbGenerated = false;
	};
	
	$scope.generateUbbFromList = function(){
		$scope.ubbcode= reviewService.generateUbbCode();
		$scope.ubbGenerated=true;
	}
	
}]);

c.controller('AppCtrl',['$scope','reviewService','movieService','seriesService',function($scope,reviewService,movieService,seriesService){
		
	$scope.copyaction = false;
	$scope.searchType = "movies";
	$scope.searchPlaceholder = "Search a movie by title or IMDB id (tt..)";
	$scope.service = movieService;
	
	$scope.onChange = function(data){
		debugger;
		switch(data){
		case 'series':
			$scope.service= seriesService;
			$scope.searchPlaceholder = "Search a serie by title or IMDB id (tt..)";
			break;
		default:
			$scope.service = movieService;
			$scope.searchPlaceholder = "Search a movie by title or IMDB id (tt..)";
		}
		$scope.searchText = '';
	}
	
	
	
	$scope.getMovies = function(text){
		$scope.showLoading=true
		
		var succes = function(data){
			$scope.showLoading = false;
			return data;
		};
		
		var failure = function(data){
			$scope.showLoading=false;
			console.error('response failed');
			console.error(response);
		}
		
		return $scope.service.search(text).then(succes,failure);		
	}
	
	$scope.$watch('selectedMovie',function(n,o){
		
		if(n!=o && n!=null){
			
			$scope.showLoading = false;
			if(n.hasOwnProperty('imdbID')){
				$scope.showLoading= true;
				$scope.service.getDetails(n.imdbID).then(function(response){
					$scope.movie = response;
					$scope.showLoading = false;
				},function(response){
					$scope.showLoading = false;
				});
				
				
			}			
		}
	});
	
	
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
}]);