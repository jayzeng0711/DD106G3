<?php 
$errMsg = "";
try {
    require_once("connectdd106g3.php");
    $sql="SELECT * FROM `seafood` JOIN cook on `seafood`.`cookNo`= `cook`.`cookNo` where seafoodName = :seafoodName";
    $seafood=$pdo->prepare($sql);
    $seafood->bindValue(":seafoodName", $_GET["seafoodName"]);
    $seafood->execute();

    $seaFoodRows = $seafood->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($seaFoodRows);

}catch(PDOException $e) {
    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>