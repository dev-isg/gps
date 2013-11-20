<?php
namespace Application\Form;

use Zend\Form\Form;
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
                'label' => 'Login: ',          
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