<?php
    require_once("connectdd106g3.php");
    $sql = "select * from `message` where messageContent = :messageContent";
    $ans = json_decode(file_get_contents('php://input'));
    $reboot_text = $pdo->prepare($sql);
    $reboot_text -> bindValue(":messageContent", $ans->text);
    $reboot_text->execute();
    $reboot_text_ans = $reboot_text->fetch(PDO::FETCH_ASSOC);
    echo json_encode($reboot_text_ans);
?>