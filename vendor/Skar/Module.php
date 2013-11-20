<?php
namespace Skar\Mandango;

use Zend\ModuleManager\Feature;
use ZfcBase\Module\AbstractModule;
use Mandango\Cache\FilesystemCache;
use Mandango\Mandango;
use Mandango\Connection;

/**
 * Class Module
 *
 * @license BSD-3-Clause
 * @link    https://github.com/skar/Mandango
 * @package Skar\Mandango
 * @author  Skar <sskarr@gmail.com>
 */
class Module extends AbstractModule implements Feature\ServiceProviderInterface {
    public function getDir() {
        return __DIR__;
    }

    public function getNamespace() {
        return __NAMESPACE__;
    }

    /**
     * Return an array for passing to Zend\Loader\AutoloaderFactory.
     *
     * @return array
     */
    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,

                    // TODO: HARDCODE!!!
                    'Model' => 'data/mandango/Model',
                ),
            ),
        );
    }


    /**
     * Expected to return \Zend\ServiceManager\Config object or array to
     * seed such an object.
     *
     * @return array|\Zend\ServiceManager\Config
     */
    public function getServiceConfig()
    {
        return [
            'factories' => [
                'Skar\Mandango\FilesystemCache' => function($sm) {
                    return new FilesystemCache('data/cache/mandango');
                },
                'mandango' => function($sm) {
                    // Config
                    $config = $sm->get('Config');
                    $configMandango = $config['skar']['mandango'];

                    // Metadata factory
                    $metadataFactory = new $configMandango['metadata_factory_class']();

                    // Set caching
                    $cache = $sm->get($configMandango['cache']);

                    // Init Mandango
                    $mandango = new Mandango($metadataFactory, $cache);

                    // Set connections
                    $connections = array();
                    foreach ($configMandango['connections'] as $name => $connection) {
                        $connections[$name] = new Connection($connection['server'], $connection['database']);
                    }
                    $mandango->setConnections($connections);

                    // Set default connection
                    $mandango->setDefaultConnectionName($configMandango['default_connection']);

                    return $mandango;
                },
            ],
        ];
    }
}
