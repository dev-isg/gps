<?php
namespace Application\Model;

use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class Empresa
{
    public $_id;
    public $descripcion;
    public $ruc;
    public $nombre;
    public $direccion;
    public $usuario_id;
    public $login;
    public $pass;
    public $rol;
    public $email;
    public $telefono;
    
    
    public function exchangeArray($data)
    {
        $this->_id     = (!empty($data['_id'])) ? $data['_id'] : null;
        $this->descripcion = (!empty($data['descripcion'])) ? $data['descripcion'] : null;
        $this->ruc = (!empty($data['ruc'])) ? $data['ruc'] : null;
        $this->nombre= (!empty($data['nombre'])) ? $data['nombre'] : null;
        $this->direccion    = (!empty($data['direccion'])) ? $data['direccion'] : null;
        $this->usuario_id    = (!empty($data['usuario_id'])) ? $data['usuario_id'] : null;
        $this->login = (!empty($data['login'])) ? $data['login'] : null;
        $this->pass= (!empty($data['pass'])) ? $data['pass'] : null;
        $this->rol     = (!empty($data['rol'])) ? $data['rol'] : null;
        $this->email     = (!empty($data['email'])) ? $data['email'] : null;
         $this->telefono     = (!empty($data['telefono'])) ? $data['telefono'] : null;
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
                'name'     => '_id',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
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
                'name'     => 'enviar',
                'required' => false,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
             $inputFilter->add($factory->createInput(array(
                'name'     => 'usuario_id',
                'required' => true,
               'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
            )));
           $inputFilter->add($factory->createInput(array(
                'name'     => 'telefono',
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
                'name'     => 'descripcion',
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
                            'min'      => 10,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
            $inputFilter->add($factory->createInput(array(
                'name'     => 'ruc',
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
                            'min'      => 5,
                            'max'      => 20,
                        ),
                    ),
                ),
            )));
 $inputFilter->add($factory->createInput(array(
                'name'     => 'nombre',
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
                'name'     => 'direccion',
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
                            'max'      =>200 ,
                        ),
                    ),
                ),
            )));
         $inputFilter->add($factory->createInput(array(
                'name'     => 'usuario_id',
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
                            'min'      => 6,
                            'max'      =>30 ,
                        ),
                    ),
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
                'name'     => 'pass2',
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
        
         
            $this->inputFilter = $inputFilter;
        }

        return $this->inputFilter;
    }
}