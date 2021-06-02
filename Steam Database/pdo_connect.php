
<?php
//database info variables
$user = "root";
$pass = "";
$db_info = 'mysql:host=localhost;dbname=steam_database';

//connect to database
try {
    $db = new PDO($db_info, $user, $pass);
    //print "Connected!";
} catch (PDOException $e) {
    //print "Error!: " . $e->getMessage() . "<br/>";
}
?>   
