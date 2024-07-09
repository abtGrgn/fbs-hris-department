<?php
function checkCreateEmployeeInfo($object)
{
    $query = $object->createEmployeeInfo();
    checkQuery($query, "There's a problem processing your request. (create info)");
    return $query;
}

function checkReadAllJobDescription($object)
{
    $query = $object->readAllJobDescription();
    checkQuery($query, "There's a problem processing your request. (create info)");
    return $query;
}

function checkReadAllDepartment($object)
{
    $query = $object->readAllDepartment();
    checkQuery($query, "There's a problem processing your request. (create dept)");
    return $query;
}
