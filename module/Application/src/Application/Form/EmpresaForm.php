<?php
namespace Application\Form;
use Zend\Form\Form;

class EmpresaForm extends Form{
    public function __construct($name = null, $options = array()) {
        parent::__construct($name);
        
        $this->setAttribute('method', 'post');
     //   $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
        
        $this->add(array(
            'name' => '_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'rol',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'usuario_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'descripcion',
            'type' => 'Textarea',
            'options' => array(
                'label' => 'descripción: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese descripcion'
            ),
        ));
           $this->add(array(
            'name' => 'passantiguo',
            'type' => 'password',
            'options' => array(
                'label' => 'Contraseña Actual: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese Contraseña Actual'
            
            ),
        ));
         $this->add(array(
            'name' => 'telefono',
            'type' => 'Text',       
            'options' => array(
                'label' => 'Teléfono',          
            ),
            'attributes' => array(               
                'class' => 'span10  ',
                'id'   => 'va_telefono',
                'placeholder'=>'Ingrese el telefono'
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
            'name' => 'ruc',
            'type' => 'Text',
            'options' => array(
                'label' => 'ruc: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese ruc'
            
            ),
        ));
           
     $this->add(array(
            'name' => 'nombre',
            'type' => 'Text',
            'options' => array(
                'label' => 'nombre: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese nombre'
            
            ),
        ));
     $this->add(array(
            'name' => 'direccion',
            'type' => 'Text',
            'options' => array(
                'label' => 'dirección: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese direccion'
            
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
            'name' => 'submit',
            'type' => 'Text',
            'options' => array(
                'label' => 'add',          
            ),
            'attributes' => array(
            
                'value' => 'Agregar',
                'id' => 'submitbutton2',
                'class' => 'btn btn-primary btn-solicito'
            ),
        ));

    }
    
}