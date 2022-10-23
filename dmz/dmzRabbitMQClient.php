#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("dmzRabbitMQ.ini","dmzServer");


$opencsv = fopen("data/fighter_stats/fighterStats.csv", 'r');
$csvkeys = fgetcsv($opencsv, "1024", ",");
$array = array();

while ($row = fgetcsv($opencsv, "1024", ","))
{
        $array[] = array_combine($csvkeys, $row);
}

$msg = json_encode($array);



$request = array();
$request['type'] = "SendFighters";
$request['message'] = $msg;
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

