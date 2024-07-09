<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees_info = new Employees_info($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("employees_infoid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $employees_info->employees_info_aid = $_GET['employees_infoid'];
  $employees_info->employees_info_telephone = checkIndex($data, "employees_info_telephone");
  $employees_info->employees_info_address = checkIndex($data, "employees_info_address");
  $employees_info->employees_info_email = checkIndex($data, "employees_info_email");
 
  $employees_info->employees_info_datetime = date("Y-m-d H:i:s");
  checkId($employees_info->employees_info_aid);
 

//checks current data to avoid same entries from being updated
$employees_info_telephone_old = checkIndex($data, 'employees_info_telephone_old');
compareName($employees_info, $employees_info_telephone_old, $employees_info->employees_info_telephone);

  // update
   $query = checkUpdate($employees_info);
   returnSuccess($employees_info, "employees_info", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();