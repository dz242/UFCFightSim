#!/usr/bin/php
<?php

$opencsv = fopen("data/fighter_stats/fighterStats.csv", 'r');

$csvkeys = fgetcsv($opencsv, "1024", ",");


$array = array();

while ($row = fgetcsv($opencsv, "1024", ","))
{
	$array[] = array_combine($csvkeys, $row);
}

$json = json_encode($array);

$obj = json_decode($json, true);

foreach($obj as $stat)
{
	echo($stat['name'].PHP_EOL);
}
?>
