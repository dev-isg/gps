<?php
namespace Application\Model;

use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class Administrador
{
    public $_id;
    public $id;
    public $login;
    public $pass;
    public $rol;
    public $nombre;
    public $usuario_id;
    
    public function exchangeArray($data)
    {
        $this->_id     = (!empty($data['_id'])) ? $data['_id'] : null;
        $this->id = (!empty($data['id'])) ? $data['id'] : null;
        $this->login = (!empty($data['login'])) ? $data['login'] : null;
        $this->pass= (!empty($data['pass'])) ? $data['pass'] : null;
        $this->rol     = (!empty($data['rol'])) ? $data['rol'] : null;
        $this->nombre     = (!empty($data['nombre'])) ? $data['nombre'] : null;
        $this->usuario_id     = (!empty($data['usuario_id'])) ? $data['usuario_id'] : null;
    }
// Add content to theombrese methods:
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
                'name'     => 'usuario_id',
                'required' => false,
                'filters'  => array(
                    array('name' => 'Int'),
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
                            'max'      => 100,
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
                            'min'      => 2,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));
 $inputFilter->add($factory->createInput(array(
                'name'     => 'pass2',
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