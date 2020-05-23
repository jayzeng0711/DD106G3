<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "Update `ingredient` set `ingreName`=:ingreName,`ingreState`=:ingreState where `ingreNo`=:ingreNo";

    $ingreNow = json_decode(file_get_contents("php://input")); 

    
    $editIngre = $pdo->prepare($sql);
    $editIngre->bindValue(':ingreName',$ingreNow->ingreName);
    // $editIngre->bindValue(':routePort',$routenNow->routePort);
    // $editIngre->bindValue(':routeSeat',$routenNow->routeSeat);
    $editIngre->bindValue(':ingreState',$ingreNow->ingreState);
    $editIngre->bindValue(':ingreNo',$ingreNow->ingreNo);
    $editIngre->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;

}
