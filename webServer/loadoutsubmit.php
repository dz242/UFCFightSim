<?php

session_start();

require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","testServer");


$request = array();
$request['type'] = "submitLoadout";
$request['userId'] = $_SESSION["userID"];
$request['fighter1'] = $fData[1];
$request['fighter2'] = $fData[2];
$request['fighter3'] = $fData[3];

$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

if ($response["returnCode"] == '0')
{
        echo "Successfully Made Loadout!, Redirecting to Login Page".PHP_EOL;
        header("refresh: 3, url=index.html");
}
else
{
        echo "Loadout Failed To Be Created".PHP_EOL;
        header("refresh: 3, url=loadoutpage.php");
}

?> 
