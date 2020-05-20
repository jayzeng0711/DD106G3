<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");

    $sql = "select * from `custo` Order By contestCustoVote DESC limit 3"; 
    $custoRK = $pdo->prepare($sql);
    $custoRK->execute();
    $custoRKRows = $custoRK->fetchAll(PDO::FETCH_ASSOC);

    foreach($custoRKRows as $i => $custoRKRow){
        // $sql2 = "select * from `comment` where custoNo=${custoRKRow["custoNo"]}";
        $sql2 = "select * from `comment` JOIN `member` ON comment.memNo = member.memNo where custoNo=${custoRKRow["custoNo"]}";
        $commentRK = $pdo->query($sql2);
        $commentRKRows = $commentRK->fetchAll(PDO::FETCH_ASSOC);
        $custoRKRows[$i]["comments"] = $commentRKRows;
    }

    // 會員資料要跟著評論跑
    // foreach($custoRKRows as $i => $custoRKRow){
    //     $sql3 = "select * from `member` where memNo=${custoRKRow["memNo"]}";
    //     $memberRK = $pdo->query($sql3);
    //     $memberRKRows = $memberRK->fetchAll(PDO::FETCH_ASSOC);
    //     $custoRKRows[$i]["members"] = $memberRKRows;
    // }

    echo json_encode($custoRKRows);

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>