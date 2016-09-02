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
        $send = array();
        $labels = array();
        $data = array();

        $sql = "SELECT MONTHNAME(`date`) AS month ,SUM(`afternoon_tea_revenue`) + SUM(`bar_food_revenue`) + SUM(`bar_liquor_revenue`) + SUM(`dinner_food_revenue`) + SUM(`dinner_liquor_revenue`) + SUM(`function_room_food_revenue`) + SUM(`function_room_liquor_revenue`) + SUM(`lunch_food_revenue`) + SUM(`lunch_liquor_revenue`) AS 'total_revenues' FROM `restaurant` WHERE YEAR(`date`) = '" . $period . "' AND `restaurant_id` = " . $restaurant_id . " GROUP BY MONTH(`date`)";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row['total_revenues'];
            $labels[] = $row['month'];
        }
        $return = array('labels' => $labels, 'data' => $data);
        echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));
    }
}