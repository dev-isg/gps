<?php
namespace Application\Form;

use Zend\Form\Form;
//use Zend\Form\Element;


class Registrousuario extends Form
{
    public function __construct($name = null)
    {
        // we want to ignore the name passed
        parent::__construct('registrusuario');
        $this->setAttribute('method', 'post');
   //     $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
        $this->add(array(
            'name' => '_id',
            'type' => 'Hidden',
        ));
        $this->add(array(
            'name' => 'login',
            'type' => 'Text',
            'options' => array(
                //'label' => 'Usuario:',

            ),
             'attributes' => array(  
                'placeholder'=>'Ingrese su usuario',
                'class' => 'form-control placeholder-no-fix',
                'autocomplete' => 'off'
            ),
        ));
        $this->add(array(
            'name' => 'pass',
            'type' => 'password',
            'options' => array(
                //'label' => 'Pass: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese contraseña',
                   'class' => 'form-control placeholder-no-fix',
                   'autocomplete' => 'off'
            
            ),
        ));
        
        $this->add(array(
            'name' => 'nombre',
            'type' => 'Text',
            'options' => array(
                'label' => 'Nombre: ',          
            ),
              'attributes' => array(    
                   'placeholder'=>'Ingrese Nombre'
            
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
            'name' => 'rol',
            'type' => 'Select',
            'options' => array(
                'label' => 'Rol: ', 
                'value_options'=>array(
                    'administrador'=>'administrador',
                    'empresa'=>'empresa',
                    'vehiculo'=>'vehiculo'
                ),
                'empty_option'  => '--- elija ---',
            )
        ));
//        $element = new Element\Button('my-button');
//         $element->setLabel("Reset");
        $this->add(array(
            'name' => 'submit',
            'type' => 'Button',
            'options' => array(
                'label' => 'Ingresar',         
            ),
            'attributes' => array(
            
                'value' => 'Agregar',
                'id' => 'submitbutton2',
                'class' => 'btn btn-primary btn-solicito'
            ),
        ));
    }
}