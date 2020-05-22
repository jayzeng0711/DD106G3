window.addEventListener('load', function () {
    // alert();
    // 顯示資料
    show();

    function show() {
        // 清除表格內容
        $(`table tr`).not("tr.title").remove();

        // 顯示資料庫內容
        let xhr = new XMLHttpRequest;
        xhr.onload = function () {
            if (xhr.status == 200) {

                let ingreRows = JSON.parse(xhr.responseText);
                let trLength = ingreRows.length;
                console.log("長度", trLength);

                for (let i = 0; i < trLength; i++) {

                    if (ingreRows[i].ingreState == 0) {
                        ingreState = "未上架";
                    } else {
                        ingreState = "上架";
                    }

                    $('table').append(`<tr><td>${ingreRows[i].ingreNo}</td><td>${ingreRows[i].ingreName}</td><td><img id="img" src="./images/${ingreRows[i].picSrc}"><p id="fileName">檔案：${ingreRows[i].picSrc}</p></td><td>${ingreState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);

                }
                edit();


            } else {
                alert(xhr.status);
            }
        };

        // windows
        xhr.open('GET', './php/backend_Ingredient_show.php', true);
        // Mac
        // xhr.open('GET', 'http://localhost:8888/backend_Route_show.php', true);
        xhr.send(null);

    };


    // 新增資料
    $('.addbtn').click(function () {

        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');

        // 顯示輸入新增資料的欄位
        $('tr.title').after('<tr class="insert"><td></td><td><input type="text" name="ingreName" id="ingreName" placeholder="名稱"></td><td><label for="ingreImg"><img src="" id="preview"></label><br><form action="./php/uploadIngre.php" id="upload" method="post"><input type="file" name="ingreImg" id="ingreImg"><input type="submit" value="上傳圖片" class="btnSubmit"></form></td><td><select name="ingreState" id="ingreState"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

        $("#upload").on('submit', (function (e) {
            e.preventDefault();
            $.ajax({
                url: "./php/uploadIngre.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    alert("上傳成功");
                },
                error: function () {
                    alert("上傳失敗");
                }
            });
            console.log(new FormData(this));
        }));

        document.getElementById("ingreImg").onchange = function (e) {
            var file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("preview").src = reader.result;
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
                xhr.open('post', './php/backend_Ingredient_insert.php', true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Ingredient_insert.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                let ingre = {};
                ingreState = $('#ingreState').val();
                if (ingreState == 0) {
                    ingreState = "未上架";
                } else if (ingreState == 1) {
                    ingreState = "上架";
                }

                ingre.ingreName = $('#ingreName').val();
                ingre.picSrc = `${file.name}`;
                let data_info = JSON.stringify(ingre);
                console.log(data_info);
                xhr.send(data_info);

                $('.addbtn').removeAttr('disabled');
            });
        }

        // 取消新增
        $('.cancel').click(function () {
            $('tr.insert').remove();
            $('.addbtn').removeAttr('disabled');

        });

    });


    // 編輯資料

    function edit() {

        $('.edit').click(function () {

            // 停用所有編輯按鈕
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();

            // 配料名稱
            let ingreName = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`<input type="text" name="ingreName" id="ingreName"  value="${ingreName}">`);

            // 狀態
            let ingreState = tr.find('td:eq(3)').text();
            tr.find('td:eq(3)').text("");
            tr.find('td:eq(3)').append(`<select name="ingreState" class="ingreState"><option value="0">未上架</option>
            <option value="1">上架</option></select>`);
            if (ingreState == "未上架") {
                tr.find('td:eq(3) option:eq(0)').attr("selected", "selected");
            } else {
                tr.find('td:eq(3) option:eq(1)').attr("selected", "selected");
            }

            // 編輯
            tr.find('td:eq(4)').text("");
            tr.find('td:eq(4)').append(`<button type="submit" class="btn btn-info save">儲存</button>
            <button type="button" class="btn btn-info cancel">取消</button>`);

            // 儲存
            $('.save').click(function () {
                let xhr = new XMLHttpRequest;

                xhr.onload = function () {

                    if (xhr.status == 200) {
                        show();

                    } else {
                        alert(xhr.status);
                    }

                };


                // windows
                xhr.open('post', './php/backend_Ingredient_edit.php', true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Ingredient_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                let editIngre = {};
                ingreState = tr.find('.ingreState').val();
                if (ingreState == 0) {
                    ingreState = "未上架";
                } else if (ingreState == 1) {
                    ingreState = "上架";
                }

                editIngre.ingreNo = tr.find('td:eq(0)').text();
                editIngre.ingreName = tr.find('#ingreName').val();
                // editIngre.ingrePic = ingrePic;
                editIngre.ingreState = tr.find('.ingreState').val();

                let data_info = JSON.stringify(editIngre);
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