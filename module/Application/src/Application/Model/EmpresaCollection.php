<?php
namespace Application\Model;


class EmpresaCollection{
   protected $collection;
    public function __construct( MongoCollection $adapter) {
        $this->collection=$adapter;
    }

    public function getListaCombo(){
        $listEmp=$this->collection->find(array(),array('nombre'=>true));
        foreach ($listEmp as $value) {
                  $aux[]=$value['nombre'];
        }
        var_dump($aux);Exit;
        return $aux;
    }
    
}
