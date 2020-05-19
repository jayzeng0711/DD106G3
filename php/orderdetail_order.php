<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");


    // 儲存訂單資料
    $sql = "INSERT INTO `ordermaster` (`orderNo`, `memNo`, `orderTime`, `orderName`, `orderPhone`, `orderEmail`, `orderPrice`, `orderPoints`, `orderTotal`, `orderStatue`, `routeNo`) VALUES (NULL, :memNo, :datenow, :orderName, :orderPhone, :orderEmail, :orderPrice, :orderPoints, :orderTotal, '0', :routeNo)";

    $orderNow = json_decode(file_get_contents("php://input"));
    $order = $pdo->prepare($sql);
    $order->bindValue(":memNo", $orderNow->memNo);
    $order->bindValue(":datenow", $orderNow->datenow);
    $order->bindValue(":orderName", $orderNow->orderName);
    $order->bindValue(":orderPhone", $orderNow->orderPhone);
    $order->bindValue(":orderEmail", $orderNow->orderEmail);
    $order->bindValue(":orderPrice", $orderNow->orderPrice);
    $order->bindValue(":orderPoints", $orderNow->orderPoints);
    $order->bindValue(":orderTotal", $orderNow->orderTotal);
    $order->bindValue(":routeNo", $orderNow->routeNo);
    $order->execute();

    $psn = $pdo->lastInsertId();

    // 儲存套餐訂單明細資料

    $mealLength = $orderNow->meals;
    for ($i = 1; $i <= $mealLength; $i++) {
        $sqlmeal = "INSERT INTO `meallist` (`orderNo`, `mealNo`, `mealListCount`, `mealListPrice`) VALUES (:orderNo, '$i', :mealListCount, :mealListPrice)";
        $mealListCount = "mealListCount" . "$i";
        $mealListPrice = "mealListCount" . "$i";
        $meallist = $pdo->prepare($sqlmeal);
        $meallist->bindValue(":orderNo", "$psn");
        $meallist->bindValue(":mealListCount", $orderNow->$mealListCount);
        $meallist->bindValue(":mealListPrice", $orderNow->$mealListPrice);
        $meallist->execute();
    }

    // 儲存客製化料理訂單明細資料
    $sqlcusto = "INSERT INTO `custolist` (`orderNo`, `custoNo`, `custoListCount`, `custoListPrice`) VALUES (:orderNo, :custoNo, :custoListCount, :custoListPrice)";

    $arr = $orderNow->custo;

    foreach($arr as $custo){
        $custolist = $pdo->prepare($sqlcusto);
        $custolist->bindValue(":orderNo", "$psn");
        $custolist->bindValue(":custoNo",  $custo->custoNo);
        $custolist->bindValue(":custoListCount", $custo->custoCount);
        $custolist->bindValue(":custoListPrice", $custo->custoPrice);
        $custolist->execute();

    }   
    echo json_encode($arr);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

// 正確訂單資料
// $sql ="INSERT INTO `ordermaster` (`orderNo`, `memNo`, `orderTime`, `orderName`, `orderPhone`, `orderEmail`, `orderPrice`, `orderPoints`, `orderTotal`, `orderStatue`, `routeNo`) VALUES (NULL, '7', '2020-05-27', '111','111', '111', '111', NULL, '111', '0', '1')"; 

// 傳入資料
// $order->bindValue(":memNo","3");
// $order->bindValue(":datenow","2020-05-27");
// $order->bindValue(":orderName","11");
// $order->bindValue(":orderPhone","11");
// $order->bindValue(":orderEmail","11");
// $order->bindValue(":orderPrice","11");
// $order->bindValue(":orderPoints","11");
// $order->bindValue(":orderTotal","11");
// $order->bindValue(":routeNo","1");


// 正確套餐訂單明細
// INSERT INTO `meallist` (`orderNo`, `mealNo`, `mealListCount`, `mealListPrice`) VALUES ('9', '1', '1', '2');
