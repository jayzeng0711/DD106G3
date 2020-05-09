<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `member` where `memId`= :memId and `memPsw` = :memPsw";
    $mem_login_str = json_decode(file_get_contents('php://input'));
    $memlogin = $pdo->prepare($sql);
    $memlogin ->bindValue(":memId", $mem_login_str->mem_email);
    $memlogin ->bindValue(":memPsw", $mem_login_str->mem_psw);
    $memlogin->execute();

    if($memlogin->rowCount() == 0){
        echo ``;
    } else {
        $memRow = $memlogin->fetch(PDO::FETCH_ASSOC);

        // 寫入 session
        session_id(SID);
        session_start();
        $_SESSION["memId"] =  $memRow["memId"];
        $_SESSION["memName"] =  $memRow["memName"];
        $_SESSION["levelNo"] =  $memRow["levelNo"];
        $_SESSION["memScore"] =  $memRow["memScore"];
        $_SESSION["memPoints"] =  $memRow["memPoints"];
        $_SESSION["memPic"] =  $memRow["memPic"];
        $_SESSION["memVote"] =  $memRow["memVote"];
        $_SESSION["memState"] =  $memRow["memState"];

        echo json_encode($memRow);
        }
        
?>