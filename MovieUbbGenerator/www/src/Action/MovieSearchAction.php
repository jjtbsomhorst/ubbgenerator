<?php

namespace App\Action;

use App\Services\MovieService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MovieSearchAction extends AbstractAction{

    private MovieService $movieService;

    public function __construct(MovieService $service)
    {
        $this->movieService = $service;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write(json_encode(['success' => true]));

        if(!empty($args['term'])){
            if($this->movieService->isImdbId($args['term'])){
                die(print_r($this->movieService->getMovieById($args['term']),true));
            }else{
                die(print_r($this->movieService->getMovieByName($args['term']),true));
            }

        }

        return $response->withHeader('Content-Type', 'application/json');
    }
}