<?php

$errMsg = "";

try{
    require_once("connectdd106g3.php");
   
    $sql = "Update `meal` set `mealPic`=:mealPic, `mealFirst`=:mealFirst, `mealMain`=:mealMain, `mealDishOne`=:mealDishOne, `mealDishTwo`=:mealDishTwo, `mealSoup`=:mealSoup, `mealDrink`=:mealDrink, `mealPrice`=:mealPrice, `mealState`=:mealState where `mealNo`=:mealNo" ;


    // $sql = "Update `meal` set `mealPic`='1', `mealFirst`='1', `mealMain`='1', `mealDishOne`='1', `mealDishTwo`='1', `mealSoup`='1', `mealDrink`='1', `mealPrice`='1', `mealState`='1' where `mealNo`=1";

    $mealRows = json_decode(file_get_contents("php://input"));
  
    $editmeal = $pdo->prepare($sql);

    $editmeal->bindValue(':mealNo', $mealRows->mealNo);
    $editmeal->bindValue(':mealPic', $mealRows->mealPic);
    $editmeal->bindValue(':mealFirst', $mealRows->mealFirst);
    $editmeal->bindValue(':mealMain', $mealRows->mealMain);
    $editmeal->bindValue(':mealDishOne', $mealRows->mealDishOne);
    $editmeal->bindValue(':mealDishTwo', $mealRows->mealDishTwo);
    $editmeal->bindValue(':mealSoup', $mealRows->mealSoup);
    $editmeal->bindValue(':mealDrink', $mealRows->mealDrink);
    $editmeal->bindValue(':mealPrice', $mealRows->mealPrice);
    $editmeal->bindValue(':mealState', $mealRows->mealState);
    $editmeal->execute();

    echo json_encode($mealRows);

}catch (PDOException $e) {
    
    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>