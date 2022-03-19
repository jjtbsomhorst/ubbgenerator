<?php

namespace App\Action;

use App\model\Movie;
use App\Model\Wrappers\ListResult;
use App\Model\Wrappers\TmdbWrapper;
use jjtbsomhorst\omdbapi\model\util\MediaType;
use jjtbsomhorst\omdbapi\OmdbApiClient;
use Kerox\Tmdb\Tmdb;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MovieNowPlayingAction extends AbstractAction
{
    private Tmdb $TmdbClient;
    private TmdbWrapper $wrapper;
    private OmdbApiClient $omdbApi;

    public function __construct(Tmdb $TmbdClient, TmdbWrapper $wrapper, OmdbApiClient $omdbApi){
        $this->TmdbClient = $TmbdClient;
        $this->omdbApi = $omdbApi;
        $this->wrapper = $wrapper;
    }




    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $nowplaying = json_decode($this->TmdbClient->movies()->nowPlaying('NL')->getBody(),true);
        $result = new ListResult();
        $result->setTotalResults($nowplaying['total_results']);
        $result->setCurrentPage($nowplaying['page']);
        $result->setSearch($this->wrapper->wrapCollection($nowplaying['results']));
        /**
         * @var Movie $m
         */
        foreach($result->getSearch() as $m){
            /**
             * @var Movie $movie;
             */
         

                $posterUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face".$m->getPoster();
                $m->setPoster($posterUrl);
            

        }

        $response->getBody()->write(json_encode($result));
        return $response;
    }
}