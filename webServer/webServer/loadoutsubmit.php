<?php

session_start();

require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","testServer");


$fData1 = $_POST['fighters0'];
$fData2 = $_POST['fighters1'];
$fData3 = $_POST['fighters2'];
$f1sm = $_POST['f1sm'];
$f2sm = $_POST['f2sm'];
$f3sm = $_POST['f3sm'];

$request = array();
$request['type'] = "submitLoadout";
$request['userId'] = $_SESSION["userID"];
$request['fighter1'] = $fData1;
$request['fighter2'] = $fData2;
$request['fighter3'] = $fData3;
$request['f1sm'] = $f1sm;
$request['f2sm'] = $f2sm;
$request['f3sm'] = $f3sm;

$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

if ($response["returnCode"] == '0')
{
	echo "Successfully Made Loadout!, Redirecting to Login Page".PHP_EOL;
	
	$_SESSION["fighter1"] = $response["fighter1"];
        $_SESSION["fighter2"] = $response["fighter2"];
        $_SESSION["fighter3"] = $response["fighter3"];
	$_SESSION["move1"] = $f1sm;
	$_SESSION["move2"] = $f2sm;
	$_SESSION["move3"] = $f3sm;

        header("refresh: 3, url=index.html");
}
else
{
        echo "Loadout Failed To Be Created".PHP_EOL;
        header("refresh: 3, url=loadoutpage.php");
}

?> 
