<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");


    session_start();
    //確定該會員今天是否投過票
    $sql = "SELECT * FROM `member` WHERE DATE_FORMAT( `memVote`, '%Y%m%d' ) = DATE_FORMAT( CURDATE( ) , '%Y%m%d' ) and member.memNo = :memNo";
    // $sql = "INSERT INTO `vote` (`voteNo`, `contestNo`, `memNo`, `custoNo`) VALUES (null, :contestNo, :memNo, :custoNo)";
    $v_check = $pdo->prepare($sql);
    $v_check->bindValue(":memNo", $_SESSION["memNo"]);
    $v_check->execute();
    $v_check_Row = $v_check->fetch(PDO::FETCH_ASSOC);
    
    
    echo json_encode($v_check_Row);

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>