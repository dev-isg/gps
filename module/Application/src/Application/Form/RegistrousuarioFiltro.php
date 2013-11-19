<?php
namespace Application\Form;
use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class RegistrousuarioFiltro extends InputFilter{
    
    public function __construct(){
      
        $this->add(array(
            'name'=>'login',
            'required'=>true,
            'validators'=>array(
              array(
                'name'    => 'StringLength',
                'options' => array(
                    'encoding' => 'UTF-8',
                    'min'      => 3,
                    'max'      => 100,
                ),
            ))    
        ));
        
       
        
        
          $this->add(array(
            'name' => 'pass',
            'required' => true,
             'validators'=>array(
              array(
                'name'    => 'StringLength',
                'options' => array(
                    'encoding' => 'UTF-8',
                    'min'      => 3,
                    'max'      => 250,
                ),
            )) 
        ));
          
          $this->add(array(
                    'name'     => 'rol',
                    'required' => false,
                     'validators' => array(
                    array(
                        'name'    => 'filemimetype',
                      //  'options' =>  array('mimeType' => 'image/png,image/x-png,image/jpg,image/gif,image/jpeg'),
                        'options' =>  array('mimeType' => 'image/jpg,image/jpeg'),
                    ),
                    array(
                        'name'    => 'filesize',
                        'options' =>  array('max' => 204800),
                    ),
                  ),
               )
            );
                
      
        
    } 
}
