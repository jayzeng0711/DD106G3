<?php
    require_once("connectdd106g3.php");
    $sql="select * from `meal`";
    $meal = $pdo->query($sql);
    $mealRows= $meal->fetchAll(PDO::FETCH_ASSOC);
    
    if(isset($_GET['data']) && $_GET['data'] == 'check'){
        echo "<tr>
                    <th>編號</th>
                    <th>名稱</th>
                    <th>圖片</th>
                    <th>前菜</th>
                    <th>主菜</th>
                    <th>副菜一</th>
                    <th>副菜二</th>
                    <th>湯品</th>
                    <th>飲料</th>
                    <th>價格</th>
                    <th>套餐上下架狀態</th>
                    <th>編輯</th>
                </tr>";
 
        foreach($mealRows as $mealRow){
            ?>
            <tr>
            <td><?=$mealRow["mealNo"]?></td>
            <td><?=$mealRow["mealName"]?></td>
            <td><?=$mealRow["mealPic"]?></td>
            <td><?=$mealRow["mealFirst"]?></td>
            <td><?=$mealRow["mealMain"]?></td>
            <td><?=$mealRow["mealDishOne"]?></td>
            <td><?=$mealRow["mealDishTwo"]?></td>
            <td><?=$mealRow["mealSoup"]?></td>
            <td><?=$mealRow["mealDrink"]?></td>
            <td><?=$mealRow["mealPrice"]?></td>
            <td><?=$mealRow["meatState"]?></td>
            <td>
                <div>
                    <button class="update btn btn-info edit" id="update">編輯</button>
                </div>
            </td>
            </tr>
            <?php    
            }
       }
    ?>
?>
   