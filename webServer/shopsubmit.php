<?php

session_start();


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
	$msg = "Banana";
}
$request = array();
$request['type'] = "submitPurchase";
$request['userId'] = $_SESSION["userID"];
$request['fid'] = $_POST['shop'];
$response = $client->send_request($request);
if($response["returnCode"] == '0')
{
        echo "Successfully Made Purchase!, Redirecting to Main Page".PHP_EOL;
        header("refresh: 3, url=index.html");
}
else
{
        echo "Not Enough Money to Make the purchase, returning to shop page";
        header("refresh: 3, url=shoppage.php");
}


?>
