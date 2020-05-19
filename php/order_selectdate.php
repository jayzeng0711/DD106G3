<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
   $sql = "SELECT * FROM `route` where routePort =:port and :from < `routeDate` and `routeState` = '1' order by `routeDate` limit 5";


   $routeNow = json_decode(file_get_contents("php://input"));
   $routes = $pdo->prepare($sql);
   $routes->bindValue(":port",$routeNow->port);
   $routes->bindValue(":from",$routeNow->form);
   $routes->execute();
   $routeRow = $routes->fetchAll(PDO::FETCH_ASSOC);

   echo json_encode($routeRow);  

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

