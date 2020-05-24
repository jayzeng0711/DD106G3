<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `cook` (`cookNo`, `cookName`, `cookState`) VALUES (null, :cookName,'0')";


    $cookNow = json_decode(file_get_contents("php://input"));

    $newCook = $pdo->prepare($sql);
    $newCook->bindValue(':cookName', $cookNow->cookName);
    $newCook->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>
