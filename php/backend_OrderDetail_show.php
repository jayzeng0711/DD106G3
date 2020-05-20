<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    // 查訂單明細
    $sqldetail = "SELECT o.`orderNo`, o.`orderName`,r.`routePort`,r.`routeDate`,o.`orderPeople`,o.`orderTotal`, o.`orderState`,o.`orderPrice` ,o.`orderPoints` FROM `ordermaster` o JOIN `route` r ON o.routeNo = r.routeNo where o.orderNo=:orderNo";
    $details = $pdo->prepare($sqldetail);
    $details->bindValue(":orderNo",$_POST["orderNo"]);
    $details->execute();
    $detailRow = $details->fetch(PDO::FETCH_ASSOC);    
    echo json_encode($detailRow);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>