
<?php


//use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\Exception;
//use PHPMailer\PHPMailer\SMTP;
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/SMTP.php';

class SendEmail
{

	public function __construct()
	{
	}
    
    function processSend(string $otpcode, string $email, string $name, string $lang)
    {
       // $mail = new PHPMailer(true);
       
       $sms_content_eng = '[STARSDG]'.', Your OTP is : ' . $otpcode ;
       $sms_content_chi = '[STARSDG]'.', 你的一次性密碼是 : ' . $otpcode;
       $sms_content_jp = '[STARSDG]'.', あなたの OTP は : ' . $otpcode ." です。";

       if($lang==0)
            $sms_content = $sms_content_chi;
        else if($lang==1)
            $sms_content = $sms_content_eng;
        else if($lang==2)
            $sms_content = $sms_content_jp;

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        try{
            $mail->isSMTP();
            $mail->Host = ' email-smtp.ap-southeast-1.amazonaws.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'AKIA3WXGJZMQA62VPHIL';
            $mail->Password = 'BK+FPfZCxgJJRrf6XdRwhu+kgkiOXsetAUQ8VTXsZGqk';
            $mail->SMTPSecure =  PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->setFrom('info@Starsdg.com', 'Starsdg');
            $mail->addAddress($email, $name);
            $mail->isHTML(true);
            $mail->Subject = 'Starsdg OTP Code';
            $mail->Body = $sms_content;
            if(!$mail->send()){
                echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
            } else {
                echo 'Message has been sent';
            }
        }catch(Exception $e){
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }

}

?>