<?php

use App\Action\GenerateSwaggerAction;
use Slim\App;

return function (App $app) {
    $app->get('/', \App\Action\HomeAction::class)->setName('home');
    $app->post('/review',null,'createReview');
    $app->post('/review/bulk',null,'createReviewBulk');
    $app->get('/posters',null,'getPosters');
    $app->get('/series/{term}',null,'searchSeries');
    $app->get('/movies/{term}',\App\Action\MovieSearchAction::class,'searchMovies');
    $app->get('/swagger.yml',GenerateSwaggerAction::class,'generateSwagger');
};

