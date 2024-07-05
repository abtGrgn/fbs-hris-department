<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("clientid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $client->client_aid = $_GET['clientid'];
  $client->client_name = checkIndex($data, "client_name");
 
  $client->client_datetime = date("Y-m-d H:i:s");
  checkId($client->client_aid);
 

//checks current data to avoid same entries from being updated
$client_name_old = checkIndex($data, 'client_name_old');
compareName($client, $client_name_old, $client->client_name);

  // update
   $query = checkUpdate($client);
   returnSuccess($client, "client", $query);

 
}

// return 404 error if endpoint not available
 checkEndpoint();