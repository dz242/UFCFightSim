<html>
<h1>Register Page</h1>
</html>

<?php
if (isset ($_GET["uname"]))
{
        $uname = $_GET["uname"];
}
else
{
	echo "Please enter an Username".PHP_EOL;
	$continue = False; 
}
if (isset ($_GET["email"]))
{
        $email = $_GET["email"];
}
else
{
        echo "Please enter an Email Address".PHP_EOL;
        $continue = False;
}
if (isset ($_GET["password"]))
{
        $password = $_GET["password"];
}
else
{
	echo "Please enter a Password".PHP_EOL;
	$continue = False;
}
if (isset ($_GET["confPassword"]))
{
        $confPassword = $_GET["confPassword"];
}
else
{
	echo "Please confirm your Password".PHP_EOL;
	$continue = False;
}

if ($password != $confPassword)
{
	echo "Passwords do not match".PHP_EOL;
	$continue = False;
}


?>

<html>
        <body>
        <form action="register.php">
                <div>
		<input type="text" name="uname" value="<?php echo $uname; ?>" >username<br>
		<input type="text" name="email" value="<?php echo $email; ?>" >email<br>
		<input type="password" name="password" value="<?php echo $password; ?>" >password<br>
		<input type="text" name="confPassword">Confirm password<br>
                </div>

                <div>
               <input type="submit" value="Register"> 
                </div>
        </form>
        </body>
</html>

<?php

if ($continue == FALSE)
{
	echo "Debug Exit Message";
	exit();
}
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","registerServer");
if (isset($argv[1]))
{
  $msg = $argv[1];
}
else
{
  $msg = "Default Register Message";
}

$request = array();
$request['type'] = "Register";
$request['username'] = $uname;
$request['password'] = $password;
$request['email'] = $email;
$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

if ($response["returnCode"] == 0)
{
        echo "Succesfully Register new Account, Redirecting to Login Page".PHP_EOL;
        header("refresh: 3, url=loginpage.html");
}
else
{
        echo "Registering Account Failed, Please Try Again".PHP_EOL;
}

?>
