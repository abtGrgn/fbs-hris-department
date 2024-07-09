<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("employeesid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $employees->employees_aid = $_GET['employeesid'];
  $employees->employees_fname = checkIndex($data, "employees_fname");
  $employees->employees_lname = checkIndex($data, "employees_lname");
  // $employees->employees_job_title_id = checkIndex($data, "employees_job_title_id");
  // $employees->employees_department_id = checkIndex($data, "employees_department_id");
  // $employees->employees_client_id = checkIndex($data, "employees_client_id");
  $employees->employees_job_title_id = $data["employees_job_title_id"];
  $employees->employees_department_id = $data["employees_department_id"];
  $employees->employees_client_id = $data["employees_client_id"];

  $employees->employees_datetime = date("Y-m-d H:i:s");
  checkId($employees->employees_aid);


  //checks current data to avoid same entries from being updated
  $employees_fname_old = checkIndex($data, 'employees_fname_old');
  $employees_lname_old = checkIndex($data, 'employees_lname_old');
  compareTwoValues($employees, $employees_fname_old,  $employees->employees_fname, $employees_lname_old, $employees->employees_lname);



  // update
  $query = checkUpdate($employees);
  returnSuccess($employees, "employees", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
