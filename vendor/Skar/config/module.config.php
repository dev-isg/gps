<?php
namespace Skar\Mandango;

return array(
    'controllers' => array(
        'invokables' => array(
            'Skar\Mandango\Console' => 'Skar\Mandango\Controller\ConsoleController',
        ),
    ),

    'console' => array(
        'router' => array(
            'routes' => array(
                'skar_mandango_mondator_process' => array(
                    'options' => array(
                        'route'    => 'mandango mondator process',
                        'defaults' => array(
                            'controller' => 'Skar\Mandango\Console',
                            'action'     => 'mondator-process',
                        ),
                    ),
                ),
            ),
        ),
    ),
);
