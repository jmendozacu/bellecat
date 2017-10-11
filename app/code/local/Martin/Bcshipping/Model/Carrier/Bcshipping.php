<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    Mage
 * @package     Mage_Shipping
 * @copyright  Copyright (c) 2006-2015 X.commerce, Inc. (http://www.magento.com)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */


/**
 * Free shipping model
 *
 * @category   Mage
 * @package    Mage_Shipping
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Martin_Bcshipping_Model_Carrier_Bcshipping
    extends Mage_Shipping_Model_Carrier_Abstract
    implements Mage_Shipping_Model_Carrier_Interface
{

    /**
     * Carrier's code
     *
     * @var string
     */
    protected $_code = 'bcshipping';

    /**
     * Whether this carrier has fixed rates calculation
     *
     * @var bool
     */
    protected $_isFixed = true;

    /**
     * FreeShipping Rates Collector
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Result
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request)
    {

        if (!$this->getConfigFlag('active')) {
            return false;
        }

        $result = Mage::getModel('shipping/rate_result');

        $method = Mage::getModel('shipping/rate_result_method');

        $method->setCarrier('bcshipping');
        $method->setCarrierTitle($this->getConfigData('title'));

        $method->setMethod('bcshipping');
        $method->setMethodTitle($this->getConfigData('name'));

        $dest_country_id = $request->getDestCountryId();
        $items = $request->getAllItems();

        $shipping_cost  = 0;

        $qty = 0;

        if ($request->getAllItems()) {

            foreach ($request->getAllItems() as $item) {
                if ($item->getProduct()->isVirtual() || $item->getParentItem()) {
                    continue;
                }
                $product_id = $item->getProductId();
                $product = Mage::getModel('catalog/product')->load($product_id);
                $product_price = $product->getPrice();
                $product_cost = Mage::helper('bcshipping')->calculate($product,$dest_country_id);
                if($product_cost-$product_price>0){
                    $shipping_cost = $shipping_cost+($product_cost-$product_price-0.01)*$item->getQty();
                }
                $qty = $qty+$item->getQty();
            }
        }

        $discount = Mage::getStoreConfig('bcshipping/general/discount');
        if($qty>=2 && $discount>0){
            $shipping_cost = $shipping_cost*$discount;
        }

        $free_shipping = Mage::getStoreConfig('bcshipping/general/freeshipping');

        if($free_shipping>0 && ($free_shipping<$request->getPackageValue())){
            $shipping_cost = 0;
        }

        $method->setPrice($shipping_cost);
        $method->setCost($shipping_cost);

        $result->append($method);


        return $result;
    }

    /**
     * Allows free shipping when all product items have free shipping (promotions etc.)
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return void
     */
    protected function _updateFreeMethodQuote($request)
    {
        $freeShipping = false;
        $items = $request->getAllItems();
        $c = count($items);
        for ($i = 0; $i < $c; $i++) {
            if ($items[$i]->getProduct() instanceof Mage_Catalog_Model_Product) {
                if ($items[$i]->getFreeShipping()) {
                    $freeShipping = true;
                } else {
                    return;
                }
            }
        }
        if ($freeShipping) {
            $request->setFreeShipping(true);
        }
    }

    /**
     * Get allowed shipping methods
     *
     * @return array
     */
    public function getAllowedMethods()
    {
        return array('freeshipping' => $this->getConfigData('name'));
    }

}
