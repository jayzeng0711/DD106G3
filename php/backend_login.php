<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `admin` where `adminId`= :adminId and `adminPsw` = :adminPsw";
    $mem_login_str = json_decode(file_get_contents('php://input'));
    $memlogin = $pdo->prepare($sql);
    $memlogin ->bindValue(":adminId", $mem_login_str->acc);
    $memlogin ->bindValue(":adminPsw", $mem_login_str->psw);
    $memlogin->execute();

    if($memlogin->rowCount() == 0){
        echo "查無此帳號";
    } else {
        $memRow = $memlogin->fetch(PDO::FETCH_ASSOC);

        // 寫入 session
        session_id(SID);
        session_start();
        $_SESSION["adminId"] =  $memRow["adminId"];
        $_SESSION["adminPsw"] =  $memRow["adminPsw"];
        $_SESSION["adminName"] =  $memRow["adminName"];
        $_SESSION["adminAuthority"] =  $memRow["adminAuthority"];

        echo "登入成功";
        }
        
?>