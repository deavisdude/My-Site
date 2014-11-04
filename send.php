<?php

$to      = 'me@davisodom.com';
$subject = 'One of your visitors sent you a message!';
$body    = $_POST['message'];
$headers = "From:" . $_POST['email'];

mail($to, $subject, $body, $headers);
header ("Location: index.html");

?>