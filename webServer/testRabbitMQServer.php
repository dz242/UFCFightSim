#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

//logErr("testBanana4" . PHP_EOL);

function logErr($string)
{
	$t = time();
	error_log(date("Y-m-d h:i:s A"). ' '. $string ,3,"error.log");
	echo($string);
}
function doLogin($username,$password,$SID)
{	
	//Osama Login In Here
$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

if ($mydb->errno != 0)
{
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);       
	exit(0);
}

//echo "successfully connected to database".PHP_EOL;

$username = sanitize($username);
$password = sanitize($password);
echo($username.PHP_EOL);
echo($password.PHP_EOL);

$query = "select * from users where username='$username'";

$response = $mydb->query($query);
        if ($mydb->errno != 0)
        {       
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
        }
        $numrows = mysqli_num_rows($response);

	if ($numrows == 0) {return false;}

	$row = mysqli_fetch_array($response, MYSQLI_ASSOC);
	$hash = $row['password'];

	if (password_verify($password, $hash)) {
		
		updateSession($SID,$username,$mydb); 	
		return true;
	}
	else {return false;}
}


function doRegister($username,$password,$email)
{
	        //Osama Login In Here
$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

if ($mydb->errno != 0)
{
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);
        exit(0);
}

//echo "successfully connected to database".PHP_EOL;

$username = sanitize($username);
$password = sanitize($password);
echo($username.PHP_EOL);
echo($password.PHP_EOL);

$hash = password_hash($password, PASSWORD_DEFAULT);

$query = "insert into users (username, password, email) values ('$username', '$hash', '$email')";

$response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                return false;
	}
	else
	{
		return true;
	}
}

function doValidate($SID) {
$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

if ($mydb->errno != 0)
{
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);
        exit(0);
}
$query = "select * from users where SID='$SID'";

$response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
        }
        $numrows = mysqli_num_rows($response);

	if ($numrows == 0) {return false;}
	else {return true;}
}

function sanitize($input)
{
	$inputSan = filter_var($input, FILTER_SANITIZE_STRING); //Gets rid of Html code
	//$inputSan = str_replace(' ', '', $inputSan); // gets rid of spaces
	$inputSan = preg_replace('/[^A-Za-z0-9]/', '', $inputSan);
	
	return $inputSan;
}

function updateSession($SID, $username, $mydb): void
{
	$query = "update users SET sid = '$SID' where username = '$username'";
	$response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
	}
	return;
}
function fetchUser($username)
{
	$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

	if ($mydb->errno != 0)
	{
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);
        exit(0);
	}
	$query = "select * from users where username='$username'";

	$response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
        }
	$user = mysqli_fetch_array($response, MYSQLI_ASSOC);
	return array("userID" => $user['userId'], "username" => $user['username'], "email" => $user['email'], "wins" => $user['wins'], "losses" => $user['losses']);
}
function fetchLoadout($userId)
{
	$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

        if ($mydb->errno != 0)
        {
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);
        exit(0);
        }
        $query = "select * from loadouts where userId='$userId'";

        $response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
        }
	$loadout = mysqli_fetch_array($response, MYSQLI_ASSOC);
	return array("fighter1" => $loadout['fighter1'], "fighter2" => $loadout['fighter2'], "fighter3" => $loadout['fighter3'], "sp_move1" => $loadout['sp_move1'], "sp_move2" => $loadout['sp_move2'], "sp_move3" => $loadout['sp_move3']);

}

function getFighterStats($fighter)
{
	$mydb = new mysqli('127.0.0.1','osama','password1','UFC');

        if ($mydb->errno != 0)
        {
        logErr("failed to connect to database: ". $mydb->error . PHP_EOL);
        exit(0);
        }
        $query = "select * from loadouts where fighter_id='$fighter'";

        $response = $mydb->query($query);
        if ($mydb->errno != 0)
        {
                logErr("failed to execute query:".PHP_EOL);
                logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                exit(0);
        }
	$stats = mysqli_fetch_array($response, MYSQLI_ASSOC);
	return array("dob" => $stats['dob'], "fighter_id" => $stats['fighter_id'], "height" => $stats['height'], "n_draw" => $stats['n_draw'], "n_loss" => $stats['n_loss'], "n_win" => $stats['n_win'], "name" => $stats['name'], "reach" => $stats['reach'], "sig_str_abs_pM" => $stats['sig_str_abs_pM'], "sig_str_def_pct" => $stats['sig_str_def_pct'], "sig_str_land_pM" => $stats['sig_str_land_pM'], "sig_str_land_pct" => $stats['sig_str_land_pct'], "stance" => $stats['stance'], "sub_avg" => $stats['sug_avg'], "td_avg" => $stats['td_avg'], "td_def_pct" => $stats['td_def_pct'], "td_land_pct" => $stats['td_land_pct'], "weight" => $stats['weight']); 

}

function insertLoadouts($userId,$fighter1,$fighter2,$fighter3,$f1sm,$f2sm,$f3sm)
{
	 $mydb = new mysqli('127.0.0.1','osama','password1','UFC');
	 $query = "select * from loadouts where userId='$userId'";
	$response = $mydb->query($query);
	
	 $numrows = mysqli_num_rows($response);

	 if ($numrows == 0) {
	 $query2 = "insert into loadouts(userId, fighter1, fighter2, fighter3, sp_move1, sp_move2, sp_move3) values('$userId','$fighter1', '$fighter2', '$fighter3', '$f1sm', '$f2sm', '$f3sm')";

	 }
	 else
	 {
		 $query2 = "update loadouts set fighter1 = '$fighter1', fighter2 = '$fighter2', fighter3 = '$fighter3', sp_move1 = '$f1sm', sp_move2 = '$f2sm', sp_move3 = '$f3sm' where userId = '$userId'";
	 }

                $response = $mydb->query($query2);
                if ($mydb->errno != 0)
                {
                        logErr("failed to execute query:".PHP_EOL);
                        logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
			
			return(false);
                }
		return(true);


}


function requestProcessor($request)
{
  echo "received request".PHP_EOL;
  var_dump($request);
  if(!isset($request['type']))
  {
	logErr("ERROR: unsupported message type");
    return;
  }
  switch ($request['type'])
  {
  case "Login":

	  if (doLogin($request['username'],$request['password'],$request['SID']))
	  {
		  echo "Successful login".PHP_EOL;
		  $user = fetchUser($request['username']);
		  $loadout = fetchLoadout($user["userID"]);
		  return array("returnCode" => '0', 'message'=>"Successful Login", "user"=>$user, "loadout"=>$loadout);
	  }
	  else
	  {
		 logErr("Invalid Login".PHP_EOL);
		 return array("returnCode" => '1', 'message'=>"Invalid Login");
	  }
  case "Register":

	if (doRegister($request['username'],$request['password'],$request['email']))
	{
		echo "Succesful Register".PHP_EOL;
		return array("returnCode" => '0', 'message'=>"Successful Register");
	}
	else
	{
		logErr("Register Failed".PHP_EOL);
		return array("returnCode" => '1', 'message'=>"Register Failed");
	}

  case "validate_session":

	 if (doValidate($request['SID']))
	 {
		 echo "Succesful Session Validation".PHP_EOL;
		 return true;
	 }
	 else
	 {
		 logErr("Session Validation Failed".PHP_EOL);
		 return false; 
	 }

  case "getFighters":
        
	    	$mydb = new mysqli('127.0.0.1','osama','password1','UFC');
		$queryFighters = "select * from fighters limit 0,11";
		$fighterArray = array();
		$response = $mydb->query($queryFighters);
		for($i=0;$i<10;$i++)
		{
			$fighterArray[$i] = mysqli_fetch_array($response,MYSQLI_NUM);
		}
        	return($fighterArray);
  
case "getProfile":
                $mydb = new mysqli('127.0.0.1','osama','password1','UFC');

                $query = "select * from users where username='bob'";

                $response = $mydb->query($query);
                if ($mydb->errno != 0)
                {
                        logErr("failed to execute query:".PHP_EOL);
                        logErr(__FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL);
                        exit(0);
                }
                $numrows = mysqli_num_rows($response);

                if ($numrows == 0) {return false;}

                $row = mysqli_fetch_array($response, MYSQLI_ASSOC);


                echo "Name:".$row['username'];
                echo "Email:".$row['email'];
                echo "Wins:".$row['wins'];
                echo "Losses:".$row['losses'];
                $profileInfoArray=array('username'=>$row['username'],'email'=>$row['email'],'wins'=>$row['wins'],'losses'=>$row['losses']);
                return($profileInfoArray);


case "submitLoadout": 

	if(insertLoadouts($request['userId'],$request['fighter1'],$request['fighter2'],$request['fighter3'],$request['f1sm'],$request['f2sm'],$request['f3sm']))
	{
                echo "Succesful Insert Into Loadouts".PHP_EOL;
                return array("returnCode" => '0', 'message'=>"Successful Register");
        }
        else
        {
                logErr("Inserting Loadouts Failed".PHP_EOL);
                return array("returnCode" => '1', 'message'=>"Register Failed");
        }



  }

  return array("returnCode" => '0', 'message'=>"Server received request and processed");}
 

$server = new rabbitMQServer("testRabbitMQ.ini","testServer");

$server->process_requests('requestProcessor');
exit();
?>
