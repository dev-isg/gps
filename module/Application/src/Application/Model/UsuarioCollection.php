<?php
namespace Application\Model;
use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use MongoCollection;
use Mongo;

use Application\Model\Usuario;
use PhlyMongo\HydratingMongoCursor;
use Zend\Stdlib\Hydrator\ObjectProperty;

class UsuarioCollection {// extends MongoCollection 
    protected $collection;
    public function __construct( MongoCollection $adapter) {//Mongo $adapter
        $this->collection=$adapter;
//        return parent::__construct($adapter,'usuario');
    }
    public function findAll(){

   // $usarios=$this->collection->db_gps2->usuario->find();

        $usarios=$this->collection->find();//$this->collection->db_gps2->usuario->find();

//        $resultset = new HydratingMongoCursor(
//        $usarios,
//        new ObjectProperty,
//        new Usuario() );
//      
       $resultados= array();
        foreach ($usarios as $result) {
         $resultados[]=$result;
        }
        
//        $resultset = new HydratingMongoCursor(
//        $usarios,
//        new ObjectProperty,
//        new Usuario()
//);
//      
//       
//        foreach ($usarios as $id => $value) {
////            echo "$id: ";
//            print_r($value['rol']);
//        }
//        echo '</br>';
//        //o esto:
//        foreach ($resultset as $status) {
//            print_r($status->rol);
////            printf('%s <%s>: %s', $status->id, $status->login, $status->rol);
//        }
//        exit;
        
        return $resultados;
    }
    

//
    public function eliminarUsuario($valor)
       {        
       $eliminar = array ('id'=>"$valor");
         $usarios=$this->collection->remove($eliminar);
        if($usarios==true)
        {return $usarios; }
        else{echo 'error al eliminar';}
      
    }
   public function agregarUsuario($valor)
       {       
      $cantidad = array('login'=>$valor->login,
          'pass'=>$valor->pass,
          'rol'=>$valor->rol);
     
         $usarios=$this->collection->insert($cantidad);
        if($usarios==true)
        {return $usarios; }
        else{echo 'error al eliminar';}
      
    }
    
  public function editarUsuario($idusuario, $valor) {
        $datos = array('login' => $valor->login,
            'pass' => $valor->pass,
            'rol' => $valor->rol);
        $this->collection->update(array('id' => "$idusuario"), $datos);
    }
}
