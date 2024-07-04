<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/job/joblevel/Joblevel.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new Joblevel($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $job_level->job_level_search = $data["searchValue"];

    // // only if filtering
    // if ($data["isFilter"]) {

    //     // only if search with filter
    //     if ($job_level->company_search != "") {

    //         $job_level->company_is_active = checkIndex($data, "company_is_active");
    //         $query = checkSearchByStatus($job_level);
    //         http_response_code(200);
    //         getQueriedData($query);
    //     }

    //     // if filter only
    //     $job_level->company_is_active = checkIndex($data, "company_is_active");
    //     $query = checkFilterByStatus($job_level);
    //     http_response_code(200);
    //     getQueriedData($query);
    // }

    $query = checkSearch($job_level);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();