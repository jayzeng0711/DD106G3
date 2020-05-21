<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");
 
    $sql = "SELECT custo.custoNo,custo.memNo,custo.custoPic,cook.cookName,seafood.seafoodName,seafood.seafoodPrice FROM custo INNER JOIN cook ON custo.cookNo = cook.cookNo INNER JOIN seafood ON custo.seafoodNo = seafood.seafoodNo where memNo = :memNo"; 
    $custo = $pdo->prepare($sql);
    session_id(SID);
    session_start();
    $custo->bindValue(":memNo", $_SESSION["memNo"]);
    $custo->execute();
    $custoRows = $custo->fetchAll(PDO::FETCH_ASSOC);

    foreach($custoRows as $i => $custoRow){
        $sql2 = "select * from `ingredientcook` join `ingredient` on ingredientcook.ingreNo = ingredient. ingreNo  where custoNo=${custoRow["custoNo"]}";
        $comment = $pdo->query($sql2);
        $commentRows = $comment->fetchAll(PDO::FETCH_ASSOC);
        $custoRows[$i]["ingreNo"] = $commentRows;
    }

    echo json_encode($custoRows);

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>
