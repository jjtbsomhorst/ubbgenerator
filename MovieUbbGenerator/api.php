<?php
require 'libs/Slim/Slim.php';
require 'config.php';
require 'Validator.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim($config);
$app->response->headers->set('Content-Type', 'application/json');

$app->post("/review",function()use($app){
	if(!RequestValidator::validate($app->request->getBody())){
		$app->response->setStatus(400);
	}else{
		$requestBody = RequestValidator::toArray($app->request->getBody());
		$conn = new PDO("mysql:host=".$app->config('db.host').";dbname=".$app->config('db.name').";charset=utf8", $app->config('db.username'), $app->config('db.password'));
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$stmt = $conn->prepare('INSERT INTO reviews(`imdbid`,`review_body`,`review_score`) values(:imdb,:review_body,:review_score)');
		$stmt->bindParam(":imdb",$requestBody['movie']['imdbID']);
		$stmt->bindParam(":review_body",$requestBody['reviewText']);
		$stmt->bindParam(":review_score",$requestBody['reviewScore']);

				if($stmt->execute()){
					$requestBody['reviewId'] = $conn->lastInsertId();
					$app->response->setBody(json_encode($requestBody));
				}
				
	}
});

$app->post("/reviews/bulk",function()use($app){
	if(!RequestValidator::validate($app->request->getBody())){
		$app->response->setStatus(400);
	}else{
		$app->response->setBody(com_create_guid());
	}
});

$app->get('/posters',function()use($app){
	
	$conn = new PDO("mysql:host=".$app->config('db.host').";dbname=".$app->config('db.name').";charset=utf8", $app->config('db.username'), $app->config('db.password'));
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$stmt = $conn->prepare('SELECT * from posters order by rand()');
	$posters = array();
	if($stmt->execute()){
		while($row = $stmt->fetch(PDO::FETCH_BOTH)){
			$poster = array();
			$poster['imdbid'] = $row['imbdid'];
			$poster['image'] = $row['fileid'].".jpg";
			$poster['imdburl'] = "https://www.imdb.com/title/".$row['imbdid'];
			$posters[] = $poster;
		}
	}
	$app->response->setBody(json_encode($posters));
	$app->response->setStatus(200);
	
});

$app->get('/series/:term',function($q)use($app){
	preg_match("(tt\d{5,7})", $q,$matches);
	if(empty($matches)){
		$q = urlencode($q);
		$ch = curl_init();

		curl_setopt($ch,CURLOPT_URL,$app->config('api.baseurl')."/?type=series&s=".$q);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$response = curl_exec($ch);
		curl_close($ch);
		if($response !== false){
			$decodedResponse = json_decode($response,true);
			if(array_key_exists('Response',$decodedResponse)){ // in case of error..
				$response = array("Search"=>array());
				$response = json_encode($response);
			}
	
	
			$app->response->setBody($response);
			$app->response->setStatus(200);
		}
	}else{
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$app->config('api.baseurl')."/?i=".$q);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$response = curl_exec($ch);
		curl_close($ch);
		if($response !== false){
			$result = array();
			$result['Search'] = array(0=> json_decode($response,true));
			$app->response->setBody(json_encode($result));
			$app->response->setStatus(200);
		}
	}
});


$app->get('/movies/:term',function($q)use($app){
	
	preg_match("(tt\d{5,7})", $q,$matches);
	if(empty($matches)){
		$q = urlencode($q);
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$app->config('api.baseurl')."/?type=movie&s=".$q);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$response = curl_exec($ch);
		curl_close($ch);
		if($response !== false){

			$decodedResponse = json_decode($response,true);
			if(array_key_exists('Response',$decodedResponse)){
				if($decodedResponse['Response'] == 'False'){
					$response = array("Search"=>array());
				$response = json_encode($response);
				}
			}
			
		
			
			$app->response->setBody($response);
			$app->response->setStatus(200);
		}
	}else{
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$app->config('api.baseurl')."/?i=".$q);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$response = curl_exec($ch);
		curl_close($ch);
		if($response !== false){
			$result = array();
			$result['Search'] = array(0=> json_decode($response,true));
			$app->response->setBody(json_encode($result));
			$app->response->setStatus(200);
		}
	}
	
	
	
	
});

$app->get('/movie/:imdb',function($q)use($app){
	$q = htmlentities($q);
	$response = file_get_contents($app->config('api.baseurl')."/?i=".$q);
	$omdbResponse= json_decode($response);
	
	$conn = new PDO("mysql:host=".$app->config('db.host').";dbname=".$app->config('db.name').";charset=utf8", $app->config('db.username'), $app->config('db.password'));
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$stmt = $conn->prepare('SELECT count(*) as c from posters where imbdid = :id');
	$stmt->bindParam(':id',$q);
	$filename = null;
	
	if($stmt->execute()){
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		$count = $row['c'];
		
		if($count == 1){
			$stmt = $conn->prepare('SELECT `fileid` from posters where imbdid = :id');
			$stmt->bindParam(":id",$q);
			if($stmt->execute()){
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$filename = $row['fileid'];
			}
		}
	}
	
	if($filename == null){
		
		$filename = "noimage";
		if(property_exists($omdbResponse,'Poster')){
			$posterUrl = $omdbResponse->Poster;
			if($posterUrl != "N/A"){
				$smallPosterUrl = str_replace("SX300.jpg","SX173.jpg",$posterUrl);
				$imageData = file_get_contents($smallPosterUrl);
			
				$fileName = bin2hex(openssl_random_pseudo_bytes(16));
				file_put_contents($app->config('imagepath').$fileName.".jpg", $imageData);
				$stmt = $conn->prepare('INSERT INTO posters(`imbdid`,`fileid`) values(:imdb,:file)');
				$stmt->bindParam(":imdb",$q);
				$stmt->bindParam(":file",$fileName);
				if($stmt->execute()){
					$filename = $fileName;
				}
			}
		}
		
	}	
	

	$omdbResponse->Poster = "images/".$filename.".jpg";
	
	$app->response->setBody(json_encode($omdbResponse));
	
});

$app->run();
