<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$employees->employees_is_active = 1;
$employees->employees_lname = checkIndex($data, "employees_lname");
$employees->employees_fname = checkIndex($data, "employees_fname");
$employees->employees_job_title_id = checkIndex($data, "employees_job_title_id");
$employees->employees_department_id = checkIndex($data, "employees_department_id");
$employees->employees_client_id = checkIndex($data, "employees_client_id");
$employees->employees_created = date("Y-m-d H:i:s");
$employees->employees_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($employees, $employees->employees_fname);
isNameExist($employees, $employees->employees_lname);

$query = checkCreate($employees);

returnSuccess($employees, "employees", $query);
