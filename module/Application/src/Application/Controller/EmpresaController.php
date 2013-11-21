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
use Application\Form\EmpresaForm;
use Application\Form\Fieldset;
use Mongo;
use Application\Model\Empresa;
use PhlyMongo\Mongodb;
use Application\Model\Usuario;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoCollectionFactory;
use Application\Model\EmpresaCollection;
use Application\Model\UsuarioCollection;

class EmpresaController extends AbstractActionController {

    protected $empresaMongodb;

    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
    }

    public function getEmpresaMongoDb() {
        if (!$this->empresaMongodb) {
            $sm = $this->getServiceLocator();
            $this->empresaMongodb = $sm->get('Application\Model\EmpresaCollection');
        }
        return $this->empresaMongodb;
    }

    public function getUsuariosMongoDb() {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');
        }
        return $this->usuarioMongodb;
    }

    public function indexAction() {
        
        $consulta = $this->params()->fromPost('texto');
        $resultados = $this->getEmpresaMongoDb()->getListaCombo();
        if ($this->getRequest()->isPost()) {
       $resultados = $this->getEmpresaMongoDb()->getListaCombo($consulta);}
        $cantidad = count($resultados);
        //echo json_encode($resultados);exit;
        return new ViewModel(array('valores' => $resultados, 'cantidad' => $cantidad));
    }

    public function agregarempresaAction() {
        $form = new EmpresaForm("form");
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $empresa = new Empresa();
                $form->setInputFilter($empresa->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {

                    $empresa->exchangeArray($form->getData());
                    $id_usuario = $this->getUsuariosMongoDb()->agregarUsuario($empresa);
                    //  var_dump($id_usuario);exit;
                    $this->getEmpresaMongoDb()->agregarEmpresa($empresa, $id_usuario);
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/index');
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/agregarempresa?m=1');
            }
        }
        return new ViewModel(array('form' => $form));
    }

    public function editarempresaAction() {
        $id = $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/index');
        }
        try {
            $empresa = $this->getEmpresaMongoDb()->obtenerEmpresa($id);
            $empresa_usuario = $this->getUsuariosMongoDb()->obtenerUsuario($empresa['usuario_id']);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/index');
        }
        $form = new EmpresaForm();
        $form->get('descripcion')->setValue($empresa['descripcion']);
        $form->get('nombre')->setValue($empresa['nombre']);
        $form->get('ruc')->setValue($empresa['ruc']);
        $form->get('direccion')->setValue($empresa['direccion']);
        $form->get('usuario_id')->setValue($empresa['usuario_id']);
        $form->get('_id')->setValue((String) $empresa['_id']);
        $form->get('login')->setValue($empresa_usuario['login']);
        $form->get('submit')->setValue('Editar');

        // $form->bind($empresa);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $empresa = new Empresa();
                $form->setInputFilter($empresa->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $empresa->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($empresa, 'editar');
                    $this->getEmpresaMongoDb()->agregarEmpresa($empresa, $datos['_id'], 'editar');
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/index');
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/editar-empresa/' . $id . '?m=1');
            }
        }
        return new ViewModel(array('form' => $form, 'id' => $id, 'pass' => $empresa_usuario['pass']));
    }

}

