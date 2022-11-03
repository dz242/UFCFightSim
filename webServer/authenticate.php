<html>
<h1>Login Page</h1>
</html>

<?php
//session_start(['use_only_cookies'=>0,'use_trans_sid'=>1]);
session_start();


$uname = $_GET["uname"];
$password = $_GET["password"];


?>
<html>
        <body>
        <form action="authenticate.php">
                <div>
                <input type="text" name="uname" value="<?php echo $uname; ?>" >username<br>
                <input type="password" name="password" value="<?php echo $password; ?>" >password<br>
                </div>

                <div>
                <input type="submit" value="Login">
                </div>
        </form>
        </body>
</html>


<?php
//Validate Username. Can only have alphanumeric characters
$count = preg_match('/^[a-zA-Z0-9]*$/i', $uname, $matches);
if ($count == 0)
{
        echo "<br>Username contains invalid characters. Please Try again";
        exit();
}
//Validate Password. Can only have alphanumeric characters
$count = preg_match('/^[a-zA-Z0-9]*$/i', $password, $matches);
if ($count == 0)
{
        echo "<br>Password contains invalid characters. Please Try again";
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
  $msg = "Default Login Message";
}

//echo(htmlspecialchars(SID).PHP_EOL); //debug echo SID

$request = array();
$request['type'] = "Login";
$request['username'] = $uname;
$request['password'] = $password;
$request['SID'] = session_id();
$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

if ($response["returnCode"] == '0')
{
	echo "Correct Login, Redirecting to next page".PHP_EOL;
	$_SESSION["username"] = $response["user"]["username"];
	$_SESSION["email"] = $response["user"]["email"];
	$_SESSION["userID"] = $response["user"]["userID"];
	$_SESSION["wins"] = $response["user"]["wins"];
	$_SESSION["losses"] = $response["user"]["losses"];

	$_SESSION["fighter1"] = $response["loadout"]["fighter1"];
	$_SESSION["fighter2"] = $response["loadout"]["fighter2"];
	$_SESSION["fighter3"] = $response["loadout"]["fighter3"];
	$_SESSION["move1"] = $response["loadout"]["sp_move1"];
	$_SESSION["move2"] = $response["loadout"]["sp_move2"];
	$_SESSION["move3"] = $response["loadout"]["sp_move3"];

        header("refresh: 2, url=index.html");
}
else
{
	echo "Incorrect Username and/or Password".PHP_EOL;
}

?>
