<?php

namespace Application\Model;

use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use MongoCollection;
use Mongo;
use Application\Model\Administrador;
use PhlyMongo\HydratingMongoCursor;
use Zend\Stdlib\Hydrator\ObjectProperty;

class AdministradorCollection {// extends MongoCollection 

    protected $collection;

    public function __construct(MongoCollection $adapter) {//Mongo $adapter
        $this->collection = $adapter;
//        return parent::__construct($adapter,'usuario');
    }

    public function administradoresAll() {

        $administrador = $this->collection->find();
        // var_dump($administrador['usuario_id']);exit;
        $resultvehi = array();
        foreach ($administrador as $value) {
            $idusuario = $value['usuario_id'];
            $datausuario = $this->collection->db->usuario->findOne(array('_id' => new \MongoId($idusuario)));
            $dataname = array('login' => $datausuario['login']);
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        //   var_dump($resultvehi);exit;
        return $resultvehi;
    }

    public function obtenerAdministrador($id) {

        $usarios = $this->collection->findOne(array('_id' => new \MongoId($id)));
        if (!$usarios) {
            throw new \Exception("Could not find row $id");
        }
        return $usarios;
    }

    public function eliminarAdministrador($valor) {
        $usarios = $this->collection->remove(array('_id' => new \MongoId($valor)));
        if ($usarios == true) {
            return $usarios;
        } else {
            echo 'error al eliminar';
        }
    }

    public function agregarAdministrador(Administrador $valor, $id, $idadmin = null, $editar = null) {

        $cantidad = array('nombre' => $valor->nombre
        );
        $cantidad['usuario_id'] = new \MongoId($id);
        if ($editar == null) {
            $empresa = $this->collection->insert($cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        } else {
            $empresa = $this->collection->update(array('_id' => new \MongoId($idadmin)), $cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        }
    }

}
