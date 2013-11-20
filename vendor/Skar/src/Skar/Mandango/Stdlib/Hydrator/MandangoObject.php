<?php
namespace Skar\Mandango\Stdlib\Hydrator;

use Zend\Stdlib\Hydrator\AbstractHydrator;
use Mandango\Mandango;

class MandangoObject extends AbstractHydrator {
    /**
     * @var Mandango
     */
    protected $mandango;

    /**
     * @var array
     */
    protected $metadata;

    /**
     * Constructor
     *
     * @param Mandango $objectManager The ObjectManager to use
     * @param string   $modelClass    The FQCN of the hydrated/extracted object
     */
    public function __construct(Mandango $mandango, $modelClass)
    {
        parent::__construct();

        $this->mandango   = $mandango;
        $this->metadata   = $mandango->getMetadata($modelClass);
    }

    /**
     * Extract values from an object
     *
     * @param  object $object
     * @return array
     */
    public function extract($object) {
        $fields  = $this->metadata['fields'];

        $data = array();
        foreach ($fields as $fieldName => $field) {
            $getter = 'get' . ucfirst($fieldName);

            if (isset($field['referenceField']) && $field['referenceField'] == true) {
//                $fieldName = str_replace('_reference_field', '', $fieldName);
//                $getter    = 'get' . ucfirst($fieldName);
                $getter    = 'get' . ucfirst($fieldName);
                $fieldName = str_replace('_reference_field', '', $fieldName);
            }

            // Ignore unknown fields
            if (!method_exists($object, $getter)) {
                continue;
            }

            $data[$fieldName] = $this->extractValue($fieldName, $object->$getter());
        }

        return $data;
    }

    /**
     * Hydrate $object with the provided $data.
     *
     * @param  array  $data
     * @param  object $object
     * @return object
     */
    public function hydrate(array $data, $object) {
        $fields  = $this->metadata;

        if (isset($data['id'])) {
            unset($data['id']);
        }

        foreach ($data as $fieldName => &$value) {
            if (isset($fields['referencesMany'][$fieldName])) {
                $ucFieldName = ucfirst($fieldName);
                $setter   = 'add'    . $ucFieldName;
                $getter   = 'get'    . $ucFieldName;
                $remover  = 'remove' . $ucFieldName;
                $refClass = $fields['referencesMany'][$fieldName]['class'];

                if (!method_exists($object, $setter)) {
                    continue;
                }

                foreach ($value as $k => $v) {
                    $value[$k] = $this->mandango->getRepository($refClass)->findOneById($v);
                }

                $object->$remover($object->$getter()->all());
                $object->$setter($value);

                continue;
            }

            $setter = 'set' . ucfirst($fieldName);

            if (isset($fields['referencesOne'][$fieldName])) {
                $refClass = $fields['referencesOne'][$fieldName]['class'];
                $value = $this->mandango->getRepository($refClass)->findOneById($value);
            }

            if (!method_exists($object, $setter)) {
                continue;
            }

            $value = $this->hydrateValue($fieldName, $value);

            $object->$setter($value);
        }

        return $object;
    }
}