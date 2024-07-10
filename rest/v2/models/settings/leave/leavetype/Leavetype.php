<?php

class Leavetype
{
    public $leave_type_aid;
    public $leave_type_name;
    public $leave_type_is_active;
    public $leave_type_created;
    public $leave_type_datetime;

    public $connection;
    public $lastInsertedId;
    public $leave_type_start;
    public $leave_type_total;
    public $leave_type_search;

    public $tblLeaveType;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblLeaveType = "fbs_hris_leave_type";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblLeaveType} ";
            $sql .= "order by leave_type_is_active desc, ";
            $sql .= "leave_type_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblLeaveType} ";
            $sql .= "order by leave_type_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "leave_type_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->leave_type_start - 1,
                "total" => $this->leave_type_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblLeaveType} ";
            $sql .= "where leave_type_name like :leave_type_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_name" => "%{$this->leave_type_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblLeaveType}";
            $sql .= "(leave_type_is_active, ";
            $sql .= "leave_type_name, ";
            $sql .= "leave_type_created, ";
            $sql .= "leave_type_datetime ) values ( ";
            $sql .= ":leave_type_is_active, ";
            $sql .= ":leave_type_name, ";
            $sql .= ":leave_type_created, ";
            $sql .= ":leave_type_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_name" => $this->leave_type_name,
                "leave_type_created" => $this->leave_type_created,
                "leave_type_datetime" => $this->leave_type_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblLeaveType} set ";
            $sql .= "leave_type_name = :leave_type_name, ";
            $sql .= "leave_type_datetime = :leave_type_datetime ";
            $sql .= "where leave_type_aid = :leave_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_name" => $this->leave_type_name,
                "leave_type_datetime" => $this->leave_type_datetime,
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblLeaveType} ";
            $sql .= "where leave_type_aid = :leave_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblLeaveType} set ";
            $sql .= "leave_type_is_active = :leave_type_is_active, ";
            $sql .= "leave_type_datetime = :leave_type_datetime ";
            $sql .= "where leave_type_aid = :leave_type_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_is_active" => $this->leave_type_is_active,
                "leave_type_datetime" => $this->leave_type_datetime,
                "leave_type_aid" => $this->leave_type_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select leave_type_name from {$this->tblLeaveType} ";
            $sql .= "where leave_type_name = :leave_type_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_type_name" => "{$this->leave_type_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
