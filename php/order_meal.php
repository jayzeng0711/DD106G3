<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
    $sql = "select * from `meal` where meatState=1";
  
    $meals= $pdo->query($sql);
    $mealRow = $meals->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($mealRow);

    // 找出三個套餐的品名、菜色、價格
    // mealNo
    // mealName
    // mealPic
    // mealFirst
    // mealMain
    // mealDishOne
    // mealDishTwo
    // mealSoup
    // mealDrink
    // mealPrice
    // mealState


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
