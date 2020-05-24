<?php

$errMsg = "";

try {

  // 算這次比賽所有得票數、排名，並存進 custo

  require_once("connectdd106g3.php");

  // 抓這個月比賽的比賽編號
  $sqlTime = "SELECT `contestNo` FROM `contest` WHERE DATE_FORMAT( `contestStart`, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' )";
  $times = $pdo->query($sqlTime);
  $time = $times->fetch(PDO::FETCH_ASSOC);

  // 這個月比賽的編號  
  $no = $time["contestNo"];


  // 算這次比賽，每個料理的得票數，並依照得票數高到低排列
  $sqlvote = "SELECT `custoNo`,COUNT(`custoNo`) FROM `vote` WHERE `contestNo` = $no GROUP by `custoNo` order by COUNT(`custoNo`) DESC";
  $votes = $pdo->query($sqlvote);
  $voteRows = $votes->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($voteRows);


  // 歸零這次比賽所有料理的票數和排名
  $sqlcustco = "UPDATE `custo` SET `contestCustoVote` = '0',`contestCustoRank`=NULL where `contestNo` = $no";
  $custcos = $pdo->query($sqlcustco);


  // 把得票數和排名存進 custo

  // 名次從1開始跑
  $order = 1;

  for ($i = 0; $i < count($voteRows); $i++) {

    $custoNo = $voteRows[$i]['custoNo'];
    $votes = $voteRows[$i]['COUNT(`custoNo`)'];

    // 陣列的第一個預設是第一名
    // 後面的，每一個都要和前一個的票數相比
    // 票數相同，名次相同
    // 票數較低，名次加一

    if ($i == 0) {
      $sqlrank = "UPDATE `custo` SET `contestCustoVote` = $votes, `contestCustoRank` = $order WHERE `custo`.`custoNo` = $custoNo";
    } else {

      // 票數和前一名相同
      if ($votes == $voteRows[$i - 1]['COUNT(`custoNo`)']) {
        $sqlrank = "UPDATE `custo` SET `contestCustoVote` = $votes, `contestCustoRank` =  $order WHERE `custo`.`custoNo` = $custoNo";

        // 票數小於前一名
      } else if ($votes < $voteRows[$i - 1]['COUNT(`custoNo`)']) {
        $order++;

        $sqlrank = "UPDATE `custo` SET `contestCustoVote` = $votes, `contestCustoRank` =  $order WHERE `custo`.`custoNo` = $custoNo";
      
      }
    }
    $votes = $pdo->query($sqlrank);
  }


} catch (PDOException $e) {

  $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
  $errMsg .= "錯誤行號" . $e->getMessage();
  echo $errMsg;
}
