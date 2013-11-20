<?php
namespace Application\Model;

use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use MongoCollection;
use Mongo;
use Application\Model\Usuario;
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
     //   var_dump($aux);exit;
        return $aux;


    }
    
}
