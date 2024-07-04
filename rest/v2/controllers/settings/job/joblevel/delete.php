<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new Joblevel($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("joblevelid", $_GET)) {
  // get data
  $job_level->job_level_aid = $_GET['joblevelid'];
  checkId($job_level->job_level_aid);
  

  $query = checkDelete($job_level);

  returnSuccess($job_level, "joblevel", $query);
}

// return 404 error if endpoint not available
checkEndpoint();