<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    $dsn="mysql:host=localhost;port=3306;dbname=dd106g3;charset=utf8";

    // $user = "root";
    // $password = "root";
    $pdo = new PDO($dsn,$user,$password);

   

  
?>