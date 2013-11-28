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
use Application\Form\AdministradorForm;
use Application\Form\Fieldset;
use Mongo;
use PhlyMongo\Mongodb;
use Application\Model\Usuario;
use Application\Model\Administrador;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoCollectionFactory;
use Application\Model\UsuarioCollection;
use Application\Model\AdministradorCollection;


class AdministradorController extends AbstractActionController {

    protected $administradorMongodb;
     protected $sessionMongodb;

    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
    }

    public function getAdministradorMongoDb() {
        if (!$this->administradorMongodb) {
            $sm = $this->getServiceLocator();
            $this->administradorMongodb = $sm->get('Application\Model\AdministradorCollection');
        }
        return $this->administradorMongodb;
    }

    public function indexAction() {
        $resultados = $this->getAdministradorMongoDb()->administradoresAll();
        $cantidad = count($resultados);
        return new ViewModel(array('valores' => $resultados, 'cantidad' => $cantidad));
    }
  public function adminAction() {

        $resultado=$this->getUsuariosMongoDb()->read();
        if ($resultado==!false) {
            return new ViewModel(array('rol'=>$_SESSION['rol']));
        } else {
            
            
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/login');
        }
    }
    public function eliminaradministradorAction() {
        $id = $this->params()->fromQuery('id');  
           $administrador = $this->getAdministradorMongoDb()->obtenerAdministrador($id); 
            $this->getUsuariosMongoDb()->eliminarUsuario($administrador['usuario_id']);
           $this->getAdministradorMongoDb()->eliminarAdministrador($id);
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
    }

    public function agregaradministradorAction() {
        $form = new AdministradorForm();
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];

            if ($pass1 == $pass2) {
                $administrador = new Administrador();
                $form->setInputFilter($administrador->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $administrador->exchangeArray($form->getData());
                    $id_administrador = $this->getUsuariosMongoDb()->agregarUsuario($administrador);
                    $this->getAdministradorMongoDb()->agregarAdministrador($administrador, $id_administrador);
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/agregaradministrador?m=1');
            }
        }
        return new ViewModel(array('form' => $form));
    }

     public function editarapassadministradorAction() {echo 'ss';exit;
       // $id = $this->params()->fromRoute('id', 0);

        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
        }
        try {
            $administrador = $this->getAdministradorMongoDb()->obtenerAdministrador($id);
            $administrador_usuario = $this->getUsuariosMongoDb()->obtenerUsuario($administrador['usuario_id']);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
        }

        $form = new AdministradorForm();
        $form->get('nombre')->setValue($administrador['nombre']);
        $form->get('usuario_id')->setValue($administrador['usuario_id']);
        $form->get('_id')->setValue((String) $administrador['_id']);
        $form->get('rol')->setValue($administrador_usuario['rol']);
        $form->get('login')->setValue($administrador_usuario['login']);
        $form->get('submit')->setValue('Editar');
        //    $form->bind($usuario);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
                $administrador = new Administrador();
                $form->setInputFilter($administrador->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $administrador->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($administrador, $datos['usuario_id'], 'editar');
                    $this->getAdministradorMongoDb()->agregarAdministrador($administrador, $datos['usuario_id'], $datos['_id'], 'editar');
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
        }
        return new ViewModel(array('form' => $form, 'id' => $id));
    } 
    
    public function editaradministradorAction() {
        $id = $this->params()->fromRoute('id', 0);

        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
        }
        try {
            $administrador = $this->getAdministradorMongoDb()->obtenerAdministrador($id);
            $administrador_usuario = $this->getUsuariosMongoDb()->obtenerUsuario($administrador['usuario_id']);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
        }

        $form = new AdministradorForm();
        $form->get('nombre')->setValue($administrador['nombre']);
        $form->get('usuario_id')->setValue($administrador['usuario_id']);
        $form->get('_id')->setValue((String) $administrador['_id']);
        $form->get('rol')->setValue($administrador_usuario['rol']);
        $form->get('login')->setValue($administrador_usuario['login']);
        $form->get('submit')->setValue('Editar');
        //    $form->bind($usuario);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
                $administrador = new Administrador();
                $form->setInputFilter($administrador->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $administrador->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($administrador, $datos['usuario_id'], 'editar');
                    $this->getAdministradorMongoDb()->agregarAdministrador($administrador, $datos['usuario_id'], $datos['_id'], 'editar');
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/administrador/index');
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
        }
        return new ViewModel(array('form' => $form, 'id' => $id));
    }

    public function getUsuariosMongoDb() {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');
        }
        return $this->usuarioMongodb;
    }

}

