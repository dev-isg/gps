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
use Application\Model\VehiculoCollection;
use Application\Model\EmpresaCollection;
use Application\Model\TramasCollection;
use Application\Model\AdministradorCollection;
use Zend\Session\SessionManager;
use Zend\Session\Container;

class Module
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $serviceManager      = $e->getApplication()->getServiceManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
        $this->bootstrapSession($e);
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }
    
        public function bootstrapSession($e)
            {
                $session = $e->getApplication()
                             ->getServiceManager()
                             ->get('Zend\Session\SessionManager');
                $session->start();

                $container = new Container('initialized');
                if (!isset($container->init)) {
                     $session->regenerateId(true);
                     $container->init = 1;
                }
            }
            
    public function getServiceConfig() {
      
        return array('factories' => array(
            'Zend\Session\SessionManager' => function ($sm) {
                    $config = $sm->get('config');
                    if (isset($config['session'])) {
                        $session = $config['session'];

                        $sessionConfig = null;
                        if (isset($session['config'])) {
                            $class = isset($session['config']['class'])  ? $session['config']['class'] : 'Zend\Session\Config\SessionConfig';
                            $options = isset($session['config']['options']) ? $session['config']['options'] : array();
                            $sessionConfig = new $class();
                            $sessionConfig->setOptions($options);
                        }

                        $sessionStorage = null;
                        if (isset($session['storage'])) {
                            $class = $session['storage'];
                            $sessionStorage = new $class();
                        }

                        $sessionSaveHandler = null;
                        if (isset($session['save_handler'])) {
                            // class should be fetched from service manager since it will require constructor arguments
                            $sessionSaveHandler = $sm->get($session['save_handler']);
                        }

                        $sessionManager = new SessionManager($sessionConfig, $sessionStorage, $sessionSaveHandler);

                        if (isset($session['validator'])) {
                            $chain = $sessionManager->getValidatorChain();
                            foreach ($session['validator'] as $validator) {
                                $validator = new $validator();
                                $chain->attach('session.validate', array($validator, 'isValid'));

                            }
                        }
                    } else {
                        $sessionManager = new SessionManager();
                    }
                    Container::setDefaultManager($sessionManager);
                    return $sessionManager;
                },

            'Application\Model\TramasCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('tramas','MyMongoDB' );
                    return new TramasCollection($mycollection->createService($services));
                   
                },
            'Application\Model\UsuarioCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('usuario','MyMongoDB' );
                    return new UsuarioCollection($mycollection->createService($services));
                   
                },
             'Application\Model\VehiculoCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('vehiculo','MyMongoDB' );
                    return new VehiculoCollection($mycollection->createService($services));
                   
                },
                'Application\Model\EmpresaCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('empresa','MyMongoDB' );
                    return new EmpresaCollection($mycollection->createService($services));
                   
                },
               'Application\Model\AdministradorCollection' => function($services) {
                    $mycollection = new MongoCollectionFactory('administrador','MyMongoDB' );
                    return new AdministradorCollection($mycollection->createService($services));
                   
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
                },
             'mail.transport' => function ($sm) {
                $config = $sm->get('config'); 
                $transport = new \Zend\Mail\Transport\Smtp();   
                $transport->setOptions(new \Zend\Mail\Transport\SmtpOptions($config['mail']['transport']['options']));
                return $transport;
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
