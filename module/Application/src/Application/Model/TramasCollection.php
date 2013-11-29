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

    public function insertaTramas() {

         $iniciof = new MongoDate(strtotime('26/11/2013 12:50:27'));
        
      $valorer= array('alerta'=>'jnj',
          'dmy'=>'64',
          'estado'=>'movimiento',
          
          'fecha_ubicacion'=>$iniciof,
          'hms'=>10,
          'id'=>'10',
          'lat'=>'5','lng'=>'41',
          'orientacion'=>'30',
          'vehiculo_id'=>new \MongoId("5297b51fbf8eb1c406000038"),
          'velocidad'=>'30');
        $trama = $this->collection->insert($valorer);
        return $trama;exit;
    }
    
    public function getTramas($id) {
        $trama = $this->collection->find(array('_id' => new \MongoId($id)), array('lat' => true, 'lng' => true, 'fecha_ubicacion' => true));
        return $trama;
    }

    public function getSeguimientoVehiculos($idempresa) {
        $vehiculo = $this->collection->vehiculo->find(array('empresa_id' => new MongoId($idempresa)), array('chofer.chofer_nom' => true, 'placa' => true, 'empresa_id' => true));
        foreach ($vehiculo as $vehi) {
//                $vehi['chofer_nom']=$vehi['chofer']['chofer_nom'];
//                $vehi['placa']=$vehi['placa'];

            $trama = $this->collection->find(array('vehiculo_id' => $vehi['_id'], 'fecha_ubicacion' => array('$gt' => $fecha))
                    , array('alerta' => true, 'hms' => true, 'fecha_ubicacion' => true, 'orientacion' => true, 'velocidad' => true,
                'lat' => true, 'lng' => true, 'vehiculo_id' => true)
            );
            $vehi['alerta'] = $trama['alerta'];
            $vehi['hms'] = $trama['hms'];
            $vehi['fecha_ubicacion'] = $trama['fecha_ubicacion'];
            $vehi['orientacion'] = $trama['orientacion'];
            $vehi['velocidad'] = $trama['velocidad'];
            $vehi['lat'] = $trama['lat'];
            $vehi['lng'] = $trama['lng'];
            $vehi['vehiculo_id'] = $trama['vehiculo_id'];

            $auxtramas[] = $vehi;
        }
        return json_encode($auxtramas);
    }

    public function getSeguimientoVehiculo($idvehiculo, $fechaactual) {
        $fechaactual = str_replace("/", "-", $fechaactual);
        $fecha = new MongoDate(strtotime($fechaactual));
        //nombre de vehiculo
        $trama = $this->collection->find(array('vehiculo_id' => new MongoId($idvehiculo))//,array('$gt' => $fecha))
                , array('alerta' => true, 'hms' => true, 'fecha_ubicacion' => true, 'orientacion' => true, 'velocidad' => true,
            'lat' => true, 'lng' => true, 'fecha_ubicacion' => true, 'vehiculo_id' => true)
        );

        foreach ($trama as $tr) {
            $tr['_id'] = (String) $tr['_id'];
            $tr['fecha_ubicacion'] = date("Y-m-d H:i:s", $tr['fecha_ubicacion']->sec);
            $datavehiculo = $this->collection->db->vehiculo->findOne(array('_id' => $tr['vehiculo_id']), array('chofer.chofer_nom' => true, 'placa' => true));
            $tr['vehiculo_id'] = (String) $datavehiculo['_id'];
            $tr['chofer_nom'] = $datavehiculo['chofer']['chofer_nom'];
            $tr['placa'] = $datavehiculo['placa'];
            $auxtrama[] = $tr;
        }

        return $auxtrama; //json_encode($auxtrama);
    }

    public function getReproduccionVehiculo($inicio, $fin, $idvehiculo = null) {
        date_default_timezone_set('America/Lima');
        $inicio = str_replace("/", "-", $inicio);
        $fin = str_replace("/", "-", $fin);

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

        $iniciof = new MongoDate(strtotime($inicio)); //new MongoDate(strtotime("2013-11-21T20:30:51.656Z"));//new MongoDate(date("c",$timeI));//
        $finf = new MongoDate(strtotime($fin)); //new MongoDate(strtotime("2013-11-21T20:33:04.913Z"));//new MongoDate(date("c",$timeF));//
//        var_dump(date('Y-m-d H:i:s', $iniciof->sec));exit;
//        var_dump(new MongoDate(strtotime("2013-11-21T20:30:51-05:00")));
//        var_dump(new MongoDate(strtotime("2013-11-21T20:33:53-05:00")));
//        $trama=$this->collection->find(array("fecha_ubicacion" => array('$gt' => $iniciof,'$lte'=> $finf)));

        $trama = $this->collection->find(array('fecha_ubicacion' => array('$gt' => $iniciof, '$lte' => $finf))
                , array('alerta' => true, 'hms' => true, 'orientacion' => true, 'velocidad' => true, 'lat' => true, 'lng' => true, 'fecha_ubicacion' => true, 'vehiculo_id' => true)
        );

        foreach ($trama as $tram) {
            $tram['_id'] = (String) $tram['_id'];
            $tram['fecha_ubicacion'] = date("Y-m-d H:i:s", $tram['fecha_ubicacion']->sec);
            $datavehiculo = $this->collection->db->vehiculo->findOne(array('_id' => $tram['vehiculo_id']), array('chofer.chofer_nom' => true, 'placa' => true));

            $tram['vehiculo_id'] = (String) $datavehiculo['_id'];
            $tram['chofer_nom'] = $datavehiculo['chofer']['chofer_nom'];
            $tram['placa'] = $datavehiculo['placa'];
            $auxtime[] = $tram;
        }

//        var_dump($this->collection->db->lastError());

        return $auxtime; //json_encode($auxtime);
    }

    /**
     * Retorna todos los vehiculos segun fecha y empreas
     * @params inicio , fin  idempresa
     * @return json 
     */

    //
    public function buscarMovimiento($inicio = null, $fin = null, $idempresa) {
        $iniciof = new MongoDate(strtotime($inicio)); //new MongoDate(strtotime("2013-11-21T20:30:51.656Z"));//new MongoDate(date("c",$timeI));//
        $finf = new MongoDate(strtotime($fin));

        $vehiculo = $this->collection->db->vehiculo->find(array('empresa_id' => new MongoId($idempresa))
                , array('chofer.chofer_nom' => true, 'placa' => true, 'empresa_id' => true,'_id'=>true)
        );

        foreach ($vehiculo as $vehi) {
           $tramas = $this->collection->db->execute(
                new \MongoCode('estadisticaDispositivo(fechai,fechaf,idvehiculo)', array(
                    'fechai' => $iniciof, 'fechaf' => $finf,'idvehiculo'=>$vehi['_id']
                )));
           $trama=$tramas['retval'];
           
//            $trama = $this->collection->find(array('vehiculo_id' => $vehi['_id'],
//                 'fecha_ubicacion' => array('$gt' => $iniciof, '$lte' => $finf)
//                    )
//                    , array('alerta' => true, 'hms' => true, 'fecha_ubicacion' => true, 'orientacion' => true, 'velocidad' => true,
//                'lat' => true, 'lng' => true, 'vehiculo_id' => true)
//            );
//            if($trama->hasNext()){
            foreach ($trama as $tr) {
                
                $auxve = array('chofer_nom' => $vehi['chofer']['chofer_nom'], 'placa' => $vehi ['placa']);
                $tr2 = array_merge_recursive($tr, $auxve);
                $auxtramas[] = $tr2;
            }
//            }
        }
        
        return $auxtramas;
    }

    /**
     * Retorna registros de vehiculo los  segun idvehiculos,fecha y empreas
     * @params inicio , fin  idempresa
     * @return json 
     */
    //
    public function buscarMovimientoVehic($inicio = null, $fin = null, $vehiculo = null) {
     
        $iniciof = new MongoDate(strtotime($inicio)); //date("c",strtotime($inicio)); //
        $finf = new MongoDate(strtotime($fin)); //date("c",strtotime($fin)); //
        $idvehiculo= new MongoId($vehiculo);
        $vehiculo = $this->collection->db->vehiculo->find(array('_id' =>$idvehiculo)
                , array('chofer.chofer_nom' => true, 'placa' => true, 'empresa_id' => true)
        );
        foreach ($vehiculo as $vehi) {
            $vehi['chofer'] = $vehi['chofer']['chofer_nom'];
            $dataempresa = $this->collection->db->empresa->findOne(array('_id' => $vehi['empresa_id']), array('nombre' => true));
            $vehi['nombre_empresa'] = $dataempresa['nombre'];
            $arrx = $vehi;

        }

        $total = $this->collection->db->execute(
                new \MongoCode('estadisticaDispositivo(fechai,fechaf,idvehiculo)', array(
                    'fechai' => $iniciof, 'fechaf' => $finf,'idvehiculo'=>$idvehiculo
                ))
        );
 
//        Ejecutando directamente
//        $salida=$this->collection->db->execute('db.tramas.aggregate( [ { $match: { fecha_ubicacion:{$gte:ISODate("'.$iniciof.'"), $lte:ISODate("'.$finf.'")},vehiculo_id:ObjectId("'.$idvehiculo.'") } },{ $group: { _id: {$dayOfYear:"$fecha_ubicacion"},totalkilom: { $sum: "$hms" } } } ] )');
//        foreach($salida['retval']['result'] as $result){
//            $total[]=  array_merge_recursive($arrx,array('total_km'=>$result['totalkilom']));          
//        }
        $auxtramas = array_merge_recursive($arrx,array('tiempo'=>$total['retval']));
        return $auxtramas;
    }

    /**
     * Retorna paradas segun fecha
     * @params inicio , fin ,idvehiculo 
     * @return Array
     */

    public function getParada($inicio = null, $fin = null, $idvehiculo = null) {    
        $iniciof = new MongoDate(strtotime($inicio));
        $finf = new MongoDate(strtotime($fin));
        $tramas = $this->collection->find(array('vehiculo_id' => new MongoId($idvehiculo),
            'fecha_ubicacion' => array('$gt' => $iniciof, '$lte' => $finf)), 
                array('estado' => true, 'fecha_ubicacion' => true,'lat'=>true,'lng'=>true));//->sort(array('fecha_ubicacion' => true));
        
        $act=null;
        $ant=null;
        $find=0;
        $findf=0;

        foreach ($tramas as $key => $trama) {
          
            $act = $trama;
            if ($find == 0) {
                if ($trama['estado'] == 'parar') {
                    $fparada['id'] = $key;
                    $fparada['fecha_inicio'] = date("Y-m-d H:i:s", $act['fecha_ubicacion']->sec);
                    $fparada['latitude']=$trama['lat'];
                    $fparada['longitude']=$trama['lng'];
                    $find = 1;
                    $findf = 0;
                }
            } else {
                if ($findf == 0) {
                    if ($trama['estado'] == 'movimiento') {
                        $fparada['idf'] = $key;
                        $fparada['fecha_fin'] = date("Y-m-d H:i:s", $act['fecha_ubicacion']->sec);
                        $resto=date_diff(date_create($fparada['fecha_inicio']),date_create($fparada['fecha_fin']));
                        $fparada['tiempo']=$resto->format('%Y-%m-%d %h:%i:%s');
                        //formato:$fparada['tiempo']->format('%Y-%m-%d %h:%i:%s');
                        $findf = 1;
                        $resultset[]=$fparada;
                        $find = 0;
                    }
                }
            }
            $ant = $act;
            
        }
//      var_dump($resultset);Exit;
        return $resultset; 
    }

}
