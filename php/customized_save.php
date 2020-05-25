<?php

$errMsg = "";

try {

    // 抓這個月比賽的比賽編號
    // 存客製化料理
    // 存配料

    require_once("connectdd106g3.php");

    // 抓這個月比賽的比賽編號
    $sqlTime = "SELECT `contestNo` FROM `contest` WHERE DATE_FORMAT( `contestStart`, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )";
    $times = $pdo->query($sqlTime);
    $time = $times->fetch(PDO::FETCH_ASSOC);

    // 這個月比賽的編號 
    $no = $time["contestNo"];



    /////////////// 存客製化料理 ////////////////

    $sql = "INSERT INTO `custo` (`custoNo`, `custoName`, `custoPic`, `custoPrice`, `memNo`, `seafoodNo`, `cookNo`, `custoTime`, `contestNo`, `contestCustoVote`, `contestCustoRank`,`custoContent`) VALUES (NULL,:custoName , :custoPic, :custoPrice, :memNo, :seafoodNo, :cookNo, :custoTime, $no, '0', NULL,:custoContent)";

    $row = json_decode(file_get_contents("php://input"));

    /////////////// 存圖片 ////////////////

    // 設定圖檔上傳路徑
    define('UPLOAD_PATH', '../images/');
    $img = $row->custoPic;

    // 轉檔 & 存檔
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_PATH . uniqid() . '.png';
    $success = file_put_contents($file, $data);

    // 存進資料庫的圖檔名稱
    $imgName = substr($file, 10);

    $custos = $pdo->prepare($sql);
    $custos->bindValue(":custoName", $row->custoName);
    $custos->bindValue(":custoPic",$imgName);
    $custos->bindValue(":custoPrice", $row->custoPrice);
    $custos->bindValue(":memNo", $row->memNo);
    $custos->bindValue(":seafoodNo", $row->seafoodNo);
    $custos->bindValue(":cookNo", $row->cookNo);
    $custos->bindValue(":custoTime", $row->custoTime);
    $custos->bindValue(":custoContent", $row->custoContent);
    $custos->execute();


    /////////////// 存配料 ////////////////

    // 這次存的客製化料理的編號
    $custoNo = $pdo->lastInsertId();


    // 儲存配料
    $sqlIngret = "INSERT INTO `ingredientcook` (`custoNo`, `ingreNo`) VALUES ($custoNo, :ingretNo)";

    $ingrets = $row->ingret;

    foreach($ingrets as $data){
        $ingrets = $pdo->prepare($sqlIngret);
        $ingrets->bindValue(":ingretNo", "$data");
        $ingrets->execute();
    }



} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;




    // $sql = "INSERT INTO `custo` (`custoNo`, `custoName`, `custoPic`, `custoPrice`, `memNo`, `seafoodNo`, `cookNo`, `custoTime`, `contestNo`, `contestCustoVote`, `contestCustoRank`,`custoContent`) VALUES (NULL, '蛤蜊湯', '1', '121', '9', '8', '7', '2020-05-12 00:00:00', '1', '0', NULL,'')";

    // $custos = $pdo->exec($sql);

    // $custos->bindValue(":custoName","1");
    // $custos->bindValue(":custoPic", "122");
    // $custos->bindValue(":custoPrice","1");
    // $custos->bindValue(":memNo","1");
    // $custos->bindValue(":seafoodNo","1");
    // $custos->bindValue(":cookNo","1");
    // $custos->bindValue(":custoTime","2020-05-12 00:00:00");
    // $custos->bindValue(":custoContent","1");

    // INSERT INTO `ingredientcook` (`custoNo`, `ingreNo`) VALUES ('70', '1')

}
?>