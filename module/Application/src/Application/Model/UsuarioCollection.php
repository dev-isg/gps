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

    public function __construct(MongoCollection $adapter) {//Mongo $adapter
        $this->collection = $adapter;
//        return parent::__construct($adapter,'usuario');
    }

    public function findAll() {
        
        $usarios = $this->collection->find(); //$this->collection->db_gps2->usuario->find();
        $resultados = array();
        foreach ($usarios as $result) {
            $resultados[] = $result;
        }

        return $resultados;
    }

    public function obtenerUsuario($id) {

        $usarios = $this->collection->findOne(array('_id' => new \MongoId($id)));
        if (!$usarios) {
            throw new \Exception("Could not find row $id");
        }
        return $usarios;
    }

    public function eliminarUsuario($valor) {
        $usarios = $this->collection->remove(array('_id' => new \MongoId($valor)));
        if ($usarios == true) {
            return $usarios;
        } else {
            echo 'error al eliminar';
        }
    }

    public function agregarUsuario($valor,$usuario_id=null, $accion = null) {
        $cantidad = array('login' => $valor->login,
            'pass' => $valor->pass,
            'rol' => $valor->rol);
        if ($accion == null) {
            $cantidad['_id'] = new \MongoId();
            $usarios = $this->collection->insert($cantidad);
            return $cantidad['_id'];
        } else { 
            $usarios = $this->collection->update(array('_id' => new \MongoId($usuario_id)), $cantidad);
            return $cantidad['_id'];
        }
    }
    
      public function obtenerUsuarioLogin($datos) {
       $cantidad = array('login' => $datos->login,
                'pass' => $datos->pass);      
        $usarios = $this->collection->findOne($cantidad);
        return $usarios;
    }
    
}
