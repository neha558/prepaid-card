<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
class DbOperations
{
    private $con;
    function __construct()
    {
        require_once dirname(__FILE__) . '/DbConnect.php';
        $db = new DbConnect;
        $this->con = $db->connect();
    }
    
    public function login($username, $password){
        $password_value='';
        $user_type=0;

    date_default_timezone_set('Africa/Lagos');
    $date = date("Y-m-d H:i:s");

    // Prepare a select statement

    $sql = $this->con->prepare("SELECT a.password, b.user_type FROM es_staff a INNER JOIN prepaid_card_distribution_users b on a.staff_id = b.staff_id WHERE b.staff_id = ?");
    $sql->bind_param('s', $username);
    echo $this->con->error;

    if ($sql->execute()) {
        $sql->bind_result(
        $passwordData, $userTypeData
        );
        while ($sql->fetch()) {
            $password_value = $passwordData;
            $user_type = $userTypeData;
        }

        $c = array();
        if(($password_value == $password) && $username != '' ){
            $c["status"] = 1;
            $c["user_type"] = $user_type;
            $c["username"] = $username;
            $c["message"] = 'Login Successful'; 
            return $c;           
        }
        
        $c["status"] = 0;
        $c["message"] = 'Invalid username or password';  
        return $c;

    }
   } 
   
   public function sessionLogin($username, $password)
    {
        $password_value='';
        $user_type=0;
        date_default_timezone_set('Africa/Lagos');
        $date = date("Y-m-d H:i:s");
        
        // Prepare a select statement

        $sql = $this->con->prepare("SELECT a.password, b.user_type FROM es_staff a INNER JOIN prepaid_card_distribution_users b on a.staff_id = b.staff_id WHERE b.staff_id = ?");
        $sql->bind_param('s', $username);
        echo $this->con->error;

        if ($sql->execute()) {
            $sql->bind_result(
            $passwordData, $userTypeData
            );
            while ($sql->fetch()) {
                $password_value = $passwordData;
                $user_type = $userTypeData;
            }
    
            $c = array();
            if(($password_value == $password) && $username != '' ){
                $_SESSION['user-access'] = "true";
                $_SESSION['role'] = $user_type == 1 ? "Finance" : "Member Success";
                $_SESSION['user-id'] = $username;
                echo 'Login Successful'; 
            } else {
                echo "Login Unsuccessful";
            }                   
        } else {
            echo "error";
        }
    }

    public function sessionLogout()
    {
        session_start();
        session_unset();

        //Destroy entire session data.
        session_destroy();
        $_SESSION['user-access'] = null;
        return 'successful';
    }

    public function fetchCards(){
        $cards=array();
        $sql = "SELECT `ik_number`, `name`, `hub`, `card_bg_id`, `card_pan`, `dist_fo_id`, `card_status` FROM `prepaid_card_distribution_cards_temp` WHERE 1";

        $stmt= $this->con->prepare($sql);
        if($stmt->execute()){
            $stmt->bind_result($ik_number, $name, $hub, $card_bg_id, $card_pan, $dist_fo_id, $card_status);
            $card=array();
            while($stmt->fetch()){
                $card["holderIkNumber"] = $ik_number;
                $card["name"] = $name;
                $card["hub"] = $hub;
                $card["cardBgId"] = $card_bg_id;
                $card["cardPan"] = $card_pan;
                $card["distFoId"] = $dist_fo_id;
                $card["cardStatus"] = $card_status;
                $card["summary"] = $ik_number. "//" .$card_bg_id;

                array_push($cards, $card);


            }
        }
        return $cards;
    }

}

