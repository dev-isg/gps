<?php
namespace Application\Model;

use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class Vehiculo
{
   
    public $chofer_nom;
    public $chofer_telefono;
    public $chofer_estado;

    
    public $_id;
    public $usuario_id;
    
    public $login;
    public $pass;
    public $rol;
    
    public $empresa_id;
    public $email;

    public $nombre_corto;
    public $num_imei;
    public $num_sim;
    public $color_ruta;
    public $placa;
    public $estado;
    
    
    
    public function exchangeArray($data)
    {
        $this->chofer_nom     = (!empty($data['chofer_nom'])) ? $data['chofer_nom'] : null;
        $this->chofer_telefono    = (!empty($data['chofer_telefono'])) ? $data['chofer_telefono'] : null;
        $this->chofer_estado    = (!empty($data['chofer_estado'])) ? $data['chofer_estado'] : null;
         $this->_id     = (!empty($data['_id'])) ? $data['_id'] : null;
        
       
        $this->usuario_id = (!empty($data['usuario_id'])) ? $data['usuario_id'] : null;
        $this->login = (!empty($data['login'])) ? $data['login'] : null;
        $this->pass= (!empty($data['pass'])) ? $data['pass'] : null;
        $this->rol     = (!empty($data['rol'])) ? $data['rol'] : null;
        
        $this->empresa_id = (!empty($data['empresa_id'])) ? $data['empresa_id'] : null;
        $this->email     = (!empty($data['email'])) ? $data['email'] : null;
         
        $this->nombre_corto= (!empty($data['nombre_corto'])) ? $data['nombre_corto'] : null;
        $this->num_imei    = (!empty($data['num_imei'])) ? $data['num_imei'] : null;
        $this->num_sim    = (!empty($data['num_sim'])) ? $data['num_sim'] : null;
        
        $this->color_ruta= (!empty($data['color_ruta'])) ? $data['color_ruta'] : null;
        $this->placa    = (!empty($data['placa'])) ? $data['placa'] : null;
        $this->estado    = (!empty($data['estado'])) ? $data['estado'] : null;
      
        
       
       
    }
// Add content to these methods:
    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception("Not used");
    }
    public function getArrayCopy()
    {
        return get_object_vars($this);
    }

    public function getInputFilter()
    {
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
            $factory     = new InputFactory();

            
            $inputFilter->add($factory->createInput(array(
                'name'     => 'chofer_nom',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 5,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
            
            $inputFilter->add($factory->createInput(array(
                'name'     => 'chofer_telefono',
                'required' => false,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 1,
                            'max'      => 18,
                        ),
                    ),
                ),
            )));
//            $inputFilter->add($factory->createInput(array(
//                'name'     => 'chofer_estado',
//                'required' => true,
//               'filters'  => array(
//                    array('name' => 'StripTags'),
//                    array('name' => 'StringTrim'),
//                ),
//            )));
            $inputFilter->add($factory->createInput(array(
                'name'     => '_id',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
                ),
            )));
               $inputFilter->add($factory->createInput(array(
                'name'     => 'usuario_id',
                'required' => false,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
               
             $inputFilter->add($factory->createInput(array(
                'name'     => 'login',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 6,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
             $inputFilter->add($factory->createInput(array(
                'name'     => 'pass',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 6,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
             $inputFilter->add($factory->createInput(array(
                'name'     => 'rol',
                'required' => true,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
             $inputFilter->add($factory->createInput(array(
                'name'     => 'empresa_id',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
                ),
            )));
             $inputFilter->add($factory->createInput(array( 
                'name' => 'email', 
                'required' => true, 
                'filters' => array( 
                    array('name' => 'StripTags'), 
                    array('name' => 'StringTrim'), 
                ), 
                'validators' => array( 
                    array( 
                        'name' => 'EmailAddress', 
                        'options' => array( 
                            'encoding' => 'UTF-8', 
                            'min'      => 5, 
                            'max'      => 255, 
                            'messages' => array( 
                                \Zend\Validator\EmailAddress::INVALID_FORMAT => 'Formato de Email Inválido' 
                            ) 
                        ), 
                    ), 
                ), 
            )));
             
             $inputFilter->add($factory->createInput(array(
                'name'     => 'nombre_corto',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 5,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
             $inputFilter->add($factory->createInput(array(
                'name'     => 'num_imei',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
                ),
            )));
             
                 $inputFilter->add($factory->createInput(array(
                'name'     => 'num_sim',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
                ),
            )));
                $inputFilter->add($factory->createInput(array(
                'name'     => 'color_ruta',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 5,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
             
             $inputFilter->add($factory->createInput(array(
                'name'     => 'placa',
                'required' => false,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
//                $inputFilter->add($factory->createInput(array(
//                'name'     => 'estado',
//                'required' => false,
//               'filters'  => array(
//                    array('name' => 'StripTags'),
//                    array('name' => 'StringTrim'),
//                ),
//            )));
             
             
             
             
             
               
               
               
            
            
            
             
          
             
             $inputFilter->add($factory->createInput(array(
                'name'     => 'enviar',
                'required' => false,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
             
       
    

 
        

        
         
            $this->inputFilter = $inputFilter;
        }

        return $this->inputFilter;
    }
}