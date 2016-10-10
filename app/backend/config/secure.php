<?php

if(isset(apache_request_headers()['Auth-Token'])) {

}
else{
    http_response_code(401);
    exit();
}