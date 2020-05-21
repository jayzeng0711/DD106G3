<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");


    // // 查訂單客製化料理明細
    $sqlcusto = "SELECT cus.`custoName`, c.`custoListCount`, c.`custoListPrice`,(c.`custoListCount`* c.`custoListPrice`)'custoTotal' FROM (`ordermaster` o JOIN `custolist` c ON o.orderNo = c.orderNo) JOIN `custo` cus on c.custoNo = cus.custoNo  where o.orderNo=:orderNo";
    $custos = $pdo->prepare($sqlcusto);
    $custos->bindValue(":orderNo",$_POST["orderNo"]);
    $custos->execute();
    $custoRows = $custos->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($custoRows);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>