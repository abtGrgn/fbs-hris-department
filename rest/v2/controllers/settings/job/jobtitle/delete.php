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
  // get data
  $job_title->job_title_aid = $_GET['jobtitleid'];
  checkId($job_title->job_title_aid);
  

  $query = checkDelete($job_title);

  returnSuccess($job_title, "jobtitle", $query);
}

// return 404 error if endpoint not available
checkEndpoint();