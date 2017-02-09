var services = angular.module('appServices',[]);

services.factory('posterService',['$http','$q',function($http,$q){
	var s = {};
	s.cache = null;
	s.baseUrl = "api.php/posters";
	
	s.getPosters = function(){
		var def  = $q.defer();
		if(this.cache == null){
			$http.get(this.baseUrl).then(function(data){
				this.cache = data.data;
				def.resolve(this.cache);
			},function(data){
				def.reject(data);
			});
			return def.promise;
		}else{
			def.resolve(this.cache);
		}
		
	}
	console.log('return posterservice');
	return s;
}
]);

services.factory('stylingService',['$location',function($location){
	
	var HtmlStylingService = function(){
		this.addStyling = function(node,type){
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
					return elementContent;
				}
			}
		}

		this.convert = function(text){
			text = text.replace("[spoiler]","<font style=\"background-color: black\">");
			text = text.replace("[/spoiler]","</font>");

			text = text.replace("[b]","<strong>");
			text = text.replace("[/b]","</strong>");

			text = text.replace("[s]","<s>");
			text = text.replace("[/s]","</s>");			

			text = text.replace("[i]","<i>");
			text = text.replace("[/i]","</i>");			

			text = text.replace("[u]","<u>");
			text = text.replace("[/u]","</u>");			

			return text;
		}
	};

	var UbbStylingService = function(){

		this.convert = function(text){
			return text;
		}

		this.addStyling = function(node,type){
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
					return elementContent;
				}
			}
		}

	}




	var s = new function s(){

		this.factories = {};

		this.getFormat = function(){
			var queryParams = $location.search();
			var format = "ubb";
			if(queryParams.hasOwnProperty('format')){
				format = queryParams.format;
			}
			return format;
		}

		this.factories.html = new HtmlStylingService();
		this.factories.ubb = new UbbStylingService();

		this.getFactory = function(){
			var factory = this.factories.ubb;
			var format = this.getFormat();
			if(this.factories.hasOwnProperty(format)){
				factory = this.factories[format];
			}

			return factory;
		}

		this.addStyling = function(node,type){
			return this.getFactory().addStyling(node,type);
		}
		this.convert = function(text){
			return this.getFactory().convert(text);
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
	
	console.log('return seriesService');
	
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
	console.log('return movieService');
	
	return service;
}]);

services.factory('reviewService',['$http','$q','$rootScope',function($http,$q,$scope){
	$scope.reviews = [];
	$scope.movies = [];

	function addMovie(review){
		if($scope.movies.indexOf(review.movie.imdbID) == -1){
			$scope.movies.push(review.movie.imdbID);
			$scope.reviews.push(review);
		}else{
			updateReview(review);
		}
	}

	function updateReview(review){
			var index = $scope.movies.indexOf(review.movie.imdbID);
			var prevReview = $scope.reviews[index];
			if(prevReview.hasOwnProperty('reviewId')){
				review.reviewId = prevReview.reviewId;
			}
			$scope.reviews[index] = review;		
	}

	function getReviews(){
		return $scope.reviews;
	}

	function getReview(imdbid){
			var index = $scope.movies.indexOf(imdbid);
			return $scope.reviews[index];
		}

	function remove(review){
		var index = $scope.movies.indexOf(review.movie.imdbID) 
		if(index > -1){
			$scope.movies.splice(index,1);
			$scope.reviews.splice(index,1);
		}
	}

	function hasReview(imdbid){
		return ($scope.movies.indexOf(imdbid) > -1);
	}

	function persist(){
	
		$scope.reviews.forEach(function(item,index){
			if(!item.hasOwnProperty('reviewId')){
				$http.post('api.php/review',item).success(function(data,status,headers,config){
					debugger;
					if(hasReview(data.movie.imdbID)){
						updateReview(data);
					}
				}).then(function(response){
					console.log('kapot');
				});
			}
			
		});
		

	}

	return {
		addReview: addMovie,
		updateReview: updateReview,
		getReviews: getReviews,
		getReview: getReview,
		removeReview: remove,
		hasReview: hasReview,
		persistReviews: persist
	}
}]);

services.factory('convertService',['$http','$q',function($http,$q){
	var instance = null;
	
	var HtmlGenerator = function(){
		
		this.generateMarkupFromEntry = function(review){
			var imdbLink = "http://www.imdb.com/title/"+review.movie.imdbID;
			var wikiLink = "https://en.wikipedia.org/w/index.php?search="+review.movie.Title+" (film)";
			var youtubelink = "https://www.youtube.com/results?search_query=trailer+"+review.movie.Title.replace(" ","+")+"+official+"+review.movie.Year;
			var starUrl = "http://www.jeroensomhorst.eu/ubbgenerator/assets/stars/"+review.reviewScore+".png";
			var posterurl = "http://www.jeroensomhorst.eu/ubbgenerator/"+review.movie.Poster;
			var html = "";
			html += "<table class=\"nocontrast rml\" style=\"width:100%;background-color:transparent\" cellspacing=\"0\" cellpadding=\"6\">";
			html += "<tbody>";
			html += "<tr>";
			html += "<td style=\"font-size:14px\"><a href=\"\" rel=\"external nofollow\" title=\"IMDb -- "+review.movie.Title+" ("+review.movie.Year+")\" target=\"_blank\"><b>"+review.movie.Title+"</b> ("+review.movie.Year+")</a></td>";
			html += "<td style=\"font-size:9px\" rowspan=\"2\" align=\"right\" valign=\"top\">";
			html += "<a href=\""+posterurl+"\" rel=\"external nofollow\" target=\"_blank\">";
			html += "<img class=\"rml border resized\" width=\"110\" height=\"163\" alt=\""+review.movie.Title+" "+review.movie.Year+"\" title=\""+review.movie.Title+" ("+review.movie.Year+")\" src=\""+posterurl+"\" data-lazyimg=\"1\"></a>";
			html += "</td></tr><tr>";
			html += "<td valign=\"top\"><small><b>IMDb:</b> "+review.movie.imdbRating+" | <b>Genre:</b> "+review.movie.Genre+" | <b>Runtime:</b> "+review.movie.Runtime+" | <b><abbr title=\"Motion Picture Association of America\">MPAA</abbr>:</b> "+review.movie.Rated+"</small>";
			html += "<hr class=\"noshade\">";
			html += "<div style=\"text-align:justify\">"+review.reviewText+"</div>";
			html += "</td>";
			html += "</tr>";
			html += "<tr>";
			html += "<td colspan=\"2\" align=\"right\">";
			html += "<small>";
			html += "<a href=\""+imdbLink+"\" rel=\"external nofollow\" target=\"_blank\">";
			html += "<img src=\"http://www.jeroensomhorst.eu/ubbgenerator/assets/imdb.png\" class=\"rml left\" width=\"16\" height=\"16\" alt=\"\">";
			html += "</a>";
			html += "<a href=\""+wikiLink+"\" rel=\"external nofollow\" target=\"_blank\">";
			html += "<img src=\"http://www.jeroensomhorst.eu/ubbgenerator/assets/wikipedia.png\" class=\"rml left\" width=\"16\" height=\"16\" alt=\"\">";
			html += "</a>";
			html += "<a href=\""+youtubelink+"\" rel=\"external nofollow\" target=\"_blank\">";
			html += "<img src=\"http://www.jeroensomhorst.eu/ubbgenerator/assets/youtube.png\" class=\"rml left\" width=\"16\" height=\"16\" alt=\"\">";
			html += "</a>";
			html += "<img src=\""+starUrl+"\" class=\"rml\" width=\"228\" height=\"24\" alt=\"\">";
			html += "<b>"+review.reviewScore+"</b> / 10";
			html += "</small>";
			html += "</td>";
			html += "</tr>";
			html += "</tbody>";
			html += "</table>";
			
			return html;
		}
		
		this.getAdvertiseLink = function(){
			return "<p><sub><a href='http://www.jeroensomhorst.eu/ubbgenerator/#?format=html'>Genereer je eigen HTML code review</a></sub>";
		}
		
	};
	
	var UbbGenerator = function(){
		
		this.generateMarkupFromEntry = function(review){
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
			
			return ubbcode;
		}
		
		this.getAdvertiseLink = function(){
			return "[sub][url=http://www.jeroensomhorst.eu/ubbgenerator/#?format=ubb]Genereer je eigen UBB code review[/url][/sub]";
		}
	};
	
	
	var service = function Service(){
		
		this.factories = {};
		this.factories.html = new HtmlGenerator();
		this.factories.ubb = new UbbGenerator();
		
		
		
		this.generateUbbFromEntry = function(review,format){
			
			if(this.factories.hasOwnProperty(format)){
				return this.factories[format].generateMarkupFromEntry(review);
			}
		} 
		
		
		
		
		
		this.generateUbbCode =function(format,reviews){
			var ubbcode = "";
			var self = this;
			if(this.factories.hasOwnProperty(format)){
				var factory = this.factories[format];
				reviews.forEach(function(item,index){
					ubbcode += factory.generateMarkupFromEntry(item);
					ubbcode += factory.getAdvertiseLink();
				})
				
			}
			return ubbcode;
		}
	}
	
	
	if(instance == null){
		instance = new service();
		
	}
	return instance;	
	
}])
