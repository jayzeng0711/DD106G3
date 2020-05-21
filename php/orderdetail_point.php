<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    //查會員點數
    $sql = "select * from `member` where memNo =:memNo";

    $point = $pdo->prepare($sql);
    $point->bindValue(":memNo",$_POST["memNo"]);
    $point->execute();
    $poinRow = $point->fetch(PDO::FETCH_ASSOC);
    echo $poinRow["memPoints"];


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>