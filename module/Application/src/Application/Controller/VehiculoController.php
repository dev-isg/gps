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
        $com = array();
        for($i=0;$i<count($resultados);$i++){
        $com= array((String) $resultados[$i]['_id'] => $resultados[$i]['nombre']);
                 $i++; }
        $form->get('empresa_id')->setValueOptions($com);
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
