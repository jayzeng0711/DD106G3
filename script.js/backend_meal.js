window.addEventListener('load', function(){

    $.ajax({ //接收資料呈現於網頁
        type: "GET",
        url: './php/backend_Meal.php',
        data: {"data":"check"},
    
        success: function(data){
            $("#showMeal").html(data);
        }
    });

    $('.addbtn').click(function() {

        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');

        // 顯示輸入新增資料的欄位
        $('tr.title').after('<tr class="insert"><td></td><td><input type="text" name="mealName" id="mealName"></td><td><input type="file" name="mealPic" id="mealPic"></td><td><input type="text" name="mealMain" id="mealMain"></td><td><inupt type="text" name="mealDishOne" id="mealDishOne"></td><td><input type="text" name="mealDishTwo" id="mealDishTwo"></td><td><input type="text" name="mealSoup" id="mealSoup"></td><td><input type="text" name="mealPrice" id="mealPrice"></td><td><select><option>未上架</option><option>上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

        // 儲存新增
        $('.save').click(function() {

            let xhr = new XMLHttpRequest;

            xhr.onload = function() {

                if (xhr.status == 200) {
                    $('tr.insert').remove();
                    show();

                } else {
                    alert(xhr.status);
                }

            };


            // windows
            xhr.open('post',  './php/backend_Meal_insert.php',  true);
            // Mac
            // xhr.open('POST', 'http://localhost:8888/backend_Meal_insert.php', true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


            let meal = {};
            meatState = $('#meatState').val();
            if (routePort == 0) {
                routePort = "A套餐";
            } else if (routePort == 1) {
                routePort = "B套餐";
            } else {
                routePort = "C套餐";
            }

            meal.mealName = $('#mealName').val();
            meal.meatState = meatState;
            meal.mealPic = $('#mealPic').val();
            meal.mealFirst = $('#mealFirst').val();
            meal.mealMain = $('#mealMain').val();
            meal.mealDishOne = $('#mealDishOne').val();
            meal.mealDishTwo = $('#mealDishTwo').val();
            meal.mealsoup = $('#mealSoup').val();
            meal.mealDrink = $('#mealDrink').val();

            let data_info = JSON.stringify(route);
            console.log(data_info);
            xhr.send(data_info);

            $('.addbtn').removeAttr('disabled');
        });

        // 取消新增
        $('.cancel').click(function() {
            $('tr.insert').remove();
            $('.addbtn').removeAttr('disabled');

        });

    });
 
    edit();

    function edit(){
        $('.edit').click(function(){
    
            $('.edit').attr('disabled', 'disabled');
    
            let tr = $(this).parent().parent();
            
            //圖片
            let mealPic = tr.find('td:eq(2)').text();
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`
            <input type="file" name="image" accept=".jpg,.png,.svg" value="${mealPic}">`);
    
            //前菜
            let mealFirst = tr.find('td:eq(3)').text();
            tr.find('td:eq(3)').text("");
            tr.find('td:eq(3)').append(`
            <input type="text" name="mealFirst" class="mealFirst" value="${mealFirst}">`);
            
            //主菜
            let mealMain = tr.find('td:eq(4)').text();
            tr.find('td:eq(4)').text("");
            tr.find('td:eq(4)').append(`
            <input type="text" name="mealMain" class="mealMain" value="${mealMain}">`);
            
            //附餐一
            let mealDishOne = tr.find('td:eq(5)').text();
            tr.find('td:eq(5)').text("");
            tr.find('td:eq(5)').append(`
            <input type="text" name="mealDishOne" class="mealDishOne" value="${mealDishOne}">`);
            
            //附餐二
            let mealDishTwo = tr.find('td:eq(6)').text();
            tr.find('td:eq(6)').text("");
            tr.find('td:eq(6)').append(`
            <input type="text" name="mealDishTwo" class="mealDishTwo" value="${mealDishTwo}">`);       
            
            //湯品
            let mealSoup = tr.find('td:eq(7)').text();
            tr.find('td:eq(7)').text("");
            tr.find('td:eq(7)').append(`
            <input type="text" name="mealSoup" class="mealSoup" value="${mealSoup}">`);
            
            //飲料
            let mealDrink = tr.find('td:eq(8)').text();
            tr.find('td:eq(8)').text("");
            tr.find('td:eq(8)').append(`
            <input type="text" name="mealDrink" class="mealDrink" value="${mealDrink}">`);
            
            //價格
            let mealPrice = tr.find('td:eq(9)').text();
            tr.find('td:eq(9)').text("");
            tr.find('td:eq(9)').append(`
            <input type="text" name="mealPrice" class="mealPrice" value="${mealPrice}">`);
            
            //上架狀態
            let meatState = tr.find('td:eq(10)').text();
            tr.find('td:eq(10)').text("");
            tr.find('td:eq(10)').append(`
            <select>
            <option>未上架</option>
            <option>上架</option>
            </select>`);
            if(meatState == "未上架"){
                tr.find('td:eq(10) option:eq(0)').attr("slected", "selected");
            } else{
                tr.find('td:eq(10) option:eq(1)').attr("slected", "selected");
            }
    
            //編輯
            tr.find('td:eq(11)').text("");
            tr.find('td:eq(11)').append(`
            <button type="submit" class="btn btn-info save">儲存</button>
            <button type="button" class="btn btn-info cancel">取消</button>`);
    
            // 儲存
            $('.save').click(function() {
                let xhr = new XMLHttpRequest;
    
                xhr.onload = function() {
    
                    if (xhr.status == 200) {
                        show();
    
                    } else {
                        alert(xhr.status);
                    }
    
                };
    
                // windows
                xhr.open('post',  './php/backend_Meal_edit.php',  true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Meal_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
                let editMeal = {};
                mealName = tr.find('.mealName').val();
                 alert(mealName);
                if (mealName == 1) {
                    mealName = "B套餐";
                } else if (mealName == 2) {
                    mealName = "C套餐";
                } else {
                    mealName = "A套餐";
                }
    
                editMeal.mealNo = tr.find('td:eq(0)').text();
                editMeal.mealName = mealName;
                editMeal.mealPic = tr.find('td:eq(2)').text();
                editMeal.mealFirts = tr.find('td:eq(3)').text();
                editMeal.mealMain = tr.find('td:eq(4)').text();
                editMeal.mealDishOne = tr.find('td:eq(5)').text();
                editMeal.mealDishTwo = tr.find('td:eq(6)').text();
                editMeal.mealSoup = tr.find('td:eq(7)').text();
                editMeal.mealDrink = tr.find('td:eq(8)').text();
                editMeal.meatState = tr.find('td:eq(9)').text();
    
                let data_info = JSON.stringify(editmeal);
                console.log(data_info);
                xhr.send(data_info);
    
    
            });
    
            // 取消
            tr.find('.cancel').click(function() {
                show();
            });
        });
    };
});