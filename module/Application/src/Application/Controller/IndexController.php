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
use PhlyMongo\Mongodb;
use Application\Model\Usuario;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoCollectionFactory;
use Application\Model\UsuarioCollection;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as AuthAdapter;
use Zend\Session\SessionManager;
use Zend\Session\Storage\ArrayStorage;

//use Zend\Session\SaveHandler\MongoDB;
//use Zend\Session\SaveHandler\MongoDBOptions;

class IndexController extends AbstractActionController {

    protected $usuarioMongodb;
    protected $vehiculoMongodb;
    
    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
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

    public function indexAction() {
        
        $idempresa = $this->params()->fromRoute('id', 0);
        $resultados = $this->getVehiculoMongoDb()->getVehiculos($idempresa);
       // $S=new SessionManager();
       // $storage = new SessionManager();
       // $cc =$S->getStorage()->fromArray($array);
       // var_dump($storage->getStorage());exit;
       // var_dump($storage->fromArray($populateStorage)->_id);exit;
        //  $resultados = $this->getUsuariosMongoDb()->findAll();
        // $cantidad = count($resultados);
        //echo json_encode($resultados);exit;
        return new ViewModel(array('vehiculos'=>$resultados));
    }

    public function loginAction() {
        $form = new Registrousuario();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $usuarios = new Usuario();
            $form->setInputFilter($usuarios->getInputFilter());
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $usuarios->exchangeArray($form->getData());
                $datosLogin = $this->getUsuariosMongoDb()->obtenerUsuarioLogin($usuarios);
                $populateStorage = array('rol' => $datosLogin['rol'], 'login' => $datosLogin['login'],'_id'=>(String)$datosLogin['_id']);
                $storage = new ArrayStorage($populateStorage);
                $manager = new SessionManager();
                
                $manager->setStorage($storage);
               $manager->start();  
                //$storage->read()->in_id;
      
                // $stors = $this->getServiceLocator('Zend\Session\SessionManager');
//           var_dump($storage->read()->va_imagen);exit;
              //   $id = $stors->read()->_id;
               //  var_dump($stors->);exit;
//                exit;
//                    $mongo = new \Mongo();
//                    $options = new MongoDBOptions(array(
//                        'database' => $this->_options->mongo->db,
//                     'collection' =>'usuario',));
//                    $saveHandler = new MongoDB($mongo, $options);
//                    $manager = new SessionManager();
//                    var_dump($manager);exit;
//                    $manager->setSaveHandler($saveHandler);

                if ($manager->sessionExists() == true) {
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
                } else {
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/login');
                }
            } else {
                foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                    //print_r($error->getMessages());
                }
            }
        }
        return new ViewModel(array('form' => $form));
    }

    public function eliminarusuarioAction() {
        $id = $this->params()->fromQuery('id');
        $this->getUsuariosMongoDb()->eliminarUsuario($id);
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/index/index');
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
        //    $form->bind($usuario);
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

    public function mongoConect() {
        $imagen = $this->_options->mongo->server;
        $imagen2 = $this->_options->mongo->db;
        $m = new Mongo($imagen);
        $db = $m->$imagen2;
        return $db;
    }

}

