<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "select * from `route`";
    $route = $pdo->query($sql);
    $routeRows = $route->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($routeRows);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
