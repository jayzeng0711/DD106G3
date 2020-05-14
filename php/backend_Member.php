<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `member` JOIN `memberlevel` on member.levelNo = memberlevel.levelNo";
    $member = $pdo->query($sql);
    $member_row = $member->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($member_row);
?>