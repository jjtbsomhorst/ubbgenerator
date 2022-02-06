<?php

use DI\ContainerBuilder;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Console\ConsoleRunner;

require_once __DIR__ . '/../vendor/autoload.php';
$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions(__DIR__ . '/container.php');
$container = $containerBuilder->build();
return ConsoleRunner::createHelperSet($container->get(EntityManager::class));
