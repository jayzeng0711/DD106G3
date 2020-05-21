<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");


    // 儲存訂單資料
    $sql = "INSERT INTO `ordermaster` (`orderNo`, `memNo`, `orderTime`, `orderName`, `orderPhone`, `orderEmail`, `orderPrice`, `orderPoints`, `orderTotal`, `orderStatue`, `routeNo`,`orderPeople`) VALUES (NULL, :memNo, :datenow, :orderName, :orderPhone, :orderEmail, :orderPrice, :orderPoints, :orderTotal, '1', :routeNo,:orderPeople)";

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
    $order->bindValue(":orderPeople", $orderNow->orderPeople);
    $order->execute();

    $psn = $pdo->lastInsertId();

    // 儲存套餐訂單明細資料

    $mealarr = $orderNow->meal;
    $sqlmeal = "INSERT INTO `meallist` (`orderNo`, `mealNo`, `mealListCount`, `mealListPrice`) VALUES (:orderNo, :mealNo, :mealListCount, :mealListPrice)";

    foreach($mealarr as $meal){
        $meallist = $pdo->prepare($sqlmeal);
        $meallist->bindValue(":orderNo", "$psn");
        $meallist->bindValue(":mealNo", $meal->mealNo);
        $meallist->bindValue(":mealListCount", $meal->mealListCount);
        $meallist->bindValue(":mealListPrice", $meal->mealListPrice);
        $meallist->execute();

    } 

    // echo json_encode($mealarr);

    // 儲存客製化料理訂單明細資料
    $sqlcusto = "INSERT INTO `custolist` (`orderNo`, `custoNo`, `custoListCount`, `custoListPrice`) VALUES (:orderNo, :custoNo, :custoListCount, :custoListPrice)";

    $custoarr = $orderNow->custo;

    foreach($custoarr as $custo){
        $custolist = $pdo->prepare($sqlcusto);
        $custolist->bindValue(":orderNo", "$psn");
        $custolist->bindValue(":custoNo",  $custo->custoNo);
        $custolist->bindValue(":custoListCount", $custo->custoCount);
        $custolist->bindValue(":custoListPrice", $custo->custoPrice);
        $custolist->execute();

    }   
    // echo json_encode($arr);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>