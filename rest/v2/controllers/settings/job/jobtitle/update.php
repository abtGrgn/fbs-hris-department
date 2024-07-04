<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new Jobtitle($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("jobtitleid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $job_title->job_title_aid = $_GET['jobtitleid'];
  $job_title->job_title_job_level_id = checkIndex($data, "job_title_job_level_id");
  $job_title->job_title_name = checkIndex($data, "job_title_name");
 
  $job_title->job_title_datetime = date("Y-m-d H:i:s");
  checkId($job_title->job_title_aid);
 

//checks current data to avoid same entries from being updated
$job_title_job_level_id_old = checkIndex($data, 'job_title_job_level_id_old');
$job_title_name_old= checkIndex($data, 'job_title_name_old');
compareTwoValues($job_title, $job_title_job_level_id_old,  $job_title->job_title_job_level_id, $job_title_name_old, $job_title->job_title_name );



  // update
   $query = checkUpdate($job_title);
   returnSuccess($job_title, "jobtitle", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();