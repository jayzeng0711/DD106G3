<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "Update `report` set `ReportState`=:ReportState where `ReportNo`=:ReportNo";

    $reportNow = json_decode(file_get_contents("php://input")); 

    $editReport = $pdo->prepare($sql);

    $editReport->bindValue(':ReportState',$reportNow->ReportState);
    $editReport->bindValue(':ReportNo',$reportNow->ReportNo);

    $editReport->execute();

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
