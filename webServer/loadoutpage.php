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
{
  box-sizing: border-box;
}

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
$response = $client->send_request($request);
//$response = $client->publish($request);

echo "client received response: ".PHP_EOL;
//print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

/*if ($response["returnCode"] == '0')
{
        echo "Grabbed Fighters".PHP_EOL;
}
else
{
        echo "Grab Fighters Fail".PHP_EOL;
}*/
//echo  htmlspecialchars($response);

?>


<script type = "text/javascript">

//Get Php/mysql array into the javascript
var fighterData = <?php echo json_encode($response); ?>;

//Loop that takes cuts every 18th Comma makes a new fighter Element with the data
var fighterIds = [];
var fighterNames = [];
for(var i = 0; i < fighterData.length; i++)
{
//singleFighter = fighterList[i].string;
	var singleFighter =  fighterData[i];
	fighterIds[i] = singleFighter[1];
	fighterNames[i] = singleFighter[6];
	newElement(singleFighter[6]);
}


//Count Variable for Selection

var countery = 0;

// Add a "checked" symbol when clicking on a list item
/*var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI' && countery < 3 && !ev.target.classList.contains('checked')) {
    ev.target.classList.toggle('checked');
    countery++;
  }
  else if(ev.target.classList.contains('checked'))
  {
  ev.target.classList.toggle('checked');
  countery--;
  }
*/
}, false);

// Create a new list item when clicking on the "Add" button
function newElement(data) {
	 	var option = document.createElement("option");
		 option.text = data;
        	option.value = data;
		document.getElementById("fighter0").add(option);
		document.getElementById("fighter1").add(option);
		document.getElementById("fighter2").add(option);

        
}

/*function getFighters()
{
//var checkedFighters = [];
	var theList = document.getElementById("myUL");
	for(var i = 0; i < fighterData.length; i++){
		if (fighterNames[i] = theList.getElementsByClassName('checked')[0].innerText){
			checkedFighters1 = fighterIds[i];
		}
	}
	for(var i = 0; i < fighterData.length; i++){
                if (fighterNames[i] = theList.getElementsByClassName('checked')[1].innerText){
                        checkedFighters2 = fighterIds[i];
                }
	}
	for(var i = 0; i < fighterData.length; i++){
                if (fighterNames[i] = theList.getElementsByClassName('checked')[2].innerText){
                        checkedFighters3 = fighterIds[i];
                }
        }
*/

//checkedFighters1 = theList.getElementsByClassName('checked')[0].innerText;
//checkedFighters2 = theList.getElementsByClassName('checked')[1].innerText;
//checkedFighters3 = theList.getElementsByClassName('checked')[2].innerText;
/*document.getElementById("fData1").value = checkedFighters1;
document.getElementById("fData2").value = checkedFighters2;
document.getElementById("fData3").value = checkedFighters3;
console.log(checkedFighters1);
console.log(checkedFighters2);
console.log(checkedFighters3);*/
//return true;
}
</script>

<div>
<form action = "loadoutsubmit.php" id="submission" method = "post" onsubmit="getFighters()" >

	<label for="fighter">Choose Your Fighters:</label>
           
	<select name="fighters0" id="fighters0">
            </select>
           
	<select name="fighters1" id="fighters1">
            </select>
           
	<select name="fighters2" id="fighters2">
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

