<html>
<h1>Login Page</h1>
</html>

<?php
//  #!/usr/bin/php

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

<html>
        <body>
        <form action="authenticate.php">
                <div>
                <input type="text" name="uname" value="<?php echo $uname; ?>" >username<br>
                <input type="text" name="password" value="<?php echo $password; ?>" >password<br>
                </div>

                <div>
                <input type="submit" value="Login">
                </div>
        </form>
        </body>
</html>

<?php
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

?>
