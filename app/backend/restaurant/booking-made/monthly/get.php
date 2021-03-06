<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';


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

        $sql = "SELECT SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'Booked' OR `restaurant_bookatable`.`booking_status` = 'Re Confirmed' THEN 1 ELSE 0 END) AS `new_bookings` , SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'Cancelled' THEN 1 ELSE 0 END) AS `cancelled` FROM `restaurant_bookatable` WHERE YEAR(`booking_timestamp`) = YEAR(CURDATE()) AND `restaurant_id` = ".$restaurant_id." AND MONTH(`booking_timestamp`) = ".$period;
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));
    }
}