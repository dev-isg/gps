<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Model\EmpresaCollection;
use Application\Model\VehiculoCollection;
use Application\Form\VehiculoForm;
use Application\Model\Vehiculo;
use Application\Model\UsuarioCollection;
use Zend\Mail\Message;
use Mongo;

class VehiculoController extends AbstractActionController {

    protected $vehiculoMongodb;
    protected $usuarioMongodb;
    protected $empresaMongodb;

    public function indexAction() {
        $resultados = $this->getVehiculoMongoDb()->findAll();
        $cantidad = count($resultados);
        return new ViewModel(array('valores' => $resultados, 'cantidad' => $cantidad));
    }

    public function agregarvehiculoAction() {
        $id = $this->params()->fromQuery('id');
        $form = new VehiculoForm();
        $form->get('empresa_id')->setValue($id);
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $vehiculo = new Vehiculo();
                $form->setInputFilter($vehiculo->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $vehiculo->exchangeArray($form->getData());
                    $id_usuario = $this->getUsuariosMongoDb()->agregarUsuario($vehiculo);
                    $this->getVehiculoMongoDb()->guardarVehiculo($vehiculo, $id_usuario, $datos['empresa_id']);
                    if ($datos['enviar'] == 'si') {
                        $this->correo($vehiculo);
                    }
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/listar-vehiculo/' . $datos['empresa_id']);
                } else {
                    foreach ($form->getInputFilter()->getInvalidInput() as $error) {
                        print_r($error->getMessages());
                        print_r($error->getName());
                    }
                }
            } else {
                return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/application/vehiculo/agregarvehiculo?id=' . $datos['empresa_id'] . '&m=1');
            }
        }
        return new ViewModel(array('form' => $form));
    }

    public function editarvehiculoAction() {
        $id = $this->params()->fromRoute('id_vehiculo', 0);
        $idempresa = $this->params()->fromRoute('id_empresa', 0);
        if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/listar-vehiculo/' . $idempresa);
        }
        try {
            $vehiculo = $this->getVehiculoMongoDb()->getVehiculo($id);
        } catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/listar-vehiculo/' . $idempresa);
        }
        $form = new VehiculoForm();
        $form->get('nombre_corto')->setValue($vehiculo[0]['nombre_corto']);
        $form->get('chofer_nom')->setValue($vehiculo[0]['chofer']['chofer_nom']);
        $form->get('email')->setValue($vehiculo[0]['chofer']['email']);
        $form->get('chofer_telefono')->setValue($vehiculo[0]['chofer']['chofer_telefono']);
        $form->get('empresa_id')->setValue($vehiculo[0]['empresa_id']);
        $form->get('placa')->setValue($vehiculo[0]['placa']);
        $form->get('num_imei')->setValue($vehiculo[0]['num_imei']);
        $form->get('color_ruta')->setValue($vehiculo[0]['color_ruta']);
        $form->get('num_sim')->setValue($vehiculo[0]['num_sim']);
        $form->get('usuario_id')->setValue($vehiculo[0]['usuario_id']);
        $form->get('login')->setValue($vehiculo[0]['login']);
        $form->get('pass')->setValue($vehiculo[0]['pass']);
        $form->get('_id')->setValue($vehiculo[0]['_id']);
        $form->get('submit')->setValue('Editar');
        $request = $this->getRequest();
        if ($request->isPost()) {
            $datos = $this->request->getPost();
            $pass1 = $datos['pass'];
            $pass2 = $datos['pass2'];
            if ($pass1 == $pass2) {
                $vehiculo = new Vehiculo();
                $form->setInputFilter($vehiculo->getInputFilter());
                $form->setData($request->getPost());
                if ($form->isValid()) {
                    $vehiculo->exchangeArray($form->getData());
                    $this->getUsuariosMongoDb()->agregarUsuario($vehiculo, $datos['usuario_id'], 'editar');
                    $this->getVehiculoMongoDb()->guardarVehiculo($vehiculo, $datos['usuario_id'], $datos['empresa_id'], $datos['_id']);
                    if ($datos['enviar'] == 'si') {
                        $this->correo($vehiculo);
                    }
                    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/listar-vehiculo/' . $idempresa);
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
        return new ViewModel(array('form' => $form, 'id' => $id, 'pass' => $vehiculo[0]['pass'], 'idempresa' => $idempresa, 'idvehiculo' => $id));
    }

    public function eliminarvehiculoAction() {
        $id = $this->params()->fromRoute('id_vehiculo', 0);
        $idusuario = $this->params()->fromRoute('id_usuario', 0);
        $idempresa = $this->params()->fromRoute('id_empresa', 0);
        $this->getVehiculoMongoDb()->eliminarVehiculo($id, $idusuario);
        return $this->redirect()->toUrl($this->getRequest()->getBaseUrl() . '/listar-vehiculo/' . $idempresa);
    }

    public function correo($vehiculo) {
        $message = new Message();
        $message->addTo($vehiculo->email, $vehiculo->chofer_nom)
                ->setFrom('listadelsabor@innovationssystems.com', 'GPS')
                ->setSubject('Credenciales para el acceso a GPS');
        $bodyHtml = '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
                                                       <head>
                                                       <meta http-equiv="Content-type" content="text/html;charset=UTF-8"/>
                                                       </head>
                                                       <body>
                                                            <div style="color: #7D7D7D"><br />
                                                             Hola   <strong style="color:#133088; font-weight: bold;">' . $vehiculo->chofer_nom . ',</strong><br /><br />
                                                Tu cuenta en GPS es :<br /><br />
                                                Tus Usuario es : ' . $vehiculo->login . '</a> <br /><br />
                                                Tus Pass es : ' . $vehiculo->pass . '</a> <br /><br />
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

    public function listarvehiculoAction() {
        $id = $this->params()->fromRoute('id', 0);
        $resultados = $this->getVehiculoMongoDb()->getVehiculos($id);
        $cantidad = count($resultados);
        return new ViewModel(array('valores' => $resultados, 'cantidad' => $cantidad, 'idempresa' => $id));
    }

    public function getVehiculoMongoDb() {
        if (!$this->vehiculoMongodb) {
            $sm = $this->getServiceLocator();
            $this->vehiculoMongodb = $sm->get('Application\Model\VehiculoCollection');
        }
        return $this->vehiculoMongodb;
    }

    public function getUsuariosMongoDb() {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');
        }
        return $this->usuarioMongodb;
    }

}
