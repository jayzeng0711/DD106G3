<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `message` where messageQue = :messageQue";
    $ans = json_decode(file_get_contents('php://input'));
    $reboot_text = $pdo->prepare($sql);
    $reboot_text -> bindValue(":messageQue", $ans->text);
    $reboot_text->execute();
    $reboot_text_ans = $reboot_text->fetch(PDO::FETCH_ASSOC);
    echo json_encode($reboot_text_ans);
?>