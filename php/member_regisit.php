<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `member` where `memId` = :memId";
    $memId = json_decode(file_get_contents('php://input'));
    $mem_email = $pdo->prepare($sql);
    $mem_email -> bindValue(":memId", $memId->memId);
    $mem_email->execute();

    if( $mem_email ->rowCount() == 0){
        $mem_rig = "INSERT INTO `member` (`memNo`, `memId`, `memPsw`, `memName`, `levelNo`, `memScore`, `memPoints`, `memPic`, `memVote`, `memState`) VALUES (null, :memId, :memPsw, :memName, '1', '0', '0', null, null, '1')";
        $mem_str = json_decode(file_get_contents('php://input'));
        $member = $pdo->prepare($mem_rig);
        $member->bindValue(":memId", $mem_str->memId);
        $member->bindValue(":memPsw", $mem_str->memPsw);
        $member->bindValue(":memName", $mem_str->memName);
        $member->execute();
        if($mem_email ->rowCount() == 0){
            echo "註冊成功";
        }else{
            echo '註冊失敗';
        }
    } else{
        echo '信箱已註冊過';
    }
?>