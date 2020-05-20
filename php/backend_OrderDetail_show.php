<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    // 查訂單明細
    $sqldetail = "SELECT o.`orderNo`, o.`orderName`,r.`routePort`,r.`routeDate`,o.`orderPeople`,o.`orderTotal`, o.`orderStatue`,o.`orderPrice` ,o.`orderPoints`, o.`orderTotal` FROM `ordermaster` o JOIN `route` r ON o.routeNo = r.routeNo where o.orderNo=:orderNo";
    $details = $pdo->prepare($sqldetail);
    $details->bindValue(":orderNo","125");
    $details->execute();
    $detailRows = $details->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($detailRows);

    echo"<br><br><hr><br><br>";
    // 查訂單套餐明細
    $sqlmeal = "SELECT me.`mealName`, m.`mealListCount`, m.`mealListPrice`,(m.`mealListCount`* m.`mealListPrice`)'mealTotal' FROM (`ordermaster` o JOIN `meallist` m ON o.orderNo = m.orderNo )JOIN `meal` me on m.mealNo = me.mealNo  where o.orderNo=:orderNo";
    $meals = $pdo->prepare($sqlmeal);
    $meals->bindValue(":orderNo","125");
    $meals->execute();
    $mealRows = $meals->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($mealRows);

    echo"<br><br><hr><br><br>";
    // 查訂單客製化料理明細
    $sqlcusto = "SELECT cus.`custoName`, c.`custoListCount`, c.`custoListPrice`,(c.`custoListCount`* c.`custoListPrice`)'custoTotal' FROM (`ordermaster` o JOIN `custolist` c ON o.orderNo = c.orderNo) JOIN `custo` cus on c.custoNo = cus.custoNo  where o.orderNo=:orderNo";
    $custos = $pdo->prepare($sqlcusto);
    $custos->bindValue(":orderNo","125");
    $custos->execute();
    $custoRows = $custos->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($custoRows);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>