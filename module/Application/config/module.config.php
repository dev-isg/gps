<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

return array(
    'router' => array(
        'routes' => array(
            'Index' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
            // The following is a route to simplify getting started creating
            // new controllers and actions without needing to create a new
            // module. Simply drop new controllers in, and you can access them
            // using the path /application/:controller/:action
            'application' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/application',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Application\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),
              'editarusuario' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/editar-usuario[/:id]',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action' => 'editarusuario'
                    )
                    
                )
            ),
              'editarempresa' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/editar-empresa[/:id]',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Empresa',
                        'action' => 'editarempresa'
                    )
                    
                )
            ),
            'admin' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/administrador',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Administrador',
                        'action' => 'admin'
                    )
                    
                )
            ),
             'logout' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/logout',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action' => 'logout'
                    )
                    
                )
            ),
            'editaradministrador' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/editar-administrador[/:id]',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Administrador',
                        'action' => 'editaradministrador'
                    )
                    
                )
            ),
              'editar-vehiculo' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/editar/vehiculo[/:id_empresa[/:id_vehiculo]]',///:id_empresa
                    'defaults' => array(
                        'controller' => 'Application\Controller\Vehiculo',
                        'action' => 'editarvehiculo'
                    )
                    
                )
            ),
             'eliminar-vehiculo' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/eliminar/vehiculo[/:id_usuario/:id_vehiculo/:id_empresa]',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Vehiculo',
                        'action' => 'eliminarvehiculo'
                    )
                    
                )
            ),
             'listarvehiculo' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/listar-vehiculo[/:id]',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Vehiculo',
                        'action' => 'listarvehiculo'
                    )
                    
                )
            ),
              'login' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/login',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action' => 'login'
                    )
                    
                )
            ),
            
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
    'translator' => array(
        'locale' => 'en_US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Application\Controller\Index' => 'Application\Controller\IndexController',
            'Application\Controller\Administrador' => 'Application\Controller\AdministradorController',
            'Application\Controller\Vehiculo' => 'Application\Controller\VehiculoController',
            'Application\Controller\Empresa' => 'Application\Controller\EmpresaController',
            'Application\Controller\Tramas' => 'Application\Controller\TramasController',
            'Application\Controller\Reporte' => 'Application\Controller\ReporteController',
             
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
     'strategies' => array(
            'ViewJsonStrategy',
        ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
);
