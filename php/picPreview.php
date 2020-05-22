<?php
if(is_array($_FILES)) {
    if(is_uploaded_file($_FILES['mealPic']['tmp_name'])) {
        $sourcePath=$_FILES['mealPic']['tmp_name'];
        $targetPath="./images/".$_FILES['mealPic']['name'];
        move_uploaded_file($sourcePath, $targetPath);
    }
}
?>