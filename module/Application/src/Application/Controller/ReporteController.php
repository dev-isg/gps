<?php
namespace Application\Controller;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\MovimientoForm;

class ReporteController extends AbstractActionController{
    
    public function movimientoAction(){
        $form=new MovimientoForm();
        $fechaini=$this->params()->fromPost('fechainicio');
        $fechafin=$this->params()->fromPost('fechafin');
        $request=$this->getRequest();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){
                         var_dump($fechaini);var_dump($fechafin);Exit; 
            }
        }
        return array('form'=>$form);
    }
    
    
}