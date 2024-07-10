<?php

class LeaveBenefits
{
    public $leave_benefits_aid;
    public $leave_benefits_job_level_id;
    public $leave_benefits_job_title_id;
    public $leave_benefits_leave_type_id;
    public $leave_benefits_days;
    public $leave_benefits_is_active;
    public $leave_benefits_created;
    public $leave_benefits_datetime;

    public $connection;
    public $lastInsertedId;
    public $leave_benefits_start;
    public $leave_benefits_total;
    public $leave_benefits_search;

    public $tblLeaveBenefits;
    public $tblJobTitle;
    public $tblJobLevel;
    public $tblLeaveType;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblLeaveBenefits = "fbs_hris_leave_benefits";
        $this->tblJobTitle = "fbs_hris_job_title";
        $this->tblLeaveType = "fbs_hris_leave_type";
        $this->tblJobLevel = "fbs_hris_job_level";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblLeaveBenefits} as ben, ";
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level ";
            $sql .= "where ben.leave_benefits_job_level_id = level.job_level_aid ";
            $sql .= "and ben.leave_benefits_job_title_id = title.job_title_aid ";
            $sql .= "and ben.leave_benefits_leave_type_id = type.leave_type_aid ";
            $sql .= "order by ben.leave_benefits_is_active desc, ";
            $sql .= "ben.leave_benefits_aid asc ";
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
            $sql .= "{$this->tblLeaveBenefits} as ben, ";
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level ";
            $sql .= "where ben.leave_benefits_job_level_id = level.job_level_aid ";
            $sql .= "and ben.leave_benefits_job_title_id = title.job_title_aid ";
            $sql .= "and ben.leave_benefits_leave_type_id = type.leave_type_aid ";
            $sql .= "order by ben.leave_benefits_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "ben.leave_benefits_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->leave_benefits_start - 1,
                "total" => $this->leave_benefits_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblLeaveBenefits} as ben,";
            $sql .= "{$this->tblLeaveType} as type,";
            $sql .= "{$this->tblJobTitle} as title,";
            $sql .= "{$this->tblJobLevel} as level";
            $sql .= "where ben.leave_benefits_job_level_id = level.job_level_aid";
            $sql .= "and ben.leave_benefits_job_title_id = title.job_title_aid";
            $sql .= "and ben.leave_benefits_leave_type_id = type.leave_type_aid";
            $sql .= "and ben.leave_benefits_aid = :leave_benefits_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_aid" => $this->leave_benefits_aid,
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
            $sql .= "from ";
            $sql .= "{$this->tblLeaveBenefits} as ben, ";
            $sql .= "{$this->tblLeaveType} as type, ";
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level";
            $sql .= "where ben.leave_benefits_job_level_id like :leave_benefits_job_level_id";
            $sql .= "and ben.leave_benefits_job_level_id = level.job_level_aid";
            $sql .= "and ben.leave_benefits_job_title_id = title.job_title_aid";
            $sql .= "and ben.leave_benefits_leave_type_id = type.leave_type_aid";
            $sql .= "order by leave_benefits_is_active desc,"; //para nasa baba ng table ang mga inactive or archived
            $sql .= "leave_benefits_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_job_level_id" => "%{$this->leave_benefits_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblLeaveBenefits}";
            $sql .= "(leave_benefits_is_active, ";
            $sql .= "leave_benefits_job_level_id, ";
            $sql .= "leave_benefits_job_title_id, ";
            $sql .= "leave_benefits_leave_type_id, ";
            $sql .= "leave_benefits_days, ";
            $sql .= "leave_benefits_created, ";
            $sql .= "leave_benefits_datetime ) values ( ";
            $sql .= ":leave_benefits_is_active, ";
            $sql .= ":leave_benefits_job_level_id, ";
            $sql .= ":leave_benefits_job_title_id, ";
            $sql .= ":leave_benefits_leave_type_id, ";
            $sql .= ":leave_benefits_days, ";
            $sql .= ":leave_benefits_created, ";
            $sql .= ":leave_benefits_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_is_active" => $this->leave_benefits_is_active,
                "leave_benefits_job_level_id" => $this->leave_benefits_job_level_id,
                "leave_benefits_job_title_id" => $this->leave_benefits_job_title_id,
                "leave_benefits_leave_type_id" => $this->leave_benefits_leave_type_id,
                "leave_benefits_days" => $this->leave_benefits_days,
                "leave_benefits_created" => $this->leave_benefits_created,
                "leave_benefits_datetime" => $this->leave_benefits_datetime,
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
            $sql = "update {$this->tblLeaveBenefits} set ";
            $sql .= "leave_benefits_job_level_id = :leave_benefits_job_level_id, ";
            $sql .= "leave_benefits_job_title_id = :leave_benefits_job_title_id, ";
            $sql .= "leave_benefits_leave_type_id = :leave_benefits_leave_type_id, ";
            $sql .= "leave_benefits_days = :leave_benefits_days, ";
            $sql .= "leave_benefits_datetime = :leave_benefits_datetime ";
            $sql .= "where leave_benefits_aid = :leave_benefits_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_job_level_id" => $this->leave_benefits_job_level_id,
                "leave_benefits_job_title_id" => $this->leave_benefits_job_title_id,
                "leave_benefits_leave_type_id" => $this->leave_benefits_leave_type_id,
                "leave_benefits_days" => $this->leave_benefits_days,
                "leave_benefits_datetime" => $this->leave_benefits_datetime,
                "leave_benefits_aid" => $this->leave_benefits_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblLeaveBenefits} ";
            $sql .= "where leave_benefits_aid  = :leave_benefits_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_aid " => $this->leave_benefits_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblLeaveBenefits} set ";
            $sql .= "leave_benefits_is_active = :leave_benefits_is_active, ";
            $sql .= "leave_benefits_datetime = :leave_benefits_datetime ";
            $sql .= "where leave_benefits_aid = :leave_benefits_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_is_active" => $this->leave_benefits_is_active,
                "leave_benefits_datetime" => $this->leave_benefits_datetime,
                "leave_benefits_aid" => $this->leave_benefits_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select leave_benefits_job_title_id, leave_benefits_leave_type_id from {$this->tblLeaveBenefits} ";
            $sql .= "where leave_benefits_job_title_id = :leave_benefits_job_title_id";
            $sql .= "and leave_benefits_leave_type_id = :leave_benefits_leave_type_id";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "leave_benefits_job_title_id" => "{$this->leave_benefits_job_title_id}",
                "leave_benefits_leave_type_id" => "{$this->leave_benefits_leave_type_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
