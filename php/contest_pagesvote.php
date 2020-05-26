<?php

$errMsg = "";

try {

    // 抓這個月製作的客製化料理 

    require_once("connectdd106g3.php");

    // 抓這個月比賽的比賽編號
    $sqlTime = "SELECT `contestNo` FROM `contest` WHERE DATE_FORMAT( `contestStart`, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )";
    $times = $pdo->query($sqlTime);
    $time = $times->fetch(PDO::FETCH_ASSOC);
   
    // 這個月比賽的編號 
    $no = $time["contestNo"];


    // 抓這次比賽所有參賽料理(參賽編號、參賽時間、料理編號、料理名稱、料理圖片、會員姓名、會員照片、得票數、排名、編號比賽)
    $sql = " SELECT c.`custoNo` ,c.`custoTime`,c.`custoName` ,c.`custoPic`,m.`memName`,m.`memPic`,c.`contestCustoVote`,`c`.`contestCustoRank`,c.`contestNo` FROM `custo`c JOIN `member`m on c.`memNo` = m.`memNo` WHERE `contestNo` = $no order by c.`custoTime` DESC";

    $custos = $pdo->query($sql);
    $custoRows = $custos->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($custoRows);


} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
