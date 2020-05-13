window.addEventListener('load', function() {

    // 顯示資料
    show();

    function show() {
        // 清除表格內容
        $(`table tr`).not("tr.title").not("tr.insert").remove();

        // 顯示資料庫內容
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {

                let routeRows = JSON.parse(xhr.responseText);
                let trLength = routeRows.length;

                for (let i = 0; i < trLength; i++) {

                    if (routeRows[i].routeState == 0) {
                        routeState = "取消";
                    } else {
                        routeState = "正常航行";
                    }
                    $('table').append(`<tr><td>${routeRows[i].routeNo}</td><td>${routeRows[i].routeDate}</td><td>${routeRows[i].routePort}</td><td>${routeRows[i].routeSeat}</td><td>${routeRows[i].routeCount}</td><td>${routeState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);

                }
                edit();

            } else {
                alert(xhr.status);
            }
        };

        // FTP
        // xhr.open('GET', './php/backend_Route_show.php', true);
        // windows
        // xhr.open('GET', 'http://localhost/dd106g3/backend_Route_show.php', true);
        // Mac
        xhr.open('GET', 'http://localhost:8888/backend_Route_show.php', true);
        xhr.send(null);

    };


    // 新增資料
    $('.addbtn').click(function() {

        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');

        // 顯示輸入新增資料的欄位
        $('tr.insert').css("display", "table-row");
        // $('tr.eq(0)').append('');

        // <tr class="insert">
        //             <td></td>
        //             <td><input type="date" name="routeDate" id="routeDate"></td>
        //             <td><select name="routePort" id="routePort">
        //                     <option value="1">深澳港</option>
        //                     <option value="2">梧棲港</option>
        //                     <option value="3">高雄港</option>
        //                 </select></td>
        //             <td><input type="number" name="routeSeat" id="routeSeat" min="1"></td>
        //             <td>0</td>
        //             <td>正常航行</td>
        //             <td>
        //                 <button type="submit" class="btn btn-info save">儲存</button>
        //                 <button type="button" class="btn btn-info cancel">取消</button></td>

        //         </tr>

        // 儲存新增
        $('.save').click(function() {

            let xhr = new XMLHttpRequest;

            xhr.onload = function() {

                if (xhr.status == 200) {

                    // $('tr.insert').css("display", "none");
                    $('tr.insert input').val('0');
                    show();

                } else {
                    alert(xhr.status);
                }

            };

            // FTP
            // xhr.open('post', './php/backend_Route_insert.php', true);

            // windows
            xhr.open('post',  'http://localhost/dd106g3/backend_Route_insert.php',  true);

            // Mac
            // xhr.open('POST', 'http://localhost:8888/backend_Route_insert.php', true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


            let route = {};
            routePort = $('#routePort').val();
            if (routePort == 0) {
                routePort = "深澳港";
            } else if (routePort == 1) {
                routePort = "梧棲港";
            } else {
                routePort = "高雄港";
            }

            route.routeDate = $('#routeDate').val();
            route.routePort = routePort;
            route.routeSeat = $('#routeSeat').val();

            let data_info = JSON.stringify(route);
            console.log(data_info);
            xhr.send(data_info);

            $('.addbtn').removeAttr('disabled');
        });

        // 取消新增
        $('.cancel').click(function() {
            $('tr.insert').css("display", "none");
            $('tr.insert input').val('0');
            $('.addbtn').removeAttr('disabled');

        });

    });


    // 編輯資料
    function edit() {

        $('.edit').click(function() {

            // 停用所有編輯按鈕
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();

            // 日期
            let routeDate = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`<input type="date" name="routeDate" class="routeDate" value="${routeDate}">`);

            // 港口
            let routePort = tr.find('td:eq(2)').text();
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`<select name="routePort" class="routePort"><option value="1">深澳港</option>
<option value="2">梧棲港</option><option value="3">高雄港</option></select>`);
            if (routePort == "深澳港") {
                tr.find('td:eq(2) option:eq(0)').attr("selected", "selected");
            } else if (routePort == "梧棲港") {
                tr.find('td:eq(2) option:eq(1)').attr("selected", "selected");
            } else {
                tr.find('td:eq(2) option:eq(2)').attr("selected", "selected");
            }


            // 座位總數
            let routeSeat = tr.find('td:eq(3)').text();
            tr.find('td:eq(3)').text("");
            tr.find('td:eq(3)').append(`<input type="number" name="routeSeat" class="routeSeat" value="${routeSeat}" min="1">`);

            // 狀態
            let routeState = tr.find('td:eq(5)').text();
            tr.find('td:eq(5)').text("");
            tr.find('td:eq(5)').append(`<select name="routeState" class="routeState"><option value="0">取消</option>
            <option value="1">正常航行</option></select>`);
            if (routeState == "取消") {
                tr.find('td:eq(5) option:eq(0)').attr("selected", "selected");
            } else {
                tr.find('td:eq(5) option:eq(1)').attr("selected", "selected");
            }

            // 編輯
            tr.find('td:eq(6)').text("");
            tr.find('td:eq(6)').append(`<button type="submit" class="btn btn-info save">儲存</button>
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

                // FTP
                // xhr.open('post', './php/backend_Route_edit.php', true);

                // windows
                xhr.open('post',  'http://localhost/dd106g3/backend_Route_edit.php',  true);

                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Route_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                let editRoute = {};
                routePort = tr.find('.routePort').val();
                // alert(routePort);
                if (routePort == 1) {
                    routePort = "深澳港";
                } else if (routePort == 2) {
                    routePort = "梧棲港";
                } else {
                    routePort = "高雄港";
                }

                editRoute.routeNo = tr.find('td:eq(0)').text();
                editRoute.routeDate = tr.find('.routeDate').val();
                editRoute.routePort = routePort;
                editRoute.routeSeat = tr.find('.routeSeat').val();
                editRoute.routeState = tr.find('.routeState').val();

                let data_info = JSON.stringify(editRoute);
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