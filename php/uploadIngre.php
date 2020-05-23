<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['ingreImg']['tmp_name'])) {
        $sourcePath=$_FILES['ingreImg']['tmp_name'];
        $targetPath="../images/".$_FILES['ingreImg']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>