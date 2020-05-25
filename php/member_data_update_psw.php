<?php
    require_once("connectdd106g3.php");
        $sql = "UPDATE `member` SET memPsw=:memPsw where memId=:memId";
        $mem_login_str = json_decode(file_get_contents('php://input'));
        $memlogin = $pdo->prepare($sql);
        $memlogin ->bindValue(":memPsw", $mem_login_str->new_psw);
        $memlogin ->bindValue(":memId", $mem_login_str->memid);
        $memlogin->execute();       
?>