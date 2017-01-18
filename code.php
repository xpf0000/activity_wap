<?php
require_once "JSSDK.php";
$jssdk = new JSSDK("wx4c9243c405c3f250", "51d0c6f11105dbdea48e1619578ad179");
$signPackage = $jssdk->GetSignPackage();
$obj = new stdClass();
$obj->appId           = $signPackage["appId"];
$obj->timestamp             = $signPackage["timestamp"];
$obj->nonceStr       = $signPackage["nonceStr"];
$obj->signature = $signPackage["signature"];
$obj->jsapi_ticket = $signPackage["jsapi_ticket"];
$obj->url = $signPackage["url"];
$obj->rawString = $signPackage["rawString"];
$obj->jsApiList         = Array();
echo json_encode($obj);


