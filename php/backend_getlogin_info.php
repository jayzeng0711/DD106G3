<?php
    // session_id(SID);
    session_start();
    require_once("connectdd106g3.php");
    if(isset($_SESSION['adminId'])){
        $memlogin = array("adminId"=>$_SESSION["adminId"], "adminPsw"=>$_SESSION["adminPsw"],"adminName"=>$_SESSION["adminName"],"adminAuthority"=>$_SESSION["adminAuthority"]);
        echo json_encode($memlogin);
    }else{
        echo"{}";
    }
?>