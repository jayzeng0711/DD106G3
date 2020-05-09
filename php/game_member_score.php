<?php
  require_once("connectdd106g3.php");
  $sql = "select * from member where `memId` = 'kobe830711@gmail.com'";
  $member = $pdo->query($sql);
  $memRow = $member->fetch(PDO::FETCH_ASSOC);
  echo  json_encode($memRow);
?>