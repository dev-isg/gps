<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Model\EmpresaCollection;
use Application\Model\VehiculoCollection;
use Application\Form\VehiculoForm;
use Mongo;
class VehiculoController extends AbstractActionController{
    
    
    public function agregarvehiculoAction() {
        
        $form = new VehiculoForm();
        
        $resultados = $this->getEmpresaMongoDb()->getListaCombo();
     //$f = new \MongoId($resultados['_id']);
//     //var_dump($resultados);exit;
     $com = array();
        foreach($resultados as $y){
            $com[$y['_id']] = $y['nombre'];
        }
    // var_dump($resultados);exit;
        $form->get('empresa_id')->setValueOptions($resultados);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $vehiculo = $this->getServiceLocator()->get('Application\Model\VehiculoCollection');
            $vehiculo->guardarVehiculo($datos);
            
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
        }
        return new ViewModel(array('form' => $form));
    }
    
    
       public function getEmpresaMongoDb() {
        if (!$this->empresaMongodb) {
            $sm = $this->getServiceLocator();
            $this->empresaMongodb = $sm->get('Application\Model\EmpresaCollection');
        }
        return $this->empresaMongodb;
    }
    
}
