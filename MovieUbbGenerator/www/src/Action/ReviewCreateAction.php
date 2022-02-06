<?php

namespace App\Action;

use App\Model\Wrappers\ReviewApiWrapper;
use App\Repository\ReviewRepository;
use App\Validators\ReviewValidator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Selective\Validation\Exception\ValidationException;
use Slim\Exception\HttpBadRequestException;

class ReviewCreateAction extends AbstractAction
{
    private ReviewRepository $repo;
    public function __construct(ReviewRepository $repo){
        $this->repo = $repo;
    }


    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $data = $request->getParsedBody();
        try{
            ReviewValidator::validate($data);
            $review = ReviewApiWrapper::wrap($data);
            $result = $this->repo->store($review);
            $response->getBody()->write(json_encode($result));
        }catch(ValidationException $e){
            $errorBody = [];
            $errorBody['error'] = 'Invalid data provided';
            $errorBody['details'] = [];
            foreach($e->getValidationResult()->getErrors() as $error){
                $errorBody['details'][] = sprintf("Field %s: %s",$error->getField(),$error->getMessage());
            }
            $response->withStatus(400)->getBody()->write(json_encode($errorBody));
        }
        return $response;
    }
}