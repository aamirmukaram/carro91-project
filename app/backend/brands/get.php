<?php
require '../config/config.php';
require '../helpers/helpers.php';
require '../config/secure.php';


//HELPERS

$data = array();

$sql = "select `brands`.`id` as id , `brands`.`name` as name from `brands`  ORDER BY `brands`.`id`";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
$return = array('brands' => $data);
echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));

