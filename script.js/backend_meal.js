$(document).ready(function () {
    show();


    function show() {
        // 清除表格內容
        $(`table tr`).not("tr.title").not("tr.insert").remove();

        // 顯示資料庫內容
        let xhr = new XMLHttpRequest;
        xhr.onload = function () {
            if (xhr.status == 200) {

                let mealRows = JSON.parse(xhr.responseText);
                let trLength = mealRows.length;

                for (let i = 0; i < trLength; i++) {

                    if (mealRows[i].mealState == 0) {
                        mealState = "上架";
                    } else {
                        mealState = "未上架";
                    }
                    $('table').append(`<tr><td>${mealRows[i].mealNo}</td><td>${mealRows[i].mealName}</td><td><img src="./images/${mealRows[i].mealPic}"></td><td>${mealRows[i].mealFirst}</td><td>${mealRows[i].mealMain}</td><td>${mealRows[i].mealDishOne}</td><td>${mealRows[i].mealDishTwo}</td><td>${mealRows[i].mealSoup}</td><td>${mealRows[i].mealDrink}</td><td>${mealRows[i].mealPrice}</td><td>${mealState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);
                   
                }

                add();
                edit();
                // saveImage();
                // saveNoImage();


            } else {
                alert(xhr.status);
            }
        };

        // windows
        xhr.open('GET', './php/backend_Meal.php', true);
        // Mac
        // xhr.open('GET', 'http://localhost:8080/backend_Meal.php', true);
        xhr.send(null);

    };

    function add() {

        $('.addbtn').click(function () {

            // 停用新增按鈕
            $(this).attr('disabled', 'disabled');

             // 顯示輸入新增資料的欄位
             $('tr.title').after('<tr class="insert"><td></td><td><input type="text" id="mealName"></td><td><form id="newPic" action="./php/mealPicUpload.php"><input type="file" id="mealPic" name="mealPic"><input type="submit" value="OK"><lable id="mealPic"><img id="show" src=""></lable></form></td><td><input type="text" id="mealFirst"></td><td><input type="text" id="mealMain"></td><td><input type="text" id="mealDishOne"></td><td><input type="text" id="mealDishTwo"></td><td><input type="text" id="mealSoup"></td><td><input type="text" id="mealDrink"></td><td><input type="text" id="mealPrice"></td><td><select id="mealState"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

           
                document.getElementById("mealPic").onchange = function (e) {
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById("show").src = reader.result;
                    }
                    reader.readAsDataURL(file);

                    // 儲存新增
                    $('.save').click(function () {

                    let xhr = new XMLHttpRequest;

                    xhr.onload = function () {

                    if (xhr.status == 200) {
                         $('tr.insert').remove();
                           show();

                        } else {
                           alert(xhr.status);
                        }

                    };

                    // windows
                    xhr.open('post', './php/backend_Meal_insert.php', true);
                    // Mac
                    // xhr.open('POST', 'http://localhost:8888/backend_Meal_insert.php', true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                    let meal = {};
                    mealState = $('#mealState').val();
                    if (mealState == "未上架") {
                        mealState = 0;
                    } else if (mealState == "上架") {
                        mealState = 1;
                    }
                    meal.mealName = $('#mealName').val();
                    meal.mealPic = `${file.name}`;
                    meal.mealFirst = $('#mealFirst').val();
                    meal.mealMain = $('#mealMain').val();
                    meal.mealDishOne = $('#mealDishOne').val();
                    meal.mealDishTwo = $('#mealDishTwo').val();
                    meal.mealSoup = $('#mealSoup').val();
                    meal.mealDrink = $('#mealDrink').val();
                    meal.mealPrice = $('#mealPrice').val();
                    meal.mealState = mealState;

                    let data_info = JSON.stringify(meal);
                    console.log(data_info);
                    xhr.send(data_info);

                    $('.addbtn').removeAttr('disabled');
                    });
                }
   
                $("#newPic").on('submit', (function (e) {
                    e.preventDefault();
                    $.ajax({
                        url: "./php/mealPicUpload.php",
                        type: "POST",
                        data: new FormData(this),
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (data) {

                            alert("上傳成功");
                        },
                        error: function () {
                            alert("失敗");
                        }
                    });
                    console.log(new FormData(this));
                }));

            // 取消新增
            $('.cancel').click(function () {
                $('tr.insert').remove();
                // 恢復新增按鈕
                $('.addbtn').removeAttr('disabled');

            });
        });



    };

    function edit() {

        $('.edit').click(function () {
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();

            let mealName = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`
            <input type="text" class="mealName" value="${mealName}">`);

            //圖片
            let changePic = tr.find('td:eq(2)').children().attr('src');
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`
            <form action="./php/editMealPic.php" method="post" id="editPic">
            <div class="current">目前圖片:<img class="rightNow" src="${changePic}"><button class="changeIT">換圖片</button></div>
            <div class="afterChange" style="display: none;"><lable id="theNewPic">
            <img id="preview" src="">
            <input type="file" id="theNewPic" name="theNewPic" class="theNewPic">
            <input type="submit" value="OK"></lable></div></form>`);

            $('.changeIT').click(function () {
                $('.current').remove();
                $('.afterChange').css('display', 'block');
            });

            document.getElementById("theNewPic").onchange = function (e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onload = function (e){
                    document.getElementById("preview").src = reader.result;
                }
                reader.readAsDataURL(file);

                 //有改圖片的儲存
            $('.save').click(function () {

                let xhr = new XMLHttpRequest;
                xhr.onload = function () {

                    if (xhr.status == 200) {
                
                        show();
                        // alert(xhr.status);
                    } else {
                        alert(xhr.status);
                    }

                };

                // windows
                xhr.open('post', './php/backend_Meal_edit.php', true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Meal_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                let editMeal = {};
                
                mealState = tr.find('.mealState').val();


                editMeal.mealNo = tr.find('td:eq(0)').text();
                editMeal.mealName = tr.find('.mealName').val();
                editMeal.mealPic = `${file.name}`;
                editMeal.mealFirst = tr.find('.mealFirst').val();
                editMeal.mealMain = tr.find('.mealMain').val();
                editMeal.mealDishOne = tr.find('.mealDishOne').val();
                editMeal.mealDishTwo = tr.find('.mealDishTwo').val();
                editMeal.mealSoup = tr.find('.mealSoup').val();
                editMeal.mealDrink = tr.find('.mealDrink').val();
                editMeal.mealPrice = tr.find('.mealPrice').val();
                editMeal.mealState = mealState;

                let data_info = JSON.stringify(editMeal);
                console.log(data_info);
                xhr.send(data_info);
            });
            }
            $("#editPic").on('submit', (function (e) {
                e.preventDefault();
                $.ajax({
                    url: "./php/editMealPic.php",
                    type: "POST",
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
  
                        alert("上傳成功");
                    },
                    error: function () {
                        alert("失敗");
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
            let mealState = tr.find('td:eq(10)').text();
            tr.find('td:eq(10)').text("");
            tr.find('td:eq(10)').append(`
            <select  class="mealState">
            <option value="0">未上架</option>
            <option value="1">上架</option>
            </select>`);
            if (mealState == "未上架") {
                tr.find('td:eq(10) option:eq(0)').attr("slected", "selected");
            } else {
                tr.find('td:eq(10) option:eq(1)').attr("slected", "selected");
            }

            //編輯
            tr.find('td:eq(11)').text("");
            tr.find('td:eq(11)').append(`
            <button type="submit" class="btn btn-info save">儲存</button>
            <button type="button" class="btn btn-info cancel">取消</button>`);

 //無改圖的儲存
 $('.save').click(function () {

    let xhr = new XMLHttpRequest;
    xhr.onload = function () {

        if (xhr.status == 200) {
    
            show();
            // alert(xhr.status);
        } else {
            alert(xhr.status);
        }

    };

    // windows
    xhr.open('post', './php/backend_Meal_edit.php', true);
    // Mac
    // xhr.open('POST', 'http://localhost:8888/backend_Meal_edit.php', true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    let editMeal = {};
    let currentPic = parseInt(`${changePic}`.lastIndexOf('/')) +1;
    mealState = tr.find('.mealState').val();


    editMeal.mealNo = tr.find('td:eq(0)').text();
    editMeal.mealName = tr.find('.mealName').val();
    editMeal.mealPic = `${changePic}`.substr(currentPic, `${changePic}`.length);
    editMeal.mealFirst = tr.find('.mealFirst').val();
    editMeal.mealMain = tr.find('.mealMain').val();
    editMeal.mealDishOne = tr.find('.mealDishOne').val();
    editMeal.mealDishTwo = tr.find('.mealDishTwo').val();
    editMeal.mealSoup = tr.find('.mealSoup').val();
    editMeal.mealDrink = tr.find('.mealDrink').val();
    editMeal.mealPrice = tr.find('.mealPrice').val();
    editMeal.mealState = mealState;

    let data_info = JSON.stringify(editMeal);
    console.log(data_info);
    xhr.send(data_info);
});

    // 取消
    tr.find('.cancel').click(function () {
        show();
    });





    });



    };

});
