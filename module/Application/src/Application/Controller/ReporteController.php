<?php
namespace Application\Controller;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\MovimientoForm;
use Application\Form\ParadaForm;
use Application\Model\UsuarioCollection;

class ReporteController extends AbstractActionController{
    protected $tramaMongodb;
    protected $vehiculoMongodb;
      protected $usuarioMongodb;
    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
    }

    public function movimientoAction(){
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        if (!$this->getUsuariosMongoDb()->isLoggedIn()) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
        }
        $form=new MovimientoForm();
        $fechaini=$this->params()->fromPost('fechainicio');
        $fechafin=$this->params()->fromPost('fechafin');
        $request=$this->getRequest();
        if($request->isPost()){
            $form->setData($request->getPost());
            if($form->isValid()){

                $idempresa="52976e5fbf8eb1c406000010";//"528d3ab3bf8eb1780c000046";//
                   $tramas=$this->getTramaMongoDb()->buscarMovimiento($fechaini, $fechafin,$idempresa);         

//                $datoss = $this->getUsuariosMongoDb()->read();
//                  $idempresa=$datoss['_idrol'];//
//              //   var_dump($idempresa);exit;
//              //  $tramas=$this->getTramaMongoDb()->insertaTramas();
//               $tramas=$this->getTramaMongoDb()->buscarMovimiento($fechaini, $fechafin,$idempresa);         

            }
        }
        $viewModel->setVariables(array('rol' => $_SESSION['rol'],'form'=>$form,'tramas'=>$tramas,'hidUserID' => $_SESSION['_idrol'],
            'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
         return $viewModel; 
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
       // return $viewModel;  
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
    public function getUsuariosMongoDb() {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');
        }
        return $this->usuarioMongodb;
    }
    public function getVehiculoMongoDb() {
        if (!$this->vehiculoMongodb) {
            $sm = $this->getServiceLocator();
            $this->vehiculoMongodb = $sm->get('Application\Model\VehiculoCollection');
        }
        return $this->vehiculoMongodb;
    }
    
    
}