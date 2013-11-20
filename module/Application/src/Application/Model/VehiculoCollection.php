<?php
namespace Application\Model;
use MongoCollection;

class VehiculoCollection{
    protected $collection;
    public function __construct(MongoCollection $adapter) {
       $this->collection=$adapter;
    }
    public function findAll(){
        $vehiculos=$this->collection->find();
        $result=array();
        foreach ($vehiculos as $value) {
            $result[]=$value;
        }
            
        return $result;
    }
    
    public function getVehiculo($idvehiculo){
        $vehiculo=$this->collection->findOne(array('id'=>$idvehiculo));
        return $vehiculo;
    }
    
   public function eliminarVehiculo($valor) {
        $vehiculo = $this->collection->remove(array('_id' => new \MongoId($valor)));
        if ($vehiculo == true) {
            return $vehiculo;
        } else {
            echo 'error al eliminar';
        }
    }
    
    public function guardarVehiculo($vehiculo){
        //obteniendo otra collecion en mi module
//        var_dump($this->collection->db->empresa->findOne());Exit;
        
        
        $data=array(
//                    'id' => $vehiculo->id,
//                    'activo' => $vehiculo->activo,
                    'nombre_corto' => $vehiculo->nombre_corto,
//                    'des' => $vehiculo->des,
//                    'tipo_equipo' => $vehiculo->tipo_equipo,
//                    'num_imei' => $vehiculo->num_imei,
//                    'num_sim' => $vehiculo->num_sim,
//                    'color_ruta' => $vehiculo->color_ruta,
//                    'placa' => $vehiculo->placa,
//                    'id_usuario'=>$vehiculo->id_usuario,
                    'chofer'=>array(
                        'chofer_id'=>new \MongoId(),//$chofer->id,
//                        'descripcion'=>$chofer->descripcion,
//                        'activo'=>true,
                        'chofer_nom'=>$vehiculo->chofer_nom
                    )
        );
//        var_dump($data);Exit;
        $id = $vehiculo->id;
        if ($id == 0) {
            if ($vehiculo->empresa_id>0){
                $datain = array_merge_recursive($data, array('empresa_id' => new \MongoId($vehiculo->empresa_id)));
                $this->collection->insert($datain);
            } else {
                $this->collection->insert($data);
            }
        } else {
            $this->collection->update(array('id' => "$vehiculo->id_usuario"), $data);
        }
        
    }
    
}
