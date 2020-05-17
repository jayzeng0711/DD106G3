<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `admin`SET adminAuthority=:adminAuthority where adminNo=:adminNo";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":adminAuthority", $mem_po_sco_str->message_id);
    $mem_po_sco -> bindValue(":adminNo", $mem_po_sco_str->message_text);
    $mem_po_sco->execute();
?>