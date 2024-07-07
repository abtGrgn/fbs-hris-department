<?php

class Profile{
    public $profile_aid;
    public $profile_employee_id;
    public $profile_fname_id;
    public $profile_lname_id;
    public $profile_email;
    public $profile_telephone;
    public $profile_address;
    public $profile_is_active;
    public $profile_created;
    public $profile_datetime;

    public $connection;
    public $lastInsertedId;
    public $profile_start;
    public $profile_total;
    public $profile_search;

    public $tblProfile;
    public $tblEmployees;

    public function __construct($db){
        $this->connection = $db;
        $this->tblProfile = "fbs_hris_profile";
        $this->tblEmployees = "fbs_hris_employees";
    }

    // public function readAll(){
    //     try{
    //       $sql = "select * ";
    //       $sql .= "from ";
    //       $sql .= "{$this->tblProfile} as pro, ";
    //       $sql .= "{$this->tblEmployees} as emp ";
    //       $sql .= "where pro.profile_lname_id = emp.employees_aid ";
    //       $sql .= "order by profile_is_active desc, ";
    //       $sql .= "profile_aid asc ";
    //       $query = $this->connection->query($sql);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }

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
        $sql .= "{$this->tblProfile} as p, ";
        $sql .= "{$this->tblEmployees} as e ";
        $sql .= "where e.employees_aid = p.profile_employee_id ";
        $sql .= "and p.profile_employee_id = :profile_employee_id ";
        $query = $this->connection->prepare($sql);
        $query->execute([
          "profile_employee_id" => $this->profile_employee_id

        ]);
      } catch (PDOException $ex) {
        $query = false;
      }
      return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblProfile}";
            $sql .= "(profile_is_active, ";
            $sql .= "profile_fname_id, ";
            $sql .= "profile_lname_id, ";
            $sql .= "profile_employee_id, ";
            $sql .= "profile_email, ";
            $sql .= "profile_telephone, ";
            $sql .= "profile_address, ";
            $sql .= "profile_created, ";
            $sql .= "profile_datetime ) values ( ";
            $sql .= ":profile_is_active, ";
            $sql .= ":profile_fname_id, ";
            $sql .= ":profile_lname_id, ";
            $sql .= ":profile_employee_id, ";
            $sql .= ":profile_email, ";
            $sql .= ":profile_telephone, ";
            $sql .= ":profile_address, ";
            $sql .= ":profile_created, ";
            $sql .= ":profile_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "profile_is_active"=> $this->profile_is_active,
                "profile_fname_id"=> $this->profile_fname_id,
                "profile_lname_id"=> $this->profile_lname_id,
                "profile_employee_id"=> $this->profile_employee_id,
                "profile_email"=> $this->profile_email,
                "profile_telephone"=> $this->profile_telephone,
                "profile_address"=> $this->profile_address,
                "profile_created"=> $this->profile_created,
                "profile_datetime"=> $this->profile_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblProfile} set ";
            $sql .= "profile_telephone = :profile_telephone, ";
            $sql .= "profile_address = :profile_address, ";
            $sql .= "profile_datetime = :profile_datetime ";
            $sql .= "where profile_aid = :profile_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "profile_telephone" => $this->profile_telephone,
                "profile_address" => $this->profile_address,
                "profile_datetime" => $this->profile_datetime,
                "profile_aid" => $this->profile_aid
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select profile_telephone from {$this->tblProfile} ";
      $sql .= "where profile_telephone = :profile_telephone ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "profile_telephone" => "{$this->profile_telephone}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }



    
}