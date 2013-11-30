<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\MovimientoForm;
use Application\Form\ParadaForm;
use Application\Model\UsuarioCollection;
use Application\Model\EmpresaCollection;
use Zend\Session\Container;

class ReporteController extends AbstractActionController {

    protected $tramaMongodb;
    protected $vehiculoMongodb;
    protected $usuarioMongodb;

    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');

    }
/**
 * JSON EMPRESA
 * @return json
 */
    public function jsonempresaAction(){
           $empresas = $this->getEmpresaMongoDb()->getListaCombo();
            $medi = array();
            foreach ($empresas as $yes) {
                $medi[(String) $yes['_id']] = $yes['nombre'];
            }
            
            return new \Zend\View\Model\JsonModel($medi);
    }
    
    /**
 * JSON VEHICULO
 * @return json
 */
    public function jsonvehiculoAction(){
            //id empresas:
            //528d3ab3bf8eb1780c000046
            //$_SESSION['_idrol'] es el id del rol, ejmp: si esta como empresa carga id empresa
           $conductores = $this->getVehiculoMongoDb()->getConductor($_SESSION['_idrol']);//"528d3ab3bf8eb1780c000046"
            return new \Zend\View\Model\JsonModel($conductores);
    }
    
    public function getEmpresaMongoDb() {
        if (!$this->empresaMongodb) {
            $sm = $this->getServiceLocator();
            $this->empresaMongodb = $sm->get('Application\Model\EmpresaCollection');
        }
        return $this->empresaMongodb;
    }


    public function movimientoAction() {

//        $seguimiento=$this->getTramaMongoDb()->insertaTramas("528d3ab3bf8eb1780c000046");
//        var_dump($seguimiento);Exit;


        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        if (!$this->getUsuariosMongoDb()->isLoggedIn()) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
        }
        $form = new MovimientoForm();
        $dato = $this->getUsuariosMongoDb()->read();
        if ($dato['rol'] == 'administrador') {
            $empresas = $this->getEmpresaMongoDb()->getListaCombo();
            $medi = array();
            foreach ($empresas as $yes) {
                $medi[(String) $yes['_id']] = $yes['nombre'];
            }
            $form->get('usario_vehiculo')->setValueOptions($medi);
        }
        $fechaini = $this->params()->fromPost('fechainicio');
        $fechafin = $this->params()->fromPost('fechafin');
        $request = $this->getRequest();
        $movimiento_session = new Container('movimiento');
        if ($request->isPost()) {
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $datos = $this->request->getPost();
                if ($dato['rol'] == 'administrador') {
                    $idempresa = $datos['usario_vehiculo'];
                }elseif($dato['rol'] == 'empresa')
                { $idempresa = $dato['_idrol'];}
               else{$idempresa = $dato['_idrol'];}
                $tramas = $this->getTramaMongoDb()->buscarMovimiento($fechaini, $fechafin, $idempresa);
                $movimiento_session->movimiento = $tramas;
            }
        }
        $viewModel->setVariables(array('rol' => $_SESSION['rol'], 'form' => $form, 'tramas' => $tramas, 'hidUserID' => $_SESSION['_idrol'],
            'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
        return $viewModel;
    }
    public function paradaAction() {
        $form = new ParadaForm();
        $datos = $this->getUsuariosMongoDb()->read();
                if ($datos['rol'] == 'administrador') {
            $empresas = $this->getEmpresaMongoDb()->getListaCombo();
            $medi = array();
            foreach ($empresas as $yes) {
                $medi[(String) $yes['_id']] = $yes['nombre'];
            }
            $form->get('usario_empresa')->setValueOptions($medi);
        }
        //$idempresa=$datoss['_idrol'];
        //="528d3ab3bf8eb1780c000046"
        $conductores = $this->getVehiculoMongoDb()->getConductor($datos['_idrol']);
      if ($datos['rol'] == 'administrador' or $datos['rol'] == 'empresa') {
        $form->get('usario_vehiculo')->setValueOptions($conductores);}
        $fechaini = $this->params()->fromPost('fechainicio');
        $fechafin = $this->params()->fromPost('fechafin');
        $idvehiculo = $this->params()->fromPost('usario_vehiculo');
        $request = $this->getRequest();
        $parada_session = new Container('parada');
        if ($request->isPost()){
            $form->setData($request->getPost());
            if ($form->isValid()) {
                
                $tramas = $this->getTramaMongoDb()->getParada($fechaini, $fechafin, $idvehiculo);
                $parada_session->parada = $tramas;               
            }
        }
        return array('form' => $form, 'tramas' => $tramas,'hidUserID' => $_SESSION['_idrol'],
            'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta,'rol' => $_SESSION['rol']);
    }

    public function excelmovimientoAction() {
        $view = new ViewModel();
        $view->setTerminal(true);
        $movimiento_session = new Container('movimiento');
        if ($movimiento_session->movimiento) {
            $trama = $movimiento_session->movimiento;
        }
        $view->setVariables(array('tramas' => $trama));
        return $view;
    }


    public function kilometrajeAction() {
        $form = new MovimientoForm();
        $conductores = $this->getVehiculoMongoDb()->getConductor($_SESSION['_idrol']);
        $form->get('usario_vehiculo')->setValueOptions($conductores);
        $fechaini = $this->params()->fromPost('fechainicio');
        $fechafin = $this->params()->fromPost('fechafin');
        $idvehiculo = $this->params()->fromPost('usario_vehiculo', "528e9378bf8eb1140e00004e");
        $request = $this->getRequest();
        $kilometraje_session = new Container('kilometraje');

        if ($request->isPost()) {
            $form->setData($request->getPost());
            if ($form->isValid()) {

                $tramas = $this->getTramaMongoDb()->buscarMovimientoVehic($fechaini, $fechafin, $idvehiculo);
                $kilometraje_session->kilometraje = $tramas;
            }
        }

        return array('form' => $form, 'tramas' => $tramas);
    }

    public function excelkilometrajeAction() {
        $view = new ViewModel();
        $view->setTerminal(true);
        $kilometraje_session = new Container('kilometraje');
        if ($kilometraje_session->kilometraje) {
            $trama = $kilometraje_session->kilometraje;
        }
        $view->setVariables(array('tramas' => $trama));
        return $view;
    }


    

    public function excelparadaAction() {
         $parada_session = new Container('parada');
        $view = new ViewModel();
        $view->setTerminal(true);
       
        if ($parada_session->parada) {
            $trama = $parada_session->parada;
        }
        $view->setVariables(array('tramas' => $trama));
        return $view;
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