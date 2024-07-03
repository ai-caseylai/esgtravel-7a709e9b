
<?php


class SendSMS
{

	public function __construct()
	{
	}
    
    function processSend(UserInfo $info, string $otpcode)
    {
        $account_name = 'markettrend_hkjc@marketing2.big-famous.com';
        $api_key = '262ffe5aaa7f1566';
        $sms_content_eng = '[STARSDG]'.', Your OTP is : ' . $otpcode ;
        $sms_content_chi = '[STARSDG]'.', 你的一次性密碼是 : ' . $otpcode;
        $sms_content_jp = '[STARSDG]'.', あなたの OTP は : ' . $otpcode ." です。";
        if($info->language==0)
            $sms_content = $sms_content_chi;
        else if($info->language==1)
            $sms_content = $sms_content_eng;
        else if($info->language==2)
            $sms_content = $sms_content_jp;
        
        $meta_json = json_encode(array(
        "sender" => "HKJC",
        "sms_content" => $sms_content,
        "send_also_ofca_registers" => 1,
        "country_code" => strval($info->countrycode)
        ));
        $user_list = array();
        $user = array('mobile' => $info->mobile, 'firstname' => $info->displayname, 'lastname' => '');
        array_push($user_list, $user);
        //echo $info->mobile;
        //echo $info->countrycode;
        //echo $info->areacode;
                    // $user2 = array('mobile' => '92345678', 'firstname' => 'Becky ', 'lastname' => 'Hui ', 'password' => '123456');
                    // array_push($user_list, $user2);

        $user_json = json_encode($user_list);
        $api_url = "https://api2.big-famous.com/v3.0/sms_connect.php";

                    // Send request to platform thru API, use curl call
        $api_params = array(
            'account_name' => $account_name,
            'api_key' => $api_key,
            'meta_json' => $meta_json,
            'user_json' => $user_json,
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $api_params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $rm_json = curl_exec($ch);
        curl_close($ch);
    }

}

?>