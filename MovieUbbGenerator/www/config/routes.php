<?php

use App\Action\GenerateSwaggerAction;
use App\Action\HomeAction;
use App\Action\LatestReviewsAction;
use App\Action\MovieByIdAction;
use App\Action\MovieNowPlayingAction;
use App\Action\MovieSearchAction;
use App\Action\ReviewCreateAction;
use Slim\App;

return function (App $app) {
    $app->get('/', HomeAction::class)->setName('home');
    $app->post('/reviews',ReviewCreateAction::class,'createReview');
//    $app->post('/reviews/bulk', ReviewCreateAction::class,'createReviewBulk');
    $app->get('/reviews/latest', LatestReviewsAction::class,'getreviews');
    $app->get('/posters',null,'getPosters');
    $app->get('/series/{term}',null,'searchSeries');
    $app->get('/movies/search',MovieSearchAction::class,'searchMovies');
    $app->get('/movies/nowplaying',MovieNowPlayingAction::Class,'nowplaying');
    $app->get('/movies/{id}', MovieByIdAction::class,'Moviesbyid');
    $app->get('/swagger.yml',GenerateSwaggerAction::class,'generateSwagger');
};

