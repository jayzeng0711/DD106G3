<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    // 查基本訂單資料
    $sql = "SELECT o.`orderNo`, o.`orderName`,r.`routePort`,r.`routeDate`,o.`orderPeople`,o.`orderTotal`, o.`orderState`FROM `ordermaster` o JOIN `route` r ON o.routeNo = r.routeNo  order by o.`orderNo`";
    $orders = $pdo->query($sql);
    $orderRows = $orders->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($orderRows);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>