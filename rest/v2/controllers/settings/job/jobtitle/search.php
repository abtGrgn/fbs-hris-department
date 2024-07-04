<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/job/jobtitle/Jobtitle.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new Jobtitle($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $job_title->job_title_search = $data["searchValue"];

    // // only if filtering
    // if ($data["isFilter"]) {

    //     // only if search with filter
    //     if ($job_title->job_title_search != "") {

    //         $job_title->job_title_is_active = checkIndex($data, "job_title_is_active");
    //         $query = checkSearchByStatus($job_title);
    //         http_response_code(200);
    //         getQueriedData($query);
    //     }

    //     // if filter only
    //     $job_title->job_title_is_active = checkIndex($data, "job_title_is_active");
    //     $query = checkFilterByStatus($job_title);
    //     http_response_code(200);
    //     getQueriedData($query);
    // }

    $query = checkSearch($job_title);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();