<?php

foreach($_FILES["mealPic"]["error"] as $key => $error){
    if ($error == UPLOAD_ERR_OK){
        $name = $_FILES["mealPic"]["name"][$key];
        move_uploaded_file( $_FILES["mealPic"]["tmpname"][$key], "uploads/". $_FILES['mealPic']['name'][$key]);
    }
}
echo "Upload successfully";
// if(is_array($_FILES)) {
//         if(is_uploaded_file($_FILES['mealPic']['tmp_name'])) {
//             $sourcePath=$_FILES['mealPic']['tmp_name'];
//             $targetPath="images/".$_FILES['mealPic']['name'];
//             move_uploaded_file($sourcePath, $targetPath);
//         }
//     }
  
//    $msg = "";

//    if (isset($_POST["upload"])){
//        $filename = $_FILES["mealPic"]["name"];
//        $tempname = $_FILES["mealPic"]["tmp_name"];

//        $folder = "images/".$filename;

//        $db = mysql_connect("localhost", "root", "poi98799", "meal");
//        $sql = "INSERT INTO mealPic (filename) VALUES ('$filename')";

//        mysqli_query($db, $sql);

//        if (move_uploaded_file($tempname, $folder)){
//            $msg = "success!";
//        }else {
//            $msg = "fail...";
//        }
//    }
//    $result = mysqli_query($db, "SELECT * FROM mealPic");
//    header("location:../backend_Meal.html");
?>