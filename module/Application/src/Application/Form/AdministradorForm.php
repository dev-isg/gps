<?php
namespace Application\Form;

use Zend\Form\Form;
class AdministradorForm extends Form
{
    public function __construct($name = null)
    {
        // we want to ignore the name passed
        parent::__construct('registroadministrador');
        $this->setAttribute('method', 'post');
   //     $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
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
            'name' => 'login',
            'type' => 'Text',
            'options' => array(
                'label' => 'Usuario: ',          
            ),
             'attributes' => array(  
                  'placeholder'=>'Ingrese Usuario'
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