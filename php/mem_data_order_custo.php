<?php
    require_once("connectdd106g3.php");
    $sql = "SELECT * FROM custolist JOIN custo ON custolist.custoNo = custo.custoNo";
    $mem_level_str = json_decode(file_get_contents("php://input"));
    $mem_level = $pdo->prepare($sql);
    // $mem_level ->bindValue(":orderNo", 1);
    $mem_level->execute();
    $mem_level_row = $mem_level->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($mem_level_row);
?>
