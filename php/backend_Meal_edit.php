<?php

$errMsg = "";

try{
    require_once("connectdd106g3.php");
    $sql = "Update `meal` set `mealNo`=:mealNo, `mealName`=:mealName, `mealPic`=:mealPic, `mealFirst`=:mealFirst, `mealMain`=:mealMain, `mealDishOne`=:mealDishOne, `mealDishTwo`=:mealDishTwo, `mealSoup`=:mealSoup, `mealDrink`=:mealDrink, `mealPrice`=:mealPrice, `meatState`=:meatState";

    $mealRows = json_decode(file_get_contents("php://input"));

    $editmeal = $pdo->prepare($sql);
    $editmeal->bindValue(':mealNo', $mealRows->mealNo);
    $editmeal->bindValue(':mealName', $mealRows->mealName);
    $editmeal->bindValue(':mealPic', $mealRows->mealPic);
    $editmeal->bindValue(':mealFirst', $mealRows->mealFirst);
    $editmeal->bindValue(':mealMain', $mealRows->mealMain);
    $editmeal->bindValue(':mealDishOne', $mealRows->mealDishOne);
    $editmeal->bindValue(':mealDishTwo', $mealRows->mealDishTwo);
    $editmeal->bindValue(':mealSoup', $mealRows->mealSoup);
    $editmeal->bindValue(':mealDrink', $mealRows->mealDrink);
    $editmeal->bindValue(':meatState', $mealRows->meatState);
    $editmeal->execute();

}catch (PDOException $e) {
    
    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>