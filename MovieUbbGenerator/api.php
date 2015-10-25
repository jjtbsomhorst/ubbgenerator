<?php
require 'libs/Slim/Slim.php';
require 'config.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim($config);
$app->response->headers->set('Content-Type', 'application/json');
$app->get('/movies/:term',function($q)use($app){
	
	preg_match("(tt\d{5,7})", $q,$matches);
	if(empty($matches)){
		$q = urlencode($q);
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,"http://www.omdbapi.com/?type=movie&s=".$q);
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
		curl_setopt($ch,CURLOPT_URL,"http://www.omdbapi.com/?i=".$q);
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
	$response = file_get_contents("http://www.omdbapi.com/?i=".$q);
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