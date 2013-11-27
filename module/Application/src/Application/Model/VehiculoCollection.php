<?php

namespace Application\Model;

use MongoCollection;
use MongoId;

class VehiculoCollection {

    protected $collection;

//    const GENERAL = 1; 
//    const ESTACTIVO = 2; 
//    const ESTDESACTIVO = 3;

    public function __construct(MongoCollection $adapter) {
        $this->collection = $adapter;
    }

    public function vehiculosParticulares() {
//        $var=$this->collection->db->execute(new \MongoCode('listarVehiculos'));
//        foreach($var as $val){
//             var_dump($val);
//        }
//       Exit;
        $vehiculos = $this->collection->find(array('empresa_id' => ''));

        foreach ($vehiculos as $value) {
            $idempresa = $value['empresa_id'];
            $dataempre = $this->collection->db->empresa->findOne(array('_id' => $idempresa), array('nombre' => true));
            $dataname = array('nombre_empresa' => $dataempre['nombre']);
//            array_push($value,$dataempre['nombre']);
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        return $resultvehi;
    }

    public function getVehiculo($idvehiculo) {
        $vehiculo = $this->collection->findOne(array('_id' => new \MongoId($idvehiculo)));
        $resultvehi = array();
        $datausuario = $this->collection->db->usuario->findOne(array('_id' => new \MongoId($vehiculo['usuario_id'])));
        $dataname = array('login' => $datausuario['login']);
        $dapass = array('pass' => $datausuario['pass']);
        $resultvehi[] = array_merge_recursive($vehiculo, $dataname, $dapass);
        return $resultvehi;
    }

    public function eliminarVehiculo($idvehiculo, $idusuario) {
        $vehiculo = $this->collection->remove(array('_id' => new \MongoId($idvehiculo)));
        $this->collection->db->usuario->remove(array('_id' => new \MongoId($idusuario)));
        if ($vehiculo == true) {
            return $vehiculo;
        } else {
            echo 'error al eliminar';
        }
    }

    public function guardarVehiculo($vehiculo, $usuarioid, $empresa, $id = null) {
        $data = array(
//                    'id' => $vehiculo->id,
            'estado' => true,
            'nombre_corto' => $vehiculo->nombre_corto,
            'empresa_id' => $empresa,
//                    'tipo_equipo' => $vehiculo->tipo_equipo,
            'num_imei' => $vehiculo->num_imei,
            'num_sim' => $vehiculo->num_sim,
            'color_ruta' => $vehiculo->color_ruta,
            'placa' => $vehiculo->placa,
            'usuario_id' => $usuarioid,
            'chofer' => array(
                'chofer_id' => new \MongoId(), //$chofer->id,
//                        'descripcion'=>$chofer->descripcion,
                'chofer_estado' => true,
                'chofer_nom' => $vehiculo->chofer_nom,
                'chofer_telefono' => $vehiculo->chofer_telefono,
                'email' => $vehiculo->email
            )
        );
        if ($id == null) {
            $this->collection->insert($data);
        } else {
            $this->collection->update(array('_id' => new \MongoId($id)), $data);
        }
    }

    public function getVehiculos($idempresa = null) {
        $vehiculos = $this->collection->find(array('empresa_id' => "$idempresa"));
        $resultvehi = array();
        foreach ($vehiculos as $value) {
            $idempresas = $value['empresa_id'];
            $dataempre = $this->collection->db->empresa->findOne(array('_id' => new \MongoId($idempresas)));
            $dataname = array('nombre_empresa' => $dataempre['nombre']);
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        return $resultvehi;
    }
    
    public function getVehiculobyIdEmpresa($idempresa = null) {
        
        $vehiculos = $this->collection->find(array('empresa_id' => new \MongoId($idempresa)),
                                        array('chofer.chofer_nom'=>true,'placa'=>true,'empresa_id'=>true));
        $resultvehi = array();
        $resultset=array();
        $auxtram=array(
            'estado'=>'',
            'alerta'=>'',
            'hms'=>'',
            'fecha_ubicacion'=>'',
            'orientacion'=>'',
            'velocidad'=>'',
            'lat'=>'',
            'lng'=>'',
        );
        foreach ($vehiculos as $value) {
            $resultvehi['id']=(String)$value['_id'];
            $resultvehi['nombre']=$value['chofer']['chofer_nom'];
            $resultvehi['placa']=$value['placa'];
            
            $tramas = $this->collection->db->tramas->find(array('vehiculo_id' => $value['_id'])//,'fecha_ubicacion' => array('$gt' => $fecha)
                , array('estado'=>true,'alerta'=>true,'hms'=>true,'fecha_ubicacion' => true, 'orientacion' => true, 'velocidad' => true,
                'lat' => true, 'lng' => true,'vehiculo_id'=>true)
                )->sort(array('_id'=>-1))->limit(1);
           
            if($tramas){
                foreach($tramas as $trama){
                    
                    $auxtram['estado']=$trama['estado'];
                    $auxtram['alerta']=$trama['alerta'];
                    $auxtram['hms']=$trama['hms'];
                    $auxtram['fecha_ubicacion']=date("Y-m-d H:i:s",$trama['fecha_ubicacion']->sec);
                    $auxtram['orientacion']=$trama['orientacion'];
                    $auxtram['velocidad']=$trama['velocidad'];
                    $auxtram['lat']=$trama['lat'];
                    $auxtram['lng']=$trama['lng'];

                }
            }                
//            $auxzz[(String)$value['_id']]=iterator_to_array($tramas);
            $resultset[]=  array_merge_recursive($resultvehi,$auxtram);
        }
//        var_dump($auxzz);exit;
        return $resultset;
    }

    
     /*
     * obtiene listado de conductores segun id de empresa
     * @return array
     */
    
    public function getConductor($idempresa){
        $conductores=$this->collection->find(array('empresa_id'=>new MongoId($idempresa)),
                    array('chofer.chofer_nom'=>true,'chofer.chofer_id'=>true));
        $listconduc=array();
        foreach($conductores as $conductor){
            $listconduc[(String)$conductor['_id']]=$conductor['chofer']['chofer_nom'];
             //(String)$conductor['chofer']['chofer_id']
            
        }
      
        return $listconduc;
        
    }




    public function buscarVehiculos($consulta,$idempresa) {
        $regex = new \MongoRegex("/$consulta/");
        $vehiculos = $this->collection->find(array('empresa_id' =>$idempresa,'nombre_corto' => $regex));
        if($vehiculos->count()==0)
        { $vehiculos = $this->collection->find(array('empresa_id' =>$idempresa,'placa' => $regex));}
        $resultvehi = array();
        foreach ($vehiculos as $value) {
            $idempresas = $value['empresa_id'];
            $dataempre = $this->collection->db->empresa->findOne(array('_id' => new \MongoId($idempresas)));
            $dataname = array('nombre_empresa' => $dataempre['nombre']);
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        return $resultvehi;
    }

    public function getVehiculosEstado($idempresa, $estado) {
        if ($estado == 1) {
            $vehiculos = $this->collection->find(array('empresa_id' => "$idempresa"));
        } elseif ($estado == 2) {
            $vehiculos = $this->collection->find(array('empresa_id' => "$idempresa", 'estado' => true));
        } else {
            $vehiculos = $this->collection->find(array('empresa_id' => "$idempresa", 'estado' => false));
        }

        $resultvehi = array();
        foreach ($vehiculos as $value) {
            $idempresas = $value['empresa_id'];
            $dataempre = $this->collection->db->empresa->findOne(array('_id' => new \MongoId($idempresas)));
            $dataname = array('nombre_empresa' => $dataempre['nombre']);
            $resultvehi[] = array_merge_recursive($value, $dataname);
        }
        return $resultvehi;
    }
  public function getVehiculoDetalle($idvehiculo,$fechaactual) {
        $vehiculo = $this->collection->findOne(array('_id' => new \MongoId($idvehiculo)));
        $resultvehi = array();
        $fechaactual= str_replace("/","-", $fechaactual);
        //$fecha=new \MongoDate(strtotime($fechaactual));
       // var_dump($fechaactual);exit;
         // var_dump($resultvehi);exit;
        $trama = $this->collection->db->tramas->findOne(array('vehiculo_id' => "$idvehiculo",'fecha_ubicacion' => array('$gt' => $fechaactual)) );
        $latitud = array('lat' => $trama['lat']);
        $longitud= array('lng' => $trama['lng']);
        $resultvehi[] = array_merge_recursive($vehiculo, $latitud, $longitud);
        
       // var_dump($resultvehi);exit;
       return json_encode($resultvehi);
    }

}
