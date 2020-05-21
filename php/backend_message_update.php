<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `message`SET messageContent=:messageContent,messageQue=:messageQue,messageQueConrent=:messageQueConrent,messageState=:messageState where messageNo=:messageNo";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":messageNo", $mem_po_sco_str->message_id);
    $mem_po_sco -> bindValue(":messageContent", $mem_po_sco_str->message_text);
    $mem_po_sco -> bindValue(":messageQue", $mem_po_sco_str->message_quest);
    $mem_po_sco -> bindValue(":messageQueConrent", $mem_po_sco_str->message_input);
    $mem_po_sco -> bindValue(":messageState", $mem_po_sco_str->message_status);
    $mem_po_sco->execute();
?>