<?php

$errMsg = "";

try {

    require_once("connectdd106g3.php");

    $sql = "SELECT * FROM `route` where :from < `routeDate` and `routeState` = '1' order by `routeDate` ";

    $routes = $pdo->prepare($sql);
    $routes->bindValue(":from", $_POST["from"]);
    $routes->execute();
    $routeRow = $routes->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($routeRow);
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
