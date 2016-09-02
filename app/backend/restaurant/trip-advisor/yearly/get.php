<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';


// Optional : $_GET['period'] : 2016
// Required : $_GET['restaurant_id'] : 0

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    if (isset($_GET['period']) &&
        is_numeric($_GET['period'])
    ) {
        $period = $_GET['period'];
        $data = array();

        $sql = "SELECT * , MONTHNAME(`date`) as month from `restaurant_trip_advisor_detail` WHERE `restaurant_id` = ".$restaurant_id." AND YEAR(`date`) = ".$period;
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $return = array('data' => $data);
        echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));
    }
}