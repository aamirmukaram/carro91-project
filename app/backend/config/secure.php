<?php

if(isset(apache_request_headers()['Authorization'])) {

}
else{
    http_response_code(401);
    exit();
}