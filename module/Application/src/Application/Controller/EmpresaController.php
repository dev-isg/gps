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
use Zend\Mail\Message;

class EmpresaController extends AbstractActionController {

    protected $empresaMongodb;

    public function __construct() {
        $this->_options = new \Zend\Config\Config(include APPLICATION_PATH . '/config/autoload/global.php');
    }

    public function indexAction() {

        $consulta = $this->params()->fromPost('texto');
        $resultados = $this->getEmpresaMongoDb()->getListaCombo();
        if ($this->getRequest()->isPost()) {
            $resultados = $this->getEmpresaMongoDb()->getListaCombo($consulta);
        }
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
                    $this->getEmpresaMongoDb()->agregarEmpresa($empresa, $id_usuario);
                    if ($datos['enviar'] == 'si') {
                        $this->correo($empresa);
                    }
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
        $form->get('email')->setValue($empresa['email']);
        $form->get('telefono')->setValue($empresa['telefono']);
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
                    $this->getUsuariosMongoDb()->agregarUsuario($empresa,$datos['usuario_id'], 'editar');
                    $this->getEmpresaMongoDb()->agregarEmpresa($empresa, $datos['_id'], 'editar');
                    if ($datos['enviar'] == 'si') {
                        $this->correo($empresa);
                    }
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/empresa/index');
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/editar-empresa/' . $id . '?m=1');
            }
        }
        return new ViewModel(array('form' => $form, 'id' => $id, 'pass' => $empresa_usuario['pass']));
    }

    public function correo($empresa) {
        $message = new Message();
        $message->addTo($empresa->email, $empresa->nombre)
                ->setFrom('listadelsabor@innovationssystems.com', 'GPS')
                ->setSubject('Credenciales para el acceso a GPS');
        $bodyHtml = '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
                                                       <head>
                                                       <meta http-equiv="Content-type" content="text/html;charset=UTF-8"/>
                                                       </head>
                                                       <body>
                                                            <div style="color: #7D7D7D"><br />
                                                             Hola  Empresa <strong style="color:#133088; font-weight: bold;">' . $empresa->nombre . ',</strong><br /><br />
                                                Tu cuenta en GPS es :<br /><br />
                                                Tus Usuario es : ' . $empresa->login . '</a> <br /><br />
                                                Tus Pass es : ' . $empresa->pass . '</a> <br /><br />
                                                <br /><br /><br />                                               
                                                             </div>
                                                       </body>
                                                       </html>';
        $bodyPart = new \Zend\Mime\Message();
        $bodyMessage = new \Zend\Mime\Part($bodyHtml);
        $bodyMessage->type = 'text/html';
        $bodyPart->setParts(array(
            $bodyMessage
        ));
        $message->setBody($bodyPart);
        $message->setEncoding('UTF-8');
        $transport = $this->getServiceLocator()->get('mail.transport');
        $transport->send($message);
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

}

