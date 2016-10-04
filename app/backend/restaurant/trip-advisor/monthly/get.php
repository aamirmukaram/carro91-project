<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';

// Optional : $_GET['period'] : 5
// Required : $_GET['restaurant_id'] : 0

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    if (isset($_GET['period']) &&
        is_numeric($_GET['period'])
    ) {
        $period = $_GET['period'];
        $data = array();


        $sql = "select *,(`average` + 50) as average_max,(`business` + 50) as business_max,(`couples` + 50) as couples_max,(`excellent` + 50) as excellent_max,(`families`+50) as families_max,(`friends`+50) as friends_max,(`poor`+50) as poor_max,(`solo` + 50) as solo_max , (`solo` + 50) as solo_max, (`terrible` + 50) as terrible_max , (`very_good` + 50) as very_good_max FROM `restaurant_trip_advisor` WHERE MONTH(`date`) = ".$period." AND YEAR(`date`) = YEAR(CURDATE()) AND `restaurant_id` = ".$restaurant_id." LIMIT 1";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));
    }
}