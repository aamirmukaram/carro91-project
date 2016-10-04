<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';


//
// Required : $_GET['period'] : 2016
// Required : $_GET['restaurant_id'] : 0

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    if (isset($_GET['period']) &&
        is_numeric($_GET['period'])
    ) {

        $period = $_GET['period'];
        $data = array();

        $sql = "SELECT MONTHNAME(`date`) as month, `gift_vouchers`,`database_split`,`facebook`,`twitter` from `restaurant_digital_performance` WHERE YEAR(`date`) = " . $period . " AND `restaurant_id` = " . $restaurant_id . " GROUP BY MONTH(`date`)";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));

    }
}