<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$data = $request->data;
$restaurant_id = $request->restaurant_id;

if (isset($restaurant_id) && is_numeric($restaurant_id)) {

    $sql_pre = "`id`, `timestamp`";
    $sql_post = "NULL, CURRENT_TIMESTAMP";
    foreach ($data as $key => $value) {
        switch ($key) {
            case "date":
                $sql_pre = $sql_pre . ", `date`";
                break;
            case "lunchCoversStartDay":
                $sql_pre = $sql_pre . ", `lunch_cover_start_day`";
                break;
            case "dinnerCoversStartDay":
                $sql_pre = $sql_pre . ", `dinner_cover_start_day`";
                break;
            case "afternoonTeaCover":
                $sql_pre = $sql_pre . ", `afternoon_tea_covers`";
                break;
            case "brunchCovers":
                $sql_pre = $sql_pre . ", `brunch_covers`";
                break;
            case "lunchCoversNoShow":
                $sql_pre = $sql_pre . ", `lunch_cover_no_shows`";
                break;
            case "dinnerCoversNoShow":
                $sql_pre = $sql_pre . ", `dinner_cover_no_shows`";
                break;
            case "inHouseGuests":
                $sql_pre = $sql_pre . ", `in_house_guests`";
                break;
            case "lunchCoversWalkIns":
                $sql_pre = $sql_pre . ", `lunch_cover_walk_ins`";
                break;
            case "dinnerCoversWalkIns":
                $sql_pre = $sql_pre . ", `dinner_cover_walk_ins`";
                break;
            case "residentDiners":
                $sql_pre = $sql_pre . ", `diner_resident`";
                break;
            case "lunchCoversTotal":
                $sql_pre = $sql_pre . ", `lunch_cover_total`";
                break;
            case "dinnerCoversTotal":
                $sql_pre = $sql_pre . ", `dinner_cover_total`";
                break;
            case "roomServiceCovers":
                $sql_pre = $sql_pre . ", `room_service_covers`";
                break;
            case "lunchFoodRevenues":
                $sql_pre = $sql_pre . ", `lunch_food_revenue`";
                break;
            case "dinnerFoodRevenue":
                $sql_pre = $sql_pre . ", `dinner_food_revenue`";
                break;
            case "barFoodRevenue":
                $sql_pre = $sql_pre . ", `bar_food_revenue`";
                break;
            case "afternoonTeaRevenue":
                $sql_pre = $sql_pre . ", `afternoon_tea_revenue`";
                break;
            case "lunchLiquorRevenue":
                $sql_pre = $sql_pre . ", `lunch_liquor_revenue`";
                break;
            case "dinnerLiquorRevenue":
                $sql_pre = $sql_pre . ", `dinner_liquor_revenue`";
                break;
            case "barLiquorRevenue":
                $sql_pre = $sql_pre . ", `bar_liquor_revenue`";
                break;
            case "commentarySales":
                $sql_pre = $sql_pre . ", `sales`";
                break;
            case "commentaryPayroll":
                $sql_pre = $sql_pre . ", `payroll`";
                break;
            case "commentaryMaintenanceIssues":
                $sql_pre = $sql_pre . ", `maintenance_issues`";
                break;
            case "commentaryPeople":
                $sql_pre = $sql_pre . ", `people`";
                break;
            case "commentaryProduct":
                $sql_pre = $sql_pre . ", `product`";
                break;
            case "commentaryMarketing":
                $sql_pre = $sql_pre . ", `marketing`";
                break;
            case "commentaryPersonName":
                $sql_pre = $sql_pre . ", `name_person_completing_form`";
                break;
            case "commentaryEmail":
                $sql_pre = $sql_pre . ", `email_confirmation_responses_sent`";
                break;
            default:
                echo "ERROR";
        }
        $sql_post = $sql_post . ", '" . $value . "'";

    }
    $sql_pre = $sql_pre . ", `restaurant_id`";
    $sql_post = $sql_post . ", '" . $restaurant_id . "'";
    $sql = "INSERT INTO `restaurant` (" . $sql_pre . ") VALUES (" . $sql_post . ");";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(array('success' => true, 'data' => null, 'message' => 'Your data has been saved'));
    } else {
        http_response_code(400);
        echo json_encode(array('success' => true, 'data' => null, 'message' => 'Your data has been saved'));
    }


}