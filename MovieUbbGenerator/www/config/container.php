<?php

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;
use Selective\BasePath\BasePathMiddleware;
use aharen\OMDbApi;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    App::class => function (ContainerInterface $container) {
        AppFactory::setContainer($container);

        return AppFactory::create();
    },
    Monolog\Logger::class => function(ContainerInterface $container){
        $settings = $container->get('settings');
        $log = new Logger($settings['logger']['name']);
        $log->pushHandler(new StreamHandler($settings['logger']['dir']."/api.log", Logger::WARNING));
    },
    OMDBApi::class => function (ContainerInterface $container) {

        $settings = $container->get('settings');
        return new OMDbAPI($settings['omdbapi']['key']);
    },

    ResponseFactoryInterface::class => function (ContainerInterface $container) {
        return $container->get(App::class)->getResponseFactory();
    },

    ErrorMiddleware::class => function (ContainerInterface $container) {
        $app = $container->get(App::class);
        $settings = $container->get('settings')['error'];

        return new ErrorMiddleware(
            $app->getCallableResolver(),
            $app->getResponseFactory(),
            (bool)$settings['display_error_details'],
            (bool)$settings['log_errors'],
            (bool)$settings['log_error_details']
        );
    },
    BasePathMiddleware::class => function (ContainerInterface $container) {
        return new BasePathMiddleware($container->get(App::class));
    },

];