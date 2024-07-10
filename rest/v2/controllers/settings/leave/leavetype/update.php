<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new Leavetype($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("leavetypeid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $leave_type->leave_type_aid = $_GET['leavetypeid'];
  $leave_type->leave_type_name = checkIndex($data, "leave_type_name");

  $leave_type->leave_type_datetime = date("Y-m-d H:i:s");
  checkId($leave_type->leave_type_aid);


  //checks current data to avoid same entries from being updated
  $leave_type_name_old = checkIndex($data, 'leave_type_name_old');
  compareName($leave_type, $leave_type_name_old, $leave_type->leave_type_name);

  // update
  $query = checkUpdate($leave_type);
  returnSuccess($leave_type, "leave_type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
