<?php
include('app/Mage.php');
Mage::app();

var_dump($_SERVER['argv']);
exit();

$ob = Mage::getModel('Facebook_AdsToolbox/observer');
$obins = new $ob;
$use_cache = false;
$store_id = 8;
$currency = 'AUD';
$obins->internalGenerateFacebookProductFeed(false, $use_cache,$store_id,$currency);

echo 'success';
