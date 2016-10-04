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
        $send = array();
        $labels = array();
        $data = array();

        $sql = "SELECT MONTHNAME(`date`) AS month ,SUM(`lunch_cover_total`) + SUM(`dinner_cover_total`) + SUM(`afternoon_tea_covers`)  AS 'total_covers' FROM `restaurant` WHERE YEAR(`date`) = '" . $period . "' AND `restaurant_id` = " . $restaurant_id . " GROUP BY MONTH(`date`)";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row['total_covers'];
            $labels[] = $row['month'];
        }
        $return = array('labels' => $labels, 'data' => $data);
        echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));

    }
}

//
//SELECT WEEK(`date`) AS week ,SUM(`lunch_cover_total`) + SUM(`dinner_cover_total`) + SUM(`afternoon_tea_covers`)  AS 'total_covers' FROM `restaurant` WHERE MONTH(`date`) = '4' AND YEAR(`date`) = '2015' AND 'restaurant_id' = 0 GROUP BY week(DATE_SUB(`date`, INTERVAL 5 DAY))
//
