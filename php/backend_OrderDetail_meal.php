<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
  
    // 查訂單套餐明細
    $sqlmeal = "SELECT me.`mealName`, m.`mealListCount`, m.`mealListPrice`,(m.`mealListCount`* m.`mealListPrice`)'mealTotal' FROM (`ordermaster` o JOIN `meallist` m ON o.orderNo = m.orderNo )JOIN `meal` me on m.mealNo = me.mealNo  where o.orderNo=:orderNo";
    $meals = $pdo->prepare($sqlmeal);
    $meals->bindValue(":orderNo",$_POST["orderNo"]);
    $meals->execute();
    $mealRows = $meals->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($mealRows);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>