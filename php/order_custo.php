<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
    $sql = "select * from  `custo` where memNo=:memNo";
      
    $memNo = json_decode($_POST["memNo"]);
    $custos = $pdo->prepare($sql);
    $custos->bindValue(":memNo",$memNo);
    $custos->execute();
    $custoRow = $custos->fetchAll(PDO::FETCH_ASSOC);

   echo json_encode($custoRow);




} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

