<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");
 
    // $sql = "select * from `custo` join `comment` ON custo.custoNo = comment.custoNo";
    // $contest = $pdo->query($sql);
    // $contestRows = $contest->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($contestRows);

    $sql = "select * from `custo`"; 
    $custo = $pdo->prepare($sql);
    $custo->execute();
    $custoRows = $custo->fetchAll(PDO::FETCH_ASSOC);

    foreach($custoRows as $i => $custoRow){
        $sql2 = "select * from `comment` where custoNo=${custoRow["custoNo"]}";
        $comment = $pdo->query($sql2);
        $commentRows = $comment->fetchAll(PDO::FETCH_ASSOC);
        $custoRows[$i]["comments"] = $commentRows;
    }

    echo json_encode($custoRows);

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>