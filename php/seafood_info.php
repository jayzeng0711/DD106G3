<?php
    require_once("connectdd106g3.php");
    $sql = "SELECT DISTINCT `seafoodName`, `seafoodPrice`, `seafoodScore`, `seafoodPoint`,`seafoodLevel`,`seafoodPic` FROM `seafood`";
    $seafood_info = $pdo->query($sql);
    $seafood_info_row = $seafood_info->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($seafood_info_row);
?>