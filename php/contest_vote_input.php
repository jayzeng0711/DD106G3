<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");


    session_start();
    //新增一筆檢舉留言到資料庫
    $sql = "INSERT INTO `vote` (`voteNo`, `contestNo`, `memNo`, `custoNo`) VALUES (null, :contestNo, :memNo, :custoNo)";
    $vote_str = json_decode(file_get_contents('php://input'));
    $vote = $pdo->prepare($sql);
    $vote->bindValue(":contestNo", $vote_str->contestNo);
    $vote->bindValue(":memNo", $_SESSION["memNo"]);
    $vote->bindValue(":custoNo", $vote_str->custoNo);
    
    $vote->execute();

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>