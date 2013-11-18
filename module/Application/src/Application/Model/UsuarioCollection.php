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
        $usarios=$this->collection->find();//$this->collection->db_gps2->usuario->find();
        
        $resultset = new HydratingMongoCursor(
        $usarios,
        new ObjectProperty,
        new Usuario()
);
      
       
//        foreach ($usarios as $id => $value) {
//            echo "$id: ";
//            print_r($value);
//        }
//        exit;
        //o esto:
        foreach ($resultset as $status) {
            printf('%s <%s>: %s', $status->id, $status->login, $status->rol);
        }
        exit;
        
        return $resultset;
    }
}
//class UsuarioCollection {
//
//    protected $collection;
//
//    public function __construct(MongoCollectionFactory $coleccion) {
//        $this->collection = $coleccion;
//    }
//
//    public function findAll() {
//        $usarios = $this->collection->find();
//        return $usarios;
//    }
//
//}