<?php

class Company{
    public $company_aid;
    public $company_name;
    public $company_email;
    public $company_phone;
    public $company_street;
    public $company_city;
    public $company_province;
    public $company_postal;
    public $company_country;
    public $company_background;
    public $company_submenu;
    public $company_accent;
    public $company_logo;
    public $company_is_active;
    public $company_created;
    public $company_datetime;

    public $connection;
    public $lastInsertedId;
    
    public $tblCompany;

    public function __construct($db){
        $this->connection = $db;
        $this->tblCompany = "fbs_hris_company";
    }

    public function readAll(){
        try{
            $sql = "select * from {$this->tblCompany} ";
            $sql .= "order by company_is_active desc, ";
            $sql .= "company_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create() {
        try{
            $sql = "insert into {$this->tblCompany}";
            $sql .= "(company_is_active, ";
            $sql .= "company_name, ";
            $sql .= "company_email, ";
            $sql .= "company_phone, ";
            $sql .= "company_street, ";
            $sql .= "company_city, ";
            $sql .= "company_province, ";
            $sql .= "company_postal, ";
            $sql .= "company_country, ";
            $sql .= "company_background, ";
            $sql .= "company_submenu, ";
            $sql .= "company_accent, ";
            $sql .= "company_logo, ";
            $sql .= "company_created, ";
            $sql .= "company_datetime ) values ( ";
            $sql .= ":company_is_active, ";
            $sql .= ":company_name, ";
            $sql .= ":company_email, ";
            $sql .= ":company_phone, ";
            $sql .= ":company_street, ";
            $sql .= ":company_city, ";
            $sql .= ":company_province, ";
            $sql .= ":company_postal, ";
            $sql .= ":company_country, ";
            $sql .= ":company_background, ";
            $sql .= ":company_submenu, ";
            $sql .= ":company_accent, ";
            $sql .= ":company_logo, ";
            $sql .= ":company_created, ";
            $sql .= ":company_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_is_active"=> $this->company_is_active,
                "company_name"=> $this->company_name,
                "company_email"=> $this->company_email,
                "company_phone"=> $this->company_phone,
                "company_street"=> $this->company_street,
                "company_city"=> $this->company_city,
                "company_province"=> $this->company_province,
                "company_postal"=> $this->company_postal,
                "company_country"=> $this->company_country,
                "company_background"=> $this->company_background,
                "company_submenu"=> $this->company_submenu,
                "company_accent"=> $this->company_accent,
                "company_logo"=> $this->company_logo,
                "company_created"=> $this->company_created,
                "company_datetime"=> $this->company_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql = "update {$this->tblCompany} set ";
            $sql .= "company_name = :company_name, ";
            $sql .= "company_email = :company_email, ";
            $sql .= "company_phone = :company_phone, ";
            $sql .= "company_street = :company_street, ";
            $sql .= "company_city = :company_city, ";
            $sql .= "company_province = :company_province, ";
            $sql .= "company_postal = :company_postal, ";
            $sql .= "company_country = :company_country, ";
            $sql .= "company_background = :company_background, ";
            $sql .= "company_submenu = :company_submenu, ";
            $sql .= "company_accent = :company_accent, ";
            $sql .= "company_logo = :company_logo, ";
            $sql .= "company_datetime = :company_datetime ";
            $sql .= "where company_aid = :company_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_name" => $this->company_name,
                "company_email" => $this->company_email,
                "company_phone" => $this->company_phone,
                "company_street" => $this->company_street,
                "company_city" => $this->company_city,
                "company_province" => $this->company_province,
                "company_postal" => $this->company_postal,
                "company_country" => $this->company_country,
                "company_background" => $this->company_background,
                "company_submenu" => $this->company_submenu,
                "company_accent" => $this->company_accent,
                "company_logo" => $this->company_logo,
                "company_datetime" => $this->company_datetime,
                "company_aid" => $this->company_aid,
            ]); 
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function active() {
        try{
            $sql = "update {$this->tblCompany} set ";
            $sql .= "company_is_active = :company_is_active, ";
            $sql .= "company_datetime = :company_datetime ";
            $sql .= "where company_aid = :company_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "company_is_active" => $this->company_is_active,
                "company_datetime" => $this->company_datetime,
                "company_aid" => $this->company_aid,
            ]);
        }catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
  {
    try {
      $sql = "select company_name from {$this->tblCompany} ";
      $sql .= "where company_name = :company_name ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "company_name" => "{$this->company_name}",
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }
}