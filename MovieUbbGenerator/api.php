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
	// check if in db.. and if yes return from db
	
	$response = file_get_contents("http://www.omdbapi.com/?type=movie&plot=full&i=".$q);
	$app->response->setBody($response);
	
});

$app->run();