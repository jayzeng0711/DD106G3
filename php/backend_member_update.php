<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `member`SET memState=:memState where memNo=:memNo";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":memState", $mem_po_sco_str->status);
    $mem_po_sco -> bindValue(":memNo", $mem_po_sco_str->id);
    $mem_po_sco->execute();
?>