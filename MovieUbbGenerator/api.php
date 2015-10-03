<?php
require 'libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->response->headers->set('Content-Type', 'application/json');
$app->get('/movies/:term',function($q)use($app){
	$response = file_get_contents("http://www.omdbapi.com/?type=movie&s=".$q);
	$app->response->setBody($response);
	$app->response->setStatus(200);
});

$app->get('/movie/:imdb',function($q)use($app){
	
	$response = file_get_contents("http://www.omdbapi.com/?type=movie&plot=full&i=".$q);
	$omdbResponse= json_decode($response);
	
	$conn = new PDO('mysql:host=localhost;dbname=jeroen01_moviedb;charset=utf8', 'jeroen01_moviedb', 'BQJJKfgPdOkKFChp');
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
		
		$posterUrl = $omdbResponse->Poster;
		$smallPosterUrl = str_replace("SX300.jpg","SX173.jpg",$posterUrl);
		$imageData = file_get_contents($smallPosterUrl);
		
		$fileName = bin2hex(openssl_random_pseudo_bytes(16));
		file_put_contents("/home/jeroen01/domains/jeroensomhorst.eu/public_html/ubbgenerator/images/".$fileName.".jpg", $imageData);
		$stmt = $conn->prepare('INSERT INTO posters(`imbdid`,`fileid`) values(:imdb,:file)');
		$stmt->bindParam(":imdb",$q);
		$stmt->bindParam(":file",$fileName);
		if($stmt->execute()){
			$filename = $fileName;
		}
	}	
	

	$omdbResponse->Poster = "http://www.jeroensomhorst.eu/ubbgenerator/images/".$filename.".jpg";
	
	$app->response->setBody(json_encode($omdbResponse));
	
});

$app->run();