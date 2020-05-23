<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['newCook']['tmp_name'])) {
        $sourcePath=$_FILES['newCook']['tmp_name'];
        $targetPath="../images/".$_FILES['newCook']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>