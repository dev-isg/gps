<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\Fieldset;
use Application\Model\TramasCollection;

use Zend\View\Model\JsonModel;


class TramasController extends AbstractActionController{
    protected $tramaMongodb;
    

    public function homeAction(){
        $seguimiento=$this->getTramaMongoDb()->getSeguimientoVehiculos("528d3ab3bf8eb1780c000046");
        var_dump($seguimiento);Exit;
        return array();
    }
    public function seguimientoAction(){
        $idvehiculo='528e9378bf8eb1140e00004e';
        $fechaactual='2013-11-21 18:47:27';
        $seguimiento=$this->getTramaMongoDb()->getSeguimientoVehiculo($idvehiculo,$fechaactual);
        $view= new ViewModel();
        $view->setTerminal(true);
        echo $seguimiento;
        return $view;
    }
    
    public function reproduccionAction(){
        $inicio=$this->params()->fromPost('fechinicio','2013-11-21 18:47:27'); 
        $fin=$this->params()->fromPost('fechfin','2013-11-21 18:47:43'); 
        $reproduccion=$this->getTramaMongoDb()->getReproduccionVehiculo($inicio,$fin);
        $view= new ViewModel();
        $view->setTerminal(true);
        echo $reproduccion;
        return $view;
    }
    
        public function getTramaMongoDb() {
        if (!$this->tramaMongodb) {
            $sm = $this->getServiceLocator();
            $this->tramaMongodb = $sm->get('Application\Model\TramasCollection');
        }
        return $this->tramaMongodb;
    }
}