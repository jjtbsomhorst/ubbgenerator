<?php

namespace App\Action;

use Kerox\Tmdb\Tmdb;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MovieNowPlayingAction extends AbstractAction
{
    private Tmdb $client;
    public function __construct(Tmdb $client){
        $this->client = $client;
    }


    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $nowplaying = $this->client->movies()->nowPlaying('NL');
        return $nowplaying;
    }
}