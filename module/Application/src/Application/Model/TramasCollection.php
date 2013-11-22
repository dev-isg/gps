<?php

namespace Application\Model;


use MongoCollection;
use MongoDate;
use MongoId;


class TramasCollection {

    protected $collection;

    public function __construct(MongoCollection $adapter) {
        $this->collection = $adapter;
    }

    public function getTramas($id) {
        $trama = $this->collection->find(array('_id' => new \MongoId($id)), array('lat' => true, 'lng' => true, 'fecha_ubicacion' => true));
        return $trama;
    }
    
    public function getSeguimientoVehiculos($idempresa){
        $empresa = $this->collection->empresa->find(array('_id' => new \MongoId($idempresa)));
        
    }

    public function getSeguimientoVehiculo($idvehiculo,$fechaactual) {
        $fechaactual= str_replace("/","-", $fechaactual);
        $fecha=new MongoDate(strtotime($fechaactual));
        //nombre de vehiculo
        $trama = $this->collection->find(array('vehiculo_id' => new MongoId($idvehiculo),'fecha_ubicacion' => array('$gt' => $fecha))
                , array('alerta'=>true,'hms'=>true,'fecha_ubicacion' => true, 'orientacion' => true, 'velocidad' => true,
                'lat' => true, 'lng' => true, 'fecha_ubicacion' => true,'vehiculo_id'=>true)
                );
        
        foreach($trama as $tr){
            $tr['_id']=(String)$tr['_id'];
            $tr['fecha_ubicacion']=date("Y-m-d H:i:s",$tr['fecha_ubicacion']->sec);
            $datavehiculo=$this->collection->db->vehiculo->findOne(array('_id'=>$tr['vehiculo_id']),
                    array('chofer.chofer_nom'=>true,'placa'=>true));
            $tr['vehiculo_id']=(String)$datavehiculo['_id'];
            $tr['chofer_nom']=$datavehiculo['chofer']['chofer_nom'];
            $tr['placa']=$datavehiculo['placa'];
            $auxtrama[]=$tr;
            }
        
//            var_dump(iterator_to_array($trama));Exit;
        return json_encode($auxtrama);
    }

    public function getReproduccionVehiculo($inicio, $fin,$idvehiculo=null) {
        date_default_timezone_set('America/Lima');
        $inicio= str_replace("/","-", $inicio);
        $fin=str_replace("/","-", $fin);
 
        //no borrar comentarios
        //string a formato iso
//        $timeI=strtotime($inicio);
//        $timeF=strtotime($fin);
//        var_dump(date("c",$timeI));
//        var_dump(date("c",$timeF));Exit;
        //2013-11-21T20:30:51-05:00
        //2013-11-21T20:33:53-05:00
        
        //formato iso a uno legible
//        var_dump(date("Y-m-d H:i:s",strtotime("2013-11-21T23:47:27.987Z")));
//        var_dump(date("Y-m-d H:i:s",strtotime("2013-11-21T23:47:43.644Z")));exit;
//         "2013-11-21 15:30:51"    2013-11-21 18:47:27
//        "2013-11-21 15:33:04"     2013-11-21 18:47:43
       
        $iniciof=new MongoDate(strtotime($inicio));//new MongoDate(strtotime("2013-11-21T20:30:51.656Z"));//new MongoDate(date("c",$timeI));//
        $finf=new MongoDate(strtotime($fin));//new MongoDate(strtotime("2013-11-21T20:33:04.913Z"));//new MongoDate(date("c",$timeF));//
//        var_dump(date('Y-m-d H:i:s', $iniciof->sec));exit;
//        var_dump(new MongoDate(strtotime("2013-11-21T20:30:51-05:00")));
//        var_dump(new MongoDate(strtotime("2013-11-21T20:33:53-05:00")));
//        $trama=$this->collection->find(array("fecha_ubicacion" => array('$gt' => $iniciof,'$lte'=> $finf)));

        $trama = $this->collection->find(array('fecha_ubicacion' => array('$gt' => $iniciof,'$lte' => $finf))                                                      
                , array('alerta'=>true,'hms'=>true,'orientacion' => true, 'velocidad' => true, 'lat' => true, 'lng' => true, 'fecha_ubicacion' => true,'vehiculo_id'=>true)
                );

        foreach($trama as $tram){
            $tram['_id']=(String)$tram['_id'];
            $tram['fecha_ubicacion']=date("Y-m-d H:i:s",$tram['fecha_ubicacion']->sec);
            $datavehiculo=$this->collection->db->vehiculo->findOne(array('_id'=>$tram['vehiculo_id']),
                    array('chofer.chofer_nom'=>true,'placa'=>true));
            
            $tram['vehiculo_id']=(String)$datavehiculo['_id'];
            $tram['chofer_nom']=$datavehiculo['chofer']['chofer_nom'];
            $tram['placa']=$datavehiculo['placa'];
            $auxtime[]=$tram;
      
        }
        
//        var_dump($this->collection->db->lastError());
        return json_encode($auxtime);
    
    }
}
