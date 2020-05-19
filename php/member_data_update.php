<?php
    require_once("connectdd106g3.php");
    $sql = "UPDATE `member` SET memPsw=:memPsw,memName=:memName,memPic=:memPic where memId=:memId";
    // $mem_po_sco_str = json_decode(file_get_contents('php://input'));
    $mem_po_sco = $pdo->prepare($sql);
    // $mem_po_sco -> bindValue(":memPsw", $mem_po_sco_str->input_cannoy_mod);
    // $mem_po_sco -> bindValue(":memName", $mem_po_sco_str->name);
    // $mem_po_sco -> bindValue(":memPic", $mem_po_sco_str->img_src_arr);
    // $mem_po_sco -> bindValue(":memId", $mem_po_sco_str->email);
    $mem_po_sco -> bindValue(":memPsw", $_POST['input_cannoy_mod']);
    $mem_po_sco -> bindValue(":memName", $_POST['name']);
    $mem_po_sco -> bindValue(":memPic", $_FILES['file']['name']);
    $mem_po_sco -> bindValue(":memId", $_POST['email']);
    $mem_po_sco->execute();
    
    if(file_exists("images") == false){
        mkdir("images");
    }
    $from = $_FILES['file']['tmp_name'];
    $to = "images/".$_FILES['file']['name'];
    copy($from,$to);

    $sql2 = "select * from `member` where memId=:memId";
    $member_data = $pdo->prepare($sql2);
    $member_data -> bindValue(":memId", $_POST['email']);
    $member_data->execute();
    $memRow = $member_data->fetch(PDO::FETCH_ASSOC);
    // session_id(SID);
    session_start();
    $_SESSION["memName"] =  $memRow["memName"];
    $_SESSION["memPic"] =  $_FILES['file']['name'];
    
    echo json_encode($memRow);
?>