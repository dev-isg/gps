<?php
namespace Application\Form;
use Zend\Form\Form;
use Zend\InputFilter\InputFilterProviderInterface;
use Zend\InputFilter\InputFilter;

class VehiculoForm extends Form{
    public function __construct($name = null, $options = array()) {
        parent::__construct($name);
        
        $this->setAttribute('method', 'post');
     //   $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
        
        $this->add(array(
            'name' => '_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'empresa_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'usuario_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'rol',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'nombre_corto',
            'type' => 'Text',
            'options' => array(
                'label' => 'Nombre del vehículo: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'ingrese Nombre del vehículo'
            ),
        ));
        
          $this->add(array(
            'name' => 'chofer_nom',
            'type' => 'Text',
            'options' => array(
                'label' => 'Nombre del chofer: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'ingrese nombre del chofer'
            
            ),
        ));
        $this->add(array(
            'name' => 'email',
            'type' => 'Text',
            'options' => array(
                'label' => 'Correo: ',          
            ),
            'attributes' => array(
                'class' => 'span10',
                'placeholder' => 'Ingrese el mail... '
            ),
        ));
        
         $this->add(array(
            'name' => 'login',
            'type' => 'Text',
            'options' => array(
                'label' => 'Usuario: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese login'
            ),
        ));
         $this->add(array(
            'name' => 'num_imei',
            'type' => 'Text',
            'options' => array(
                'label' => 'num_imei: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese num_imei'
            ),
        ));
          $this->add(array(
            'name' => 'num_sim',
            'type' => 'Text',
            'options' => array(
                'label' => 'num_sim: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese num_sim'
            ),
        ));
        $this->add(array(
            'name' => 'pass',
            'type' => 'password',
            'options' => array(
                'label' => 'Pass: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese pass'
            
            ),
        ));
        $this->add(array(
            'name' => 'pass2',
            'type' => 'password',
            'options' => array(
                'label' => 'Repita Pass: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Repita su pass'
            
            ),
        ));
        $this->add(array(
            'name' => 'color_ruta',
            'type' => 'Text',
            'options' => array(
                'label' => 'color_ruta: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese color_ruta'
            
            ),
        ));
         $this->add(array(
            'name' => 'placa',
            'type' => 'Text',
            'options' => array(
                'label' => 'placa: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese placa'
            
            ),
        ));
        
//         $this->add(array(
//            'name' => 'estado',
//            'type' => 'Text',
//            'options' => array(
//                'label' => ' estado: ',          
//            ),
//              'attributes' => array(    
//                   'placeholder'=>'Repita '
//            
//            ),
//        )); 
       

             $this->add(array(
            'name' => 'chofer_telefono',
            'type' => 'Text',
            'options' => array(
                'label' => 'teléfono: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese teléfono'
            
            ),
        ));
         
    
          $this->add(array(
            'type' => 'Checkbox',
            'name' => 'enviar',
         
            'options' => array(
                'label' => 'enviar credenciales?: ',  
                'use_hidden_element' => true,
                'checked_value' => 'si',
                'unchecked_value' => 'no'
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
        
      //  $this->setInputFilter( $this->validadores());
    }
    
//        public function validadores(){
//    
//        $inputFilter = new InputFilter();
//  
//        $inputFilter->add(array(
//            'name' => '_id',
//            'required' => false,
//
//        ));
//         
//    
//        return $inputFilter;
//    }
//    
}