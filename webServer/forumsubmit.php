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
	$msg = "Grape";
}
$request = array();
$request['type'] = "sendMessage";
$request['userId'] = $_SESSION['userID'];
$request['msg'] = $_POST['sendmessage'];
$response = $client->send_request($request);
if($response["returnCode"] == '0')
{
        echo "Sent Message".PHP_EOL;
        header("refresh: 1, url=forumpage.php");
}
else
{
        echo "Error Sending message, returning to forum";
        header("refresh: 3, url=forumpage.php");
}


?>
