<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `ingredient` (`ingreNo`, `ingreName`, `picSrc`,`ingreState`) VALUES (null, :ingreName, :picSrc,'0')";


    $ingreNow = json_decode(file_get_contents("php://input"));

    $newIngre = $pdo->prepare($sql);
    $newIngre->bindValue(':ingreName', $ingreNow->ingreName);
    $newIngre->bindValue(':picSrc', $ingreNow->picSrc);
    // $newIngre->bindValue(':ingreState', $ingreNow->ingreState);
    $newIngre->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

// 測試
// INSERT INTO `route` (`routeNo`, `routeDate`, `routePort`, `routeSeat`, `routeCount`, `routeState`) VALUES (NULL, '2020-05-21', '高雄港', '2', '1', '0');
// $newRoute->bindValue(':routeDate','2020-05-03');
// $newRoute->bindValue(':routePort','高雄港');
// $newRoute->bindValue(':routeSeat','2000');

?>
