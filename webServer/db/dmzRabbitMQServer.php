#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

function doSendFighters($json)
{
    $arr = json_decode($json, true);


    $mydb = new mysqli('127.0.0.1','osama','password1','UFC');

if ($mydb->errno != 0)
{
        echo "failed to connect to database: ". $mydb->error . PHP_EOL;
        exit(0);
}

//This foreach loop goes through each fighter and assigns their stats to variables, which are then put as the values of the sql query
foreach($arr as $stat)
{
  $dob=$stat['dob'];
  $fighter_id=$stat['fighter_id'];
  $height=$stat['height'];
  $n_draw=$stat['n_draw'];
  $n_loss=$stat['n_loss'];
  $n_win=$stat['n_win'];
  $name=$stat['name'];
  $reach=$stat['reach'];
  $sig_str_abs_pM=$stat['sig_str_abs_pM'];
  $sig_str_def_pct=$stat['sig_str_def_pct'];
  $sig_str_land_pM=$stat['sig_str_land_pM'];
  $sig_str_land_pct=$stat['sig_str_land_pct'];
  $stance=$stat['stance'];
  $sig_str_abs_pM=$stat['sig_str_abs_pM'];
	$sub_avg=$stat['sub_avg'];
  $td_avg=$stat['td_avg'];
  $td_def_pct=$stat['td_def_pct'];
  $td_land_pct=$stat['td_land_pct'];
  $weight=$stat['weight'];



	$query = "insert into fighters (dob, fighter_id, height, n_draw, n_loss, n_win, name, reach, sig_str_abs_pM, sig_str_def_pct, 
  sig_str_land_pM, sig_str_land_pct, stance, sub_avg, td_avg, td_def_pct, td_land_pct, weight) 
  values ('$dob', '$fighter_id', '$height', '$n_draw', '$n_loss', '$n_win', '$name', '$reach', '$sig_str_abs_pM', '$sig_str_def_pct', 
  '$sig_str_land_pM', '$sig_str_land_pct', '$stance', '$sub_avg', '$td_avg', '$td_def_pct', '$td_land_pct', '$weight')";


  $response = $mydb->query($query);
}

        if ($mydb->errno != 0)
        {
                echo "failed to execute query:".PHP_EOL;
                echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
                return false;
        }
        else
        {
                return true;
        }

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
    case "SendFighters":
      return doSendFighters($request['message']);
    default:
      return false;
  }
  return array("returnCode" => '0', 'message'=>"Server received request and processed");
}

$server = new rabbitMQServer("dmzRabbitMQ.ini","dmzServer");

echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>
