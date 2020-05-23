<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "Update `cook` set `cookName`=:cookName,`cookState`=:cookState where `cookNo`=:cookNo";

    $cookNow = json_decode(file_get_contents("php://input")); 

    
    $editCook = $pdo->prepare($sql);
    $editCook->bindValue(':cookName',$cookNow->cookName);
    $editCook->bindValue(':cookState',$cookNow->cookState);
    $editCook->bindValue(':cookNo',$cookNow->cookNo);
    $editCook->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;

}
