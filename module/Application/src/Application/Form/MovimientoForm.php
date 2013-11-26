<?php
namespace Application\Form;
use Zend\Form\Form;
use Zend\InputFilter\InputFilterProviderInterface;
use Zend\InputFilter\InputFilter;

class MovimientoForm extends Form{
    
        public function __construct($name = null, $options = array()) {
        parent::__construct($name);
        
        $this->setAttribute('method', 'post');
     //   $this->setInputFilter(new \Application\Form\RegistrousuarioFiltro());
        
        $this->add(array(
            'name' => '_id',
            'type' => 'Hidden',
        ));

      $this->add(array(
            'name' => 'fechainicio',
            'type' => 'Zend\Form\Element\Date',
          'attributes'=>array('class'=>'form-control'),
          'options' => array(
//                'label' => 'De:',
//                'label_attributes'=>array('class'=>'sr-only')
            ),
        ));
      
      $this->add(array(
            'name' => 'fechafin',
            'type' => 'Zend\Form\Element\Date',
            'attributes'=>array('class'=>'form-control'),
             'options' => array(
//                'label' => 'Hasta:',
//                'label_attributes'=>'col-sm-2 control-label'
            ),
        ));
//      
//         $this->add(array(
//            'name' => 'placa',
//            'type' => 'Text',
//            'options' => array(
//                'label' => 'placa: ',          
//            ),
//              'attributes' => array(    
//                   'placeholder'=>'Ingrese placa'
//            
//            ),
//        ));
//        
//      
//             $this->add(array(
//            'name' => 'chofer_telefono',
//            'type' => 'Text',
//            'options' => array(
//                'label' => 'teléfono: ',          
//            ),
//              'attributes' => array(    
//                   'placeholder'=>'Ingrese teléfono'
//            
//            ),
//        ));
//         
   
        $this->add(array(
            'name' => 'submit',
            'type' => 'Text',
            'options' => array(
                'label' => 'Buscar',          
            ),
            'attributes' => array(
                'value' => 'Buscar',
                'id' => 'submitbutton2',
                'class' => 'modificar btn btn-success'
            ),
        ));
        
        $this->setInputFilter( $this->validadores());
    }
    
        public function validadores(){
    
        $inputFilter = new InputFilter();
  
        $inputFilter->add(array(
            'name' => 'fechainicio',
            'required' => true,

        ));
        
        $inputFilter->add(array(
            'name' => 'fechafin',
            'required' => true,

        ));
         
    
        return $inputFilter;
    }
    
}
