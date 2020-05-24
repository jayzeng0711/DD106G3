<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['newC']['tmp_name'])) {
        $sourcePath=$_FILES['newC']['tmp_name'];
        $targetPath="../images/".$_FILES['newC']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>