<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `member`SET memScore= memScore + :memScore,memPoints= memPoints +:memPoints where memId =:memId ";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":memScore", $mem_po_sco_str->score);
    $mem_po_sco -> bindValue(":memPoints", $mem_po_sco_str->point);
    $mem_po_sco -> bindValue(":memId", $mem_po_sco_str->member);
    $mem_po_sco->execute();
    

    $sql2 = "select * from `member` where memId = :memId";
    $member_data = $pdo->prepare($sql2);
    $member_data -> bindValue(":memId", $mem_po_sco_str->member);
    $member_data->execute();
    $memRow = $member_data->fetch(PDO::FETCH_ASSOC);
    // session_id(SID);
    session_start();
    $_SESSION["memScore"] =  $memRow["memScore"];
    $_SESSION["memPoints"] =  $memRow["memPoints"];
    echo json_encode($memRow);
?>