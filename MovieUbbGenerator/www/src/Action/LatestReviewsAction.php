<?php

namespace App\Action;

use App\Entity\ReviewEntity;
use App\Model\Wrappers\ReviewApiWrapper;
use App\Repository\ReviewRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ObjectRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class LatestReviewsAction extends AbstractAction
{
    /**
     * @var ReviewRepository $repo
     */
    private ObjectRepository $repo;

    public function __construct(EntityManager $em){

        $this->repo = $em->getRepository(ReviewEntity::class);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $reviews = $this->repo->findLatest();
        $wrapped = ReviewApiWrapper::wrapCollection($reviews);
        $response->getBody()->write(json_encode($wrapped));
        return $response;
    }
}