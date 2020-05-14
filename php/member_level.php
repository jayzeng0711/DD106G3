<?php
    require_once("connectdd106g3.php");
    $sql = "SELECT * FROM `member` JOIN `memberlevel` ON member.levelNo = memberlevel.levelNo WHERE member.memId = :memId";
    $mem_level_str = json_decode(file_get_contents('php://input'));
    $mem_level = $pdo->prepare($sql);
    $mem_level ->bindValue(":memId", $mem_level_str->memId);
    $mem_level->execute();

    if($mem_level->rowCount() == 0){
        echo "";
    } else {
        $mem_level_row = $mem_level->fetch(PDO::FETCH_ASSOC);
        echo json_encode($mem_level_row);
    }
?>