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
  // get data
  $profile->profile_aid = $_GET['profileid'];
  checkId($profile->profile_aid);
  

  $query = checkDelete($profile);

  returnSuccess($profile, "profile", $query);
}

// return 404 error if endpoint not available
checkEndpoint();