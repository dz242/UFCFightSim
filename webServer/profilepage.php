<!DOCTYPE html>
<html>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</html>

<style>
table, th, td {

	border:1px solid black;
	border-collapse: collapse;
}
th, td{
	padding: 5px;
	text-align: left;
}
</style>
<html>
	<h1>Profile Page</h1>
	<table>
		<tr>
			<th>Username</th>
			<td>
					
				
			</td>
		</tr>
		<tr>
                        <th>Email</th>
                        <td>


                        </td>
                </tr>
		<tr>
                        <th>Wins</th>
                        <td>


                        </td>
                </tr>
		<tr>
                        <th>Losses</th>
                        <td>


                        </td>
                </tr>

	</table>

</html>

<?php
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
  $msg = "Default Register Message";
}

$request = array();
$request['type'] = "getProfile";
$response = $client->send_request($request);

//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
//print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

if ($response["returnCode"] == '0')
{
        echo "Grabbed profile".PHP_EOL;
}
else
{
        echo "Failed to grab profile".PHP_EOL;
}
echo($response);

?>


