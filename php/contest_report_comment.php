<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");
    // //找最新一則檢舉留言
    // $sql = "select * from `report` ORDER BY ReportNo DESC LIMIT 0 , 1"; 
    // $report = $pdo->prepare($sql);
    // $report->execute();
    // $reportRow = $report->fetch(PDO::FETCH_ASSOC);

    // echo json_encode($reportRow);


    session_start();
    //新增一筆檢舉留言到資料庫
    $sql = "INSERT INTO `report` (`ReportNo`, `commentNo`, `commentContent`, `ReportReason`, `memNo`, `ReportState`) VALUES (null, :commentNo, :commentContent, :ReportReason, :memNo, '0')";
    $report_str = json_decode(file_get_contents('php://input'));
    $report = $pdo->prepare($sql);
    $report->bindValue(":commentNo", $report_str->commentNo);
    $report->bindValue(":commentContent", $report_str->commentContent);
    $report->bindValue(":ReportReason", $report_str->ReportReason);
    $report->bindValue(":memNo", $_SESSION["memNo"]);
    $report->execute();

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>