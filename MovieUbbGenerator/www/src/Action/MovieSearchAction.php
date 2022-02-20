<?php

namespace App\Action;

use App\model\Movie;
use jjtbsomhorst\omdbapi\model\response\MovieResult;
use jjtbsomhorst\omdbapi\model\response\SearchResult;
use jjtbsomhorst\omdbapi\model\util\MediaType;
use jjtbsomhorst\omdbapi\OmdbApiClient;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MovieSearchAction extends AbstractAction
{
    private OmdbApiClient $client;

    public function __construct(OmdbApiClient $service)
    {
        $this->client = $service;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $params = $request->getQueryParams();

        if(array_key_exists('name',$params)){
            $page = 1;
            if(isset($params['page']) && is_numeric($params['page'])){
                $page = $params['page'];
            }
            /**
             * @var SearchResult $apiResponse;
             */
            $apiResponse = $this->client->searchRequest($params['name'],$page,MediaType::Movie)->execute();
            $enriched = [];
            foreach($apiResponse->getSearch() as $entry){
                /**
                 * @var $movieResult MovieResult
                 */
                $movieResult = $this->client->byIdRequest($entry->getImdbID(),MediaType::Movie)->execute();
                $movie = new Movie();
                $movie->setTitle($movieResult->getTitle());
                $movie->setPoster($movieResult->getPoster());
                $movie->setGenre(explode(", ",$movieResult->getGenre()));
                $movie->setPlot($movieResult->getPlot());
                $movie->setImdbId($movieResult->getImdbID());
                $movie->setImdbRating(floatval($movieResult->getImdbRating()));
                $movie->setYear($movieResult->getYear());
                $enriched[] = $movie;

            }

            $apiResponse->setSearch($enriched);
            $response->getBody()->write(json_encode($apiResponse));
            return $response;
        }

        return $response->withStatus('400','Name property is mandatory');
    }

}