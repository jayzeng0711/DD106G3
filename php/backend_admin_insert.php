<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `admin` (`adminNo`, `adminId`, `adminPsw`, `adminName`, `adminAuthority`) VALUES (null, :adminId, :adminPsw, :adminName, :adminAuthority)";


    $message_insert_row = json_decode(file_get_contents("php://input"));

    $message_insert = $pdo->prepare($sql);
    $message_insert->bindValue(':adminId', $message_insert_row->msg_text);
    $message_insert->bindValue(':adminPsw', $message_insert_row->msg_textque);
    $message_insert->bindValue(':adminName', $message_insert_row->msg_textleng);
    $message_insert->bindValue(':adminAuthority', $message_insert_row->msg_text_sta);

    $message_insert->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>
