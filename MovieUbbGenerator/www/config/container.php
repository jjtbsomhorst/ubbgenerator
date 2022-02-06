<?php

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use jjtbsomhorst\omdbapi\OmdbApiClient;
use Kerox\Tmdb\Tmdb;
use Kevinrob\GuzzleCache\CacheMiddleware;
use Kevinrob\GuzzleCache\Storage\Psr6CacheStorage;
use Kevinrob\GuzzleCache\Strategy\GreedyCacheStrategy;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Selective\BasePath\BasePathMiddleware;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    EntityManager::class=>function(){
        // Create a simple "default" Doctrine ORM configuration for Annotations
        $isDevMode = true;
        $proxyDir = null;
        $cache = null;
        $useSimpleAnnotationReader = false;
        $config = Setup::createAnnotationMetadataConfiguration(array(__DIR__ . "/src"), $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);
        $dbParams = array(
            'driver'   => 'pdo_mysql',
            'user'     => 'root',
            'password' => 'database',
            'dbname'   => 'app',
        );
        return EntityManager::create($dbParams, $config);
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
    OmdbApiClient::class => function (ContainerInterface $container) {

        $settings = $container->get('settings');

        $redis= new RedisAdapter(
            $container->get(RedisAdapter::class),
            "omdbapi",
            60
        );

        $client = new OmdbApiClient();
        $client->apiKey($settings['omdbapi']['key']);
        $client->cache($redis);
        $client->proxy('host.docker.internal',8888);
        return $client;
    },
    RedisAdapter::class => function(ContainerInterface $container){
        $redisClient = RedisAdapter::createConnection(
            "redis://".$container->get('settings')['redishost']
        );
        return $redisClient;
    },
    Tmdb::class => function(ContainerInterface $container){
        $tmdbkey = $container->get('settings')['tmdbapi']['key'];
        $redis= new RedisAdapter(
            $container->get(RedisAdapter::class),
            "tmdbapi",
            60
        );
        $props = [];
        $props['proxy'] = "host.docker.internal:8888";

        $stack = HandlerStack::create();
        $stack->push(
            new CacheMiddleware(
                new GreedyCacheStrategy(
                    new Psr6CacheStorage(
                        $this->cachePool),
                    1800,
                )
            )
            ,
            'cache'
        );
        $props['handler'] = $stack;


        return new Tmdb($tmdbkey,new Client($props));
    },

    Serializer::class => function(){
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        return new Serializer($normalizers, $encoders);
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