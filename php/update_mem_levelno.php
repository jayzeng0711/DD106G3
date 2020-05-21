<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `member`SET levelNo = 2 where memId = :memId";
    $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    $mem_po_sco -> bindValue(":memId", $mem_po_sco_str->email);
    $mem_po_sco->execute();
    
    $sql2 = "select * from `memberlevel` where levelNo = 2";
    $member_data = $pdo->query($sql2);
    $memRow = $member_data->fetch(PDO::FETCH_ASSOC);
    // session_id(SID);
    session_start();
    $_SESSION["levelNo"] =  $memRow["levelNo"];
    echo json_encode($memRow);
?>