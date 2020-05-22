<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "select * from `cook`";
    $cook = $pdo->query($sql);
    $cookRows = $cook->fetchAll(PDO::FETCH_ASSOC);    
    echo json_encode($cookRows);

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>