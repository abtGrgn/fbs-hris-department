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
  // check data
  checkPayload($data);
  // get data
  $profile->profile_aid = $_GET['profileid'];
  $profile->profile_telephone = checkIndex($data, "profile_telephone");
  $profile->profile_address = checkIndex($data, "profile_address");
 
  $profile->profile_datetime = date("Y-m-d H:i:s");
  checkId($profile->profile_aid);
 

//checks current data to avoid same entries from being updated
$profile_telephone_old = checkIndex($data, 'profile_telephone_old');
compareName($profile, $profile_telephone_old, $profile->profile_telephone);

  // update
   $query = checkUpdate($profile);
   returnSuccess($profile, "profile", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();