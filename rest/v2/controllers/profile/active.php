<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/Profile.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$profile = new Profile($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("profileid", $_GET)) {
    // check data
    checkPayload($data);
    $profile->profile_aid = $_GET['profileid'];
    $profile->profile_is_active = trim($data["isActive"]);
    $profile->profile_datetime = date("Y-m-d H:i:s");
    checkId($profile->profile_aid);
    $query = checkActive($profile);
    http_response_code(200);
    returnSuccess($profile, "profile", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
