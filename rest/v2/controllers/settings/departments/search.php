<?php

// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../models/settings/departments/Departments.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$departments = new Departments($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $departments->department_search = $data["searchValue"];

    // // only if filtering
    // if ($data["isFilter"]) {

    //     // only if search with filter
    //     if ($company->company_search != "") {

    //         $company->company_is_active = checkIndex($data, "company_is_active");
    //         $query = checkSearchByStatus($company);
    //         http_response_code(200);
    //         getQueriedData($query);
    //     }

    //     // if filter only
    //     $company->company_is_active = checkIndex($data, "company_is_active");
    //     $query = checkFilterByStatus($company);
    //     http_response_code(200);
    //     getQueriedData($query);
    // }

    $query = checkSearch($departments);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();