<?php
    require_once("connectdd106g3.php");
    $sql = "select messageContent from `message` where messageState = 1";
    $message = $pdo->query($sql);
    $message_row = $message->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($message_row);
?>