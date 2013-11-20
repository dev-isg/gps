<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Model\EmpresaCollection;
use Application\Model\VehiculoCollection;
use Application\Form\VehiculoForm;
use Mongo;
class VehiculoController extends AbstractActionController{
    protected $vehiculoMongodb;
    protected $empresaMongodb;
    
    public function indexAction() {
        $resultados = $this->getVehiculoMongoDb()->findAll();
        $cantidad = count($resultados);
        return new ViewModel(array('valores' => $resultados, 'cantidad' => $cantidad));
    }
    
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
            
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/vehiculo/index');
        }
        return new ViewModel(array('form' => $form));
    }
    
    public function editarvehiculoAction(){
        $id = $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/vehiculo/index');
        }
        try {
            $vehiculo = $this->getVehiculoMongoDb()->getVehiculo($id);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/vehiculo/index');
        }
        $form = new Registrousuario();
        $form->get('login')->setValue($vehiculo['login']);
        $form->get('pass')->setValue($vehiculo['pass']);
        $form->get('_id')->setValue($vehiculo['_id']);
        $form->get('rol')->setValue($vehiculo['rol']);
        // $form->bind($usuario);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $usuarios = new Usuario();
            $form->setInputFilter($usuarios->getInputFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $usuarios->exchangeArray($form->getData());
                $this->getUsuariosMongoDb()->agregarUsuario($usuarios, $id);
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
            }
        }
        return new ViewModel(array('form' => $form, 'id' => $id));
    }
    
    
       public function getEmpresaMongoDb() {
        if (!$this->empresaMongodb) {
            $sm = $this->getServiceLocator();
            $this->empresaMongodb = $sm->get('Application\Model\EmpresaCollection');
        }
        return $this->empresaMongodb;
    }
    
        public function getVehiculoMongoDb() {
        if (!$this->vehiculoMongodb) {
            $sm = $this->getServiceLocator();
            $this->vehiculoMongodb = $sm->get('Application\Model\VehiculoCollection');
        }
        return $this->vehiculoMongodb;
    }
    
}
