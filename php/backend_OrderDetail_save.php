<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    // 查訂單明細
    $sql = "UPDATE `ordermaster` SET `orderState` =:orderState WHERE `ordermaster`.`orderNo` = :orderNo";
    $state = $pdo->prepare($sql);
    $state->bindValue(":orderNo",$_POST["orderNo"]);
    $state->bindValue(":orderState",$_POST["orderState"]);
    $state->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>