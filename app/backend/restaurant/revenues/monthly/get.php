<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';



// Optional : $_GET['period'] : 5
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
        $start_of_week = 5;//Friday:5

        $sql = "SELECT SUM(`afternoon_tea_revenue`) + SUM(`bar_food_revenue`) + SUM(`bar_liquor_revenue`) + SUM(`dinner_food_revenue`) + SUM(`dinner_liquor_revenue`) + SUM(`function_room_food_revenue`) + SUM(`function_room_liquor_revenue`) + SUM(`lunch_food_revenue`) + SUM(`lunch_liquor_revenue`) AS 'total_revenues' FROM `restaurant` WHERE MONTH(`date`) = '".$period."' AND YEAR(`date`) = YEAR(CURDATE()) AND `restaurant_id` = ".$restaurant_id." GROUP BY week(DATE_SUB(`date`, INTERVAL ".$start_of_week." DAY))";
        $result = $conn->query($sql);

        $counter = 1;
        while ($row = $result->fetch_assoc()) {
            $data[] = $row['total_revenues'];
            $labels[] = 'Week '.$counter;
            $counter = $counter + 1;
        }
        $return = array('labels' => $labels, 'data' => $data);
        echo json_encode(array('success' => true, 'data' => $return, 'message' => 'Your data has been fetched'));
    }
}