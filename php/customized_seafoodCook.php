<?php

$errMsg = "";

try {

    
    require_once("connectdd106g3.php");

    /////////////// 找海鮮對應的烹調方式 ////////////////

    $sql = "SELECT * FROM `seafood`JOIN `cook` on `seafood`.`cookNo`= `cook`.`cookNo` WHERE  `seafood`.`seafoodName`= :seafoodName";

    
    $cooks = $pdo->prepare($sql);
    $cooks->bindValue(":seafoodName",$_POST["name"]);
    $cooks->execute();
    $cooksRow = $cooks->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cooksRow);



} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;

}
?>