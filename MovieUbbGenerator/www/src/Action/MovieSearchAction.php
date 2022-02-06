<?php

namespace App\Action;

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

            $apiResponse = $this->client->searchRequest($params['name'],$page,MediaType::Movie)->execute();
            $response->getBody()->write(json_encode($apiResponse));
            return $response;
        }

        return $response->withStatus('400','Name property is mandatory');
    }

}