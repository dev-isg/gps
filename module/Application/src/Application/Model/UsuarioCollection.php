<?php

namespace Application\Model;

use PhlyMongo\MongoCollectionFactory;
use PhlyMongo\MongoConnectionFactory;
use MongoCollection;
use Mongo;
use Application\Model\Usuario;
use PhlyMongo\HydratingMongoCursor;
use Zend\Stdlib\Hydrator\ObjectProperty;
use Application\Model\SessionCollection;

class UsuarioCollection {// extends MongoCollection 

    const SESSION_TIMEOUT = 600; //La sesión expira después de 10 minutos de inactividad
    const SESSION_LIFESPAN = 3600; //1 hora
    const SESSION_NAME = 'mongosessid'; //nombre de la cookie de sesión
    const SESSION_COOKIE_PATH = '/';
    const SESSION_COOKIE_DOMAIN = ''; //el nombre de dominio de tu aplicación web, por ejemplo .muaplicacion.com

    //  private $_mongo;

    private $_currentSession;
    protected $collection;

    public function __construct(MongoCollection $adapter) {//Mongo $adapter
        $this->collection = $adapter;


        if ($this->isLoggedIn())
            $this->_loadData();
        session_set_save_handler(
                array(&$this, 'open'), array(&$this, 'close'), array(&$this, 'read'), array(&$this, 'write'), array(&$this, 'destroy'), array(&$this, 'gc')
        );

        // configura periodo recolección de basura
        ini_set('session.gc_maxlifetime', UsuarioCollection::SESSION_LIFESPAN);

        session_set_cookie_params(UsuarioCollection::SESSION_LIFESPAN, UsuarioCollection::SESSION_COOKIE_PATH, UsuarioCollection::SESSION_COOKIE_DOMAIN
        );


        session_name(UsuarioCollection::SESSION_NAME);
        session_cache_limiter('nocache');
        session_start();
    }

    public function eliminarUsuario($valor) {
        $usarios = $this->collection->remove(array('_id' => new \MongoId($valor)));
        if ($usarios == true) {
            return $usarios;
        } else {
            echo 'error al eliminar';
        }
    }

    public function findAll() {

        $usarios = $this->collection->find(); //$this->collection->db_gps2->usuario->find();
        $resultados = array();
        foreach ($usarios as $result) {
            $resultados[] = $result;
        }

        return $resultados;
    }

    public function agregarUsuario($valor, $usuario_id = null, $accion = null) {
        $cantidad = array('login' => $valor->login,
            'pass' => $valor->pass,
            'rol' => $valor->rol);
        if ($accion == null) {
            $cantidad['_id'] = new \MongoId();
            $usarios = $this->collection->insert($cantidad);
            return $cantidad['_id'];
        } else {
            $usarios = $this->collection->update(array('_id' => new \MongoId($usuario_id)), $cantidad);
            return $cantidad['_id'];
        }
    }

    public function obtenerUsuario($id) {

        $usarios = $this->collection->findOne(array('_id' => new \MongoId($id)));
        if (!$usarios) {
            throw new \Exception("Could not find row $id");
        }
        return $usarios;
    }

    public function obtenerUsuarioLogin($datos) {
        $cantidad = array('login' => $datos->login,
            'pass' => $datos->pass);
        $usarios = $this->collection->findOne($cantidad);
        $usuariorol = array();
        if ($usarios['rol'] == 'empresa') {
            $id = (String) $usarios['_id'];
            $datausuario = $this->collection->db->empresa->findOne(array('usuario_id' => $id));
            $dataname = array('_idrol' => (String) $datausuario['_id']);
            $nombre=array('nombre' => $datausuario['nombre']);
        } elseif ($usarios['rol'] == 'administrador') {
            $datausuario = $this->collection->db->administrador->findOne(array('usuario_id' => new \MongoId($usarios['_id'])));
            $dataname = array('_idrol' => (String) $datausuario['_id']);
            $nombre=array('nombre' => $datausuario['nombre']);

        } else {
            $id = (String) $usarios['_id'];
            $datausuario = $this->collection->db->vehiculo->findOne(array('usuario_id' => $id));
            $dataname = array('_idrol' => (String) $datausuario['_id']);
            $nombre=array('nombre' =>$datausuario['chofer']['chofer_nom']);
        }
        $usuariorol[] = array_merge_recursive($usarios, $dataname,$nombre);
        if (empty($usuariorol[0]['_id'])) {
            return False;
        } else {
            $_SESSION['user_id'] = (string) $usuariorol[0]['_id'];
            $_SESSION['rol'] = (string) $usuariorol[0]['rol'];
            $_SESSION['_idrol'] = (string) $usuariorol[0]['_idrol'];
            $_SESSION['nombre'] =  $usuariorol[0]['nombre'];

            $this->write($usuariorol[0]['_id'], $usuariorol);

            return True;
        }
    }

    public function read() {
        $query = array(
            'user_id' => $_SESSION['user_id'],
            'timedout_at' => array('$gte' => time()),
            'expired_at' => array('$gte' => time())
        );

        $result = $this->collection->db->session->findOne($query);

        $this->_currentSession = $result;
        // var_dump($result[0]['user_id']);exit;
        if (!isset($result)) {
            return false;
        }

        return $result;
    }

    public function isLoggedIn() {
        return isset($_SESSION['user_id']);
    }

    private function _loadData() {
        $id = new \MongoId($_SESSION['user_id']);
        $usarios = $this->collection->db->session->findOne(array('_id' => $id));
        return $usarios;
    }

    public function logout() {
        session_destroy();
        $this->collection->db->session->remove(array('user_id' => $_SESSION['user_id']));
        return True;
    }

    public function write($sessionId, $data) {
        // $valor= array('rol'=>$data[0]['rol'],'_idrol'=>$data[0]['_idrol']); 
        $new_obj = array(
            'rol' => $data[0]['rol'], '_idrol' => $data[0]['_idrol'],'nombre'=>$data[0]['nombre'], //'data' => $data,
            'upsert' => True,
            'user_id' => (string) $sessionId,
            'timedout_at' => time() + self::SESSION_TIMEOUT,
            'expired_at' => (empty($this->_currentSession)) ? time() + UsuarioCollection::SESSION_LIFESPAN : $this->_currentSession['expired_at']
        );
        //  var_dump($new_obj);exit;
        // $query = array('session_id' => $sessionId);

        $this->collection->db->session->insert(
                $new_obj
        );

        return True;
    }

    public function open($path, $name) {
        return true;
    }

    public function close() {
        return true;
    }

    public function gc() {
        $query = array('expired_at' => array('$lt' => time()));

        $this->collection->db->session->remove($query);

        return True;
    }

    public function __destruct() {
        session_write_close();
    }

}

//$session = new UsuarioCollection();