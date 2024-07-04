<?php

class Joblevel{
    public $job_level_aid;
    public $job_level_level;
    public $job_level_is_active;
    public $job_level_created;
    public $job_level_datetime;

    public $connection;
    public $lastInsertedId;
    public $job_level_start;
    public $job_level_total;
    public $job_level_search;

    public $tblJobLevel;

    public function __construct($db){
        $this->connection = $db;
        $this->tblJobLevel = "fbs_hris_job_level";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblJobLevel} ";
            $sql .= "order by job_level_is_active desc, ";
            $sql .= "job_level_aid asc ";
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
            $sql .= "{$this->tblJobLevel} ";
            $sql .= "order by job_level_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "job_level_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->job_level_start - 1,
                "total" => $this->job_level_total,
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
            $sql .= "where job_level_level like :job_level_level ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => "%{$this->job_level_search}%",
                
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    

    public function create() {
        try{
            $sql = "insert into {$this->tblJobLevel}";
            $sql .= "(job_level_is_active, ";
            $sql .= "job_level_level, ";
            $sql .= "job_level_created, ";
            $sql .= "job_level_datetime ) values ( ";
            $sql .= ":job_level_is_active, ";
            $sql .= ":job_level_level, ";
            $sql .= ":job_level_created, ";
            $sql .= ":job_level_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_is_active"=> $this->job_level_is_active,
                "job_level_level"=> $this->job_level_level,
                "job_level_created"=> $this->job_level_created,
                "job_level_datetime"=> $this->job_level_datetime,
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
            $sql .= "job_level_level = :job_level_level, ";
            $sql .= "job_level_datetime = :job_level_datetime ";
            $sql .= "where job_level_aid = :job_level_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_level" => $this->job_level_level,
                "job_level_datetime" => $this->job_level_datetime,
                "job_level_aid" => $this->job_level_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblJobLevel} ";
            $sql .= "where job_level_aid = :job_level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_aid" => $this->job_level_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblJobLevel} set ";
            $sql .= "job_level_is_active = :job_level_is_active, ";
            $sql .= "job_level_datetime = :job_level_datetime ";
            $sql .= "where job_level_aid = :job_level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_level_is_active" => $this->job_level_is_active,
                "job_level_datetime" => $this->job_level_datetime,
                "job_level_aid" => $this->job_level_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select job_level_level from {$this->tblJobLevel} ";
      $sql .= "where job_level_level = :job_level_level ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "job_level_level" => "{$this->job_level_level}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  
}