<?php

$errMsg = "";

try {

  
  // 抓這個月參賽料理的留言
  // 留言時間是這個月
  // 留言狀態是顯示留言 
  // 抓留言的會員名稱和照片


  require_once("connectdd106g3.php");

  $sql = "SELECT c.`custoNo`,c.`commentNo`,c.`memNo`,m.`memName`,m.`memPic`,c.`commentContent`,c.`commentTime` FROM `comment`c JOIN `member`m on c.`memNo`=m.`memNo` WHERE DATE_FORMAT( c.`commentTime`, '%Y%m' ) = DATE_FORMAT( CURDATE( ) , '%Y%m' ) and c.`commentState`=1";
  $comments = $pdo->query($sql);
  $commentRows = $comments->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($commentRows);
  
} catch (PDOException $e) {

  $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
  $errMsg .= "錯誤行號" . $e->getMessage();
  echo $errMsg;
}
