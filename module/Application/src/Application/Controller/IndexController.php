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
      return new ViewModel(array('valores'=>$usuario->findAll()));
     }
     
      public function dosAction()
    {
      
     $usuario = $this->getServiceLocator()->get('Application\Model\UsuarioCollection');
  //   var_dump($usuario);exit;
     $usuario->eliminarUsuario(3);
//      $c_users = $r->vehiculo;
//     $users = $c_users->findOne();      
//     return new ViewModel(array('valores'=>$users['nombre_corto']));
    } 
    
    
    public function mongoConect()
    {
        $imagen=$this->_options->mongo->server;
        $imagen2=$this->_options->mongo->db;
	$m = new Mongo($imagen);
	$db = $m->$imagen2;
               return $db;
    }
   
      public function tresAction()
    {
     $r= $this->mongoConect();
     $c_users = $r->usuario;
     $users = $c_users->findOne();      
     return new ViewModel(array('valores'=>$users['rol']));
    }
   
}   

       
    
    


