<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/job/joblevel/Joblevel.php';
// get payload

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$joblevel = new Joblevel($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $joblevel->jobLevel_start = $_GET['start'];
        $joblevel->jobLevel_total = 2;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($joblevel->jobLevel_start, $joblevel->jobLevel_total);

        $query = checkReadLimit($joblevel);
        $total_result = checkReadAll($joblevel);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $joblevel->jobLevel_total,
            $joblevel->jobLevel_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();