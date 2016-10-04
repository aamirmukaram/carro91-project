<?php
require '../../config/config.php';
require '../../helpers/helpers.php';
require '../../config/secure.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
    return;


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$firstName = null;
$lastName = null;
$email = null;
$password = null;
$password2 = null;
$country = null;
$gender = null;
$restaurant = null;
$position = null;

$result = null;


if (property_exists($request, 'firstName'))
    $firstName = $request->firstName;
if (property_exists($request, 'gender'))
    $gender = $request->gender;
if (property_exists($request, 'country'))
    $country = $request->country;
if (property_exists($request, 'lastName'))
    $lastName = $request->lastName;
if (property_exists($request, 'email'))
    $email = $request->email;
if (property_exists($request, 'password'))
    $password = $request->password;
if (property_exists($request, 'password2'))
    $password2 = $request->password2;
if (property_exists($request, 'position'))
    $position = $request->position;
if (property_exists($request, 'restaurants'))
    $restaurants = $request->restaurants;


if (isset($firstName) && isset($lastName) && isset($email) && isset($password) && isset($restaurants) && isset($position)) {

    if ($password == $password2) {

        $sql = "INSERT INTO `users` (`id`, `first_name`, `email`, `password`, `created`, `access_level`, `gender`, `is_verified`, `last_name`, `country`, `position`) VALUES (NULL, '" . $firstName . "', '" . $email . "','" . $password . "', CURRENT_TIMESTAMP, '', '" . $gender . "','','" . $lastName . "', '" . $country . "', '" . $position . "');";
        $result = $conn->query($sql);
        if ($result) {
            $user_id = $conn->insert_id;
            foreach ($restaurants as $restaurant){
                $sql = "INSERT INTO `users_restaurants` (`id`, `user_id`, `restaurant_id`) VALUES (NULL, '".$user_id."', '".$restaurant->id."')";
                $result = $conn->query($sql);
            }
            echo json_encode(array('success' => true, 'data' => null, 'message' => 'User created'));
        }
        else {
            http_response_code(400);
            echo json_encode(array('success' => false, 'data' => null, 'message' => 'Something went wrong'));
        }

    } else {
        http_response_code(400);
        echo json_encode(array('success' => false, 'data' => null, 'message' => 'Password miss match'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('success' => false, 'data' => null, 'message' => 'Data missing'));
}