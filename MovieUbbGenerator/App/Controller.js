var c = angular.module('appControllers',['ngMessages','appServices']);
c.controller('AppCtrl',['$scope','$location','$http',function($scope,$location,$http){
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
		var imdbLink = "http://www.imdb.com/title/"+$scope.movie.imdbID;
		var wikiLink = "https://en.wikipedia.org/w/index.php?search="+$scope.movie.Title+" (film)";
		var youtubelink = "https://www.youtube.com/results?search_query=trailer+"+$scope.movie.Title.replace(" ","+")+"+official+"+$scope.movie.Year;
		var starUrl = "http://www.jeroensomhorst.eu/ubbgenerator/assets/stars/"+$scope.reviewscore+".png";
		var posterurl = "http://www.jeroensomhorst.eu/ubbgenerator/"+$scope.movie.Poster;
		
		$scope.ubbcode  = "[table bgcolor=transparent width=100% cellpadding=6]";
		$scope.ubbcode += "[tr][td fontsize=14][url=\""+imdbLink+"\",\"IMDb -- "+$scope.movie.Title+" ("+$scope.movie.Year+")\"][b]"+$scope.movie.Title+"[/b] ("+$scope.movie.Year+")[/url]";
		$scope.ubbcode += "[/td][td align=right valign=top rowspan=2 fontsize=9][url=\""+posterurl+"\"][img=110,163,,,\""+$scope.movie.Title+" ("+$scope.movie.Year+")\",1]"+posterurl+"[/][/url][/td][/tr]";
		$scope.ubbcode += "[tr][td valign=top][small][b]IMDb:[/b] "+$scope.movie.imdbRating+" | [b]Genre:[/b] "+$scope.movie.Genre+" | [b]Runtime:[/b] "+$scope.movie.Runtime+" | [b][abbr=\"Motion Picture Association of America\"]MPAA[/abbr]:[/b] "+$scope.movie.Rated+"[/small][hr=noshade]";
		$scope.ubbcode += "[justify]"+$scope.reviewtext+"[/justify][/td][/tr]";
		$scope.ubbcode += "[tr][td colspan=2 align=right][small][url=\""+imdbLink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/imdb.png[/img][/url]";
		$scope.ubbcode += "[url=\""+wikiLink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/wikipedia.png[/img][/url]";
		$scope.ubbcode += "[url=\""+youtubelink+"\"][img=16,16,,left,\"\"]http://www.jeroensomhorst.eu/ubbgenerator/assets/youtube.png[/img][/url]";
		$scope.ubbcode += "[img=,24,,,,]"+starUrl+"[/img]";
		$scope.ubbcode += "[b]"+$scope.reviewscore+"[/b] / 10[/small][/td][/tr][/table]";
		$scope.ubbcode += "[sub][url=http://www.jeroensomhorst.eu/ubbgenerator/]Genereer je eigen UBB code review[/url][/sub]";
			
		$scope.ubbGenerated = true;
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
	})
	
}]);
