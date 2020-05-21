<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "INSERT INTO `message` (`messageNo`, `messageContent`, `messageQue`, `messageQueConrent`, `messageState`) VALUES (null, :messageContent, :messageQue, :messageQueConrent, :messageState)";


    $message_insert_row = json_decode(file_get_contents("php://input"));

    $message_insert = $pdo->prepare($sql);
    $message_insert->bindValue(':messageContent', $message_insert_row->msg_text);
    $message_insert->bindValue(':messageQue', $message_insert_row->msg_textque);
    $message_insert->bindValue(':messageQueConrent', $message_insert_row->msg_textleng);
    $message_insert->bindValue(':messageState', $message_insert_row->msg_text_sta);

    $message_insert->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>
