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
            $cantidad['usuario_id'] = new \MongoId($id);
            $empresa = $this->collection->insert($cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        } else {

            $cantidad['usuario_id'] = new \MongoId($valor->usuario_id);
            $empresa = $this->collection->update(array('_id' => new \MongoId($id)), $cantidad);
            if ($empresa == true) {
                return $empresa;
            }
        }
    }

    public function getEmpresabyId($idempresa = null) {

        $empresa = $this->collection->findOne(array('_id' => new \MongoId($idempresa)));
        $vehiculo = $this->collection->db->vehiculo->find(array('empresa_id' => $idempresa));
        // $empresass = array('nombre_empresa' =>$empresa['nombre'].'('.$vehiculo->count().'/'.$vehiculo->count().')');
        $auxtram['id'] = (String) $empresa['_id'];
        $auxtram['nombre'] = (String) $empresa['nombre'];
        $auxtram['name'] = $empresa['nombre'] . '(' . $vehiculo->count() . '/' . $vehiculo->count() . ')';
        $auxtram['descripcion'] = $empresa['descripcion'];
        $auxtram['telefono'] = $empresa['telefono'];
        $resultvehi = array_merge_recursive($auxtram);
        if (!$resultvehi) {
            throw new \Exception("Could not find row $idempresa");
        }
        return $resultvehi;
    }

    public function getLista() {
        $listEmp = $this->collection->find();
        $resultvehi = array();
        foreach ($listEmp as $value) {
            $id = (String) $value['_id'];
            $vehiculo = $this->collection->db->vehiculo->find(array('empresa_id' => $id));
            $value['name'] = $value['nombre'] . '(' . $vehiculo->count() . '/' . $vehiculo->count() . ')';
            $resultvehi[] = array_merge_recursive($value);
        }
        $usuario = array('id_usuario' => $_SESSION['_idrol'], 'rol' => $_SESSION['rol'], 'nombre' => $_SESSION['nombre']
            , 'children' => $resultvehi);
        return $usuario;
    }

}
