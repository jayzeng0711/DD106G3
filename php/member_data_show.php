<?php

$errMsg = "";

try {
    require_once("connectdd106g3.php");
    // session_id(SID);
    session_start();
    $sql = "select * from `member` JOIN `memberlevel` ON member.levelNo = memberlevel.levelNo where memId = :memId";
    $route = $pdo->prepare($sql);
    $route->bindValue(":memId", $_SESSION["memId"]);
    $route->execute();
    if($route->rowCount() == 0){
        echo '1';
    }else{
        $routeRows = $route->fetch(PDO::FETCH_ASSOC);    
        echo json_encode($routeRows);
    }

} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>