<?php

class CompanyInfo{
    public  $company_id;
    public $companyname;
    public  $contactname;
    public  $tel;
    public  $mobile;
    public  $email;
    public  $country;
    public  $address_1;
    public  $address_2;
    public $address_3;
    public function getCompanyName(){
        return $this->companyname;
    }

    public function getInfo()
    {
        return $this;
    }
}
class AgentInfo{
    public  $agent_id;
    public $company_id;
    public  $contactname;
    public  $countrycode;
    public  $mobile;
    public  $email;
    public  $usertype;
    public  $status;
    public function getAgentName(){
        return $this->contactname;
    }

    public function getInfo()
    {
        return $this;
    }
}

    class UserInfo{
        public  $user_id;
        public $user_role;
        public  $displayname;
        public  $countrycode;
        public  $mobile;
        public  $email;
        public  $tc;
        public  $marketing;
        public  $language;
        public $status;
        public  $company_id;
        public  $agent_id;
        public $otpcode;
        public $otptime;
        public $otpcounter;
        public function getDisplayName(){
            return $this->displayname;
        }

        public function getInfo()
        {
            return $this;
        }
    }

    class SiteContent{
        public $language;
        
        public function getInfo()
        {
            return $this;
        }
    }

    class OtpLoginInfo{
        public $status;
    }

    class BadgeInfo
    {
        public $badge_id;
        public $badge_name;
        public $badge_image;
        public $description;
        public $event;
        public $mapinfo;
        public $qrcode;
        public $website;
        public $status;
        public $createdate;
        public $summary;
        public $details;
        public $impact;
        public $title;
        public $header;

    }

    class AgentSummary
    {
        public $email;
        public $sprice;
        public $sextra_help;
    }

    class OrderInfo
    {
        public $order_id;
        public $badge_id;
        public $user_id;
        public $price;
        public $extra_help;
        public $mark;
        public $payment_method;
        public $payment_status;
        public $createdate;
    }
    class RankInfo
    {
        public $mark_id;
        public $mark;
    }

    class SDGInfo
    {
        public $id;
        public $sdg_id;
        public $badge_id;
    }

    class GPSInfo
    {
        public $badge_id;
        public $lat;
        public $lon;
    }

    
    class CountryCodeInfo
    {
        public $country_code;
        public $country_name;
    }

    class OrderSum{
        public $pricesum;
        public $extra_helpsum;
    }
?>