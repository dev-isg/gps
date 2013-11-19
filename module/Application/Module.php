<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoDbFactory;

use Application\Model\UsuarioCollection;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
    

    public function getServiceConfig() {
      
        return array('factories' => array(
//                'Application\Model\UsuarioCollection' => function($services) {
//                    $tableGateway = $services->get('MyMongo');
//                    $table = new UsuarioCollection($tableGateway);
//                    return $table;
//                },
//                'MyMongo' => function ($services) {
//                    $config = $services->get('config');
//                    $config = $config['mongo'];
//                    $factory = new MongoConnectionFactory($config['server'], $config['server_options']);
//                    return $factory->createService($services);
//                }
            'Application\Model\UsuarioCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('usuario','MyMongoDB' );
                    return new UsuarioCollection($mycollection->createService($services));
                   
                },
             'MyMongoDB' => function ($services) {
                    $config = $services->get('config');
                    $config = $config['mongo'];
                    $mongodb = new MongoDbFactory($config['db'], 'MyMongo');
                    return $mongodb->createService($services);
                },
             'MyMongo' =>  function ($services) {
                    $config = $services->get('config');
                    $config = $config['mongo'];
                    $factory = new MongoConnectionFactory($config['server'], $config['server_options']);
                    return $factory->createService($services);
                }
                //'PhlyMongo\MongoConnectionFactory'
                ));
    }


    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
}
