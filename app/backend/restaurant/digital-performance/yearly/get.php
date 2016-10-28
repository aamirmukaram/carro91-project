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

        // sql without the gift_vouchers parameter from table
        /*
        $sql = "SELECT MONTHNAME(restaurant_twitter_py.TIMESTAMP) AS `month`, followers AS `twitter`, restaurant_facebook_py.likes AS `facebook`, restaurant_mailchimp_py.subscribers AS `database_split`
FROM restaurant_twitter_py  
INNER JOIN restaurant_facebook_py ON restaurant_facebook_py.restaurant_id = restaurant_twitter_py.restaurant_id
INNER JOIN restaurant_mailchimp_py ON restaurant_mailchimp_py.restaurant_id = restaurant_twitter_py.restaurant_id
WHERE restaurant_twitter_py.restaurant_id=" . $restaurant_id . " 
AND YEAR(restaurant_twitter_py.TIMESTAMP)=" . $period . " 
GROUP BY MONTHNAME(`TIMESTAMP`)";
*/

        $sql = "SELECT MONTHNAME(restaurant_twitter_py.TIMESTAMP) AS `month`, followers AS `twitter`, restaurant_facebook_py.likes AS `facebook`, restaurant_mailchimp_py.subscribers AS `database_split`, restaurant_digital_performance.gift_vouchers AS `gift_vouchers`
FROM restaurant_twitter_py  
INNER JOIN restaurant_facebook_py ON restaurant_facebook_py.restaurant_id = restaurant_twitter_py.restaurant_id
INNER JOIN restaurant_mailchimp_py ON restaurant_mailchimp_py.restaurant_id = restaurant_twitter_py.restaurant_id
INNER JOIN restaurant_digital_performance ON restaurant_digital_performance.restaurant_id = restaurant_twitter_py.restaurant_id
WHERE restaurant_twitter_py.restaurant_id=" . $restaurant_id . " 
AND YEAR(restaurant_twitter_py.TIMESTAMP)=" . $period . " 
GROUP BY MONTHNAME(`TIMESTAMP`)";

        //echo $sql;

      /*  $sql = "SELECT MONTHNAME(restaurant_twitter_py.TIMESTAMP) AS `month`, followers AS `twitter`, restaurant_facebook_py.likes AS `facebook`
FROM restaurant_twitter_py  
INNER JOIN restaurant_facebook_py ON restaurant_facebook_py.restaurant_id = restaurant_twitter_py.restaurant_id
WHERE restaurant_twitter_py.restaurant_id=" . $restaurant_id . "
AND YEAR(`restaurant_twitter_py.TIMESTAMP`)=" . $period . "
GROUP BY MONTHNAME(`TIMESTAMP`)";*/

        //$sql = "SELECT followers AS `twitter`, MONTHNAME(`TIMESTAMP`) AS `month` FROM restaurant_twitter_py WHERE `restaurant_id` = " . $restaurant_id . " AND YEAR(`TIMESTAMP`)=" . $period . " GROUP BY MONTH(`TIMESTAMP`)";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));


        // SELECT MONTHNAME(TIMESTAMP) , followers AS `twitter` FROM restaurant_twitter_py GROUP BY MONTHNAME(`TIMESTAMP`)
        /*

        $sql = "SELECT followers AS `twitter`, MONTHNAME(`TIMESTAMP`) AS `month` FROM restaurant_twitter_py WHERE YEAR(`TIMESTAMP`)=" . $period . " GROUP BY MONTH(`TIMESTAMP`)";

        //$sql = "SELECT MONTHNAME(`date`) as month, `gift_vouchers`,`database_split`,`facebook`,`twitter` from `restaurant_digital_performance` WHERE YEAR(`date`) = " . $period . " AND `restaurant_id` = " . $restaurant_id . " GROUP BY MONTH(`date`)";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(array('success' => true, 'data' => $data, 'message' => 'Your data has been fetched'));
        */
    }
}