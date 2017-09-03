<?php
class Martin_Bcshipping_Model_Resource_Price_Collection extends
    Mage_Core_Model_Resource_Db_Collection_Abstract{
    protected function _construct()
    {
        parent::_construct(); // TODO: Change the autogenerated stub
        $this->_init('bcshipping/price');
    }

    protected function _afterLoad()
    {
        parent::_afterLoad();
        $helper=Mage::helper('flytcloud');
        foreach($this as $item){
            $countryName=$helper->getCountryById($item->getCountry());
            $item->setCountry($countryName);
        }
        return $this;
    }
}