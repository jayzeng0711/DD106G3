<?php
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['theNewPic']['tmp_name'])) {
        $sourcePath=$_FILES['theNewPic']['tmp_name'];
        $targetPath="../images/".$_FILES['theNewPic']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>