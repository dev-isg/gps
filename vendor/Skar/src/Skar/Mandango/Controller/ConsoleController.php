<?php
namespace Skar\Mandango\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Mandango\Mondator\Mondator;
use Mandango\Extension\Core as MandangoCore;

/**
 * Class ConsoleController
 *
 * @license BSD-3-Clause
 * @link    https://github.com/skar/Mandango
 * @package Skar\Mandango
 * @author  Skar <sskarr@gmail.com>
 */
class ConsoleController extends AbstractActionController {
    public function mondatorProcessAction() {
        // Config
        $config = $this->getServiceLocator()->get('Config');
        $configMandango = $config['skar']['mandango'];

        // Start Mondator
        $mondator = new Mondator();

        // Assign the config classes
        if (is_array($configMandango['config_classes'])) {
            $mondator->setConfigClasses($configMandango['config_classes']);
        } else {
            $mondator->setConfigClasses($config[$configMandango['config_classes']]);
        }

        // Assign extensions
        $mondator->setExtensions(array(
            new MandangoCore(array(
                'metadata_factory_class'  => $configMandango['metadata_factory_class'],
                'metadata_factory_output' => $configMandango['metadata_factory_output'],
                'default_output'          => $configMandango['default_output'],
            )),
        ));

        // Process
        $mondator->process();
    }
}
