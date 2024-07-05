<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$profile = new Profile($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("profileid", $_GET)) {
  $profile->profile_employee_id = $_GET['profileid'];
  checkId($profile->profile_employee_id);
  $query = checkReadById($profile);
  http_response_code(200);
  getQueriedData($query);
}



// return 404 error if endpoint not available
 checkEndpoint();