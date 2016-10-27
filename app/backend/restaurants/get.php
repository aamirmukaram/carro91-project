<?php
require '../config/config.php';
require '../helpers/helpers.php';

$data = array();

$sql = "select `brands`.`name` as brand_name, `restaurants`.`id` as id ,`restaurants`.`name` as name ,`restaurants`.`brand_id` as brand_id , CONCAT(`restaurants`.`name`,' - ',`brands`.`name`) as full_name from `restaurants` INNER JOIN `brands` ON `restaurants`.`brand_id`=`brands`.`id` ORDER BY `brands`.`id`";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
$return = array('restaurants' => $data);
echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));

