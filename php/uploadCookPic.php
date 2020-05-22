<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['cookImg']['tmp_name'])) {
        $sourcePath=$_FILES['cookImg']['tmp_name'];
        $targetPath="../images/".$_FILES['cookImg']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>