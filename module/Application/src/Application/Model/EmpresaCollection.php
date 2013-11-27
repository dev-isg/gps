<?php

namespace Application\Model;

use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use MongoCollection;
use Mongo;
use Application\Model\Empresa;
use Application\Model\UsuarioCollection;
use PhlyMongo\HydratingMongoCursor;
use Zend\Stdlib\Hydrator\ObjectProperty;

class EmpresaCollection {

    protected $collection;

    public function __construct(MongoCollection $adapter) {
        $this->collection = $adapter;
    }

    public function getListaCombo($consulta = null) {
        if ($consulta == null) {
            $listEmp = $this->collection->find();
        } else {
            $regex = new \MongoRegex("/$consulta/");
            $listEmp = $this->collection->find(array('nombre' => $regex));
        }
        foreach ($listEmp as $value) {
            $aux[] = $value;
        }
        return $aux;
    }

    public function getLista($consulta = null) {

        if ($consulta == null) {
            $listEmp = $this->collection->find();
        } else {
            $regex = new \MongoRegex("/$consulta/");
            $listEmp = $this->collection->find(array('nombre' => $regex));
        }
        $resultvehi = array();
        foreach ($listEmp as $value) {
            $id = (String) $value['_id'];
            $vehiculo = $this->collection->db->vehiculo->find(array('empresa_id' => $id));
            $dataname = array('cantidad' => $vehiculo->count());
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        return $resultvehi;
    }

    public function obtenerEmpresa($id) {

        $empresa = $this->collection->findOne(array('_id' => new \MongoId($id)));

        if (!$empresa) {
            throw new \Exception("Could not find row $id");
        }
        return $empresa;
    }

    public function obtenerEmpresaCantidad($id) {

        $empresa = $this->collection->findOne(array('_id' => new \MongoId($id)));
        $vehiculo = $this->collection->db->vehiculo->find(array('empresa_id' => $id));
        $dataname = array('cantidad' => $vehiculo->count());
        $resultvehi[] = array_merge_recursive($empresa, $dataname);
        if (!$resultvehi) {
            throw new \Exception("Could not find row $id");
        }
        return $resultvehi;
    }

    public function agregarEmpresa(Empresa $valor, $id, $editar = null) {

        $cantidad = array('descripcion' => $valor->descripcion,
            'ruc' => $valor->ruc,
            'nombre' => $valor->nombre,
            'direccion' => $valor->direccion,
            'email' => $valor->email,
            'telefono' => $valor->telefono
        );

        if ($editar == null) {
            $cantidad['usuario_id'] = $id;
            $empresa = $this->collection->insert($cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        } else {

            $cantidad['usuario_id'] = $valor->usuario_id;
            $empresa = $this->collection->update(array('_id' => new \MongoId($id)), $cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        }
    }

}
