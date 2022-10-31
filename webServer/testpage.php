<?php
session_start();

echo "UFC Fight Time!".PHP_EOL;

$uname = $_SESSION["username"];
echo "Current User Logged in: $uname".PHP_EOL;
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

echo htmlspecialchars(SID).PHP_EOL; //debug echo SID

$request = array();
$request['type'] = "validate_session";
//$request['username'] = $uname;
//$request['password'] = $password;
$request['SID'] = htmlspecialchars(SID);
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
