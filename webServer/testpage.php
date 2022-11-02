<?php
//session_start(['use_only_cookies'=>0,'use_trans_sid'=>1]);
session_start();
echo "UFC Fight Time!".PHP_EOL;

$uname = $_SESSION["username"];
$email = $_SESSION["email"];
echo "Current User Logged in: $uname and Email is: $email".PHP_EOL;
echo "Validating Session...".PHP_EOL;

require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","testServer");
if (isset($argv[1]))
{
  $msg = $argv[1];
}
else
{
  $msg = "Default Login Message";
}

//echo htmlspecialchars(SID).PHP_EOL; //debug echo SID

$request = array();
$request['type'] = "validate_session";
//$request['username'] = $uname;
//$request['password'] = $password;
$request['SID'] = session_id();
//$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
//print_r($response);

if($response){
	echo "Session is Valid".PHP_EOL;
}
else {
	echo "Session is Invalid".PHP_EOL;
}


?>
