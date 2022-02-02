<?php
namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use OpenApi\Generator;

class GenerateSwaggerAction extends AbstractAction{
    
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $openApi = Generator::scan(['/var/www/html/src/Action/HomeAction.php']);
        $response->withHeader('Content-Type','application/x-yaml');
        $response->getBody()->write($openApi->toYaml());
        return $response;
    }
}