<?php

class Employees_info{
    public $employess_info_aid;
    public $employess_info_employee_id;
    public $employess_info_fname_id;
    public $employess_info_lname_id;
    public $employess_info_email;
    public $employess_info_telephone;
    public $employess_info_address;
    public $employess_info_is_active;
    public $employess_info_created;
    public $employess_info_datetime;

    public $connection;
    public $lastInsertedId;
    public $employess_info_start;
    public $employess_info_total;
    public $employess_info_search;

    public $tblEmployees_info;
    public $tblEmployees;

    public function __construct($db){
        $this->connection = $db;
        $this->tblEmployees_info = "fbs_hris_employees_info";
        $this->tblEmployees = "fbs_hris_employees";
    }

    

    // public function readLimit() 
    // {
    //     try {
    //       $sql = "select * ";
    //       $sql .= "from ";
    //       $sql .= "{$this->tblProfile} as pro, ";
    //       $sql .= "{$this->tblEmployees} as emp ";
    //       $sql .= "where pro.profile_lname_id = emp.employees_aid ";
    //         $sql .= "order by profile_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
    //         $sql .= "profile_aid asc ";
    //         $sql .= "limit :start, ";
    //         $sql .= ":total ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "start" => $this->profile_start - 1,
    //             "total" => $this->profile_total,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }

    public function readById()
    {
      try {
        $sql = "select * ";
        $sql .= "from ";
        $sql .= "{$this->tblEmployees_info} as p, ";
        $sql .= "{$this->tblEmployees} as e ";
        $sql .= "where e.employees_aid = p.employees_info_employee_id ";
        $sql .= "and p.employees_info_employee_id = :employees_info_employee_id ";
        $query = $this->connection->prepare($sql);
        $query->execute([
          "employees_info_employee_id" => $this->employees_info_employee_id

        ]);
      } catch (PDOException $ex) {
        $query = false;
      }
      return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblEmployees_info}";
            $sql .= "(employees_info_is_active, ";
            $sql .= "employees_info_fname, ";
            $sql .= "employees_info_lname, ";
            $sql .= "employees_info_employee_id, ";
            $sql .= "employees_info_email, ";
            $sql .= "employees_info_telephone, ";
            $sql .= "employees_info_address, ";
            $sql .= "employees_info_created, ";
            $sql .= "employees_info_datetime ) values ( ";
            $sql .= ":employees_info_is_active, ";
            $sql .= ":employees_info_fname, ";
            $sql .= ":employees_info_lname, ";
            $sql .= ":employees_info_employee_id, ";
            $sql .= ":employees_info_email, ";
            $sql .= ":employees_info_telephone, ";
            $sql .= ":employees_info_address, ";
            $sql .= ":employees_info_created, ";
            $sql .= ":employees_info_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_info_is_active"=> $this->employees_info_is_active,
                "employees_info_fname"=> $this->employees_info_fname,
                "employees_info_lname"=> $this->employees_info_lname,
                "employees_info_employee_id"=> $this->employees_info_employee_id,
                "employees_info_email"=> $this->employees_info_email,
                "employees_info_telephone"=> $this->employees_info_telephone,
                "employees_info_address"=> $this->employees_info_address,
                "employees_info_created"=> $this->employees_info_created,
                "employees_info_datetime"=> $this->employees_info_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblEmployees_info} set ";
            $sql .= "employees_info_telephone = :employees_info_telephone, ";
            $sql .= "employees_info_address = :employees_info_address, ";
            $sql .= "employees_info_email = :employees_info_email, ";
            $sql .= "employees_info_datetime = :employees_info_datetime ";
            $sql .= "where employees_info_aid = :employees_info_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employees_info_telephone" => $this->employees_info_telephone,
                "employees_info_address" => $this->employees_info_address,
                "employees_info_email" => $this->employees_info_email,
                "employees_info_datetime" => $this->employees_info_datetime,
                "employees_info_aid" => $this->employees_info_aid
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select employees_info_telephone from {$this->tblEmployees_info} ";
      $sql .= "where employees_info_telephone = :employees_info_telephone ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "employees_info_telephone" => "{$this->employees_info_telephone}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }



    
}