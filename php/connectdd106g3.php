<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    $dsn="mysql:host=localhost;port=3306;dbname=dd106g3;charset=utf8";
    $user = "root";
<<<<<<< HEAD
    $password = "poi98799";
    // $user = "root";
    // $password = "root";
=======
    $password = "root";
    // $user = "dd106g3";
    // $password = "dd106g3";
>>>>>>> ff2c06f80a0757422ae6bcdce69f1a7ce9a3acf4
    $pdo = new PDO($dsn,$user,$password);

   

  
?>