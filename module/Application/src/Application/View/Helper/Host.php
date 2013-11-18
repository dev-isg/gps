<?php
namespace Application\View\Helper;

use \Zend\View\Helper;
use \Zend\Form\View\Helper\AbstractHelper;

class Host extends AbstractHelper
{

    public function __invoke($param)
    {
        $options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
        
        return $options->host->$param;
    }
}