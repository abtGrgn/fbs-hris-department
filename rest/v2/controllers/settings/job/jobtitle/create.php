<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$jobtitle = new Jobtitle($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$jobtitle->jobTitle_is_active = 1;
$jobtitle->jobTitle_level = checkIndex($data, "jobTitle_level");
$jobtitle->jobTitle_title = checkIndex($data, "jobTitle_title");
$jobtitle->jobTitle_created = date("Y-m-d H:i:s");
$jobtitle->jobTitle_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($jobtitle, $jobtitle->jobTitle_level);
isNameExist($jobtitle, $jobtitle->jobTitle_title);

$query = checkCreate($jobtitle);

returnSuccess($jobtitle, "jobtitle", $query);
