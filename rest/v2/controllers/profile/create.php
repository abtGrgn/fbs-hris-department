<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$profile = new Profile($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$profile->profile_is_active = 1;
$profile->profile_fname_id = checkIndex($data, "profile_fname_id");
$profile->profile_lname_id = checkIndex($data, "profile_lname_id");
$profile->profile_email = checkIndex($data, "profile_email");
$profile->profile_telephone = checkIndex($data, "profile_telephone");
$profile->profile_address = checkIndex($data, "profile_address");
$profile->profile_created = date("Y-m-d H:i:s");
$profile->profile_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($profile, $profile->profile_telephone);

$query = checkCreate($profile);

returnSuccess($profile, "profile", $query);
