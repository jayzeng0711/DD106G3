<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
			
			width: 300px;
			height: 300px;
			text-align: center;
            font-size: 50px;
			line-height:50px;
            color: steelblue;

        }
    </style>
</head>

<body>

    <?php

    $errMsg = "";

    try {
        require_once("connectdd106g3.php");

        // 找出尚未報到訂單
        $sql = "SELECT * FROM `ordermaster` WHERE `orderState` = '1'";
        $orderRow = $pdo->query($sql);
        $orders = $orderRow->fetchAll(PDO::FETCH_ASSOC);

        // 預設不能搭
        $check = false;

        // 確認是否可以搭乘
        foreach ($orders as $row) {
            if ($row["orderNo"] ==  $_REQUEST["orderId"]) {
                $check = true;
            }
        }

        if ($check == true) {
            $answer = "歡迎搭乘 Ocean Food！";
        
            // 報到完成，更新訂單狀態
            $sql = "UPDATE `ordermaster` SET `orderState` = '2' WHERE `ordermaster`.`orderNo` =:orderNo";
            $state = $pdo->prepare($sql);
            $state->bindValue(":orderNo",$_REQUEST["orderId"]);
            $state->execute();

        }  else if ($check == false) {
            $answer = "目前無法搭乘，請洽服務人員～";
         
        }

        echo "<div>".$answer."</div>";
    
    } catch (PDOException $e) {

        $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
        $errMsg .= "錯誤行號" . $e->getMessage();
        echo $errMsg;
    }

    ?>

</body>

</html>