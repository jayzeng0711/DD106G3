<?php
require_once("connectdd106g3.php");
$sql = "select * from `admin` where adminNo=:adminNo";
$admin = $pdo->query($sql);
$admin->execute();
$adminRows = $admin->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($adminRows);

?>
 