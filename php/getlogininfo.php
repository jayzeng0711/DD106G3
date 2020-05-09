<?php
    session_start();
    require_once("connectdd106g3.php");
    if(isset($_SESSION['memId'])){
        $memlogin = array("memId"=>$_SESSION["memId"], "memName"=>$_SESSION["memName"]);
        echo json_encode($memlogin);
    }else{
        echo"{}";
    }
?>