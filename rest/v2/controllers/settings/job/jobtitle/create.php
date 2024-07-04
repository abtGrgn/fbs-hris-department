<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new Jobtitle($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$job_title->job_title_is_active = 1;
$job_title->job_title_job_level_id = checkIndex($data, "job_title_job_level_id");
$job_title->job_title_name = checkIndex($data, "job_title_name");
$job_title->job_title_created = date("Y-m-d H:i:s");
$job_title->job_title_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($job_title, $job_title->job_title_job_level_id);
isNameExist($job_title, $job_title->job_title_name);

$query = checkCreate($job_title);

returnSuccess($job_title, "jobtitle", $query);
