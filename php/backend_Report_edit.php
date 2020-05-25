<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");

    $sql = "UPDATE `report` set `ReportState`=:ReportState where `ReportNo`=:ReportNo";
    $reportNow = json_decode(file_get_contents("php://input")); 
    $editReport = $pdo->prepare($sql);
    $editReport->bindValue(':ReportState',$reportNow->ReportState);
    $editReport->bindValue(':ReportNo',$reportNow->ReportNo);
    $editReport->execute();

    

    $sql2 = "UPDATE `comment` set `commentState`= :commentState where `commentNo`=:commentNo";
    $editReportcomment = $pdo->prepare($sql2);
    $editReportcomment->bindValue(':commentState',$reportNow->commentState);
    $editReportcomment->bindValue(':commentNo',$reportNow->commentNo);
    $editReportcomment->execute();
    
    
    // //判斷修改留言狀態(方法二)
    // $state = $reportNow->ReportState;

    // if( $state == 1 ){ //檢舉成功，將留言狀態改為隱藏
    //     $sql2 = "UPDATE `comment` set `commentState`= '0' where `commentNo`=:commentNo";

    //     $editReportcomment = $pdo->prepare($sql2);
    //     $editReportcomment->bindValue(':commentNo',$reportNow->commentNo);
    //     $editReportcomment->execute();
    // }
    // if( $state == 2 ){ //檢舉失敗，將留言狀態改為顯示
    //     $sql3 = "UPDATE `comment` set `commentState`= '1' where `commentNo`=:commentNo";

    //     $editReportcomment = $pdo->prepare($sql3);
    //     $editReportcomment->bindValue(':commentNo',$reportNow->commentNo);
    //     $editReportcomment->execute();
    // }
    // //判斷修改留言狀態(方法二)
    

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}
