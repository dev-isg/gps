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

class IndexController extends AbstractActionController
{
    
    protected $usuarioMongodb;
    public function __construct()
	{ 
		$this->_options = new \Zend\Config\Config ( include APPLICATION_PATH . '/config/autoload/global.php' );
        }
    
        
        public function getUsuariosMongoDb() 
        {
        if (!$this->usuarioMongodb) {
            $sm = $this->getServiceLocator();
            $this->usuarioMongodb = $sm->get('Application\Model\UsuarioCollection');}
        return $this->usuarioMongodb;
        }  
        
      public function indexAction()
    {
       $resultados=$this->getUsuariosMongoDb()->findAll();
       $cantidad=count($resultados);
       //echo json_encode($resultados);exit;
       return new ViewModel(array('valores'=>$resultados,'cantidad'=>$cantidad));
    }
     
      public function eliminarusuarioAction()
    {$id = $this->params()->fromQuery('id');
     $this->getUsuariosMongoDb()->eliminarUsuario($id);
    return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index');
    } 
      public function agregarusuarioAction()
    {
      $form = new Registrousuario("form");
        $request = $this->getRequest();
          if ($request->isPost()) {
           $usuarios = new Usuario();
         $form->setInputFilter($usuarios->getInputFilter());
             $form->setData($request->getPost()); 
                if ($form->isValid()) { 
                   $usuarios->exchangeArray($form->getData());
                 $this->getUsuariosMongoDb()->agregarUsuario($usuarios);
                 return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index'); 
                 }
       }
     return new ViewModel(array('form' => $form));
    } 
    
     public function editarusuarioAction()
    { 
       $id = $this->params()->fromRoute('id', 0);

     
         if (!$id) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index');
         }
         try {
            $usuario= $this->getUsuariosMongoDb()->obtenerUsuario($id);
         }
         catch (\Exception $ex) {
            return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index');
         }  
         $form = new Registrousuario();
         $form->get('login')->setValue($usuario['login']);
         $form->get('pass')->setValue($usuario['pass']);
         $form->get('_id')->setValue($usuario['_id']);
         $form->get('rol')->setValue($usuario['rol']);
        // $form->bind($usuario);
      $request = $this->getRequest();
          if ($request->isPost()) {     
           $usuarios = new Usuario();
           $form->setInputFilter($usuarios->getInputFilter());
             $form->setData($request->getPost()); 
                if ($form->isValid()) {   
                   $usuarios->exchangeArray($form->getData());
                 $this->getUsuariosMongoDb()->agregarUsuario($usuarios);
                 return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index'); 
                 }
       }
     return new ViewModel(array('form' => $form,'id'=>$id));
    } 
    
    public function mongoConect()
    {
        $imagen=$this->_options->mongo->server;
        $imagen2=$this->_options->mongo->db;
	$m = new Mongo($imagen);
	$db = $m->$imagen2;
               return $db;
    }
   
    
   
}   

       
    
    


