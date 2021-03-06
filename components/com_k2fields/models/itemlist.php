<?php
//$Copyright$

// no direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.application.component.model');

JLoader::import('itemlist', JPATH_SITE . '/components/com_k2/models');

/**
 * @@note: naming conventions in order to avoid fnc name collisions
 * 
 * all top level funcs prefixed with sql
 * all type based criteria returning fncs prefixed with _
 * all operator based criteria returning fncs names the same as operators: eq, ge, le, gte, lte, in, ex, hi, pr, an
 */

class K2FieldsModelItemlist extends K2ModelItemlist {
        var $_sts, $_p = false;
        
        function __construct($config = array(), $requestData = null) {
                $config['data'] = $requestData;
                $this->_sts = JModel::getInstance('searchterms', 'K2FieldsModel', $config);
                parent::__construct($config);
        }
        
        function getData($ordering = NULL) {
                if (JRequest::getInt('_limit_')) {
                        $lim = JRequest::getInt('limit');
                        JRequest::setVar('limit', JRequest::getInt('_limit_'));
                }
                
                $data = $this->_sts->getData(NULL, $ordering);

                if ($data === false) {
                        $this->_p = true;
                        return parent::getData(NULL, $ordering);
                }
                
                if (isset($lim)) JRequest::setVar('limit', $lim);
                
                return $data;
        }
        
        function getTotal() {
                return $this->_p ? parent::getTotal() : $this->_sts->getTotal();
        }
}

?>
