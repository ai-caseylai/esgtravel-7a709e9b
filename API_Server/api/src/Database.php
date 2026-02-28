<?php

class Database
{
	
 	protected $host="";
	protected $dbname="";
	protected $user="";
	protected $password="";
	public function __construct($host,
                                $dbname,
                                $user,
                                $password)
	    {
			
			$this->host = $host;
			$this->dbname = $dbname;
			$this->user = $user;
			$this->password = $password;
		}
        
		public function getConnection() 
		{
			
			
			try {
				$conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8mb4", $this->user , $this->password);

				// set the PDO error mode to exception
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				//echo "Connected successfully";
			} catch(PDOException $e) {
				echo "Connection failed: " . $e->getMessage();
			}
			//$dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";
			//return new PDO($dsn, $this->user, $this->password, [PDO::ATTR_EMULATE_PREPARES=>false, PDO::ATTR_STRINGIFY_FETCHES=>false]);
			return $conn;
		}
	

}

?>