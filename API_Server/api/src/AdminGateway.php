<?php
require 'DataMaster.php';
class AdminGateway
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

	public function checkHashcode(string $hashcode, string $email)
	{
		$sql = "SELECT * FROM agentmaster where hashcode = '". $hashcode ."' and email = '". $email ."';";
		$status = false;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = true;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkCompanyMobileExist(string $mobile, string $countrycode)
	{
		$sql = "SELECT * FROM companymaster where mobile = '". $mobile ."' and countrycode = '". $countrycode ."';";
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkUpdateCompanyMobileExist(string $mobile, string $countrycode, string $company_id)
	{
		$sql = "SELECT * FROM companymaster where mobile = '". $mobile ."' and countrycode = '". $countrycode ."' and company_id <> '". $company_id ."';";
		//echo $sql;
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkCompanyTelExist(string $tel, string $countrycode)
	{
		$sql = "SELECT * FROM companymaster where tel = '". $tel ."' and countrycode = '". $countrycode ."';";
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkUpdateCompanyTelExist(string $tel, string $countrycode, string $company_id)
	{
		$sql = "SELECT * FROM companymaster where tel = '". $tel ."' and countrycode = '". $countrycode ."' and company_id <> '". $company_id ."';";
		//echo $sql;
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkCompanyEmailExist(string $email)
	{
		$sql = "SELECT * FROM companymaster where email = '". $email ."';";
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkUpdateCompanyEmailExist(string $email, string $company_id)
	{
		$sql = "SELECT * FROM companymaster where email = '". $email ."' and company_id <> '". $company_id ."';";
		//echo $sql;

		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkAgentMobileExist(string $mobile, string $countrycode)
	{
		$sql = "SELECT * FROM agentmaster where mobile = '". $mobile ."' and countrycode = '". $countrycode ."';";
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkUpdateAgentMobileExist(string $mobile, string $countrycode, string $agent_id)
	{
		$sql = "SELECT * FROM agentmaster where mobile = '". $mobile ."' and countrycode = '". $countrycode ."' and agent_id <> '". $agent_id ."';";
		//echo $sql;
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkAgentEmailExist(string $email)
	{
		$sql = "SELECT * FROM agentmaster where email = '". $email ."';";
		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function checkUpdateAgentEmailExist(string $email, string $agent_id)
	{
		$sql = "SELECT * FROM agentmaster where email = '". $email ."' and agent_id <> '". $agent_id ."';";
		//echo $sql;

		$status = true;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = false;
				
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $status ;
	}

	public function getAgentListByCompanyID(string $company_id, int $from, int $to)
	{
		$sql = "SELECT * FROM agentmaster where company_id = '". $company_id ."' order by uid limit ". $from . ", " . $to .";";
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "AgentInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data ;
	}


	public function getBadgeList()
	{
		$sql = "SELECT * FROM badgemaster where status = 1;";
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "BadgeInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}
		return $data ;
	}

	public function updateOTPInfoByEmail(string $email, string $otpcode,  string $otptime, string $otpcounter, string $hashcode)
	{
		
		$sql = "update agentmaster set otpcode = '". $otpcode ."', otptime= '". $otptime ."', otpcounter ='". $otpcounter."', hashcode ='". $hashcode ."' where email ='". $email ."';";
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
		$sql = "update agentmaster set otpcode = '". $otpcode ."', otptime= '". $otptime ."', otpcounter ='". $otpcounter ."', hashcode ='". $hashcode ."' where mobile ='". $mobile ."' and countrycode= '". $countrycode ."';";
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
		$sql = "update agentmaster set otpcounter ='". $otpcounter ."' where email ='". $email ."';";
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
		$sql = "update agentmaster set otpcounter ='". $otpcounter ."'where mobile ='". $mobile ."' and countrycode= '". $countrycode ."';";
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
	
	public function getAgentInfoByAgengID(string $agent_id)
	{
		$sql = "SELECT a.*, b.company_id, b.companyname FROM agentmaster a inner join companymaster b on a.company_id = b.company_id where a.agent_id = '". $agent_id ."';";
		
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "AgentInfo");
				$data = $result->fetch();
	
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	public function getUserInfoByEmail(string $email)
	{
		$sql = "SELECT * FROM agentmaster a inner join companymaster b on a.company_id = b.company_id where a.email = '". $email ."';";
		
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
		$sql = "SELECT a.*, b.companyname, b.company_id FROM agentmaster a inner join companymaster b on a.company_id = b.company_id  where a.mobile = '". $mobile ."' and a.countrycode ='". $ccode ."';";
		
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
	
	public function getCompanyInfoByCompanyID(string $company_id)
	{
		$sql = "SELECT * FROM companymaster where company_id = '". $company_id ."';";
		
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CompanyInfo");
				$data = $result->fetch();
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeInfo(int $badge_id)
	{
		$sql = "SELECT * FROM badgemaster where badge_id = ". $badge_id .";";
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
				$data = $result->fetch();
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

	public function getOrderSumByCompanyID(string $company_id, string $month, string $year)
	{
		$sql = "select sum(price) as pricesum, sum(extra_help) as extra_helpsum from ordermaster a inner join agentmaster b on a.agent_id = b.agent_id where a.payment_status =1 and a.company_id ='" . $company_id. "' and month(a.orderdate) = ". $month ." and year(a.orderdate) = ". $year .";";
		//echo $sql;
		$data=null;
		$count=0;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "OrderSum");
				$data = $result->fetch();
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderSummaryByCompanyID(string $company_id, string $month, string $year, int $from, int $to)
	{
		$sql = "select b.agent_id, b.contactname, sum(price) as sprice, sum(extra_help) as sextra_help, b.email from ordermaster a inner join agentmaster b on a.agent_id = b.agent_id where a.payment_status =1 and a.company_id ='" . $company_id. "' and month(a.orderdate) = ". $month ." and year(a.orderdate) = ". $year ." group by a.agent_id limit ". $from . ", " . $to .";";

		$data=null;
		$count=0;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "AgentSummary");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function addNewCompany(string $companyname, string $contactname, string $country, string $ccode, string $mobile, string $tel, string $email, string $address_1, string $address_2, string $address_3)
	{
		$sql = "insert into companymaster (company_id, companyname, contactname, country, countrycode, mobile, tel, email, address_1, address_2, address_3, status) values(uuid(), '". $companyname ."', '". $contactname ."', '". $country ."', '". $ccode ."', '". $mobile ."', '". $tel ."', '". $email ."','". $address_1 ."','". $address_2 ."','". $address_3 ."', 1);";
		//echo $sql;
		$status=false;
		$count=0;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $status;
	}

	public function updateCompany(string $company_id, string $companyname, string $contactname, string $country, string $ccode, string $mobile, string $tel, string $email, string $address_1, string $address_2, string $address_3, int $status)
	{
		
		$sql = "update companymaster set companyname = '". $companyname ."', contactname = '". $contactname ."', country = '". $country ."', countrycode = '". $ccode ."', mobile = '". $mobile ."', status = '". $status ."', tel = '". $tel ."', email = '". $email ."', address_1 = '". $address_1 ."', address_2 = '". $address_2 ."', address_3 = '". $address_3 ."' where company_id = '". $company_id ."';";
		//echo $sql;
		$status=false;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$status = true;
			
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $status;
	}

	public function addNewAgent(string $company_id, string $contactname, string $ccode, string $mobile, string $email)
	{
		$sql = "insert into agentmaster (agent_id, company_id, contactname, countrycode, mobile, email, status) values(uuid(), '". $company_id ."', '". $contactname ."', '". $ccode ."', '". $mobile ."', '". $email ."', 1);";
		//echo $sql;
		$status=false;
		$count=0;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$status = true;
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $status;
	}

	public function updateAgent(string $agent_id, string $contactname, string $ccode, string $mobile, string $email, int $status)
	{
		
		$sql = "update agentmaster set contactname = '". $contactname ."', countrycode = '". $ccode ."', mobile = '". $mobile ."', status = '". $status ."', email = '". $email ."' where agent_id = '". $agent_id ."';";
		//echo $sql;
		$status=false;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$status = true;
			
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $status;
	}
	
	public function getOrderSummaryByAgentID(string $agent_id, string $month, string $year)
	{
		$sql = "select sum(price) as sprice, sum(extra_help) as sextra_help, b.email from ordermaster a inner join agentmaster b on a.agent_id = b.agent_id where a.payment_status =1 and a.agent_id ='". $agent_id ."' and month(a.orderdate) = ". $month ." and year(a.orderdate) = ". $year ."  group by a.agent_id;";

		$data=null;
		$count=0;
		//echo $sql;
		
		try{
			
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();
			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "AgentSummary");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderListByCompanyIDAndBadgeID(string $company_id, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$sql = "SELECT * FROM ordermaster a inner join badgemaster b on a.badge_id = b.badge_id where a.payment_status =1 and month(orderdate) = ". $month ." and year(orderdate) = ". $year ." and company_id = '". $company_id ."' and a.badge_id = ". $badge_id ." order by order_id desc limit ". $from . ", " . $to .";";
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	public function getOrderListByCompanyIDGroupByBadge(string $company_id, string $month, string $year, int $from, int $to)
	{
		$sql = "select c.badge_name, sum(price) as sprice, sum(extra_help) as sextra_help, a.badge_id from (ordermaster a inner join badgemaster c on a.badge_id = c.badge_id )inner join companymaster b on a.company_id = b.company_id where a.payment_status =1 and a.company_id ='" . $company_id. "' and month(a.orderdate) = ". $month ." and year(a.orderdate) = ". $year ." group by a.badge_id limit ". $from . ", " . $to .";";
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getBadgeOrderListByCompanyID(string $company_id, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$sql = "select a.order_id, c.agent_id, b.badge_name, b.badge_id, a.price, a.extra_help, c.contactname from (ordermaster a inner join badgemaster b on a.badge_id = b.badge_id) inner join agentmaster c on a.agent_id = c.agent_id where a.payment_status =1 and a.company_id ='" . $company_id. "' and a.badge_id ='" . $badge_id. "' and month(a.orderdate) = ". $month ." and year(a.orderdate) = ". $year ." order by a.order_id desc limit ". $from . ", " . $to .";";
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderListByCompanyID(string $company_id, string $month, string $year, int $from, int $to)
	{
		$sql = "SELECT * FROM ordermaster a inner join badgemaster b on a.badge_id = b.badge_id where a.payment_status =1 and month(orderdate) = ". $month ." and year(orderdate) = ". $year ." and company_id = '". $company_id ."' order by a.order_id desc limit ". $from . ", " . $to .";";
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function getCompanyList(int $from, int $to)
	{
		$sql = "select * from companymaster limit ". $from . ", " . $to .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CompanyInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function CompanySearchByName(string $companyname, int $from, int $to)
	{
		$sql = "select * from companymaster where LCASE(companyname) like LCASE('%". $companyname ."%') limit ". $from . ", " . $to .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CompanyInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function CompanySearchByEmail(string $email, int $from, int $to)
	{
		$sql = "select * from companymaster where LCASE(email) like LCASE('%". $email ."%') limit ". $from . ", " . $to .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CompanyInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	public function CompanySearchByContact(string $contactname, int $from, int $to)
	{
		$sql = "select * from companymaster where LCASE(contactname) like LCASE('%". $contactname ."%') limit ". $from . ", " . $to .";";
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "CompanyInfo");
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}



	public function getOrderListByAgentID(string $agent_id, string $month, string $year, int $from, int $to)
	{
		$sql = "SELECT * FROM ordermaster a inner join badgemaster b on a.badge_id = b.badge_id where a.payment_status =1 and month(orderdate) = ". $month ." and year(orderdate) = ". $year ." and agent_id = '". $agent_id ."' order by order_id desc limit ". $from . ", " . $to .";";
		
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderSumByAgentID(string $agent_id, string $month, string $year)
	{
		$sql = "SELECT sum(price) as pricesum, sum(extra_help) as extra_helpsum FROM ordermaster a inner join badgemaster b on a.badge_id = b.badge_id where a.payment_status =1 and month(orderdate) = ". $month ." and year(orderdate) = ". $year ." and agent_id = '". $agent_id ."';";
		
		//echo $sql;
		$data=null;
		$count=0;
		try{
			$result = $this->conn->prepare($sql);
			$result->execute();
			$count = $result->rowCount();

			if($count>0)
			{
				$result->setFetchMode(PDO::FETCH_CLASS, "OrderSum");
				$data = $result->fetch();
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}

	public function getOrderListByAgentIDAndBadgeID(string $agent_id, int $badge_id, string $month, string $year, int $from, int $to)
	{
		$sql = "SELECT * FROM ordermaster a inner join badgemaster b on a.badge_id = b.badge_id where a.payment_status =1 and month(orderdate) = ". $month ." and year(orderdate) = ". $year ." and agent_id = '". $agent_id ."' and a.badge_id = '". $badge_id ."' order by order_id desc limit ". $from . ", " . $to .";";
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
				$data = $result->fetchall(PDO::FETCH_ASSOC); 
			}
		}
		catch (PDOException $e) {
			echo 'Connection failed: ' . $e->getMessage();
		}

		return $data;
	}
	
	public function getOrderDateListByCompanyID(string $company_id)
	{
		$sql = "SELECT orderdate FROM ordermaster a inner join agentmaster b on a.company_id = b.company_id where payment_status =1 and a.company_id = '". $company_id ."' group by YEAR(a.orderdate), MONTH(a.orderdate) order by a.order_id desc;";

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

	public function getOrderDateListByAgentID(string $agent_id)
	{
		$sql = "SELECT orderdate FROM ordermaster a inner join agentmaster b on a.agent_id = b.agent_id where payment_status =1 and a.agent_id = '". $agent_id ."' group by YEAR(orderdate), MONTH(orderdate) order by order_id desc;";
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
}
?>