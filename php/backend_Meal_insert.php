<?php

$errMsg = "";

try{
    require_once("connectdd106g3.php");
    $sql = "INSERT INTO `meal` (`mealNo`, `mealName`, `mealPic`, `mealFirst`, `mealMain`, `mealDishOne`, `mealDishTwo`, `mealSoup`, `mealDrink`, `mealPrice`, `meatState`)";

    $theMeal = json_decode(file_get_contents("php://input"));

    $newMeal = $pdo->prepare($sql);
    $newMeal->bindValue(':mealName', $theMeal->mealName);
    $newMeal->bindValue(':mealPic', $theMeal->mealPic);
    $newMeal->bindValue(':mealFirst', $theMeal->mealFirst);
    $newMeal->bindValue(':mealMain', $theMeal->mealMain);
    $newMeal->bindValue(':mealDishOne', $theMeal->mealDishOne);
    $newMeal->bindValue(':mealDishTwo', $theMeal->mealDishTwo);
    $newMeal->bindValue(':mealSoup', $theMeal->mealSoup);
    $newMeal->bindValue(':mealDrink', $theMeal->mealDrink);
    $newMeal->bindValue(':mealPrice', $theMeal->mealPrice);
    $newMeal->bindValue(':meatState', $theMeal->meatState);
    $newMeal->execute();

}catch (PDOException $e) {
    
    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>