<?php

spl_autoload_register(function ($class) {
	
	//echo __DIR__ . "/src/$class.php";
    require __DIR__ . "/src/$class.php";
});
$emailcontroller = new TestSendEmail();
$emailcontroller->processSend('deviltse@gmail.com', 'Devil');
?>