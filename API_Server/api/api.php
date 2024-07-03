
<?php


spl_autoload_register(function ($class) {
	
	//echo __DIR__ . "/src/$class.php";
    require __DIR__ . "/src/$class.php";
});
//set_exception_handle("ErrorHandler::handleException");
session_start();
/*if($_SESSION["userinfo"] == null)
{
	header("Location: ../");
	die;
}
*/


$parts = explode("/", $_SERVER["REQUEST_URI"]);

header("Content-type: application/json; charset=UTF-8");

$database = new Database("localhost", "traveldb", "traveluser", "mt13579");

$gateway = new TravelGateway($database);
$controller = new TravelController($gateway);
$smscontroller = new SendSMS();
$emailcontroller = new SendEmail();
//echo $parts[2];
//echo $_POST['ActionType'];

if($_POST['ActionType'] == "GetOTP"){
	
	if($_POST['method'] == "email")
	{
		$email = $_POST['email'];
		$userinfo= $controller->processGetUserInfoByEmail(trim($email));
		
		//echo "xxxxxx " .$userinfo->email ." " . $userinfo->displayname ." " .$_POST["method"];
		if($userinfo!=null)
		{
			$otpcode = rand(100000,999999);
			$controller->processUpdateOTPInfoByEmail($email, $otpcode, time(), 0, "");

			$emailcontroller->processSend($otpcode, $userinfo->email, $userinfo->displayname, $userinfo->language);
			echo json_encode(["otpcode_sent" => true, "language" => $userinfo->language]);
			//echo "otpcode_sent" ;
		}else{
			//session_unset();
			
			//header("Location: ../index.php?loginstatus=error");
			echo "requestotpcode_failed";
			die;
		}
	}else if($_POST['method'] == "sms"){
		$mobile = $_POST['mobile'];
		$ccode = $_POST['countrycode'];
		$userinfo= $controller->processGetUserInfoByMobile(trim($mobile), trim($ccode));
		
		//echo "xxxxxx " .$userinfo->email ." " . $userinfo->displayname ." " .$_POST["method"];
		if($userinfo!=null)
		{
			$otpcode = rand(100000,999999);
			$controller->processUpdateOTPInfoByMobile($mobile, $ccode, $otpcode, time(), 0, "");

			$smscontroller->processSend($userinfo, $otpcode);
			echo json_encode(["otpcode_sent" => true, "language" => $userinfo->language]);
			//echo "otpcode_sent" ;
		}else{
			//session_unset();
			
			//header("Location: ../index.php?loginstatus=error");
			echo "requestotpcode_failed";
			die;
		}
	}
}else if($_POST['ActionType'] == "CheckOTP"){
	//CheckOTP

	if($_POST['method'] == "email")
	{
		$userinfo= $controller->processGetUserInfoByEmail(trim($_POST['email']));
		
		
		$counter =(int)($userinfo->otpcounter);
		$counter++;	
		if(($userinfo->otpcode == $_POST['otpcode']) && ($userinfo->otpcode != '') &&  ($counter < 3))
		{
			if( (time() - $userinfo->otptime) < 100)
			{
				$hashcode = sha1_64bitInt(time());

				$controller->processUpdateOTPInfoByEmail(trim($_POST['email']), '', time(), 0, $hashcode);

				$userinfo= $controller->processGetUserInfoByEmail(trim($_POST['email']));
				echo json_encode(["otpresult" => "otpcode_ok", "userinfo" => $userinfo]);
			}else{
				echo json_encode(["otpresult" => "otpcode_expired"]);	
			}
		}else{
			if($counter < 3)
			{
				$controller->processUpdateOTPCounterByEmail(trim($_POST['email']), $counter);
				echo json_encode(["otpresult" => "otpcode_again"]);
			}else{
				$controller->processUpdateOTPInfoByEmail(trim($_POST['email']), '', time(), $counter, "");
				echo json_encode(["otpresult" => "otpcode_failed"]);
			}
		}
	}else if($_POST['method'] == "sms"){
		
		$userinfo= $controller->processGetUserInfoByMobile(trim($_POST['mobile']), trim($_POST['countrycode']));
		
		$counter =(int)($userinfo->otpcounter);
		$counter++;	
		if(($userinfo->otpcode == $_POST['otpcode']) && ($userinfo->otpcode != '') &&  ($counter < 3))
		{
			if( (time() - $userinfo->otptime) < 100)
			{
				$hashcode = sha1_64bitInt(time());
				$controller->processUpdateOTPInfoByMobile(trim($_POST['mobile']), trim($_POST['countrycode']), '', time(), 0, $hashcode);
				
				$userinfo= $controller->processGetUserInfoByMobile(trim($_POST['mobile']), trim($_POST['countrycode']));
				echo json_encode(["otpresult" => "otpcode_ok", "userinfo" => $userinfo]);
			}else{
				echo json_encode(["otpresult" => "otpcode_expired"]);
			}
		}else{
			if($counter < 3)
			{
				$controller->processUpdateOTPCounterByMobile(trim($_POST['mobile']), trim($_POST['countrycode']), $counter);
				echo json_encode(["otpresult" => "otpcode_again"]);
			}else{
				$controller->processUpdateOTPInfoByMobile(trim($_POST['mobile']), trim($_POST['countrycode']), '', time(), $counter, "");
				echo json_encode(["otpresult" => "otpcode_failed"]);
			}
		}
	}
}else if($_POST['ActionType']== "OrderBadge"){
	//OrderBadge
	//echo "aaaaa";
	//echo "OrderBadge ". $_POST['agent_id'] . " " . $_POST['company_id'] . " "  . $_POST['isnewuser'] . " " . $_POST['email'] . " " . $_POST['displayname'] . " " . $_POST['countrycode'] . " " . $_POST['mobile'] . " " . $_POST['tc'] . " " . $_POST['marketing'] . " " . $_POST['language'] . " badge_id :" . $_POST['badge_id'] . " amount :" . $_POST['badgeamount'] . " extra: " . $_POST['extrahelp'] . " " . $_POST['mark'] ." " .$hashcode;
	
	
	if($_POST['isnewuser']=="false")
	{
		$userinfo= $controller->processGetUserInfoByEmail(trim($_POST['email']));
	}else{
		 
		$userinfo= $controller->processAddNewUser(trim($_POST['email']), trim($_POST['displayname']), trim($_POST['countrycode']), trim($_POST['mobile']), trim($_POST['tc']), trim($_POST['marketing']), trim($_POST['language']));		

	}
		//echo "=====" . json_encode($userinfo);
	if($_POST['mark_id']!="-1")
		$rankinfo = $controller->processAddRank($_POST['badge_id'], $_POST['mark_id'], $userinfo->user_id);

	if($userinfo == null)
	{
		//header("Location: https://www.starsdg.com/usernotfound.php?email=". $_POST['email']);

		echo json_encode(['orderfailed' => true]);
	}else{
		//echo json_encode($userinfo, JSON_PRETTY_PRINT);
		
		$hashcode = sha1_64bitInt(time());
		$orderinfo = $controller->processOrderBadge($userinfo, intval($_POST['badge_id']), intval($_POST['badgeamount']),intval($_POST['extrahelp']),$_POST['company_id'], $_POST['agent_id'], $hashcode);
		
		echo json_encode(['orderinfo' => $orderinfo, 'orderfailed' => false]);
	}
		
}else if($_POST['ActionType'] == "UpdateLanguage"){
	//UpdatePaymentStatus
	$status=null;
	$status = $controller->processUpdateLanguage(intval($_POST['language']), $_POST['hashcode'], $_POST['email']);
	echo json_encode(['status' => $status]);
	
}else if($_POST['ActionType'] == "UpdatePaymentStatus"){
	//UpdatePaymentStatus
	$orderinfo=null;
	$orderinfo = $controller->processUpdatePaymentStatus(intval($_POST['order_id']), intval($_POST['payment_status']), $_POST['hashcode']);
	echo json_encode($orderinfo, JSON_PRETTY_PRINT);
	
}else if($_POST['ActionType'] == "GetOrderInfo"){
	//GetOrderInfo
	$orderinfo=null;

	$orderinfo = $controller->processGetOrderByID(intval($_POST['order_id']));
	echo json_encode($orderinfo, JSON_PRETTY_PRINT);
}else if($_POST['ActionType'] == "GetOrderInfoList"){
	//GetOrderInfoList
	$orderinfo=[];
	$orderinfo = $controller->processGetOrderList($_SESSION["userinfo"], 0, 10);
	
	echo json_encode($orderinfo, JSON_PRETTY_PRINT);
}else if($_POST['ActionType'] == "GetBadgeImpact"){
	//GetBadgeInfo
	$badgeinfo=null;
	$badgeinfo = $controller->processGetBadgeImapctByID(intval($_POST['badge_id']));
	
	echo json_encode($badgeinfo, JSON_PRETTY_PRINT);
}else if($_POST['ActionType'] == "GetBadgeOrderList"){
	//GetBadgeInfoList
	$user_id = $_POST['user_id'];
	$hashcode = $_POST['hashcode'];
	//echo "user_id: " . $user_id . " hashcode: " . $hashcode;
	$badgeOrderInfoList=[];
	$badgeOrderInfoList = $controller->processGetBadgeOrderList($user_id, $hashcode);
	
	//echo json_encode($badgeOrderInfoList, JSON_PRETTY_PRINT);
	echo json_encode(['badgelist' => $badgeOrderInfoList, "badgelistcount" => count($badgeOrderInfoList)]);
}else if($_POST['ActionType'] == "GetBadgeOrderListByDate"){
	//GetBadgeInfoList
	$user_id = $_POST['user_id'];
	$orderdate = $_POST['orderdate'];
	$hashcode = $_POST['hashcode'];
	//echo "user_id: " . $user_id . " hashcode: " . $hashcode;
	$badgeInfoList=[];
	$badgeInfoList = $controller->processGetBadgeListByDate($user_id, $hashcode, $orderdate);
	
	echo json_encode(['badges' => $badgeInfoList]);
}else if($_POST['ActionType'] == "AddRank"){
	//echo "add rank";
	$rankinfo = $controller->processAddRank($_POST['badge_id'], $_POST['mark_id'], $_POST['user_id']);
	//echo json_encode($rankinfo, JSON_PRETTY_PRINT);
	
	echo json_encode(['ranks' => $rankinfo]);
}else if($_POST['ActionType'] == "GetRank"){
	
	$rankinfo = $controller->processGetRankByBadgeID($_POST['badge_id']);
	
	echo json_encode(['ranks' => $rankinfo]);
}else if($_POST['ActionType'] == "GetCountryCode"){
	
	$countrycodeinfo= $controller->processGetCountryCode();
	
	echo json_encode(['countrycodes' => $countrycodeinfo]);
}else if($_POST['ActionType'] == "GetUserByMobile"){
	
	$userinfo= $controller->processGetUserInfoByMobile($_POST['mobile'], $_POST['countrycode']);
	
	echo json_encode(['userinfo' => $userinfo]);
}else if($_POST['ActionType'] == "GetUserByEmail"){
	
	$userinfo= $controller->processGetUserInfoByEmail($_POST['email']);
	
	echo json_encode(['userinfo' => $userinfo]);
}else if($_POST['ActionType'] == "GetBadgeInfo"){
	
	$badgeinfo= $controller->processGetBadgeInfoByID($_POST['badge_id'], $_POST['lang']);
	
	echo json_encode(['badgeinfo' => $badgeinfo]);
}else if($_POST['ActionType'] == "GetBadgeOrderInfo"){
	
	$badgeinfo= $controller->processGetBadgeOrderInfoByID($_POST['order_id'], $_POST['badge_id'], $_POST['user_id'], $_POST['lang']);
	
	echo json_encode(['badgeinfo' => $badgeinfo]);
}else if($_POST['ActionType'] == "CheckLoginStatus"){
	
	$stat= $controller->processCheckLoginStatus($_POST['email'], $_POST['hashcode']);
	
	echo json_encode(['loginstatus' => $stat]);
}else if($_POST['ActionType'] == "GetSiteContent"){
	
	$stat= $controller->processGetSiteContent($_POST['lang']);
	
	echo json_encode(['sitecontent' => $stat]);
}else if($_POST['ActionType'] == "GetLocationsGPS"){
	
	$data= $controller->processGetLocationsGPS();
	echo json_encode(['gpslocations' => $data]);
}else if($_POST['ActionType'] == "GetSDGList"){
	
	$data= $controller->processGetSDGList($_POST['badge_id']);
	echo json_encode(['sdglist' => $data]);
}else if($_POST['ActionType'] == "testing"){

	$clsAES = new clsAES("12345", "12345");
	echo $clsAES->encrypt("abcdefg");
	echo $clsAES->decrypt($clsAES->encrypt("abcdefg"));	

}else{
	http_response_code(404);
	exit;
}

function sha1_64bitInt($str) {
    $u = unpack('N2', sha1($str, true));
    return ($u[1] << 32) | $u[2];
}

//$mysqli -> close();


?>
