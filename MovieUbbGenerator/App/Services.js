var services = angular.module('appServices',[]);

services.factory('stylingService',[function(){
	var s = {};
	
	s.addStyling = function(node, type){
		var startTag = "";
		var endTag = "";
		var validTags = ['spoiler','b','s','i','u'];
		if(validTags.indexOf(type) >= 0  && node != null){
			startTag = "["+type+"]";
			endTag = "[/"+type+"]";
			
			if(node != null){
				var elementContent =node.value;
				var start = elementContent.substring(0,node.selectionStart);
				var	content = elementContent.substring(node.selectionStart,node.selectionEnd);
				var end = elementContent.substring(node.selectionEnd);
				elementContent = start;
				elementContent += startTag;
				elementContent += content;
				elementContent += endTag;
				elementContent += end;
				node.value = elementContent;
			}
		}
	}
	return s;
}]);

services.factory('seriesService',['$http','$q',function($http,$q){
	var service = {};
	service.baseUrlPlural = "api.php/series/";
	service.baseUrlSingle = "api.php/movie/";
	
	service.search = function(query){
		var def = $q.defer();
		
		return $http.get(this.baseUrlPlural+query).then(function(response){
			def.resolve(response.data.Search);
			return def.promise;
		},function(response){
			def.reject(response);
			return def.promise;
		});
	}
	
	service.getDetails = function(query){
		var def = $q.defer();
		return $http.get(this.baseUrlSingle+query).then(function(response){
			def.resolve(response.data);
			return def.promise;
		},function(response){
			def.reject(response);
			return def.promise;
		});
	};
	return service;
	
}]);

services.factory('movieService',['$http','$q',function($http,$q){
	var service = {};
	service.baseUrlPlural = "api.php/movies/";
	service.baseUrlSingle = "api.php/movie/";
		
	service.search = function(query){
		var def = $q.defer();
		
		return $http.get(this.baseUrlPlural+query).then(function(response){
			def.resolve(response.data.Search);
			return def.promise;
		},function(response){
			def.reject(response);
			return def.promise;
		});
	}
	
	service.getDetails = function(query){
		var def = $q.defer();
		return $http.get(this.baseUrlSingle+query).then(function(response){
			def.resolve(response.data);
			return def.promise;
		},function(response){
			def.reject(response);
			return def.promise;
		});
	};
	return service;
}]);

services.factory('reviewService',['$http','$q',function($http,$q){
	var instance = null;
	
	
	var service = function Service(){
		this.generateUbbFromEntry = function(review){
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
			return ubbcode;
		} 
		
		this.reviews = [];
		this.movies  = [];
				
		this.addReview = function(review){
			
			if(this.movies.indexOf(review.movie.imdbID) == -1){
				this.movies.push(review.movie.imdbID);
				this.reviews.push(review);
			}else{
				this.updateReview(review);
			}
			
		}
		this.updateReview = function(review){
			var index =this.movies.indexOf(review.movie.imdbID);
			this.reviews[index] = review;
			
		}
		
		this.removeReview= function(review){
			var index = this.movies.indexOf(review.movie.imdbID) 
			if(index > -1){
				this.movies.splice(index,1);
				this.reviews.splice(index,1);
			}
					
		}
		
		this.getReview = function(imdbid){
			var index = this.movies.indexOf(imdbid);
			return this.reviews[index];
		}
		
		this.hasReview = function(imdbid){
			return (this.movies.indexOf(imdbid) > -1);
		}
		
		this.isEmpty = function(){
			return (this.reviews.length == 0);
		}
		
		this.getReviews = function(){
			return this.reviews;
		}
		this.generateUbbCode =function(){
			var ubbcode = "";
			var self = this;
			
			for(var i = 0;i<this.reviews.length;i++){
				ubbcode  += this.generateUbbFromEntry(this.reviews[i]);
			}
			
			
			return ubbcode;
		}
	}
	
	
	if(instance == null){
		instance = new service();
		
	}
	return instance;	
	
}])
