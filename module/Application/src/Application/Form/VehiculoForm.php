<?php
namespace Application\Form;
use Zend\Form\Form;

class VehiculoForm extends Form{
    public function __construct($name = null, $options = array()) {
        parent::__construct($name);
        
        $this->setAttribute('method', 'post');
     //   $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
        
//        $this->add(array(
//            'name' => 'id',
//            'type' => 'Hidden',
//        ));
        $this->add(array(
            'name' => 'nombre_corto',
            'type' => 'Text',
            'options' => array(
                'label' => 'Nombre de vehiculo: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese login'
            ),
        ));
        
        $this->add(array(
            'name' => 'chofer_nom',
            'type' => 'Text',
            'options' => array(
                'label' => 'nombre de chofer: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese rol'
            
            ),
        ));
           
       $this->add(array(
            'name' => 'empresa_id',
            'type' => 'Select',
            'options' => array(
                'label' => 'Empresa: ', 
                'value_options'=>array(
                    '1'=>'La estafa SAC',
                    '528ba218bf8eb1f40e000009'=>'Gps corporation'
                ),
                'empty_option'  => '--- Sin Empresa ---',
            )
        ));
        
        $this->add(array(
            'name' => 'submit',
            'type' => 'Text',
            'options' => array(
                'label' => 'Rol',          
            ),
            'attributes' => array(
            
                'value' => 'Agregar',
                'id' => 'submitbutton2',
                'class' => 'btn btn-primary btn-solicito'
            ),
        ));

    }
    
}