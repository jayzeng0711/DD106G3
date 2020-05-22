<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "Update `seafood` set `seafoodName`=:seafoodName, `seafoodPic`=:seafoodPic,`seafoodPrice`=:seafoodPrice, `seafoodScore`=:seafoodScore, `seafoodPoint`=:seafoodPoint,`seafoodLevel`=:seafoodLevel,`cookNo`=:cookNo, `seafoodCookPic`=:seafoodCookPic,`seafoodState`=:seafoodState where `seafoodNo`=:seafoodNo";

    $seafoodNow = json_decode(file_get_contents("php://input")); 

    
    $editSeafood = $pdo->prepare($sql);
    $editSeafood->bindValue(':seafoodName',$seafoodNow->seafoodName);
    $editSeafood->bindValue(':seafoodPic',$seafoodNow->seafoodPic);
    $editSeafood->bindValue(':seafoodPrice',$seafoodNow->seafoodPrice);
    $editSeafood->bindValue(':seafoodScore',$seafoodNow->seafoodScore);
    $editSeafood->bindValue(':seafoodPoint',$seafoodNow->seafoodPoint);
    $editSeafood->bindValue(':seafoodLevel',$seafoodNow->seafoodLevel);
    $editSeafood->bindValue(':cookNo',$seafoodNow->cookNo);
    $editSeafood->bindValue(':seafoodCookPic',$seafoodNow->seafoodCookPic);
    $editSeafood->bindValue(':seafoodState',$seafoodNow->seafoodState);
    $editSeafood->bindValue(':seafoodNo',$seafoodNow->seafoodNo);
    $editSeafood->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;

}
