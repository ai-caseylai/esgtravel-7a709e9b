
<?php


//use PHPMailer\PHPMailer\PHPMailer;
//use PHPMailer\PHPMailer\Exception;
//use PHPMailer\PHPMailer\SMTP;
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/SMTP.php';

class TestSendEmail
{

	public function __construct()
	{
        echo 'TestSendEmail';
	}
    
    function processSend(string $email, string $name)
    {
       // $mail = new PHPMailer(true);
       


        $sms_content = 'Landmark Test Email';

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        try{
            $mail->isSMTP();
            $mail->Host = ' email-smtp.ap-southeast-1.amazonaws.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'AKIA3WXGJZMQA62VPHIL';
            $mail->Password = 'BK+FPfZCxgJJRrf6XdRwhu+kgkiOXsetAUQ8VTXsZGqk';
            $mail->SMTPSecure =  PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->setFrom('info@landmark-women-in-central.com', 'LandMark');
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