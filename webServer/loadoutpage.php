<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0;
  min-width: 250px;
}

/*Code Derived From: https://www.w3schools.com/howto/howto_js_todolist.asp */

/* Include the padding and border in an element's total width and height */
/*
{
  box-sizing: border-box;
}
*/
/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  
  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #7CFC00;
  color: #000;
 font-weight: bold;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

input[type='radio'], label{   
    vertical-align: baseline;
    margin: 7px;
   }
input[type=submit] {
    display: block;
    margin: 10px;
}


</style>
</head>
<body>

<div id="myDIV" class="header">
  <h2 style="margin:5px">Fighter Selection</h2>
</div>

<!--List to be populated with fighters-->

<ul id="myUL">
</ul>


<?php
session_start();

if (!isset($_SESSION["username"]))
{
	echo "Log in to view this Page";
	header("refresh: 4, url=index.html");
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
    $msg = "Default Register Message";
}

$request = array();
$request['type'] = "getFighters";
$request['userId'] = $_SESSION["userID"];
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
print_r($response);

/*
$request2 = array();
$request2['type'] = "getInventory";
$request2['userId'] = $_SESSION["userID"];
$response2 = $client->send_request($request2);
 */

//echo "client received response2: ".PHP_EOL;
//print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;



?>


<script type = "text/javascript">
document.onload = populateList();

</script>
<div>
<form action = "loadoutsubmit.php" id="submission" method = "post" >


	<label for="fighter">Choose Your Fighters:</label>
           
	<select name="fighters0" id="fighters0">
	<?php 
	
        foreach($response as $fighter)
        {
            echo "<option value = '$fighter[1]'>$fighter[6]</option>";  
	}
        ?>
            </select>
           
	<select name="fighters1" id="fighters1">
	<?php
	foreach($response as $fighter)
        {
            echo "<option value = '$fighter[1]'>$fighter[6]</option>";  
	}
	?>
            </select>
           
	<select name="fighters2" id="fighters2">
	<?php
        foreach($response as $fighter)
        {
            echo "<option value = '$fighter[1]'>$fighter[6]</option>";  
	}

	/*
	 * <option value = "<?php echo $response[0][1]; ?>"><?php echo $response[0][6] ?></option>
                <option value = "<?php echo $response[1][1]; ?>"><?php echo $response[1][6] ?></option>
                <option value = "<?php echo $response[2][1]; ?>"><?php echo $response[2][6] ?></option>
                <option value = "<?php echo $response[3][1]; ?>"><?php echo $response[3][6] ?></option>
                <option value = "<?php echo $response[4][1]; ?>"><?php echo $response[4][6] ?></option>
                <option value = "<?php echo $response[5][1]; ?>"><?php echo $response[5][6] ?></option>
                <option value = "<?php echo $response[6][1]; ?>"><?php echo $response[6][6] ?></option>
                <option value = "<?php echo $response[7][1]; ?>"><?php echo $response[7][6] ?></option>
                <option value = "<?php echo $response[8][1]; ?>"><?php echo $response[8][6] ?></option>
                <option value = "<?php echo $response[9][1]; ?>"><?php echo $response[9][6] ?></option>
		*/
        ?>
            </select>
              
	<br><br>
<p>Select Special Move For Fighter One:</p>

  <input type="radio" id="Just Bleed" name="f1sm" value="Just Bleed">
  <label for="Just Bleed">Just Bleed</label>
  
  <input type="radio" id="Scissor Claw" name="f1sm" value="Scissor Claw">
  <label for="Scissor Claw">Scissor Claw</label>
  
  <input type="radio" id="Meteor Assualt" name="f1sm" value="Meteor Assualt">
  <label for="Meteor Assualt">Meteor Assualt</label>
  
  <input type="radio" id="Roundhouse Kick" name="f1sm" value="Roundhouse Kick">
  <label for="Roundhouse Kick">Roundhouse Kick</label>
  

<p>Select Special Move For Fighter Two:</p>

  <input type="radio" id="Just Bleed" name="f2sm" value="Just Bleed">
  <label for="Just Bleed">Just Bleed</label>
  
  <input type="radio" id="Scissor Claw" name="f2sm" value="Scissor Claw">
  <label for="Scissor Claw">Scissor Claw</label>
  
  <input type="radio" id="Meteor Assualt" name="f2sm" value="Meteor Assualt">
  <label for="Meteor Assualt">Meteor Assualt</label>
  
  <input type="radio" id="Roundhouse Kick" name="f2sm" value="Roundhouse Kick">
  <label for="Roundhouse Kick">Roundhouse Kick</label>
  
 <p>Select Special Move For Fighter Three:</p>

  <input type="radio" id="Just Bleed" name="f3sm" value="Just Bleed">
  <label for="Just Bleed">Just Bleed</label>
  
  <input type="radio" id="Scissor Claw" name="f3sm" value="Scissor Claw">
  <label for="Scissor Claw">Scissor Claw</label>
  
  <input type="radio" id="Meteor Assualt" name="f3sm" value="Meteor Assualt">
  <label for="Meteor Assualt">Meteor Assualt</label>
  
  <input type="radio" id="Roundhouse Kick" name="f3sm" value="Roundhouse Kick">
  <label for="Roundhouse Kick">Roundhouse Kick</label>


<input type = "hidden" id = "fData1" value = "apple" />
<input type = "hidden" id = "fData2" value = "banana" />
<input type = "hidden" id = "fData3" value = "orange" />

<div>
<input type = "submit" value = "Submit Selection" />
</div>	

</form>
	</div>
</body>
</html>
