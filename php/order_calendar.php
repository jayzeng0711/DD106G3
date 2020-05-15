<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
   // $sql = "select routeDate,routeSeat,routeCount from `route` where (routePort =:port and routeState=1)";
   $sql = "SELECT * FROM `route` where routePort =:port and :from < routeDate and routeDate < :to and routeState = '1'";


   $routeNow = json_decode(file_get_contents("php://input"));
   $routes = $pdo->prepare($sql);
   $routes->bindValue(":port",$routeNow->port);
   $routes->bindValue(":from",$routeNow->form);
   $routes->bindValue(":to",$routeNow->to);
   $routes->execute();
   $routeRow = $routes->fetchAll(PDO::FETCH_ASSOC);

   echo json_encode($routeRow);


// 前台傳送：年、月、港口
// 後台查：日期、可容納人數、訂位人數（狀態正常航行）
// 前台接：日期變色、顯示剩餘人數、如果訂位人數已滿不能按

// routeDate
// routePort
// routeSeat
// routeCount
// routeState

// SELECT * FROM `route` where routePort = "梧棲港" and '2020-05-01' < routeDate and routeDate < '2020-05-31' and routeState = "1"
// $routes->bindValue(":port","高雄港");
// $routes->bindValue(":from","2020-04-01");
// $routes->bindValue(":to","2020-05-31");

   

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

