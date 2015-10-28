var c = angular.module('appControllers',['ngMaterial','ngMessages','appServices']);
c.controller('AppCtrl',['$scope','$location','$http','$mdToast',function($scope,$location,$http,$mdToast){
	
	$scope.reviews = [];
	
	$scope.getMovies = function(text){
		$scope.showLoading=true
		text = text.replace(" ","+");
		return $http.get('api.php/movies/'+text).then(function(response){
			$scope.showLoading=false;
			return response.data.Search;
		},function(reponse){
			$scope.showLoading=false;
			console.log('response failed')
		})
	}
	
	$scope.$watch('selectedMovie',function(n,o){
		
		if(n!=o && n!=null){
			$scope.showLoading=false	
			
			if(n.hasOwnProperty('imdbID')){
				$scope.showLoading = true;
				$http.get('api.php/movie/'+n.imdbID).then(function(response){
					$scope.movie = response.data;
					
					$scope.showLoading = false;	
				},function(response){
					$scope.showLoading = false;
				});
			}
			
		}
	});
	
	$scope.generateUbb = function(){
		
		var review = {
			Title: $scope.movie.Title,
			reviewScore: $scope.reviewscore,
			reviewText: $scope.reviewtext,
			movie: $scope.movie
		};
		
		$scope.reviews.push(review);
//		
//		
//		$scope.ubbcode = $scope.generateUbbCode(review);
//		$scope.ubbGenerated = true;
		$scope.generateUbbFromList();
	}
	
	$scope.generateUbbFromList = function(){
		var ubbcode = "";
		
		
		for(var i = 0;i<$scope.reviews.length; i++){
			ubbcode += $scope.generateUbbCode($scope.reviews[i]);
		}
		$scope.ubbcode = ubbcode;
		$scope.ubbGenerated = true;
		
	}
	
	$scope.generateUbbCode = function(review){
		var imdbLink = "http://www.imdb.com/title/"+review.movie.imdbID;
		var wikiLink = "https://en.wikipedia.org/w/index.php?search="+review.movie.Title+" (film)";
		var youtubelink = "https://www.youtube.com/results?search_query=trailer+"+review.movie.Title.replace(" ","+")+"+official+"+review.movie.Year;
		var starUrl = "http://www.jeroensomhorst.eu/ubbgenerator/assets/stars/"+review.reviewScore+".png";
		var posterurl = "http://www.jeroensomhorst.eu/ubbgenerator/"+review.movie.Poster;
		var ubbcode  = "[table bgcolor=transparent width=100% cellpadding=6]";
		ubbcode += "[tr][td fontsize=14][url=\""+imdbLink+"\",\"IMDb -- "+review.movie.Title+" ("+review.movie.Year+")\"][b]"+review.movie.Title+"[/b] ("+review.movie.Year+")[/url]";
		ubbcode += "[/td][td align=right valign=top rowspan=2 fontsize=9][url=\""+posterurl+"\"][img=110,163,,,\""+review.movie.Title+" ("+review.movie.Year+")\",1]"+posterurl+"[/][/url][/td][/tr]";
		ubbcode += "[tr][td valign=top][small][b]IMDb:[/b] "+review.movie.imdbRating+" | [b]Genre:[/b] "+review.movie.Genre+" | [b]Runtime:[/b] "+review.movie.Runtime+" | [b][abbr=\"Motion Picture Association of America\"]MPAA[/abbr]:[/b] "+review.movie.Rated+"[/small][hr=noshade]";
		ubbcode += "[justify]"+review.reviewText+"[/justify][/td][/tr]";
		ubbcode += "[tr][td colspan=2 align=right][small][url=\""+imdbLink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/imdb.png[/img][/url]";
		ubbcode += "[url=\""+wikiLink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/wikipedia.png[/img][/url]";
		ubbcode += "[url=\""+youtubelink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/youtube.png[/img][/url]";
		ubbcode += "[img=,24,,,,]"+starUrl+"[/img]";
		ubbcode += "[b]"+review.reviewScore+"[/b] / 10[/small][/td][/tr][/table]";
		ubbcode += "[sub][url=http://www.jeroensomhorst.eu/ubbgenerator/]Genereer je eigen UBB code review[/url][/sub]";
			
		//$scope.ubbGenerated = true;
		return ubbcode;
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
		
		$scope.reviews.push({
			Title: $scope.movie.Title,
			reviewScore: $scope.reviewscore,
			reviewText: $scope.reviewtext,
			movie: $scope.movie
		});
		delete $scope.movie;
		delete $scope.reviewtext;
		delete $scope.reviewscore;
		delete $scope.selectedMovie;	
		delete $cope.searchText;
	}
	
	new Clipboard('#clipboard');
	
}]);
