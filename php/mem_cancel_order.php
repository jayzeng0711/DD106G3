<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `ordermaster` SET orderStatue= 0 WHERE `orderNo` = :orderNo";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":orderNo", $mem_po_sco_str->num_id);
    $mem_po_sco->execute();
?>