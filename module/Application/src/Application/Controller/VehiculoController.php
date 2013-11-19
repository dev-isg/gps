<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use Application\Model\VehiculoCollection;
use Application\Form\VehiculoForm;

class VehiculoController extends AbstractActionController{
    
    
    public function agregarvehiculoAction() {
        
        $form = new VehiculoForm();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $vehiculo = $this->getServiceLocator()->get('Application\Model\VehiculoCollection');
            $vehiculo->guardarVehiculo($datos);
            
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
        }
        return new ViewModel(array('form' => $form));
    }
    
    
}
