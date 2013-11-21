<?php

namespace Application\Model;


use MongoCollection;



class TramasCollection {

    protected $collection;

    public function __construct(MongoCollection $adapter) {
        $this->collection = $adapter;
    }

    public function getTramas($id) {
        $trama = $this->collection->find(array('_id' => new \MongoId($id)), array('lat' => true, 'lng' => true, 'fecha_ubicacion' => true));
        return $trama;
    }

    public function getSeguimientoVehiculo($idvehiculo) {
        //nombre de vehiculo
        $trama = $this->collection->find(array('vehiculo_id' => new \MongoId($idvehiculo))
                , array('fecha_ubicacion' => true, 'angulo' => true, 'velocidad' => true,
            'lat' => true, 'lng' => true, 'fecha_ubicacion' => true)
                );
        foreach($trama as $tr){
            $aux[]=$tr;
            }
        var_dump(json_encode($aux));
        
        var_dump(json_encode(iterator_to_array($trama)));
        exit;
        return $trama;
    }

    public function getReproduccionVehiculo($inicio, $fin) {
        $trama = $this->collection->find(array('fecha_ubicacion' => array('$gte' => $inicio, '$lte' => $fin)), array('angulo' => true, 'velocidad' => true, 'lat' => true, 'lng' => true, 'fecha_ubicacion' => true));
        return json_encode(iterator_to_array($trama));
        ;
    }

}
