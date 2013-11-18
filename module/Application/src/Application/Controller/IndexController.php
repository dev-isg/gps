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
                   // echo "d";exit;
       $usuario = $this->getServiceLocator()->get('Application\Model\UsuarioCollection');
        var_dump($usuario->findAll());exit;
        return new ViewModel();   
   //  return new ViewModel(array('valores'=>$users['nombre']));
    }
    public function mongoConect()
    {
        $imagen=$this->_options->mongodb->server;
        $imagen2=$this->_options->mongodb->db;
	$m = new Mongo($imagen);
	$db = $m->$imagen2;
               return $db;
    }
    public function dosAction()
    {
     $r= $this->mongoConect();
     $c_users = $r->vehiculo;
     $users = $c_users->findOne();      
     return new ViewModel(array('valores'=>$users['nombre_corto']));
    }
      public function tresAction()
    {
     $r= $this->mongoConect();
     $c_users = $r->usuario;
     $users = $c_users->findOne();      
     return new ViewModel(array('valores'=>$users['rol']));
    }
   
}   

       
    
    


