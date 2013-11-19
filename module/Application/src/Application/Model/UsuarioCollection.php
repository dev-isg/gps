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
        
//        exit;
//       // o esto:
//        foreach ($resultset as $status) {
//            printf('%s <%s>: %s', $status->id, $status->login, $status->rol);
//        }
//        exit;
        
        return $resultados;
    }


//
     public function obtenerUsuario($id)
       {        
        
         $usarios=$this->collection->findOne(array('_id'=> new \MongoId($id)));

        if (!$usarios) {
                   throw new \Exception("Could not find row $id");
               }
               return $usarios;
      
  }



    public function eliminarUsuario($valor)
       {        
        $usarios=$this->collection->remove(array('_id'=> new \MongoId($valor)));
        if($usarios==true)
        {return $usarios; }
        else{echo 'error al eliminar';}
    }
   public function agregarUsuario(Usuario $valor)
   {  
      
      $cantidad = array('login'=>$valor->login,
          'pass'=>$valor->pass,
          'rol'=>$valor->rol,
         // 'id'=>"$val"
          );
      if($valor->_id==null)
        {$usarios=$this->collection->insert($cantidad);
        if($usarios==true)
        {return $usarios; }}
        else
        {$cantidad['_id']=new \MongoId($valor->_id);
         $usarios=$this->collection->update($cantidad);
        if($usarios==true)
        {return $usarios; }}
     }
}
