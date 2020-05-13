<?php
try{
    require_once("connectdd106g3.php");
    $sql = "select * from admin";
    $admin = $pdo->query($sql);
    $adminRows = $admin->fetchAll(PDO::FETCH_ASSOC);
}catch(PDOException $e){
    echo "Debuging: ", $e->getMessage(), "<br>";
    echo "Detailing: ", $e->getLine(), "<br>";
}
?>   