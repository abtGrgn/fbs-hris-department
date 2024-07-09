<?php
function checkCreateEmployeeInfo($object)
{
    $query = $object->createEmployeeInfo();
    checkQuery($query, "There's a problem processing your request. (create info)");
    return $query;
}