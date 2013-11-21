<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\Fieldset;
use Application\Model\TramasCollection;


class TramasController extends AbstractActionController{
    protected $tramaMongodb;
    

    
    public function seguimientoAction(){
        $idvehiculo='528e1f03bf8eb1140e000003';
        $seguimiento=$this->getTramaMongoDb()->getSeguimientoVehiculo($idvehiculo);
        var_dump($seguimiento);Exit;
        return array();
    }
    
        public function getTramaMongoDb() {
        if (!$this->tramaMongodb) {
            $sm = $this->getServiceLocator();
            $this->tramaMongodb = $sm->get('Application\Model\TramasCollection');
        }
        return $this->tramaMongodb;
    }
}