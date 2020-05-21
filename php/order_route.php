<?php

$errMsg = "";

try {

   require_once("connectdd106g3.php");

   $sql = "SELECT routeDate FROM `route` order by routeDate DESC limit 1";
   $routes = $pdo->query($sql);
   $lastDate = $routes->fetch(PDO::FETCH_ASSOC);

   echo json_encode($lastDate);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>