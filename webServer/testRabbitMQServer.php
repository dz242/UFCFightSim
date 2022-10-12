#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

function doLogin($username,$password)
{	
	//Osama Login In Here
$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

if ($mydb->errno != 0)
{
        echo "failed to connect to database: ". $mydb->error . PHP_EOL;
        exit(0);
}

//echo "successfully connected to database".PHP_EOL;

$query = "select * from users where username='$username' and password='$password' ";

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

function requestProcessor($request)
{
  echo "received request".PHP_EOL;
  var_dump($request);
  if(!isset($request['type']))
  {
    return "ERROR: unsupported message type";
  }
  switch ($request['type'])
  {
  case "Login":
	  if (doLogin($request['username'],$request['password']))
	  {
		  echo "Successful login".PHP_EOL;
		  return array("returnCode" => '0', 'message'=>"Successful Login");
	  }
	  else
	  {
		 echo "Invalid Login".PHP_EOL;
		 return array("returnCode" => '1', 'message'=>"Invalid Login");
	  }
    case "validate_session":
      return doValidate($request['sessionId']);
  }
  return array("returnCode" => '0', 'message'=>"Server received request and processed");}

$server = new rabbitMQServer("testRabbitMQ.ini","testServer");

$server->process_requests('requestProcessor');
exit();
?>

