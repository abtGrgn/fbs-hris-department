<?php

class Jobtitle{
    public $jobTitle_aid;
    public $jobTitle_level;
    public $jobTitle_title;
    public $jobTitle_is_active;
    public $jobTitle_created;
    public $jobTitle_datetime;

    public $connection;
    public $lastInsertedId;
    
    public $tblJobTitle;

    public function __construct($db){
        $this->connection = $db;
        $this->tblJobTitle = "fbs_hris_job_title";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblJobTitle} ";
            $sql .= "order by jobTitle_is_active desc, ";
            $sql .= "jobTitle_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblJobTitle}";
            $sql .= "(jobTitle_is_active, ";
            $sql .= "jobTitle_level, ";
            $sql .= "jobTitle_title, ";
            $sql .= "jobTitle_created, ";
            $sql .= "jobTitle_datetime ) values ( ";
            $sql .= ":jobTitle_is_active, ";
            $sql .= ":jobTitle_level, ";
            $sql .= ":jobTitle_title, ";
            $sql .= ":jobTitle_created, ";
            $sql .= ":jobTitle_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobTitle_is_active"=> $this->jobTitle_is_active,
                "jobTitle_level"=> $this->jobTitle_level,
                "jobTitle_title"=> $this->jobTitle_title,
                "jobTitle_created"=> $this->jobTitle_created,
                "jobTitle_datetime"=> $this->jobTitle_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblJobTitle} set ";
            $sql .= "jobTitle_level= :jobTitle_level, ";
            $sql .= "jobTitle_title= :jobTitle_title, ";
            $sql .= "jobTitle_datetime = :jobTitle_datetime ";
            $sql .= "where jobTitle_aid = :jobTitle_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobTitle_level" => $this->jobTitle_level,
                "jobTitle_title" => $this->jobTitle_title,
                "jobTitle_datetime" => $this->jobTitle_datetime,
                "jobTitle_aid" => $this->jobTitle_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblJobTitle} ";
            $sql .= "where jobTitle_aid = :jobTitle_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobTitle_aid" => $this->jobTitle_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblJobTitle} set ";
            $sql .= "jobTitle_is_active = :jobTitle_is_active, ";
            $sql .= "jobTitle_datetime = :jobTitle_datetime ";
            $sql .= "where jobTitle_aid = :jobTitle_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "jobTitle_is_active" => $this->jobTitle_is_active,
                "jobTitle_datetime" => $this->jobTitle_datetime,
                "jobTitle_aid" => $this->jobTitle_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select jobTitle_level, jobTitle_title from {$this->tblJobTitle} ";
      $sql .= "where jobTitle_level = :jobTitle_level ";
      $sql .= "and jobTitle_title = :jobTitle_title ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "jobTitle_level" => "{$this->jobTitle_level}",
        "jobTitle_title" => "{$this->jobTitle_title}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}