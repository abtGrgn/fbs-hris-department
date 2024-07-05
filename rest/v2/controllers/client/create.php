<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$client->client_is_active = 1;
$client->client_name = checkIndex($data, "client_name");
$client->client_created = date("Y-m-d H:i:s");
$client->client_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($client, $client->client_name);

$query = checkCreate($client);

returnSuccess($client, "client", $query);
