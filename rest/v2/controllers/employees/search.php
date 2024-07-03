<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/Employees.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $employees->employees_search = $data["searchValue"];

    // // only if filtering
    // if ($data["isFilter"]) {

    //     // only if search with filter
    //     if ($employees->employees_search != "") {

    //         $employees->employees_is_active = checkIndex($data, "employees_is_active");
    //         $query = checkSearchByStatus($employees);
    //         http_response_code(200);
    //         getQueriedData($query);
    //     }

    //     // if filter only
    //     $employees->employees_is_active = checkIndex($data, "employees_is_active");
    //     $query = checkFilterByStatus($employees);
    //     http_response_code(200);
    //     getQueriedData($query);
    // }

    $query = checkSearch($employees);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();