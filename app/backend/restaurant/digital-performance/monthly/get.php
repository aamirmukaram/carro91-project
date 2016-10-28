<?php
require '../../../config/config.php';
require '../../../helpers/helpers.php';
require '../../../config/secure.php';


//
// Required : $_GET['period'] : 5
// Required : $_GET['restaurant_id'] : 0

if (isset($_GET['restaurant_id']) && is_numeric($_GET['restaurant_id'])) {

    $restaurant_id = $_GET['restaurant_id'];

    if (isset($_GET['period']) &&
        is_numeric($_GET['period'])
    ) {

        $period = $_GET['period'];
        $period = $period + 1;
        $send = array();

        $data = array();

        $sql = "SELECT followers AS `twitter`, restaurant_facebook_py.likes AS `facebook`, restaurant_mailchimp_py.subscribers AS `database_split`, restaurant_digital_performance.gift_vouchers AS `gift_vouchers`
FROM restaurant_twitter_py  
INNER JOIN restaurant_facebook_py ON restaurant_facebook_py.restaurant_id = restaurant_twitter_py.restaurant_id
INNER JOIN restaurant_mailchimp_py ON restaurant_mailchimp_py.restaurant_id = restaurant_twitter_py.restaurant_id
INNER JOIN restaurant_digital_performance ON restaurant_digital_performance.restaurant_id = restaurant_twitter_py.restaurant_id
WHERE restaurant_twitter_py.restaurant_id=" . $restaurant_id . " 
AND YEAR(restaurant_twitter_py.TIMESTAMP)=YEAR(CURDATE())
AND MONTH(restaurant_twitter_py.TIMESTAMP)=" . $period + " LIMIT 2";
//echo $sql;
        //e $sql = "select `restaurant_id`,`gift_vouchers`,`gift_vouchers` - (SELECT IFNULL( (select `gift_vouchers`FROM `restaurant_digital_performance` WHERE MONTH(`date`) = " . $period . " AND YEAR(`date`) = YEAR(CURDATE()) - 1 AND `restaurant_id` = " . $restaurant_id . ") ,0)) as gift_vouchers_diff ,
//e`database_split`,`database_split` - (SELECT IFNULL( (select `database_split`FROM `restaurant_digital_performance` WHERE MONTH(`date`) = " . $period . " AND YEAR(`date`) = YEAR(CURDATE()) - 1 AND `restaurant_id` = " . $period . ") ,0)) as database_split_diff ,`facebook`,`facebook` - (SELECT IFNULL( (select `facebook` FROM `restaurant_digital_performance` WHERE MONTH(`date`) = " . $period . " AND YEAR(`date`) = YEAR(CURDATE()) - 1 AND `restaurant_id` = " . $restaurant_id . ") ,0)) as facebook_diff,`twitter`,`twitter` - (SELECT IFNULL( (select `twitter`FROM `restaurant_digital_performance` WHERE MONTH(`date`) = " . $period . " AND YEAR(`date`) = YEAR(CURDATE()) - 1 AND `restaurant_id` = " . $restaurant_id . ") ,0)) as twitter_diff,`date` FROM `restaurant_digital_performance` WHERE MONTH(`date`) = " . $period . " AND YEAR(`date`) = YEAR(CURDATE()) AND `restaurant_id` = " . $restaurant_id;

        //echo "FRANK : " + $sql;
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $row = array_to_number($row);
            $data[] = $row;
        }
        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched Frank'));
    }
}