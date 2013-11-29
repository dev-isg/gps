<?php
namespace Application\Controller;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\MovimientoForm;
use Application\Form\ParadaForm;

class ReporteController extends AbstractActionController{
    protected $tramaMongodb;
    protected $vehiculoMongodb;
    
    public function movimientoAction(){
        $form=new MovimientoForm();
        $fechaini=$this->params()->fromPost('fechainicio');
        $fechafin=$this->params()->fromPost('fechafin');
        $request=$this->getRequest();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){
                $idempresa="52976e5fbf8eb1c406000010";//"528d3ab3bf8eb1780c000046";//
                   $tramas=$this->getTramaMongoDb()->buscarMovimiento($fechaini, $fechafin,$idempresa);         
            }
        }
        return array('form'=>$form,'tramas'=>$tramas);
    }
    
    public function kilometrajeAction(){
        $form=new MovimientoForm();
        $conductores=$this->getVehiculoMongoDb()->getConductor($idempresa="528d3ab3bf8eb1780c000046");
        $form->get('usario_vehiculo')->setValueOptions($conductores);

        $fechaini=$this->params()->fromPost('fechainicio');
        $fechafin=$this->params()->fromPost('fechafin');
        $idvehiculo=$this->params()->fromPost('usario_vehiculo');
        $request=$this->getRequest();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){
               
               $tramas=$this->getTramaMongoDb()->buscarMovimientoVehic($fechaini, $fechafin,$idvehiculo);         
            }
        }
        return array('form'=>$form,'tramas'=>$tramas);
        
    }
    
    public function paradaAction(){
         $form=new ParadaForm();
         $conductores=$this->getVehiculoMongoDb()->getConductor($idempresa="528d3ab3bf8eb1780c000046");
          $form->get('usario_vehiculo')->setValueOptions($conductores);
                $fechaini=$this->params()->fromPost('fechainicio');
        $fechafin=$this->params()->fromPost('fechafin');
        $idvehiculo=$this->params()->fromPost('usario_vehiculo');
        
        $request=$this->getRequest();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){
               
               $tramas=$this->getTramaMongoDb()->getParada($fechaini, $fechafin,$idvehiculo);         
            }
        }
        return array('form'=>$form,'tramas'=>$tramas);
    }
    
   public function getTramaMongoDb() {
        if (!$this->tramaMongodb) {
            $sm = $this->getServiceLocator();
            $this->tramaMongodb = $sm->get('Application\Model\TramasCollection');
        }
        return $this->tramaMongodb;
    }
   
    public function getVehiculoMongoDb() {
        if (!$this->vehiculoMongodb) {
            $sm = $this->getServiceLocator();
            $this->vehiculoMongodb = $sm->get('Application\Model\VehiculoCollection');
        }
        return $this->vehiculoMongodb;
    }
    
    
}