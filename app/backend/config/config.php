<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type,Auth-Token');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  exit();
}


//$servername = "localhost";
//$username = "root";
//$password = "root";
//$dbname = "caro91";

//$servername = "localhost";
//$username = "aamirmuk_aamir";
//$password = "redhat@123";
//$dbname = "aamirmuk_caro91";

//$servername = "a2ls15.a2hosting.com";
//$username = "gateway2_dbuser";
//$password = "D@FFYduck2";
//$dbname = "gateway2_restaurant";

$adminEmail = "grahamecarrington@gmail.com";
$adminEmailPassword = "fleming1981";
$adminName = "Grahame Carrington";

error_reporting( E_ALL );

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
