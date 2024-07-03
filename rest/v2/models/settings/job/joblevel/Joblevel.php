<?php

class Joblevel{
    public $jobLevel_aid;
    public $jobLevel_level;
    public $jobLevel_is_active;
    public $jobLevel_created;
    public $jobLevel_datetime;

    public $connection;
    public $lastInsertedId;
    public $jobLevel_start;
    public $jobLevel_total;
    public $jobLevel_search;

    public $tblJobLevel;

    public function __construct($db){
        $this->connection = $db;
        $this->tblJobLevel = "fbs_hris_job_level";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblJobLevel} ";
            $sql .= "order by jobLevel_is_active desc, ";
            $sql .= "jobLevel_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblJobLevel}";
            $sql .= "(jobLevel_is_active, ";
            $sql .= "jobLevel_level, ";
            $sql .= "jobLevel_created, ";
            $sql .= "jobLevel_datetime ) values ( ";
            $sql .= ":jobLevel_is_active, ";
            $sql .= ":jobLevel_level, ";
            $sql .= ":jobLevel_created, ";
            $sql .= ":jobLevel_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobLevel_is_active"=> $this->jobLevel_is_active,
                "jobLevel_level"=> $this->jobLevel_level,
                "jobLevel_created"=> $this->jobLevel_created,
                "jobLevel_datetime"=> $this->jobLevel_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblJobLevel} set ";
            $sql .= "jobLevel_level = :jobLevel_level, ";
            $sql .= "jobLevel_datetime = :jobLevel_datetime ";
            $sql .= "where jobLevel_aid = :jobLevel_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobLevel_level" => $this->jobLevel_level,
                "jobLevel_datetime" => $this->jobLevel_datetime,
                "jobLevel_aid" => $this->jobLevel_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblJobLevel} ";
            $sql .= "where jobLevel_aid = :jobLevel_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobLevel_aid" => $this->jobLevel_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblJobLevel} set ";
            $sql .= "jobLevel_is_active = :jobLevel_is_active, ";
            $sql .= "jobLevel_datetime = :jobLevel_datetime ";
            $sql .= "where jobLevel_aid = :jobLevel_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobLevel_is_active" => $this->jobLevel_is_active,
                "jobLevel_datetime" => $this->jobLevel_datetime,
                "jobLevel_aid" => $this->jobLevel_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select jobLevel_level from {$this->tblJobLevel} ";
      $sql .= "where jobLevel_level = :jobLevel_level ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "jobLevel_level" => "{$this->jobLevel_level}",
      ]);
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
            $sql .= "{$this->tblJobLevel} ";
            $sql .= "order by jobLevel_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "jobLevel_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->jobLevel_start - 1,
                "total" => $this->jobLevel_total,
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
            $sql .= "from {$this->tblJobLevel} ";
            $sql .= "where jobLevel_level like :jobLevel_level ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobLevel_level" => "%{$this->jobLevel_search}%",
                
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}