<?php 
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['newFish']['tmp_name'])) {
        $sourcePath=$_FILES['newFish']['tmp_name'];
        $targetPath="../images/".$_FILES['newFish']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>