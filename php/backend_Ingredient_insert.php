<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `ingredient` (`ingreNo`, `ingreName`, `picSrc`, `forCus`, `ingreState`) VALUES (null, :ingreName, :picSrc, :forCus, :ingreState)";


    $ingreNow = json_decode(file_get_contents("php://input"));

    $newIngre = $pdo->prepare($sql);
    $newIngre->bindValue(':ingreName', $ingreNow->ingreName);
    $newIngre->bindValue(':picSrc', $ingreNow->picSrc);
    $newIngre->bindValue(':forCus', $ingreNow->forCus);
    $newIngre->bindValue(':ingreState', $ingreNow->ingreState);
    $newIngre->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}


?>
