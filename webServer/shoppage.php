<!DOCTYPE html>
<?php

session_start();

if (!isset($_SESSION["username"]))
{
	echo "Log in to view this Page";
	header("refresh: 4, url=index.html");
	exit();
}

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
$request['type'] = "getShop";
$request['userId'] = $_SESSION["userID"];
$response = $client->send_request($request);

echo "client received response: ".PHP_EOL;
echo "\n\n";

echo $argv[0]." END".PHP_EOL;


?>
<html>
<body>
	<!--Echo User Currency-->
	<h1><?php echo $response[1][1]; ?></h1>
	<form action="shoppagesubmit.php" id="submission" method="post">

		<select name="shop" id="shop">
			<!--Value is fighterid,then echo name, then echo price-->
			<option value = "<?php echo $response[2][1]; ?>"><?php echo $response[2][6] ?><?php echo $response[2][18] ?></option>
			<option value = "<?php echo $response[3][1]; ?>"><?php echo $response[3][6] ?><?php echo $response[3][18] ?></option>
			<option value = "<?php echo $response[4][1]; ?>"><?php echo $response[4][6] ?><?php echo $response[4][18] ?></option>
			<option value = "<?php echo $response[5][1]; ?>"><?php echo $response[5][6] ?><?php echo $response[5][18] ?></option>
			<option value = "<?php echo $response[6][1]; ?>"><?php echo $response[6][6] ?><?php echo $response[6][18] ?></option>
		</select>
		
		
		<input type = "hidden" id = "currency" value = "<?php echo $response[1][1]; ?>"/>
		<div>
			<input type="submit" value="Buy Item" />
		</div>

	</form>

</body>
</html>

