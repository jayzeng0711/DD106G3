<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['newSfIn']['tmp_name'])) {
        $sourcePath=$_FILES['newSfIn']['tmp_name'];
        $targetPath="../images/".$_FILES['newSfIn']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>