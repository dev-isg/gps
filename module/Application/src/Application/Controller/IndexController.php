<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Form\Registrousuario;
use Application\Form\Fieldset;
use Mongo;
use Application\Form\VehiculoForm;
use Application\Model\Vehiculo;
use PhlyMongo\Mongodb;
use Application\Model\Usuario;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoCollectionFactory;
use Application\Model\UsuarioCollection;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Zend\Session\SessionManager;
use Zend\Session\ManagerInterface;
use Zend\Session\Storage\ArrayStorage;
use Zend\Session\Storage\SessionStorage;
use Application\Model\SessionCollection;
use Application\Model\EmpresaCollection;
use Application\Model\VehiculoCollection;
use Application\Model\TramasCollection;
use Zend\View\Model\JsonModel;

//use Zend\Session\SaveHandler\MongoDB;
//use Zend\Session\SaveHandler\MongoDBOptions;

class IndexController extends AbstractActionController {

    protected $usuarioMongodb;
    protected $sessionMongodb;
    protected $empresaMongodb;
    protected $vehiculoMongodb;

    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
    }

    public function editarpassvehiculousuarioAction() {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        if (!$this->getUsuariosMongoDb()->isLoggedIn()) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
        }
        $dato = $this->getUsuariosMongoDb()->read();
        $id = $dato['_idrol'];
        if ($dato['rol'] == 'vehiculo') {
            if (!$id) {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/');
            }
            try {
                $vehiculo = $this->getVehiculoMongoDb()->getVehiculo($id);
            } catch (\Exception $ex) {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/');
            }
            $form = new VehiculoForm();
            $form->get('submit')->setValue('Editar');
            $request = $this->getRequest();
            if ($request->isPost()) {
                $datos = $this->request->getPost();
                $passanti = md5($datos['passantiguo']);
                if ($passanti == $vehiculo[0]['pass']) {
                    if ($datos['pass'] == $datos['pass2']) {
                        $vehiculo = new Vehiculo();
                        $form->setInputFilter($vehiculo->getInputFilter());
                        $form->setData($request->getPost());
                        if ($form->isValid()) {
                            $vehiculo->exchangeArray($form->getData());
                            $this->getUsuariosMongoDb()->editarPassUsuario($vehiculo, $dato['user_id']);
                            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/');
                        } else {
                            foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                                print_r($error->getMessages());
                                print_r($error->getName());
                            }
                        }
                    } else {
                        $mensaje = 'las Contraseñas no coinciden';
                        return new ViewModel(array('form' => $form, 'id' => $id, 'mensaje' => $mensaje,
                                    'hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'],
                                    'ruta' => $this->_options->host->ruta));
                    }
                } else {
                    $mensaje = 'pass antiguo no es verdadero';
                    return new ViewModel(array('form' => $form, 'id' => $id, 'mensaje' => $mensaje,
                                'hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'],
                                'ruta' => $this->_options->host->ruta));
                }
            }
        } else {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/');
        }

        $viewModel->setVariables(array('form' => $form, 'id' => $id, 'hidUserID' => $_SESSION['_idrol'],
            'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
        return $viewModel;
    }

    public function indexAction() {

        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        if (!$this->getUsuariosMongoDb()->isLoggedIn()) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
        }
        $dato = $this->getUsuariosMongoDb()->read();
        if ($dato['rol'] == 'administrador') {
            $id = $this->params()->fromQuery('id', 0);
            $resultados = $this->getEmpresaMongoDb()->getLista();
            if ($this->getRequest()->isPost()) {
                $consulta = $this->params()->fromPost('texto');
                $consultaVehiculo = $this->params()->fromPost('vehiculo');
                if (!empty($consulta)) {
                    $resultados = $this->getEmpresaMongoDb()->getLista($consulta);
                }
                if (!empty($consultaVehiculo)) {
                    $resultadosVehiculo = $this->getVehiculoMongoDb()->buscarVehiculos($consultaVehiculo);
                }
            }
            if ($id == !'') {
                $resultadosVehiculo = $this->getVehiculoMongoDb()->getVehiculos($id);
            }
        } elseif ($dato['rol'] == 'empresa') {
            $resultados = $this->getEmpresaMongoDb()->obtenerEmpresaCantidad($dato['_idrol']);
            if ($this->getRequest()->isPost()) {
                $consultaVehiculo = $this->params()->fromPost('vehiculo');
                $resultadosVehiculo = $this->getVehiculoMongoDb()->buscarVehiculos($consultaVehiculo, $dato['_idrol']);
            } else {
                $estado = $this->params()->fromQuery('estado', 0);
                $detalle = $this->params()->fromQuery('detalle', 0);
                if (!empty($estado)) {

                    $resultadosVehiculo = $this->getVehiculoMongoDb()->getVehiculosEstado($dato['_idrol'], $estado);
                } elseif (!empty($detalle)) {

                    $fechaActual = date("Y-m-d H:i:s");
                    $resultadosVehiculo = $this->getVehiculoMongoDb()->getVehiculoDetalle($detalle, $fechaActual);
                    //$view= new ViewModel();
                    //$view->setTerminal(true);
                    echo $resultadosVehiculo;
                    exit;
                } else {
                    $resultadosVehiculo = $this->getVehiculoMongoDb()->getVehiculos($dato['_idrol']);
                }
            }
        } else {
            $resultados = $this->getVehiculoMongoDb()->getVehiculo($dato['_idrol']);
        }

        $cantidadVehiculo = count($resultadosVehiculo);
        $cantidad = count($resultados);
        $viewModel->setVariables(array('valores' => $resultados, 'rol' => $_SESSION['rol'],
            'cantidad' => $cantidad, 'vehiculo' => $resultadosVehiculo,
            'cantidadVehiculo' => $cantidadVehiculo, 'hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));

        return $viewModel;
    }

    
    public function getvehiculosAction(){
        $idempresa = $this->params()->fromPost('id', '528d3ab3bf8eb1780c000046');//
        $resultados = $this->getVehiculoMongoDb()->getVehiculobyIdEmpresa($idempresa);
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);

        $auxresul="";
        $auxresul2="";
        foreach($resultados as $item){
            foreach($item as $key=>$value){
                    $auxresul.=$key.":"."\"$value\"".","; 
            }
            $pos=strrpos($auxresul,",");
            $cadena=substr($auxresul,0,$pos);
            $auxresul2.="{".$cadena."}";
            $auxresul="";

//            $subarr[]=$cadena;
            
        }
       
        echo json_encode(array('d'=>'{devices:['.$auxresul2.']}'));
        return $viewModel;
        
//        return new JsonModel(array(
//            'd' => array('devices'=>$resultados)
//        ));
    }

    public function getempresaAction() {
        $idempresa = $this->params()->fromPost('id', '528fb5c3bf8eb1d02100000b');
        $resultados = $this->getEmpresaMongoDb()->getEmpresabyId($idempresa);
        return new JsonModel($resultados);
    }
     public function getempresatotalesAction() {
        $idusuario = $this->params()->fromPost('id',0);
       $resultados = $this->getEmpresaMongoDb()->getLista();
        return new JsonModel($resultados);

    }
    
//    function json_encode_objs($item){   
//        if(!is_array($item) && !is_object($item)){   
//            return json_encode($item);   
//        }else{   
//            $pieces = array();   
//            foreach($item as $k=>$v){   
//                $pieces[] = "\"$k\":".json_encode_objs($v);   
//            }   
//            return '{'.implode(',',$pieces).'}';   
//        }   
//    }   
    

    public function loginAction() {
        if ($this->getUsuariosMongoDb()->isLoggedIn()) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/');
        }
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        $form = new Registrousuario();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $usuarios = new Usuario();
            $form->setInputFilter($usuarios->getInputFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $usuarios->exchangeArray($form->getData());
                $resultado = $this->getUsuariosMongoDb()->obtenerUsuarioLogin($usuarios);
                if (!empty($resultado)) {
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
                } else {
                    $mensaje = 'usuario ó pass incorrectos';
                    $viewModel->setVariables(array('form' => $form, 'mensaje' => $mensaje));
                    return $viewModel;
                }
            } else {
                foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                    
                }
            }
        }
        $viewModel->setVariables(array('form' => $form));
        return $viewModel;
    }

    public function eliminarusuarioAction() {
        $id = $this->params()->fromQuery('id');
        $this->getUsuariosMongoDb()->eliminarUsuario($id);
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
    }

    public function mapAction() {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        $viewModel->setVariables(array('hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
        return $viewModel;
    }

    public function iframemapAction() {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        $viewModel->setVariables(array('hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
        return $viewModel;
    }

    public function perfilAction() {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        $dato = $this->getUsuariosMongoDb()->read();
        if ($dato['rol'] == 'empresa') {
            $resultados = $this->getEmpresaMongoDb()->obtenerEmpresa($dato['_idrol']);
            if ($this->getRequest()->isPost()) {
                $resultados = $this->getEmpresaMongoDb()->obtenerEmpresa($dato['_idrol']);
            }
        } elseif ($dato['rol'] == 'vehiculo') {
            
        }
        $cantidad = count($resultados);

        $viewModel->setVariables(array('rol' => $_SESSION['rol'],'valores' => $resultados, 'cantidad' => $cantidad, 'hidUserID' => $_SESSION['_idrol'], 'nombre' => $_SESSION['nombre'], 'ruta' => $this->_options->host->ruta));
        return $viewModel;
    }

    public function agregarusuarioAction() {
        $form = new Registrousuario("form");
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $usuarios = new Usuario();
                $form->setInputFilter($usuarios->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $usuarios->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($usuarios);
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/agregarusuario?m=1');
            }
        }
        return new ViewModel(array('form' => $form));
    }

    public function editarusuarioAction() {
        $id = $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
        }
        try {
            $usuario = $this->getUsuariosMongoDb()->obtenerUsuario($id);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
        }
        $form = new Registrousuario();
        $form->get('login')->setValue($usuario['login']);
        $form->get('pass')->setValue($usuario['pass']);
        $form->get('_id')->setValue($usuario['_id']);
        $form->get('rol')->setValue($usuario['rol']);
        $form->get('submit')->setValue('Editar');
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $usuarios = new Usuario();
                $form->setInputFilter($usuarios->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $usuarios->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($usuarios, $id);
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/editar-usuario/' . $id . '?m=1');
            }
        }
        return new ViewModel(array('form' => $form, 'id' => $id, 'pass' => $usuario['pass']));
    }

    public function logoutAction() {

        $this->getUsuariosMongoDb()->logout();
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
    }

    public function getUsuariosMongoDb() {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');
        }
        return $this->usuarioMongodb;
    }

    public function getSessionMongoDb() {
        if (!$this->sessionMongodb) {
            $sm = $this->getServiceLocator();
            $this->sessionMongodb = $sm->get('Application\Model\SessionCollection');
        }
        return $this->sessionMongodb;
    }

    public function getVehiculoMongoDb() {
        if (!$this->vehiculoMongodb) {
            $sm = $this->getServiceLocator();
            $this->vehiculoMongodb = $sm->get('Application\Model\VehiculoCollection');
        }
        return $this->vehiculoMongodb;
    }

    public function getEmpresaMongoDb() {
        if (!$this->empresaMongodb) {
            $sm = $this->getServiceLocator();
            $this->empresaMongodb = $sm->get('Application\Model\EmpresaCollection');
        }
        return $this->empresaMongodb;
    }

    public function getTramaMongoDb() {
        if (!$this->tramaMongodb) {
            $sm = $this->getServiceLocator();
            $this->tramaMongodb = $sm->get('Application\Model\TramasCollection');
        }
        return $this->tramaMongodb;
    }

}

