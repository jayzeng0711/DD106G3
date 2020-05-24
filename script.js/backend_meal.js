function show(){
    // 清除表格內容
        $(`table tr`).not("tr.title").not("tr.insert").remove();
    
           // 顯示資料庫內容
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
    
                let mealRows = JSON.parse(xhr.responseText);
                let trLength = mealRows.length;
    
                for (let i = 0; i < trLength; i++) {
    
                    if (mealRows[i].meatState == 0) {
                        meatState = "上架";
                    } else {
                        meatState = "未上架";
                    }
                    $('table').append(`<tr><td>${mealRows[i].mealNo}</td><td>${mealRows[i].mealName}</td><td><img style="width: 50%;" src='images/${mealRows[i].mealPic}'></td><td>${mealRows[i].mealFirst}</td><td>${mealRows[i].mealMain}</td><td>${mealRows[i].mealDishOne}</td><td>${mealRows[i].mealDishTwo}</td><td>${mealRows[i].mealSoup}</td><td>${mealRows[i].mealDrink}</td><td>${mealRows[i].mealPrice}</td><td>${meatState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);
                }
    
            } else {
                alert(xhr.status);
            }
        };
    
        // windows
        xhr.open('GET',  './php/backend_Meal.php',  true);
        // Mac
        // xhr.open('GET', 'http://localhost:8080/backend_Meal.php', true);
        xhr.send(null);
    
    };
    
    //ADD new Row
    $('.addbtn').click(function() {
    
        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');
    
        // 顯示輸入新增資料的欄位
        $('tr.title').after('<tr class="insert"><td></td><td><input type="text" name="mealName" id="mealName"></td><td><form id="mealPic" method="post" enctype="multipart/form-data" action="./php/mealPicUpload.php"><input type="file" id="mealPic" class="mealPic" name="mealPic" accept=".jpg,.png,.svg"><lable id="show" for="mealPic"><img id="preview" style="width: 50%;"></lable><button id="addPic" type="submit">上傳</button></form></td><td><input type="text" name="mealFirst" id="mealFirst"></td><td><input type="text" name="mealMain" id="mealMain"></td><td><inupt type="text" name="mealDishOne" id="mealDishOne" pleaceholder="I am here!"></td><td><input type="text" name="mealDishTwo" id="mealDishTwo"></td><td><input type="text" name="mealSoup" id="mealSoup"></td><td><input type="text" name="mealDrink" id="mealDrink"></td><td><input type="text" name="mealPrice" id="mealPrice"></td><td><select id="meatState"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');
 
        $('#mealPic').on('submit', (function(e){
            e.preventDefault();
            $.ajax({
                url: "./php/mealPicUpload.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                success: function(data){
                    alert("上傳成功");
                },
                error: function(){
                    alert("上傳失敗");
                }
            });
            console.log(new FormData(this));
        }));
        

        //顯示新的圖片
        $("#addPic").click(function(){
            document.getElementById("show").onchange = function(e){
            let meal = e.target.files[0];
            let reader = new FileReader();
            reader.onload = getElementById("preview").src = read.result;
        }
            read.readAsDataURL(meal);

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
    
            // windows
            xhr.open('post',  './php/backend_Meal_insert.php',  true);
            // Mac
            // xhr.open('POST', 'http://localhost:8888/backend_Meal_insert.php', true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
            let meal = {};
            meatState = $('#meatState').val();
            if (meatState == 0) {
                meatState = "未上架";
            } else{
                meatState = "上架";
            }
    
            meal.mealName = $('#mealName').val();
            meal.mealPic = `${mealPic.name}`;
            meal.mealFirst = $('#mealFirst').val();
            meal.mealMain = $('#mealMain').val();
            meal.mealDishOne = $('#mealDishOne').val();
            meal.mealDishTwo = $('#mealDishTwo').val();
            meal.mealSoup = $('#mealSoup').val();
            meal.mealDrink = $('#mealDrink').val();
            meal.mealPrice = $('#mealPrice').val();
            meal.meatState = meatState;
    
            let data_info = JSON.stringify(meal);
            console.log(data_info);
            xhr.send(data_info);
    
            $('.addbtn').removeAttr('disabled');
            });
         });
        
        // 取消新增
        $('.cancel').click(function() {
            $('tr.insert').remove();
            $('.addbtn').removeAttr('disabled');
    
        });
    
    });
    
    //EDIT
    $(document).on('click', '.edit', function(){
    
            $('.edit').attr('disabled', 'disabled');
    
            let tr = $(this).parent().parent();
    
            let mealName = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`
            <input type="text" name="mealName" class="mealName" value="${mealName}">`);
            
            //圖片
            let mealPic = tr.find('td:eq(2)').text();
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`
            <form id="mealPic" method="post" enctype="multipart/form-data" action="./php/mealPicUpload.php"><input type="file" id="mealPic" class="mealPic" name="mealPic" accept=".jpg,.png,.svg" value="${mealPic}"><lable id="show" for="mealPic"><img id="preview" style="width: 50%;"></lable><button id="addPic" type="submit">上傳</button></form>`);
    
            $('#mealPic').on('submit', (function(e){
                e.preventDefault();
                $.ajax({
                    url: "./php/mealPicUpload.php",
                    type: "POST",
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    success: function(data){
                        alert("上傳成功");
                    },
                    error: function(){
                        alert("上傳失敗");
                    }
                });
                console.log(new FormData(this));
            }));

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
            <option value="0">未上架</option>
            <option value="1">上架</option>
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
    
            //顯示新的圖片
             $("#addPic").click(function(){
                document.getElementById("show").onchange = function(e){
                let meal = e.target.files[0];
                let reader = new FileReader();
                reader.onload = getElementById("preview").src = read.result;
            }
                read.readAsDataURL(meal);

                // 儲存
            $('.save').click(function () {
                let xhr = new XMLHttpRequest;
    
                xhr.onload = function() {
    
                    if (xhr.status == 200) {
                        show();
    
                    } else {
                        alert(xhr.status);
                    }
    
                };
    
                // windows
                xhr.open('post',  './php/backend_Meal_edit.php',  true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Meal_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
                let editMeal = {};
                let meatState= tr.find('.meatState').val();
                 //alert(meatState);
                if (meatState == 0) {
                    meatState = "未上架";
                } else {
                    meatState = "上架";
                }
    
                editMeal.mealNo = tr.find('td:eq(0)').text();
                editMeal.mealName = tr.find('.mealName').val();
                editMeal.mealPic = `${meal.name}`;
                editMeal.mealFirst = tr.find('.mealFirst').val();
                editMeal.mealMain = tr.find('.mealMain').val();
                editMeal.mealDishOne = tr.find('.mealDishOne').val();
                editMeal.mealDishTwo = tr.find('.mealDishTwo').val();
                editMeal.mealSoup = tr.find('.mealSoup').val();
                editMeal.mealDrink = tr.find('.mealDrink').val();
                editMeal.mealPrice = tr.find('.mealPrice').val();
                editMeal.meatState = tr.find('.meatState').val();
    
                let data_info = JSON.stringify(editMeal);
                console.log(data_info);
                xhr.send(data_info);
                return;
            });

             //無換圖
             $('.save').click(function () {
                let xhr = new XMLHttpRequest;
    
                xhr.onload = function() {
    
                    if (xhr.status == 200) {
                        show();
    
                    } else {
                        alert(xhr.status);
                    }
    
                };
    
                // windows
                xhr.open('post',  './php/backend_Meal_edit.php',  true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Meal_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
                let editMeal = {};
                let meatState= tr.find('.meatState').val();
                 //alert(meatState);
                if (meatState == 0) {
                    meatState = "未上架";
                } else {
                    meatState = "上架";
                }
    
                editMeal.mealNo = tr.find('td:eq(0)').text();
                editMeal.mealName = tr.find('.mealName').val();
                editMeal.mealPic = tr.find('.mealPic').val();
                editMeal.mealFirst = tr.find('.mealFirst').val();
                editMeal.mealMain = tr.find('.mealMain').val();
                editMeal.mealDishOne = tr.find('.mealDishOne').val();
                editMeal.mealDishTwo = tr.find('.mealDishTwo').val();
                editMeal.mealSoup = tr.find('.mealSoup').val();
                editMeal.mealDrink = tr.find('.mealDrink').val();
                editMeal.mealPrice = tr.find('.mealPrice').val();
                editMeal.meatState = tr.find('.meatState').val();
    
                let data_info = JSON.stringify(editMeal);
                console.log(data_info);
                xhr.send(data_info);
             
            });
            
        });
            
            // 取消
            tr.find('.cancel').click(function() {
                show();
            });
         
    });

    
    
    


    //無跳轉上傳圖片
    // $(document).ready(function(){
    //     $(document).on('change', '#mealPic', function(){
    //         var name = document.getElementById("mealPic").files[0].name;
    //         var form_data = new FormData();
    //         var ext = name.split('.').pop().toLowerCase();
    //         if(jQuery.inArray(ext, ['gif','png','jpg','jepg']) == -1){
    //             alert("檔案格式不對");
    //         }
    //         var oFReader = new FileReader();
    //         oFReader.readAsDataURL(document.getElementById("mealPic").files[0]);
    //         var f = document.getElementById("mealPic").files[0];
    //         var fsize = f.size||f.fileSize;
    //         if(fsize > 2000000){
    //             alert("檔案過大");
    //         }else{
    //             form_data.append("mealPic", document.getElementById('mealPic').files[0]);
    //             $.ajax({
    //                 url: "./php/picUpload.php",
    //                 method: "POST",
    //                 data: form_data,
    //                 contentType: false,
    //                 cache: false,
    //                 processData: false,
    //                 beforeSend: function(){
    //                     $('#display').html("<lable class='text_success'>上傳中...</lable>");
    //                 },
    //                 success: function(data){
    //                     $('#display').html(data);
    //                 }
    //             });
    //         }
    //     });
    // });