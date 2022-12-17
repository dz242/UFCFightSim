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
	<!--Echo User Currency Form action should Return to same page-->
	<h1>"Your Currency: "<?php echo $response[1][8]; ?></h1>
	<h2>"Each Fighter is 100 Currency"</h2>
	<form action="" id="submission" method="post">

		<select name="shop" id="shop">
        <?php
        foreach($response as $fighter)
        {
            echo "<option value = '$fighter[1]'>$fighter[6]</option>";  
	    }
        ?>
		</select>
		
		
		<div>
			<input type="submit" value="Buy Fighter" />
		</div>

	</form>

</body>
</html>
