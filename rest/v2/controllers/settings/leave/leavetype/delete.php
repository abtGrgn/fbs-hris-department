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
  // get data
  $leave_type->leave_type_aid = $_GET['leavetypeid'];
  checkId($leave_type->leave_type_aid);
  

  $query = checkDelete($leave_type);

  returnSuccess($leave_type, "leave_type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();