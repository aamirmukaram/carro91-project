<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';


//
// Required : $_GET['period'] : 2016-08-03 YYYY-MM-DD
// Required : $_GET['restaurant_id'] : 13

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    $period = strtotime($_GET['period']);


    if (isset($_GET['period']) && is_numeric($period)) {

        $period_month = date('m', $period);
        $period_year = date('Y', $period);
        $send = array();

        $data = array();

        $sql = "SELECT DATE_FORMAT(DATE(`booking_timestamp`),'%d') as date, DATE(`booking_timestamp`) as date_full,
		SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'Booked' THEN 1 ELSE 0 END) AS `new_bookings` ,
		SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'Re Confirmed' THEN 1 ELSE 0 END) AS `re_booked` ,
		SUM(`restaurant_bookatable`.`covers`) AS `covers` ,
		SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'No Show' THEN 1 ELSE 0 END) AS `no_show` ,
		SUM(CASE WHEN `restaurant_bookatable`.`booking_status` = 'Cancelled' THEN 1 ELSE 0 END) AS `cancelled` FROM `restaurant_bookatable` WHERE MONTH(`booking_timestamp`) = '" . $period_month . "' AND YEAR(`booking_timestamp`) = '".$period_year."' AND `restaurant_id` = '".$restaurant_id."' GROUP BY DATE(`booking_timestamp`)";

        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));
    }
}