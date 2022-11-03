<?php

session_start();

require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","testServer");


$fData1 = $_POST['fData1'];
$fData2 = $_POST['fData2'];
$fData3 = $_POST['fData3'];

$request = array();
$request['type'] = "submitLoadout";
$request['userId'] = $_SESSION["userID"];
$request['fighter1'] = $fData1;
$request['fighter2'] = $fData2;
$request['fighter3'] = $fData3;

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
