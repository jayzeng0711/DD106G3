<?php
require_once("connectdd106g3.php");
$sql = "select * from `admin`";
$admin = $pdo->query($sql);
$adminRows = $admin->fetchAll(PDO::FETCH_ASSOC);

if(isset($_GET['data']) && $_GET['data'] == 'check'){
 
    foreach($adminRows as $adminRow){
        ?>
        <tr>
        <td><?=$adminRow["adminNo"]?></td>
        <td><?=$adminRow["adminId"]?></td>
        <td><?=$adminRow["adminPsw"]?></td>
        <td><?=$adminRow["adminName"]?></td>
        <td><?=$adminRow["adminAuthority"]?></td>
        <td>
            <a href=""><i class="fa fa-pencil" aria-hidden="true"></i></a>
        </td>
        </tr>
        <?php    
        }
   }
?>