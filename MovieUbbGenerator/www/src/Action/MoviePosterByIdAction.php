<?php

namespace App\Action;

use jjtbsomhorst\omdbapi\model\request\PosterIdentifierRequest;
use jjtbsomhorst\omdbapi\model\util\MediaType;
use jjtbsomhorst\omdbapi\OmdbApiClient;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
/**
 * @OA\Info(title="Movie", version="0.1")
 */
class MoviePosterByIdAction extends AbstractAction{

    private OmdbApiClient $client;
    public function __construct(OmdbApiClient $service)
    {
        $this->client  = $service;
    }

    private function isImdbId(string $imdbid)
    {
        return preg_match("/tt\\d{7}/", $imdbid) ||preg_match("/tt\\d{8}/", $imdbid) ;
    }

    /**
     * @OA\Get(
     *     path="/movies/{term}",
     *     @OA\Response(response="200", description="Get nothing, yet")
     * )
     */
    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     * @throws \jjtbsomhorst\omdbapi\exception\OmdbApiException
     *
     * TODO Implement this!
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {

        if(!isset($args['id']) || empty($args['id'])){
            $response->withStatus(400,'id is mandatory');
        }else{
            if($this->isImdbId($args['id'])) {

//                $movie = $this->client->byIdRequest($args['id'],MediaType::Movie)->execute();
                /**
                 * @var ResponseInterface $posterResponse;
                 */
                $posterResponse = $this->client->byIdRequest($args['id'],MediaType::Poster)->execute();
                if($posterResponse->getStatusCode() > 200 && $response->getStatusCode() < 300){
                    $response->withHeader('Content-type','image/jpg');
//                    $response->withBody($posterResponse->getBody());
                    $response->getBody()->write($posterResponse->getBody()->getContents());
                    header('Content-Type: image/jpg');
                    echo($posterResponse->getBody()->getContents());
                }
//                $response->getBody()->write(json_encode($movie));
            }else{
                $response->withStatus(501,'Only ImdbID\'s supported');
            }
        }
        return $response;
    }
}