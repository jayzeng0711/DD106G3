<?php
require_once("connectdd106g3.php");
$sql = "select * from `admin`";
$admin = $pdo->query($sql);
$adminRows = $admin->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($adminRows);
?>