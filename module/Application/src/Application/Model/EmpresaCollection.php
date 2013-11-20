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

class EmpresaCollection{
   protected $collection;
    public function __construct( MongoCollection $adapter) {
        $this->collection=$adapter;
    }

    public function getListaCombo(){
      //  $listEmp=$this->collection->find(array(),array('nombre'=>true));
          $listEmp=$this->collection->find();
        foreach ($listEmp as $value) {
                  $aux[]=$value;
               
        }
        return $aux;
    }
    public function agregarEmpresa(Empresa $valor, $id = null) {
        $cantidad = array('descripcion' => $valor->descripcion,
            'ruc' => $valor->ruc,
            'nombre' => $valor->nombre,
            'direccion'=>$valor->direccion,
            
        );
     
        if ($id==null) {
            $usarios = $this->collection->insert($cantidad);
            if ($usarios == true) {
                return $usarios;
            }
        }    else {
            $usarios = $this->collection->update(array('_id' => new \MongoId($id)), $cantidad);
            if ($usarios == true) {
                return $usarios;
            }
        }
    }
}
