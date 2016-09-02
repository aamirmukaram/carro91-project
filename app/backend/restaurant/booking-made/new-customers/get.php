<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';


//
// Required : $_GET['period'] : 8,7
// Required : $_GET['restaurant_id'] : 0

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    if (isset($_GET['period']) &&
        is_numeric($_GET['period'])
    ) {

        $period = $_GET['period'];
        $send = array();

        $data = array();

        $sql = "SELECT `email`,COUNT(*) AS count FROM `restaurant_bookatable` WHERE `restaurant_id` = ".$restaurant_id." AND `email` != '' AND MONTH(`booking_timestamp`) = '".$period."'  GROUP BY `email`";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));
    }
}