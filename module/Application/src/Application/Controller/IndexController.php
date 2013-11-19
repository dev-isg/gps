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
use Mongo;
use PhlyMongo\Mongodb;
use PhlyMongo\MongoConnectionFactory;
use PhlyMongo\MongoCollectionFactory;
use Application\Model\UsuarioCollection;

class IndexController extends AbstractActionController
{
    public function __construct()
	{
		$this->_options = new \Zend\Config\Config ( include APPLICATION_PATH . '/config/autoload/global.php' );
	}
        
        
      public function indexAction()
    {
       $usuario = $this->getServiceLocator()->get('Application\Model\UsuarioCollection');
       $resultados=$usuario->findAll();
       $cantidad=count($resultados);
       return new ViewModel(array('valores'=>$resultados,'cantidad'=>$cantidad));
    }
     
      public function eliminarusuarioAction()
    {$id = $this->params()->fromQuery('id');
     $usuario = $this->getServiceLocator()->get('Application\Model\UsuarioCollection');
     $usuario->eliminarUsuario($id);
    
    } 
      public function agregarusuarioAction()
    {
      $form = new Registrousuario("form");
       
        $request = $this->getRequest();
       if ($request->isPost()) {
           $datos =$this->request->getPost();  
       $usuario = $this->getServiceLocator()->get('Application\Model\UsuarioCollection');
       $usuario->agregarUsuario($datos);
       return $this->redirect()->toUrl($this->getRequest()->getBaseUrl().'/application/index/index'); 
      }
     return new ViewModel(array('form' => $form));
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

       
    
    


