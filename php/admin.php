<?php
    require_once("connectdd106g3.php");

    $sql = "select * from `admin`";
    $admin = $pdo->query($sql);
    $adminRow = $admin->fetch(PDO::FETCH_ASSOC);
    echo json_encode($adminRow);
?>