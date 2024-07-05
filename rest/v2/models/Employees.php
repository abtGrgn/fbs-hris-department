<?php

class Employees{
    public $employees_aid;
    public $employees_fname;
    public $employees_lname;
    public $employees_job_title_id;
    public $employees_department_id;
    public $employees_client_id;
    public $employees_is_active;
    public $employees_created;
    public $employees_datetime;

    public $connection;
    public $lastInsertedId;
    public $employees_start;
    public $employees_total;
    public $employees_search;

    public $tblEmployees;
    public $tblDepartments; //table of departments
    public $tblJobTitle; // table of job title
    public $tblClient; // table of client

    public function __construct($db){
        $this->connection = $db;
        $this->tblEmployees = "fbs_hris_employees";
        $this->tblDepartments = "fbs_hris_departments";
        $this->tblJobTitle = "fbs_hris_job_title";
        $this->tblClient = "fbs_hris_client";
    }

    public function readAll(){
        try{
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartments} as dept, ";
            $sql .= "{$this->tblJobTitle} as job, ";
            $sql .= "{$this->tblClient} as client ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_job_title_id = job.job_title_aid ";
            $sql .= "and emp.employees_client_id = client.client_aid ";
            $sql .= "order by employees_is_active desc, ";
            $sql .= "employees_aid asc ";
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
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartments} as dept, ";
            $sql .= "{$this->tblJobTitle} as job, ";
            $sql .= "{$this->tblClient} as client ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_job_title_id = job.job_title_aid ";
            $sql .= "and emp.employees_client_id = client.client_aid ";
            $sql .= "order by employees_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "employees_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->employees_start - 1,
                "total" => $this->employees_total,
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
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartments} as dept, ";
            $sql .= "{$this->tblJobTitle} as job, ";
            $sql .= "{$this->tblClient} as client ";
            $sql .= "where emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_job_title_id = job.job_title_aid ";
            $sql .= "and emp.employees_client_id = client.client_aid ";
        $query = $this->connection->prepare($sql);
        $query->execute([
          "employees_department_id" => $this->employees_department_id,
          "job_title_aid" => $this->job_title_aid,
          "job_client_id" => $this->job_client_id,
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
            $sql .= "{$this->tblEmployees} as emp, ";
            $sql .= "{$this->tblDepartments} as dept, ";
            $sql .= "{$this->tblJobTitle} as job, ";
            $sql .= "{$this->tblClient} as client ";
            $sql .= "where emp.employees_fname like :employees_fname ";
            $sql .= "and emp.employees_department_id = dept.department_aid ";
            $sql .= "and emp.employees_job_title_id = job.job_title_aid ";
            $sql .= "and emp.employees_client_id = client.client_aid ";
            $sql .= "order by employees_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "employees_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_fname" => "%{$this->employees_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblEmployees}";
            $sql .= "(employees_is_active, ";
            $sql .= "employees_fname, ";
            $sql .= "employees_lname, ";
            $sql .= "employees_job_title_id, ";
            $sql .= "employees_department_id, ";
            $sql .= "employees_client_id, ";
            $sql .= "employees_created, ";
            $sql .= "employees_datetime ) values ( ";
            $sql .= ":employees_is_active, ";
            $sql .= ":employees_fname, ";
            $sql .= ":employees_lname, ";
            $sql .= ":employees_job_title_id, ";
            $sql .= ":employees_department_id, ";
            $sql .= ":employees_client_id, ";
            $sql .= ":employees_created, ";
            $sql .= ":employees_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_is_active"=> $this->employees_is_active,
                "employees_fname"=> $this->employees_fname,
                "employees_lname"=> $this->employees_lname,
                "employees_job_title_id"=> $this->employees_job_title_id,
                "employees_department_id"=> $this->employees_department_id,
                "employees_client_id"=> $this->employees_client_id,
                "employees_created"=> $this->employees_created,
                "employees_datetime"=> $this->employees_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employees_fname = :employees_fname, ";
            $sql .= "employees_lname = :employees_lname, ";
            $sql .= "employees_job_title_id = :employees_job_title_id, ";
            $sql .= "employees_department_id = :employees_department_id, ";
            $sql .= "employees_client_id = :employees_client_id, ";
            $sql .= "employees_datetime = :employees_datetime ";
            $sql .= "where employees_aid = :employees_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_fname" => $this->employees_fname,
                "employees_lname" => $this->employees_lname,
                "employees_job_title_id" => $this->employees_job_title_id,
                "employees_department_id" => $this->employees_department_id,
                "employees_client_id" => $this->employees_client_id,
                "employees_datetime" => $this->employees_datetime,
                "employees_aid" => $this->employees_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete() {
        try{
            $sql = "delete from {$this->tblEmployees} ";
            $sql .= "where employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_aid" => $this->employees_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active() {
        try{
            $sql = "update {$this->tblEmployees} set ";
            $sql .= "employees_is_active = :employees_is_active, ";
            $sql .= "employees_datetime = :employees_datetime ";
            $sql .= "where employees_aid = :employees_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_is_active" => $this->employees_is_active,
                "employees_datetime" => $this->employees_datetime,
                "employees_aid" => $this->employees_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select employees_fname, employees_lname from {$this->tblEmployees} ";
      $sql .= "where employees_fname = :employees_fname ";
      $sql .= "and employees_lname = :employees_lname ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_fname" => "{$this->employees_fname}",
        "employees_lname" => "{$this->employees_lname}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  


}