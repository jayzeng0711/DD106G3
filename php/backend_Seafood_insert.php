<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `seafood` (`seafoodNo`, `seafoodName`, `seafoodPrice`, `seafoodScore`, `seafoodPoint`,`seafoodLevel`, `seafoodPic`, `cookNo`, `seafoodCookPic`, `seafoodState`) VALUES (null, :seafoodName,:seafoodPrice,:seafoodScore,  :seafoodPoint, :seafoodLevel, :seafoodPic,:cookNo, :seafoodCookPic,:seafoodState)";


    $seafoodNow = json_decode(file_get_contents("php://input"));

    $newSeafood = $pdo->prepare($sql);
    $newSeafood->bindValue(':seafoodName', $seafoodNow->seafoodName);
    $newSeafood->bindValue(':seafoodPic', $seafoodNow->seafoodPic);
    $newSeafood->bindValue(':seafoodPrice', $seafoodNow->seafoodPrice);
    $newSeafood->bindValue(':seafoodScore', $seafoodNow->seafoodScore);
    $newSeafood->bindValue(':seafoodLevel', $seafoodNow->seafoodLevel);
    $newSeafood->bindValue(':seafoodPoint', $seafoodNow->seafoodPoint);
    $newSeafood->bindValue(':cookNo', $seafoodNow->cookNo);
    $newSeafood->bindValue(':seafoodCookPic', $seafoodNow->seafoodCookPic);
    $newSeafood->bindValue(':seafoodState', $seafoodNow->seafoodState);
    $newSeafood->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>
