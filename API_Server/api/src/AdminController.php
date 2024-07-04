<?php

class AdminController
{
	protected $gateway;

	public function __construct(AdminGateway $gateway)
	{
		$this->gateway = $gateway;
	}


	public function processGetAgentInfoByAgentID(string $agentid)
	{
		$userinfo = $this->gateway->getAgentInfoByAgengID($agentid);
		return $userinfo;
	}
	
	public function processGetCompanyInfoByCompanyID(string $company_id)
	{
		$userinfo = $this->gateway->getCompanyInfoByCompanyID($company_id);
		return $userinfo;
	}

	public function processGetUserInfoByEmail(string $email)
	{
		$userinfo = $this->gateway->getUserInfoByEmail($email);
		return $userinfo;
	}
	
	public function processGetUserInfoByMobile(string $mobile, string $ccode)
	{
		$userinfo = $this->gateway->getUserInfoByMobile($mobile, $ccode);
		return $userinfo;
	}
	public function processUpdateOTPInfoByEmail(string $email, string $otpcode, string $otptime, string $otpcounter, string $hashcode)
	{
		$otp = $this->gateway->updateOTPInfoByEmail($email, $otpcode, $otptime, $otpcounter, $hashcode);
		return $otp;
	}

	public function processUpdateOTPInfoByMobile(string $mobile, string $countrycode, string $otpcode, string $otptime, string $otpcounter, string $hashcode)
	{
		$otp = $this->gateway->updateOTPInfoByMobile($mobile, $countrycode, $otpcode, $otptime, $otpcounter, $hashcode);
		return $otp;
	}
	
	public function processUpdateOTPCounterByEmail(string $email, string $otpcounter)
	{
		$otp = $this->gateway->updateOTPCounterByEmail($email,$otpcounter);
		return $otp;
	}

	public function processUpdateOTPCounterByMobile(string $mobile, string $countrycode, string $otpcounter)
	{
		$otp = $this->gateway->updateOTPCounterByMobile($mobile, $countrycode, $otpcounter);
		return $otp;
	}
	public function processGetOrderListByCompanyID(string $company_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderListByCompanyID($company_id, $month, $year, $from, $to);
		return $orderlist;
	}
	public function processGetOrderListByCompanyIDAndBadgeID(string $company_id, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderListByCompanyIDAndBadgeID($company_id, $badge_id, $month, $year, $from, $to);
		return $orderlist;
	}
	public function processGetOrderListByCompanyIDGroupByBadge(string $company_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderListByCompanyIDGroupByBadge($company_id, $month, $year, $from, $to);
		return $orderlist;
	}
	public function processGetOrderSummaryByCompanyID(string $company_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderSummaryByCompanyID($company_id, $month, $year, $from, $to);
		return $orderlist;
	}

	public function processGetOrderSumByCompanyID(string $company_id, string $month, string $year)
	{
		$orderlist = $this->gateway->getOrderSumByCompanyID($company_id, $month, $year);
		return $orderlist;
	}

	public function processGetOrderListByAgentID(string $agent_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderListByAgentID($agent_id, $month, $year, $from, $to);
		return $orderlist;
	}
	
	public function processGetOrderSumByAgentID(string $agent_id, string $month, string $year)
	{
		$orderlist = $this->gateway->getOrderSumByAgentID($agent_id, $month, $year);
		return $orderlist;
	}

	public function processGetCompanyList(int $from, int $to)
	{
		$companylist = $this->gateway->getCompanyList($from, $to);
		return $companylist;
	}
	public function processCompanySearchByName(string $companyname, int $from, int $to)
	{
		$companylist = $this->gateway->CompanySearchByName($companyname, $from, $to);
		return $companylist;
	}
	
	public function processCompanySearchByEmail(string $email, int $from, int $to)
	{
		$companylist = $this->gateway->CompanySearchByEmail($email, $from, $to);
		return $companylist;
	}
	
	
	public function processCompanySearchByContact(string $contactname, int $from, int $to)
	{
		$companylist = $this->gateway->CompanySearchByContact($contactname, $from, $to);
		return $companylist;
	}
	public function processGetOrderListByAgentIDAndBadgeID(string $agent_id, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getOrderListByAgentIDAndBadgeID($agent_id, $badge_id, $month, $year, $from, $to);
		return $orderlist;
	}

	public function processGetBadgeOrderListByCompanyID(string $company, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$orderlist = $this->gateway->getBadgeOrderListByCompanyID($company, $badge_id, $month, $year, $from, $to);
		return $orderlist;
	}

	public function processGetOrderSummaryByAgentID(string $agent_id, string $month, string $year)
	{
		$orderlist = $this->gateway->getOrderSummaryByAgentID($agent_id, $month, $year);
		return $orderlist;
	}
	public function processGetOrderDateListByCompanyID(string $company_id)
	{
		$datelist = $this->gateway->getOrderDateListByCompanyID($company_id);
		return $datelist;
	}
	
	public function processGetAgentListByCompanyID(string $company_id, int $from, int $to)
	{
		$agentlist = $this->gateway->getAgentListByCompanyID($company_id, $from, $to);
		return $agentlist;
	}
	
	public function processCheckCompanyEmailExist(string $email)
	{
		$status = $this->gateway->checkCompanyEmailExist($email);
		return $status;
	}
	
	public function processCheckUpdateCompanyEmailExist(string $email, string $company_id)
	{
		$status = $this->gateway->checkUpdateCompanyEmailExist($email, $company_id);
		return $status;
	}


	public function processCheckCompanyMobileExist(string $mobile, string $ccode)
	{
		$status = $this->gateway->checkCompanyMobileExist($mobile, $ccode);
		return $status;
	}

	public function processCheckUpdateCompanyMobileExist(string $mobile, string $ccode, string $company_id)
	{
		$status = $this->gateway->checkUpdateCompanyMobileExist($mobile, $ccode, $company_id);
		return $status;
	}
	public function processCheckCompanyTelExist(string $tel, string $ccode)
	{
		$status = $this->gateway->checkCompanyTelExist($tel, $ccode);
		return $status;
	}

	public function processCheckUpdateCompanyTelExist(string $tel, string $ccode, string $company_id)
	{
		$status = $this->gateway->checkUpdateCompanyTelExist($tel, $ccode, $company_id);
		return $status;
	}

	public function processCheckAgentEmailExist(string $email)
	{
		$status = $this->gateway->checkAgentEmailExist($email);
		return $status;
	}
	
	public function processCheckUpdateAgentEmailExist(string $email, string $agent_id)
	{
		$status = $this->gateway->checkUpdateAgentEmailExist($email, $agent_id);
		return $status;
	}


	public function processCheckAgentMobileExist(string $mobile, string $ccode)
	{
		$status = $this->gateway->checkAgentMobileExist($mobile, $ccode);
		return $status;
	}

	public function processCheckUpdateAgentMobileExist(string $mobile, string $ccode, string $agent_id)
	{
		$status = $this->gateway->checkUpdateAgentMobileExist($mobile, $ccode, $agent_id);
		return $status;
	}

	public function processGetBadgeList()
	{
		$badgelist = $this->gateway->getBadgeList();
		return $badgelist;
	}
	public function processAddNewCompany(string $companyname, string $contactname, string $country, string $ccode, string $mobile, string $tel, string $email, string $address_1, string $address_2, string $address_3)
	{
		$status = $this->gateway->addNewCompany($companyname, $contactname, $country, $ccode, $mobile, $tel, $email, $address_1, $address_2, $address_3);
		return $status;
	}

	public function processUpdateCompany(string $company_id, string $companyname, string $contactname, string $country, string $ccode, string $mobile, string $tel, string $email, string $address_1, string $address_2, string $address_3, int $status)
	{
		$status = $this->gateway->updateCompany($company_id, $companyname, $contactname, $country, $ccode, $mobile, $tel, $email, $address_1, $address_2, $address_3, $status);
		return $status;
	}
	public function processAddNewAgent(string $company_id, string $contactname, string $ccode, string $mobile, string $email)
	{
		$status = $this->gateway->addNewAgent($company_id, $contactname, $ccode, $mobile, $email);
		return $status;
	}
	public function processUpdateAgent(string $agent_id, string $contactname, string $ccode, string $mobile, string $email, int $status)
	{
		$status = $this->gateway->updateAgent($agent_id, $contactname, $ccode, $mobile, $email, $status);
		return $status;
	}
	public function processGetBadgeInfo(int $badge_id)
	{
		$badgeinfo = $this->gateway->getBadgeInfo($badge_id);
		return $badgeinfo;
	}
	public function processGetOrderDateListByAgentID(string $agent_id)
	{
		$datelist = $this->gateway->getOrderDateListByAgentID($agent_id);
		return $datelist;
	}

	public function processGetCountryCode()
	{
		$codeinfo = $this->gateway->getCountryCode();
		return $codeinfo;
	}

	public function processCheckHashcode(string $hashcode, string $email)
	{
		$status = $this->gateway->checkHashcode($hashcode, $email);
		return $status;
	}
}
?>