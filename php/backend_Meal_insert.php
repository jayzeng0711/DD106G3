<?php

$errMsg = "";

try{
    require_once("connectdd106g3.php");
    $sql = "INSERT INTO `meal` (`mealNo`, `mealName`, `mealPic`, `mealFirst`, `mealMain`, `mealDishOne`, `mealDishTwo`, `mealsoup`, `mealDrink`, `mealPrice`, `meatstate`)";

    $theMeal = json_decode(file_get_contents("php://input"));

    $newMeal = $pdo->prepare($sql);
    $newMeal->bindValue(':mealName', $mealRows->mealName);
    $newMeal->bindValue(':mealPic', $mealRows->mealPic);
    $newMeal->bindValue(':mealFirst', $mealRows->mealFirst);
    $newMeal->bindValue(':mealMain', $mealRows->mealMain);
    $newMeal->bindValue(':mealDishOne', $mealRows->mealDishOne);
    $newMeal->bindValue(':mealDishTwo', $mealRows->mealDishTwo);
    $newMeal->bindValue(':mealSoup', $mealRows->mealSoup);
    $newMeal->bindValue(':mealDrink', $mealRows->mealDrink);
    $newMeal->bindValue(':meatState', $mealRows->meatState);
    $newMeal->execute();

}catch (PDOException $e) {
    
    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>