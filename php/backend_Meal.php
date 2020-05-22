<?php   
$errMsg = "";

try {
    require_once("connectdd106g3.php");
    $sql="select * from `meal`";
    $meal = $pdo->query($sql);
    $mealRows= $meal->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($mealRows);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
?>
   