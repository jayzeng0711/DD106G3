<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "Update `route` set `routeDate`=:routeDate,`routePort`=:routePort,`routeSeat`=:routeSeat,`routeState`=:routeState where `routeNo`=:routeNo";

    $routenNow = json_decode(file_get_contents("php://input")); 

    // $newRoute = $pdo->exec($sql);
    $editRoute = $pdo->prepare($sql);
    $editRoute->bindValue(':routeDate',$routenNow->routeDate);
    $editRoute->bindValue(':routePort',$routenNow->routePort);
    $editRoute->bindValue(':routeSeat',$routenNow->routeSeat);
    $editRoute->bindValue(':routeState',$routenNow->routeState);
    $editRoute->bindValue(':routeNo',$routenNow->routeNo);
    // $newRoute->bindValue(':routeDate',$routenNow->routeDate);
    // $newRoute->bindValue(':routePort',$routenNow->routePort);
    // $newRoute->bindValue(':routeSeat',$routenNow->routeSeat);
    $editRoute->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
