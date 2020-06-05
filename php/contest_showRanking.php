<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");

    // 抓這個月比賽的比賽編號
    // $sqlTime = "SELECT `contestNo` FROM `contest` WHERE DATE_FORMAT( `contestStart`, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )";
    // $times = $pdo->query($sqlTime);
    // $time = $times->fetch(PDO::FETCH_ASSOC);

    // 這個月比賽的編號  
    // $no = $time["contestNo"];
    $no = 1;


    // 抓出這個月總票數前三名
    $sql = "SELECT * FROM `custo` WHERE `contestNo` = $no Order By `contestCustoVote` DESC limit 3"; 
    $custoRK = $pdo->prepare($sql);
    $custoRK->execute();
    $custoRKRows = $custoRK->fetchAll(PDO::FETCH_ASSOC);

    foreach($custoRKRows as $i => $custoRKRow){
        // $sql2 = "select * from `comment` where custoNo=${custoRKRow["custoNo"]}";
        $sql2 = "SELECT * from `comment` JOIN `member` ON comment.memNo = member.memNo where custoNo=${custoRKRow["custoNo"]} and commentState=1";
        $commentRK = $pdo->query($sql2);
        $commentRKRows = $commentRK->fetchAll(PDO::FETCH_ASSOC);
        $custoRKRows[$i]["comments"] = $commentRKRows;
    }

    echo json_encode($custoRKRows);

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>