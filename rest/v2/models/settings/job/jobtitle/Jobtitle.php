<?php

class Jobtitle{
    public $job_title_aid;
    public $job_title_job_level_id;
    public $job_title_name;
    public $job_title_is_active;
    public $job_title_created;
    public $job_title_datetime;

    public $connection;
    public $lastInsertedId;
    public $job_title_start;
    public $job_title_total;
    public $job_title_search;

    
    public $tblJobTitle;
    public $tblJobLevel;

    public function __construct($db){
        $this->connection = $db;
        $this->tblJobTitle = "fbs_hris_job_title";
        $this->tblJobLevel = "fbs_hris_job_level";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblJobTitle} ";
            $sql .= "order by job_title_is_active desc, ";
            $sql .= "job_title_aid asc ";
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
            $sql .= "{$this->tblJobTitle} as title, ";
            $sql .= "{$this->tblJobLevel} as level ";
            $sql .= "where title.job_title_job_level_id = level.job_level_aid ";
            $sql .= "order by job_title_is_active desc, "; //para nasa baba ng table ang mga inactive or archived 
            $sql .= "job_title_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->job_title_start - 1,
                "total" => $this->job_title_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
      try {
        $sql = "select * from {$this->tblJobTitle} ";
        $sql .= "where job_title_aid = :job_title_aid ";
        $query = $this->connection->prepare($sql);
        $query->execute([
          "job_title_aid" => $this->job_title_aid,
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
            $sql .= "from {$this->tblJobTitle} ";
            $sql .= "where job_title_name like :job_title_name ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_name" => "%{$this->job_title_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblJobTitle}";
            $sql .= "(job_title_is_active, ";
            $sql .= "job_title_job_level_id, ";
            $sql .= "job_title_name, ";
            $sql .= "job_title_created, ";
            $sql .= "job_title_datetime ) values ( ";
            $sql .= ":job_title_is_active, ";
            $sql .= ":job_title_job_level_id, ";
            $sql .= ":job_title_name, ";
            $sql .= ":job_title_created, ";
            $sql .= ":job_title_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_is_active"=> $this->job_title_is_active,
                "job_title_job_level_id"=> $this->job_title_job_level_id,
                "job_title_name"=> $this->job_title_name,
                "job_title_created"=> $this->job_title_created,
                "job_title_datetime"=> $this->job_title_datetime,
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
            $sql .= "job_title_job_level_id= :job_title_job_level_id, ";
            $sql .= "job_title_name= :job_title_name, ";
            $sql .= "job_title_datetime = :job_title_datetime ";
            $sql .= "where job_title_aid = :job_title_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_job_level_id" => $this->job_title_job_level_id,
                "job_title_name" => $this->job_title_name,
                "job_title_datetime" => $this->job_title_datetime,
                "job_title_aid" => $this->job_title_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblJobTitle} ";
            $sql .= "where job_title_aid = :job_title_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_aid" => $this->job_title_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblJobTitle} set ";
            $sql .= "job_title_is_active = :job_title_is_active, ";
            $sql .= "job_title_datetime = :job_title_datetime ";
            $sql .= "where job_title_aid = :job_title_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "job_title_is_active" => $this->job_title_is_active,
                "job_title_datetime" => $this->job_title_datetime,
                "job_title_aid" => $this->job_title_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select job_title_job_level_id, job_title_name from {$this->tblJobTitle} ";
      $sql .= "where job_title_job_level_id = :job_title_job_level_id ";
      $sql .= "and job_title_name = :job_title_name ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "job_title_job_level_id" => "{$this->job_title_job_level_id}",
        "job_title_name" => "{$this->job_title_name}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  
}