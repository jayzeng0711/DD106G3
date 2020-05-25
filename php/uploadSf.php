<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['newSf']['tmp_name'])) {
        $sourcePath=$_FILES['newSf']['tmp_name'];
        $targetPath="../images/".$_FILES['newSf']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>