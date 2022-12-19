<?php 
session_start();

$_SESSION = array();
session_destroy();
setcookie("PHPSESSID", "", time()-3600);

echo "You have signed out.";

header("refresh: 5, url=index.html");

?>
