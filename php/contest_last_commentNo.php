<?php
$errMsg = "";
try{
    require_once("connectdd106g3.php");
    //找最新一則留言
    $sql = "select * from `comment` ORDER BY commentNo DESC LIMIT 0 , 1"; 
    $comment = $pdo->prepare($sql);
    $comment->execute();
    $commentRow = $comment->fetch(PDO::FETCH_ASSOC);

    echo json_encode($commentRow);


    session_start();
    //新增一筆留言到資料庫
    $sql2 = "INSERT INTO `comment` (`commentNo`, `memNo`, `commentContent`, `commentTime`, `commentState`, `custoNo`) VALUES (null, :memNo, :commentContent, :commentTime, '1', :custoNo)";
    $comment_str = json_decode(file_get_contents('php://input'));
    $comment = $pdo->prepare($sql2);
    $comment->bindValue(":memNo", $_SESSION["memNo"]);
    $comment->bindValue(":commentContent", $comment_str->commentContent);
    $comment->bindValue(":commentTime", $comment_str->commentTime);
    $comment->bindValue(":custoNo", $comment_str->custoNo);
    $comment->execute();

    
} catch (PDOException $e) {

    $errMsg .= "錯誤訊息" . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號" . $e->getMessage();
    echo $errMsg;
}

?>