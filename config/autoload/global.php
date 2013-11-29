<?php
return array(
      'mongo' => array(  
        'server'         => 'mongodb://192.168.1.50',
        'server_options' => array('connect' => true),
      'db'             => 'db_gps2',
    ),
   'host' => array(
            'base' => 'http://192.168.1.35:84',
            'static' => 'http://192.168.1.35:84',
            'images' => 'http://192.168.1.35:84/imagenes',
            'img'=>'http://192.168.1.35:84/img',
            'ruta' => 'http://192.168.1.35:84',
            'version'=>1,
        ),
    'variables'=>array(
            'tiempo_parada'=>10    
        ),
    
      'mail' => array(
        'transport' => array(
            'options' => array(
                'host'              => 'smtp.innovationssystems.com',
                'connection_class'  => 'login',
                'connection_config' => array(
                    'username' => 'listadelsabor@innovationssystems.com',
                    'password' => 'L1st@d3ls@b0r',
                ),
            ),
        ),
    ),
     'session' => array(
        'config' => array(
            'class' => 'Zend\Session\Config\SessionConfig',
            'options' => array(
                'name' => 'myapp',
            ),
        ),
        'storage' => 'Zend\Session\Storage\SessionArrayStorage',
        'validators' => array(
            array(
                'Zend\Session\Validator\RemoteAddr',
                'Zend\Session\Validator\HttpUserAgent',
            ),
        ),
    ),
    
);
