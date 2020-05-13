<?php
    // session_id(SID);
    session_start();
    require_once("connectdd106g3.php");
    if(isset($_SESSION['memId'])){
        $memlogin = array("memId"=>$_SESSION["memId"], "memName"=>$_SESSION["memName"],"levelNo"=>$_SESSION["levelNo"],"memScore"=>$_SESSION["memScore"],"memPoints"=>$_SESSION["memPoints"],"memPic"=>$_SESSION["memPic"],"memVote"=>$_SESSION["memVote"],"memState"=>$_SESSION["memState"]);
        echo json_encode($memlogin);
    }else{
        echo"{}";
    }
?>