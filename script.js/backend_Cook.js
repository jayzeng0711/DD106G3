window.addEventListener('load', function() {

    // 顯示資料
    show();

    function show() {
        // 清除表格內容
        $(`table tr`).not("tr.title").remove();

        // 顯示資料庫內容
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {

                let cookRows = JSON.parse(xhr.responseText);
                let trLength = cookRows.length;
                console.log("長度", trLength);

                for (let i = 0; i < trLength; i++) {

                    if (cookRows[i].cookState == 0) {
                        cookState = "未上架";
                    } else {
                        cookState = "上架";
                    }
                    $('table').append(`<tr><td>${cookRows[i].cookNo}</td><td>${cookRows[i].cookName}</td><td>${cookState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);

                }
                edit();


            } else {
                alert(xhr.status);
            }
        };

        // windows
        xhr.open('GET',  './php/backend_Cook_show.php',  true);
        // Mac
        // xhr.open('GET', 'http://localhost:8888/backend_Route_show.php', true);
        xhr.send(null);

    };


    // 新增資料
    $('.addbtn').click(function() {

        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');

        // 顯示輸入新增資料的欄位
        $('tr.title').after('<tr class="insert"><td></td><td><input type="text" name="cookName" id="cookName" placeholder="名稱"></td><td><select name="cookState" id="cookState"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

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
            xhr.open('post',  './php/backend_Cook_insert.php',  true);
            // Mac
            // xhr.open('POST', 'http://localhost:8888/backend_Ingredient_insert.php', true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


            let cook = {};
            cookState = $('#cookState').val();
            if (cookState == 0) {
                cookState = "未上架";
            } else if (cookState == 1) {
                cookState = "上架";
            }

            cook.cookName = $('#cookName').val();

            let data_info = JSON.stringify(cook);
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


    // 編輯資料

    function edit() {

        $('.edit').click(function() {

            // 停用所有編輯按鈕
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();

            // 烹調方式名稱
            let cookName = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`<input type="text" name="cookName" class="cookName" value="${cookName}">`);

            // 狀態
            let cookState = tr.find('td:eq(2)').text();
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`<select name="cookState" class="cookState"><option value="0">未上架</option>
            <option value="1">上架</option></select>`);
            if (cookState == "未上架") {
                tr.find('td:eq(2) option:eq(0)').attr("selected", "selected");
            } else {
                tr.find('td:eq(2) option:eq(1)').attr("selected", "selected");
            }

            // 編輯
            tr.find('td:eq(3)').text("");
            tr.find('td:eq(3)').append(`<button type="submit" class="btn btn-info save">儲存</button>
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
                xhr.open('post',  './php/backend_Cook_edit.php',  true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Route_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                let editCook = {};
                // cookState = tr.find('#ingreState').val();
                // // alert(cookState);
                // if (cookState == 0) {
                //     cookState = "未上架";
                // } else if (cookState == 1) {
                //     cookState = "上架";
                // }

                editCook.cookNo = tr.find('td:eq(0)').text();
                editCook.cookName = tr.find('.cookName').val();
                editCook.cookState = tr.find('.cookState').val();

                let data_info = JSON.stringify(editCook);
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