<?php
require 'DataMaster.php';
class TravelGateway
{
	protected $mysqli;
	private $conn;
	/*public function __construct(mysqli $mysqli)
	{
		$this->mysqli = $mysqli;
	}*/
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
		
    }
	public function processRequest(string $method, ?string $id): void
	{
	}

	public function addUserInfo(UserInfo $userInfo)
	{
		$sql = "INSERT INTO usermaster (user_name, user_role, displayname, countrycode, mobile, email, tc, marketing, status) VALUES ('". $userInfo->user_name ."', '". $userInfo->user_role ."', '". $userInfo->displayname ."', '". $userInfo->country ."', '". $userInfo->mobile ."', '". $userInfo->email ."', '". $userInfo->tc ."', '". $userInfo->marketing ."', 1);";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$last_id = $this->conn->lastInsertId();
			$data = $this->getUserInfoByEmail($userInfo->email);
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}

	public function checkUserExist(string $areacode, string $mobile, string $email)
	{
		$sql = "SELECT * FROM usermaster where areacode = '". $areacode ."' and mobile = '". $mobile ."' or email = '". $email ."';";
		//echo $sql;
		$stat = false;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$stat = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $stat;
	}

	public function getUserInfoByEmail(string $email)
	{
		$sql = "SELECT * FROM usermaster where email = '". $email ."';";
		
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "UserInfo");
				$data = $result->fetch();
	
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	public function getUserInfoByMobile(string $mobile, string $ccode)
	{
		$sql = "SELECT * FROM usermaster where mobile = '". $mobile ."' and countrycode ='". $ccode ."';";
		
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "UserInfo");
				$data = $result->fetch();
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function orderBadge(UserInfo $userInfo, int $badge_id, int $price, int $extra_help, string $company_id, string $agent_id, string $hashcode)
	{
		//echo "xxxxxxxxxxxx";
		$sql = "INSERT INTO ordermaster (user_id, badge_id, price, extra_help, company_id, agent_id, hashcode) VALUES (". $userInfo->user_id .", ". $badge_id .", ". $price .", ". $extra_help .", '". $company_id ."',  '". $agent_id ."','". $hashcode ."');";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
			$data = $this->getLastOrder($userInfo, $badge_id);
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		
		return $data;
	}

	public function getLastOrder(UserInfo $userInfo, int $id)
	{
		$sql = "SELECT * FROM ordermaster where badge_id = ". $id ." and user_id =". $userInfo->user_id ." order by order_id desc;";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "OrderInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function checkLoginStatus(String $email, string $hashcode)
	{
		$sql = "SELECT * FROM usermaster where email = '". $email ."' and hashcode ='". $hashcode ."';";
		//echo $sql;
		$stat= false;
		
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();

			if($result->rowCount()>0)
			{
				$stat = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $stat;
	}

	public function updateLanguage(int $lang_id, string $hashcode, string $email)
	{
		$sql = "UPDATE usermaster SET language = ". $lang_id ." WHERE email = '". $email ."' and hashcode='". $hashcode ."';";
		//echo $sql;
		$stat=false;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$stat=true;
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $stat;
	}
	public function updatePaymentStatus(int $id, int $status, string $hashcode)
	{
		$sql = "UPDATE ordermaster SET payment_status = ". $status ." WHERE order_id = ". $id ." and hashcode='". $hashcode ."';";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$data = $this->getOrderByID($id);
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		
		return $data;
	}

	public function getOrderByID(int $id)
	{
		$sql = "SELECT * FROM ordermaster where order_id = ". $id .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "OrderInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderList(UserInfo $userInfo, int $from, int $to)
	{
		$sql = "SELECT * FROM ordermaster where payment_status =1 and user_id = ". $userInfo->user_id ." LIMIT ". $from .", ". $to .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "OrderInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeImpactByID(int $id)
	{
		$sql = "SELECT * FROM badgemaster where badge_id = ". $id .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "BadgeInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeInfoByID(int $id, int $lang)
	{
		$sql = "SELECT * FROM badgeinfo a inner join badgemaster b WHERE a.badge_id = b.badge_id and b.badge_id = ". $id." and a.lang = ". $lang .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "BadgeInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getSDGList(int $badge_id)
	{
		$sql = "SELECT * FROM sdgmaster where badge_id = ". $badge_id .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "SDGInfo");
				$data = $result->fetchAll(); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function getBadgeOrderInfoByID(int $id, int $badge_id, int $user_id, int $lang)
	{
		$sql = "SELECT * FROM badgeinfo a inner join badgemaster b inner join ordermaster c WHERE c.payment_status =1 and a.badge_id = b.badge_id and a.badge_id = ".  $badge_id ." and c.order_id =". $id ." and c.user_id=". $user_id ." and a.lang = ". $lang .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "BadgeInfo");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeOrderList(int $user_id, string $hashcode)
	{
		$sql = "SELECT orderdate FROM ordermaster where payment_status =1 and user_id = ". $user_id ." group by YEAR(orderdate), MONTH(orderdate) order by orderdate desc;";
		$data=[];
		$count=0;
		//echo $sql;
		try{
			
			if ($result = $this->conn->query($sql)) {
				//echo $result->rowCount();
				while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
					$arr = $this->getBadgeListByMonth( $user_id, $hashcode, $row["orderdate"]);
					$row["badgecount"] = count($arr);
					$row["badges"] = $arr;

					$data[$count++] = $row;
				}
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeOrderDateList(int $user_id, string $hashcode)
	{
		$sql = "SELECT orderdate FROM ordermaster where payment_status =1 and user_id = ". $user_id ." group by orderdate order by orderdate desc;";
		$data=[];
		$count=0;
		//echo $sql;
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_ASSOC);
				$data = $result->fetchAll(); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		
		return $data;
	}


	public function getBadgeListByMonth(int $user_id, string $hashcode, string $orderdate)
	{
		$date = strtotime($orderdate); 
		$month = date('m', $date);
		$year = date('Y', $date);
		$sql = "SELECT * FROM badgemaster a, ordermaster b, usermaster c where b.payment_status =1 and c.user_id = b.user_id and a.badge_id = b.badge_id and b.user_id = ". $user_id ." and c.hashcode = '". $hashcode ."' and MONTH(b.orderdate) =". $month ." and YEAR(b.orderdate) =". $year ." order by b.orderdate desc ;";
		//echo $sql;
		$data=[];
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			//echo $count. "<br>";
			
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_ASSOC);
				$data = $result->fetchAll(); 
			}

		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function getAllBadgeList()
	{
		$sql = "SELECT * FROM badgemaster ;";
		echo $sql;
		$data=[];
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				//$result->setFetchMode(PDO::fe, "BadgeInfo");
				//$data = $result->fetchAll(); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		echo $count;
		return $data;
	}
	
	
	public function getRankByBadgeID(int $id)
	{
		$sql = "SELECT count(*) as mark, 0 as mark_id FROM `rankmaster` where mark_id=0 and badge_id = ". $id ." UNION SELECT count(*) as mark, 1 as mark_id FROM `rankmaster` where mark_id=1 and badge_id = ". $id ." UNION SELECT count(*) as mark, 2 as mark_id FROM `rankmaster` where mark_id=2 and badge_id = ". $id ." UNION SELECT count(*) as mark, 3 as mark_id FROM `rankmaster` where mark_id=3 and badge_id = ". $id ." UNION	SELECT count(*) as mark, 4 as mark_id FROM `rankmaster` where mark_id=4 and badge_id = ". $id .";";
		//echo $sql;
		$data=[];
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "RankInfo");
				$data = $result->fetchAll(); 
				//$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}

	public function addRank(int $badge_id, int $mark_id, int $user_id)
	{
		if($this->checkRankExist($badge_id, $user_id))
		{
			$sql = "UPDATE rankmaster SET mark_id = ". $mark_id ." WHERE badge_id = ". $badge_id ." and user_id = ". $user_id .";";
		}else{
			$sql = "INSERT INTO rankmaster (badge_id, mark_id, user_id) VALUES (". $badge_id .", ". $mark_id .", ". $user_id .");";
		}
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
			$data = $this->getRank($badge_id);
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}

	public function checkRankExist(int $badge_id, int $user_id)
	{
		$sql = "SELECT * FROM rankmaster where badge_id = ". $badge_id ." and user_id = ". $user_id .";";
		//echo $sql;
		$stat = false;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$stat = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $stat;
	}

	public function getRank(int $badge_id)
	{
		$sql = "SELECT badge_id , mark_id, COUNT(*) as mark FROM rankmaster GROUP BY mark_id order by mark_id;";
		//echo $sql;
		$data=[];
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "RankInfo");
				$data = $result->fetchall(); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;

	}
	
	public function getCountryCode()
	{
		$sql = "SELECT * FROM countrycodemaster where status =1 order by country_code ;";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CountryCodeInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function updateOTPInfoByEmail(string $email, string $otpcode,  string $otptime, string $otpcounter, string $hashcode)
	{
		
		$sql = "update usermaster set otpcode = '". $otpcode ."', otptime= '". $otptime ."', otpcounter ='". $otpcounter."', hashcode ='". $hashcode ."' where email ='". $email ."';";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}
	
	
	public function updateOTPInfoByMobile(string $mobile, string $countrycode, string $otpcode,  string $otptime, string $otpcounter, string $hashcode)
	{
		$sql = "update usermaster set otpcode = '". $otpcode ."', otptime= '". $otptime ."', otpcounter ='". $otpcounter ."', hashcode ='". $hashcode ."' where mobile ='". $mobile ."' and countrycode= '". $countrycode ."';";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage(); 
		}
		return $data;
	}

	public function updateOTPCounterByEmail(string $email, string $otpcounter)
	{
		$sql = "update usermaster set otpcounter ='". $otpcounter ."' where email ='". $email ."';";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}
	
	public function updateOTPCounterByMobile(string $mobile, string $countrycode, string $otpcounter)
	{
		$sql = "update usermaster set otpcounter ='". $otpcounter ."'where mobile ='". $mobile ."' and countrycode= '". $countrycode ."';";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}
	
	public function addNewUser(string $email, string $displayname, string $countrycode, string $mobile, string $tc, string $marketing, string $language)
	{
		$sql = "INSERT INTO usermaster (user_name, email, displayname, user_role, countrycode, mobile, tc, marketing, language) VALUES ('". $email."', '". $email."', '". $displayname."', 'user', '".  $countrycode."', ". $mobile.", ".  $tc.", ".  $marketing.", '".  $language."');";
		//echo $sql;
		$data=null;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			//$last_id = $result->lastInsertId();
			//echo $result;
			$data = $this->getUserInfoByEmail($email);
		}
		catch (PDOException $e) {
			//echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;
	}

	public function checkUserExistByEmail(string $email)
	{
		$sql = "SELECT * FROM usermaster where email = '". $email ."';";
		//echo $sql;
		$stat = false;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$stat = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $stat;
	}

	public function checkUserExistByMobile(string $mobile, string $ccode)
	{
		$sql = "SELECT * FROM usermaster where mobile = '". $mobile ."' and countrycode ='". $ccode ."';";
		//echo $sql;
		$stat = false;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$stat = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $stat;
	}
	
	public function getSiteConten(int $lang)
	{
		$sql = "SELECT * FROM sitecontent where lang = ". $lang .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "SiteContent");
				$data = $result->fetch(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	
	public function getLocationsGPS()
	{
		$sql = "select badge_id, lat, lon from badgemaster where status =1;";
		//echo $sql;
		$data=[];
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "GPSInfo");
				$data = $result->fetchall(); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data;

	}
}
?>