<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$jobtitle = new Jobtitle($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("jobtitleid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $jobtitle->jobTitle_aid = $_GET['jobtitleid'];
  $jobtitle->jobTitle_level = checkIndex($data, "jobTitle_level");
  $jobtitle->jobTitle_title = checkIndex($data, "jobTitle_title");
 
  $jobtitle->jobTitle_datetime = date("Y-m-d H:i:s");
  checkId($jobtitle->jobTitle_aid);
 

//checks current data to avoid same entries from being updated
$jobtitle_level_old = checkIndex($data, 'jobTitle_level_old');
$jobtitle_title_old= checkIndex($data, 'jobTitle_title_old');
compareTwoValues($jobtitle, $jobtitle_level_old,  $jobtitle->jobTitle_level, $jobtitle_title_old, $jobtitle->jobTitle_title );



  // update
   $query = checkUpdate($jobtitle);
   returnSuccess($jobtitle, "jobtitle", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();