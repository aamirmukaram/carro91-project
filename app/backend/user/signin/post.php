<?php
require '../../config/config.php';
require '../../helpers/helpers.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
    return;

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = null;
$password = null;

if (property_exists($request, 'email'))
    $email = $request->email;
if (property_exists($request, 'password'))
    $password = $request->password;


if (isset($email) && isset($password)) {

    $sql = "SELECT * FROM `users` where `password` = '".$password."' && `email` = '".$email."' && `is_verified` = 1;";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        echo json_encode(array('success' => true, 'data' => $row, 'message' => 'User signed in'));
    } else {
        http_response_code(403);
        echo json_encode(array('success' => false, 'data' => null, 'message' => 'Wrong email or password'));
    }

} else {
    http_response_code(400);
    echo json_encode(array('success' => false, 'data' => null, 'message' => 'Data missing'));

}