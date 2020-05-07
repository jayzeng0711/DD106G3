<?php
    require_once("connectdd106g3.php");
 
    $sql = "select * from `member`";
    $member = $pdo->query($sql);
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    echo json_encode($memRow);


?>