<?php
    require_once("connectdd106g3.php");


    // 1.要修改資料庫的東西，都要在真正的dd106g3改
    // 2.把dd106g3的資料庫匯出，匯入在自己本機的資料庫
    // 3.自己本機建一支php  connectdd106g3.php ，帳號密碼改成自己的，連自己的資料庫
   
    $sql = "update `test` set price = price + 100 where Id = 1";
    $pdo->exec($sql);

?>