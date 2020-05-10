<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `memberlevel`";
    $mem_info = $pdo->query($sql);
    $mem_info_row = $mem_info->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($mem_info_row);
?>