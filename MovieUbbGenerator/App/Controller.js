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

c.controller('movieCardController',['$scope','convertService','stylingService','reviewService','$location',function($scope,convertService,stylingService,reviewService,$location){
		
	$scope.setMarkup = function(tag){
		var updatedStyling = stylingService.addStyling(document.getElementById("reviewContent"),tag);
		if(updatedStyling != null){
			$scope.reviewtext = updatedStyling;
		}
	}
	
	$scope.generateMarkup = function(){
		var format = "ubb";
		
		var queryParams = $location.search();
		if(queryParams.hasOwnProperty('format')){
			format = queryParams.format;
		}

		reviewService.addReview({
				Title: $scope.movie.Title,
				reviewScore: $scope.reviewscore,
				reviewText: $scope.reviewtext,
				movie: $scope.movie
			});
			
		$scope.ubbcode = stylingService.convert(convertService.generateUbbCode(format,reviewService.getReviews()));
		$scope.ubbGenerated=true;
		
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

c.controller('reviewListController',['$scope','reviewService','convertService','stylingService','$location',function($scope,reviewService,convertService,stylingService,$location){
	
	$scope.reviews = reviewService.getReviews();
	
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
		debugger;
		var queryParams = $location.search();
		var format = "ubb";
		if(queryParams.hasOwnProperty('format')){
			format = queryParams.format;
		}
		$scope.ubbcode = stylingService.convert(convertService.generateUbbCode(format,reviewService.getReviews()));
		$scope.ubbGenerated=true;
	}
	
}]);

c.controller('AppCtrl',['$scope','reviewService','movieService','seriesService',function($scope,reviewService,movieService,seriesService){
		
	$scope.copyaction = false;
	$scope.searchType = "movies";
	$scope.searchPlaceholder = "Search a movie by title or IMDB id (tt..)";
	$scope.service = movieService;
	$scope.canPersist = true;
	
	$scope.onChange = function(data){
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
	
	$scope.$watch('ubbGenerated',function(n,o){
		if(n!=o && n!=null){
			if(n && $scope.canPersist){
				console.log('Can persist..');
				reviewService.persistReviews();
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