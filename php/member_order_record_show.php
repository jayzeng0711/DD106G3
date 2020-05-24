<?php
    require_once("connectdd106g3.php");
    // $sql = "select * from `ordermaster` JOIN `route` ON ordermaster.routeNo = route.routeNo 
    //                                     JOIN `meallist` ON ordermaster.orderNo = meallist.orderNo
    //                                     JOIN `custolist` ON ordermaster.orderNo = custolist.orderNo
    //                                     JOIN `custo` ON custolist.custoNo = custo.custoNo where memNo = 1";
    $sql = "select * from `ordermaster` JOIN `route` ON ordermaster.routeNo  = route.routeNo where memNo = :memNo order by orderState desc";
    $member_data = $pdo->prepare($sql);
    // session_id(SID);
    session_start();
    $member_data ->bindValue(":memNo", $_SESSION['memNo']);
    $member_data->execute();
    $memRows = $member_data->fetchAll(PDO::FETCH_ASSOC);
    foreach($memRows as $i => $memRow){
        $sql2 = "select * from `meallist`  where orderNo=${memRow["orderNo"]}";
        $meallist = $pdo->query($sql2);
        $meallistRows = $meallist->fetchAll(PDO::FETCH_ASSOC);
        $memRows[$i]["orderNo"] = $meallistRows;
    }
    echo json_encode($memRows);
?>