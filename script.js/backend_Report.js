$(document).ready(function () {
    showPage();
    function showPage() {
        // 清除表格內容
        $(`table tr`).not("tr.title").remove();

        // 從資料庫抓資料顯示於網頁
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {

                let reportRows = JSON.parse(xhr.responseText);
                console.log(reportRows);
                // console.log(report.length)
                for (i = 0; i < reportRows.length; i++) {

                    //將處理狀態顯示為中文
                    if (reportRows[i].ReportState == 0) {
                        ReportState = "未處理";
                        // $(".table").append(`
                        //     <tr>
                        //     <td id="aaa_${reportRows[i].ReportNo}">${reportRows[i].ReportNo}</td>
                        //     <td>${reportRows[i].memNo}</td>
                        //     <td>${reportRows[i].commentContent}</td>
                        //     <td>${reportRows[i].ReportReason}</td>
                        //     <td>${ReportState}</td>
                        //     <td><button type="button" id="edit_btn_${reportRows[i].ReportNo}" class="btn btn-info edit">編輯</button></td>
                        //     </tr>
                        // `);
                    } else if (reportRows[i].ReportState == 1) {
                        ReportState = "檢舉成功(隱藏留言)";
                        // 檢舉成功不顯示
                    } else {
                        ReportState = "檢舉失敗(顯示留言)";
                        // $(".table").append(`
                        //     <tr>
                        //     <td id="aaa_${reportRows[i].ReportNo}">${reportRows[i].ReportNo}</td>
                        //     <td>${reportRows[i].memNo}</td>
                        //     <td>${reportRows[i].commentContent}</td>
                        //     <td>${reportRows[i].ReportReason}</td>
                        //     <td>${ReportState}</td>
                        //     <td><button type="button" id="edit_btn_${reportRows[i].ReportNo}" class="btn btn-info edit">編輯</button></td>
                        //     </tr>
                        // `);
                    }


                    $(".table").append(`
                    <tr>
                    <td id="aaa_${reportRows[i].ReportNo}">${reportRows[i].ReportNo}</td>
                    <td>${reportRows[i].memName}</td>
                    <td>${reportRows[i].commentContent}</td>
                    <td>${reportRows[i].ReportReason}</td>
                    <td>${ReportState}</td>
                    <td><button type="button" id="edit_btn_${reportRows[i].ReportNo}" class="btn btn-info edit">編輯</button></td>
                    </tr>
                    `);

                }

                edit();

            } else {
                alert(xhr.status);
            }
        }

        // FTP
        // xhr.open('post', './php/test.php', true);

        // Mac
        // xhr.open('post', 'http://localhost:8080/test.php', true);

        // windows
        xhr.open('GET', './php/backend_Report.php', true);
        xhr.send(null);
    }


    function edit() {
        $('.edit').click(function () {
            // var num = e.target.id;
            // var num_id = num.substr(num.length-1,1);
            // abc(num_id);

            // 停用所有編輯按鈕
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();

            // 狀態
            let reportState = tr.find('td:eq(4)').text();
            tr.find('td:eq(4)').text("");
            tr.find('td:eq(4)').append(`
                <select name="reportState" class="reportState">
                <option value="0">未處理</option>
                <option value="1">檢舉成功(隱藏留言)</option>
                <option value="2">檢舉失敗(顯示留言)</option>
                </select>
                `);
            if (reportState == "未處理") {
                tr.find('td:eq(4) option:eq(0)').attr("selected", "selected");
            } else if (reportState == "檢舉成功(隱藏留言)") {
                tr.find('td:eq(4) option:eq(1)').attr("selected", "selected");
                // tr.attr("display", "none");
            } else {
                tr.find('td:eq(4) option:eq(2)').attr("selected", "selected");
            }

            // 編輯
            tr.find('td:eq(5)').text("");
            tr.find('td:eq(5)').append(`<button type="submit" class="btn btn-info save">儲存</button>
                <button type="button" class="btn btn-info cancel">取消</button>`);

            // 儲存
            $('.save').click(function () {
                let xhr = new XMLHttpRequest;

                xhr.onload = function () {

                    if (xhr.status == 200) {
                        showPage();
                        // alert('a')

                    } else {
                        alert(xhr.status);
                    }

                };

                // FTP
                // xhr.open('post', './php/backend_Report_edit.php', true);

                // windows
                xhr.open('post', './php/backend_Report_edit.php', true);

                // Mac
                // xhr.open('POST', 'http://localhost:8080/backend_Report_edit.php', true);
                xhr.setRequestHeader("content-type",
                    "application/x-www-form-urlencoded");

                let editReport = {};
                editReport.ReportNo = tr.find('td:eq(0)').text();
                editReport.ReportState = tr.find('.reportState').val();

                let data_info = JSON.stringify(editReport);
                console.log(data_info);
                xhr.send(data_info);


                // if (editReport.ReportState == 1){
                //     $(`tr`).remove();
                // }


            });

            // 取消
            tr.find('.cancel').click(function() {
                showPage();
            });

        });
    }



});