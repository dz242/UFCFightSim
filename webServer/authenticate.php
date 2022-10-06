<html>
<h1>Login Page</h1>
</html>

<?php
//  #!/usr/bin/php
/*

$mydb = new mysqli('127.0.0.1','testUser','12345','testdb');

if ($mydb->errno != 0)
{
        echo "failed to connect to database: ". $mydb->error . PHP_EOL;
        exit(0);
}

echo "successfully connected to database".PHP_EOL;

if (isset ($_GET["uname"]))
{
	$uname = $_GET["uname"];
	$uname = mysqli_real_escape_string($mydb, $uname);
}

if (isset ($_GET["password"]))
{
        $password = $_GET["password"];
        $password = mysqli_real_escape_string($mydb, $password);
}

?>
*/

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

/*
if (authenticate($mydb, $uname, $password))
{
	echo "Correct Login, Redirecting to next page".PHP_EOL;
	header("refresh: 3, url=testpage.php");
}
else
{
        echo "Incorrect Username and/or Password".PHP_EOL;
}

function authenticate($mydb, $uname, $password)
{
        $query = "select * from testtable where username='$uname' and password='$password' ";
        $response = $mydb->query($query);
        if ($mydb->errno != 0)
        {       
                echo "failed to execute query:".PHP_EOL;
                echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
                exit(0);
        }
        $numrows = mysqli_num_rows($response);

        if ($numrows == 0) {return false;}
        else    {return true;}
}
*/

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

$request = array();
$request['type'] = "Login";
$request['username'] = $_GET["uname"];;
$request['password'] = $_GET["password"];
$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

?>
