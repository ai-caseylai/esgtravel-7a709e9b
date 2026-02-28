<?php

class TravelController
{
	protected $gateway;

	public function __construct(TravelGateway $gateway)
	{
		$this->gateway = $gateway;
	}

	public function processAddUserInfo(UserInfo $userInfo)
	{
		$userinfo = $this->gateway->addUserInfo($userInfo);
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

	public function processOrderBadge(UserInfo $userInfo, int $badge_id, int $price, int $extra_help, string $company_id, string $agent_id, string $hashcode)
	{
		$orderinfo = $this->gateway->orderBadge($userInfo, $badge_id, $price, $extra_help, $company_id, $agent_id, $hashcode);
		return $orderinfo;
	}

	public function processUpdatePaymentStatus(int $order_id, int $payment_status, string $hashcode)
	{
		$orderinfo = $this->gateway->updatePaymentStatus($order_id, $payment_status, $hashcode);
		return $orderinfo;
	}
	
	public function processGetOrderByID(int $order_id)
	{
		$orderinfo = $this->gateway->getOrderByID($order_id);
		return $orderinfo;
	}

	public function processGetOrderList(UserInfo $userInfo, int $from, int $to)
	{
		$orderinfo = $this->gateway->getOrderList($userInfo, $from, $to);
		return $orderinfo;
	}
	
	public function processGetBadgeImapctByID(int $badge_id)
	{
		$badgeinfo = $this->gateway->getBadgeImpactByID($badge_id);
		return $badgeinfo;
	}

	public function processGetBadgeInfoByID(int $badge_id, int $lang)
	{
		$badgeinfo = $this->gateway->getBadgeInfoByID($badge_id, $lang);
		return $badgeinfo;
	}

	public function processUpdateLanguage(int $lang_id, string $hashcode, string $email)
	{
		$stat = $this->gateway->updateLanguage($lang_id, $hashcode, $email);
		return $stat;
	}

	public function processGetBadgeOrderInfoByID(int $order_id,int $badge_id, int $user_id, int $lang)
	{
		$badgeinfo = $this->gateway->getBadgeOrderInfoByID($order_id, $badge_id, $user_id, $lang);
		return $badgeinfo;
	}

	public function processGetBadgeOrderDateList(int $user_id, string $hashcode)
	{
		$badgeinfo = $this->gateway->getBadgeOrderDateList($user_id, $hashcode);
		return $badgeinfo;
	}

	
	public function processGetBadgeOrderList(int $user_id, string $hashcode)
	{
		$badgeinfo = $this->gateway->getBadgeOrderList($user_id, $hashcode);
		return $badgeinfo;
	}

	public function processGetBadgeListByDate(int $user_id, string $hashcode, string $orderdate)
	{
		$badgeinfo = $this->gateway->getBadgeListByMonth($user_id, $hashcode, $orderdate);
		return $badgeinfo;
	}

	public function processCheckUserExist(string $areacode, string $mobile, string $email)
	{
		$stat = $this->gateway->checkUserExist($areacode, $mobile, $email);
		return $stat;
	}
	public function processAddRank(int $badge_id, int $mark_id, int $user_id)
	{
		$stat = $this->gateway->addRank($badge_id, $mark_id, $user_id);
		return $stat;
	}
	public function processGetRankByBadgeID(int $badge_id)
	{
		$stat = $this->gateway->getRankByBadgeID($badge_id);
		return $stat;
	}

	public function processGetAllBadgeList()
	{
		$badgeinfo = $this->gateway->getAllBadgeList();
		return $badgeinfo;
	}
	public function processGetSDGList(int $badge_id)
	{
		$sdglist = $this->gateway->getSDGList($badge_id);
		return $sdglist;
	}
	public function processGetCountryCode()
	{
		$codeinfo = $this->gateway->getCountryCode();
		return $codeinfo;
	}

	public function processAddNewUser(string $email, string $displayname, string $countrycode, string $mobile, string $tc, string $marketing, string $language)
	{
		$otp = $this->gateway->addNewUser($email, $displayname, $countrycode, $mobile, $tc, $marketing, $language);
		return $otp;
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
	public function processCheckLoginStatus(string $email, string $hashcode)
	{
		$stat = $this->gateway->checkLoginStatus($email, $hashcode);
		return $stat;
	}
	public function processGetSiteContent(int $lang)
	{
		$stat = $this->gateway->getSiteConten($lang);
		return $stat;
	}
	
	public function processGetLocationsGPS()
	{
		$stat = $this->gateway->getLocationsGPS();
		return $stat;
	}
}
?>