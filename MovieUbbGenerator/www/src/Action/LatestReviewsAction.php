<?php

namespace App\Action;

use App\Entity\ReviewEntity;
use App\Model\Wrappers\ReviewApiWrapper;
use App\Model\Wrappers\MovieWrapper;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ObjectRepository;
use jjtbsomhorst\omdbapi\exception\OmdbApiException;
use jjtbsomhorst\omdbapi\model\util\MediaType;
use jjtbsomhorst\omdbapi\OmdbApiClient;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class LatestReviewsAction extends AbstractAction
{
    /**
     * @var ReviewRepository $repo
     */
    private ObjectRepository $repo;

    public function __construct(EntityManager $em,OmdbApiClient $client){

        $this->repo = $em->getRepository(ReviewEntity::class);
        $this->client = $client;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $reviews = $this->repo->findLatest();
        $wrapped = ReviewApiWrapper::wrapCollection($reviews);
        foreach($wrapped as $review){
            try{
                $result = $this->client->byIdRequest($review->getImdbId(),MediaType::Movie)->execute();
                $wrappedMovie = MovieWrapper::wrapFromApi($result);
                $review->setMovie($wrappedMovie);
            }catch(OmdbApiException $e){

            }
        }

        $response->getBody()->write(json_encode($wrapped));
        return $response;
    }
}