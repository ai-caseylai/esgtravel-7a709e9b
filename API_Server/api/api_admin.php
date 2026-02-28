
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

$gateway = new AdminGateway($database);
$controller = new AdminController($gateway);
$smscontroller = new SendSMS();
$emailcontroller = new SendEmail();
//echo $parts[2];
//echo $_POST['ActionType'];

if($_POST['ActionType'] == "GetOTP"){
	//echo 'GetOTP';
	if($_POST['method'] == "email")
	{
		$email = $_POST['email'];
		$userinfo= $controller->processGetUserInfoByEmail(trim($email));
		
		//echo "xxxxxx " .$userinfo->email ." " . $userinfo->displayname ." " .$_POST["method"];
		if($userinfo!=null)
		{
			$otpcode = rand(100000,999999);
			$controller->processUpdateOTPInfoByEmail($email, $otpcode, time(), 0, "");


			$emailcontroller->processSend($otpcode, $userinfo->email, $userinfo->contactname, 1);

			echo "otpcode_sent" ;
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
			//echo json_encode(["userinfo" => $userinfo]);
			echo "otpcode_sent" ;
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
}else if($_POST['ActionType'] == "GetAgentInfoByAgentID"){
	
	$agentinfo= $controller->processGetAgentInfoByAgentID(trim($_POST['agent_id']));
	
	echo json_encode(['agentinfo' => $agentinfo]);
}else if($_POST['ActionType'] == "GetCompanyInfoByCompanyID"){
	
	$companyinfo= $controller->processGetCompanyInfoBycompanyID(trim($_POST['company_id']));
	
	echo json_encode(['companyinfo' => $companyinfo]);
}else if($_POST['ActionType'] == "GetCountryCode"){
	
	$countrycodeinfo= $controller->processGetCountryCode();
	
	echo json_encode(['countrycodes' => $countrycodeinfo]);
}else if($_POST['ActionType'] == "GetOrderListByCompanyID"){
	
	$orderlist= $controller->processGetOrderListByCompanyID(trim($_POST['company_id']),  trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['orderlist' => $orderlist]);
}else if($_POST['ActionType'] == "GetOrderListByCompanyIDGroupByBadge"){
	
	$orderlist= $controller->processGetOrderListByCompanyIDGroupByBadge(trim($_POST['company_id']),  trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['orderlist' => $orderlist]);
}else if($_POST['ActionType'] == "GetOrderListByCompanyIDAndBadgeID"){
	
	$orderlist= $controller->processGetOrderListByCompanyIDAndBadgeID(trim($_POST['company_id']),trim($_POST['badge_id']),  trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['orderlist' => $orderlist]);
}else if($_POST['ActionType'] == "GetOrderSummaryByCompanyID"){
	
	
	$orderlist= $controller->processGetOrderSummaryByCompanyID(trim($_POST['company_id']), trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	$ordersum = $controller->processGetOrderSumByCompanyID(trim($_POST['company_id']), trim($_POST['month']), trim($_POST['year']));
	echo json_encode(['summary' => $orderlist, 'ordersum' => $ordersum]);
}else if($_POST['ActionType'] == "GetOrderListByAgentID"){
	
	$orderlist= $controller->processGetOrderListByAgentID(trim($_POST['agent_id']), trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	$ordersum =  $controller->processGetOrderSumByAgentID(trim($_POST['agent_id']), trim($_POST['month']), trim($_POST['year']));
	
	echo json_encode(['orderlist' => $orderlist, 'ordersum' => $ordersum]);
}else if($_POST['ActionType'] == "GetOrderListByAgentIDAndBadgeID"){
	
	$orderlist= $controller->processGetOrderListByAgentIDAndBadgeID(trim($_POST['agent_id']),trim($_POST['badge_id']), trim($_POST['month']), trim($_POST['year']), trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['orderlist' => $orderlist]);
}else if($_POST['ActionType'] == "GetOrderSummaryByAgentID"){
	
	$orderlist= $controller->processGetOrderSummaryByAgentID(trim($_POST['agent_id']), trim($_POST['month']), trim($_POST['year']));
	
	echo json_encode(['summary' => $orderlist]);
}else if($_POST['ActionType'] == "GetOrderDateListByAgentID"){
	
	$datelist= $controller->processGetOrderDateListByAgentID(trim($_POST['agent_id']));
	
	echo json_encode(['datelist' => $datelist]);
}else if($_POST['ActionType'] == "GetOrderDateListByCompanyID"){
	
	$datelist= $controller->processGetOrderDateListByCompanyID(trim($_POST['company_id']));
	
	echo json_encode(['datelist' => $datelist]);
}else if($_POST['ActionType'] == "GetBadgeList"){
	
	$datelist= $controller->processGetBadgeList();
	
	echo json_encode(['badgelist' => $datelist]);

}else if($_POST['ActionType'] == "GetAgentList"){
	
	$agentlist= $controller->processGetAgentListByCompanyID(trim($_POST['company_id']), trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['agentlist' => $agentlist]);

}else if($_POST['ActionType'] == "GetBadgeInfo"){
	
	$badgeinfo= $controller->processGetBadgeInfo(trim($_POST['badge_id']));
	
	echo json_encode(['badgeinfo' => $badgeinfo]);
}else if($_POST['ActionType'] == "CheckHashcode"){
	
	$status= $controller->processCheckHashcode(trim($_POST['hashcode']), trim($_POST['email']));
	
	echo json_encode(['loginstatus' => $status]);
}else if($_POST['ActionType'] == "AddNewAgent"){

	$emailStatus = $controller->processCheckAgentEmailExist(trim($_POST['email']));
	$mobileStatus = $controller->processCheckAgentMobileExist(trim($_POST['mobile']), trim($_POST['ccode']));
	if($emailStatus == true && $mobileStatus == true)
	{
		$status= $controller->processAddNewAgent(trim($_POST['company_id']), trim($_POST['contactname']), trim($_POST['ccode']), trim($_POST['mobile']), trim($_POST['email']));
		echo json_encode(['addstatus' => $status, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus]);
	}else{
		echo json_encode(['addstatus' => false, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus]);
	}
	
}else if($_POST['ActionType'] == "AddNewCompanyInfo"){

	$emailStatus = $controller->processCheckCompanyEmailExist(trim($_POST['email']));
	$mobileStatus = $controller->processCheckCompanyMobileExist(trim($_POST['mobile']), trim($_POST['countrycode']));
	$telStatus = $controller->processCheckCompanyTelExist(trim($_POST['tel']), trim($_POST['countrycode']));
	if($emailStatus == true && $mobileStatus == true)
	{
		$status= $controller->processAddNewCompany(trim($_POST['companyname']), trim($_POST['contactname']), trim($_POST['country']), trim($_POST['countrycode']), trim($_POST['mobile']), trim($_POST['tel']), trim($_POST['email']), trim($_POST['address_1']), trim($_POST['address_2']), trim($_POST['address_3']));
		echo json_encode(['addstatus' => $status, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus, 'telstatus' => $telStatus]);
	}else{
		echo json_encode(['addstatus' => false, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus, 'telstatus' => $telStatus]);
	}
	
}else if($_POST['ActionType'] == "UpdateCompanyInfo"){

	$emailStatus = $controller->processCheckUpdateCompanyEmailExist(trim($_POST['email']),trim($_POST['company_id']));
	$mobileStatus = $controller->processCheckUpdateCompanyMobileExist(trim($_POST['mobile']), trim($_POST['countrycode']),trim($_POST['company_id']));
	$telStatus = $controller->processCheckUpdateCompanyTelExist(trim($_POST['tel']), trim($_POST['countrycode']),trim($_POST['company_id']));
	if($emailStatus == true && $mobileStatus == true)
	{
		if(trim($_POST['status'])=='true')
		{
			//echo "status true" . trim($_POST['status']);
			$status = 1;
		}
		else{
			//echo "status false". trim($_POST['status']);
			$status = 0;
		}

		$status= $controller->processUpdateCompany(trim($_POST['company_id']), trim($_POST['companyname']), trim($_POST['contactname']), trim($_POST['country']), trim($_POST['countrycode']), trim($_POST['mobile']), trim($_POST['tel']), trim($_POST['email']), trim($_POST['address_1']), trim($_POST['address_2']), trim($_POST['address_3']), $status);
		echo json_encode(['updatestatus' => $status, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus, 'telstatus' => $telStatus]);
	}else{
		echo json_encode(['updatestatus' => false, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus, 'telstatus' => $telStatus]);
	}
	
}else if($_POST['ActionType'] == "UpdateAgent"){
	$emailStatus = $controller->processCheckUpdateAgentEmailExist(trim($_POST['email']),trim($_POST['agent_id']));
	$mobileStatus = $controller->processCheckUpdateAgentMobileExist(trim($_POST['mobile']), trim($_POST['ccode']),trim($_POST['agent_id']));
	if($emailStatus == true && $mobileStatus == true)
	{

		if(trim($_POST['status'])=='true')
		{
			//echo "status true". trim($_POST['status']);
			$status = 1;
		}
		else{
			//echo "status false".trim($_POST['status']);
			$status = 0;
		}
		$status= $controller->processUpdateAgent(trim($_POST['agent_id']), trim($_POST['contactname']), trim($_POST['ccode']), trim($_POST['mobile']), trim($_POST['email']), $status);
		echo json_encode(['updatestatus' => $status, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus]);
	}else{
		echo json_encode(['updatestatus' => false, 'emailstatus' => $emailStatus, 'mobilestatus' => $mobileStatus]);
	}
	
}else if($_POST['ActionType'] == "GetBadgeOrderListByCompanyID"){
	
	$data= $controller->processGetBadgeOrderListByCompanyID(trim($_POST['company_id']), trim($_POST['badge_id']), trim($_POST['month']), trim($_POST['year']),  trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['orderlist' => $data]);
}else if($_POST['ActionType'] == "GetCompanyList"){
	
	$data= $controller->processGetCompanyList(trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['companylist' => $data]);
}else if($_POST['ActionType'] == "CompanySearchByName"){
	
	$data= $controller->processCompanySearchByName(trim($_POST['companyname']),trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['companylist' => $data]);
}else if($_POST['ActionType'] == "CompanySearchByEmail"){
	
	$data= $controller->processCompanySearchByEmail(trim($_POST['email']),trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['companylist' => $data]);
}else if($_POST['ActionType'] == "CompanySearchByContact"){
	
	$data= $controller->processCompanySearchByContact(trim($_POST['contactname']),trim($_POST['from']), trim($_POST['to']));
	
	echo json_encode(['companylist' => $data]);
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
