<?php
class clsAES
{
    private $key = '';
    private $iv = '';

    public function __construct($key, $iv)
    {
        $this->key = md5($key);
        $this->iv = $iv;
    }

    public function encrypt($data)
    {
        $cryptText = openssl_encrypt($data,"aes-256-cbc",$this->key ,OPENSSL_RAW_DATA,$this->iv);
        return base64_encode($cryptText);
    }

    public function decrypt($data)
    {
        $cryptText = base64_decode($data);
        return trim(openssl_decrypt($cryptText, 'aes-256-cbc', $this->key , OPENSSL_RAW_DATA,$this->iv));
    }
}

?>