<?php
    function post_captcha($user_response) {
        $fields_string = '';
        $fields = array(
            'secret' => '6LcPoS4UAAAAAAVzwkTOBKqaOioDQNbe3hctqFx1',
            'response' => $user_response
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

    // Call the function post_captcha
    $res = post_captcha($_POST['g-recaptcha-response']);

    if (!$res['success']) {
        // What happens when the CAPTCHA wasn't checked
        echo '<p>Please go back and make sure you check the security CAPTCHA box.</p><br>';
    } else {
        // If CAPTCHA is successfully completed...

                $to      = 'me@davisodom.com';
                $subject = 'One of your visitors sent you a message!';
                $body    = "Name: ".$_POST['name']."\n".$_POST['message'];
                $headers = "From:" . $_POST['email'];

                mail($to, $subject, $body, $headers);
                header ("Location: index.html");
            }
?>