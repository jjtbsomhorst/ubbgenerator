<?php

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * @OA\Info(title="Home", version="0.1")
 */
final class HomeAction extends AbstractAction
{
    /**
     * @OA\Get(
     *     path="/",
     *     @OA\Response(response="200", description="Get nothing, yet")
     * )
     */
    public function __invoke(
        ServerRequestInterface $request, 
        ResponseInterface $response, array $args
    ): ResponseInterface {
        $response->getBody()->write(json_encode(['success' => true]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}