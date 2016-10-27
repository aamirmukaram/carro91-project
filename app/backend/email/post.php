<?php
require '../config/config.php';
require '../helpers/helpers.php';

/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require '../helpers/vendors/email/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = $adminEmail;

//Password to use for SMTP authentication
$mail->Password = $adminEmailPassword;


//Set who the message is to be sent to
$mail->addAddress($adminEmail, $adminName);


//SET THOSE PARAMETERS WITH RESPSCT TO EMAIL TYPE//

////Set who the message is to be sent from
//$mail->setFrom('from@example.com', 'First Last');

////Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');

////Set the subject line
//$mail->Subject = 'PHPMailer GMail SMTP test';

////Replace the plain text body with one created manually
//$mail->AltBody = 'This is a plain-text message body';

/////////////////////
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$emailType = null;
if (property_exists($request, 'emailType'))
    $emailType = $request->emailType;

if ($emailType !== null) {

    if ($emailType == "signup_notification_to_admin") {

        $firstName = null;
        $lastName = null;
        $email = null;
        $password = null;
        $password2 = null;
        $country = null;
        $gender = null;
        $restaurants = null;
        $position = null;

        if (property_exists($request, 'firstName'))
            $firstName = $request->firstName;
        if (property_exists($request, 'lastName'))
            $lastName = $request->lastName;
        if (property_exists($request, 'email'))
            $email = $request->email;
        if (property_exists($request, 'password'))
            $password = $request->password;
        if (property_exists($request, 'position'))
            $position = $request->position;
        if (property_exists($request, 'restaurants'))
            $restaurants = $request->restaurants;


        $emailSubject = "New signup";

        $emailBody = 'Hi, '.$adminName.',<br>I need authorization from AUTH0 to access application.Here are my details';
        $emailBody =  $emailBody . '<br>' . 'firstName: ' . $firstName;
        $emailBody = $emailBody .'<br>' . 'lastName: ' . $lastName;
        $emailBody = $emailBody . '<br>' . 'email: ' . $email;
        $emailBody = $emailBody . '<br>' . 'password: ' . $password;
        $emailBody = $emailBody . '<br>' . 'position: ' . $position;
        foreach ($restaurants as $restaurant) {
            $emailBody = $emailBody . '<br>' . 'restaurant id:' . $restaurant->id;

        }

        $mail->setFrom($email, $firstName . ' ' . $lastName);
        $mail->addReplyTo($email, $firstName . ' ' . $lastName);
        $mail->Subject = $emailSubject;
        $mail->msgHTML($emailBody);

    }


    //send the message, check for errors
    if (!$mail->send()) {
        http_response_code(400);
        echo json_encode(array('success' => false, 'data' => null, 'message' => 'Something went wrong'));
    } else {
        echo json_encode(array('success' => true, 'data' => null, 'message' => 'Notification Email sent'));
        //echo "Message sent!";
    }
} else {

    http_response_code(400);
    echo json_encode(array('success' => false, 'data' => null, 'message' => 'emailType missing'));

}




