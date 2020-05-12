<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `route` (`routeNo`, `routeDate`, `routePort`, `routeSeat`, `routeCount`, `routeState`) VALUES (null, :routeDate, :routePort, :routeSeat, '0', '1')";


    $routenNow = json_decode(file_get_contents("php://input"));

    $newRoute = $pdo->prepare($sql);
    $newRoute->bindValue(':routeDate', $routenNow->routeDate);
    $newRoute->bindValue(':routePort', $routenNow->routePort);
    $newRoute->bindValue(':routeSeat', $routenNow->routeSeat);
    $newRoute->execute();

    // $routeRows = $route->fetchAll(PDO::FETCH_ASSOC);    
    // echo json_encode($routeRows);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

// INSERT INTO `route` (`routeNo`, `routeDate`, `routePort`, `routeSeat`, `routeCount`, `routeState`) VALUES (NULL, '2020-05-21', '高雄港', '2', '1', '0');
// $newRoute->bindValue(':routeDate','2020-05-03');
// $newRoute->bindValue(':routePort','高雄港');
// $newRoute->bindValue(':routeSeat','2000');
// $newRoute->bindValue(':routeCount','20');

?>
