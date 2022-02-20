<?php

namespace App\Action;

use App\Entity\StreamingPlatform;
use App\Model\Wrappers\ListResult;
use App\Repository\StreamingRespository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ObjectRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetPlatformsAction extends AbstractAction
{
    /**
     * @var StreamingRespository $repo
     */
    private ObjectRepository $repo;

    public function __construct(EntityManager $em){
        $this->repo = $em->getRepository(StreamingPlatform::class);
    }


    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $entities = $this->repo->findAll();
        $result = [];

        foreach($entities as $entity){
            $m = new \App\model\StreamingPlatform();
            $m->setId($entity->getId());
            $m->setName($entity->getName());
            $result[] = $m;
        }

        $r = new ListResult();
        $r->setCurrentPage(1);
        $r->setTotalResults(count($result));
        $r->setSearch($result);
        $response->getBody()->write(json_encode($r));
        return $response;
    }
}