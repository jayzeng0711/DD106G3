//新增管理員
$('.addbtn').click(function(){
    // 停用新增按鈕
    $(this).attr('disabled', 'disabled');

    adminAuthority = $('#adminAuthority').val();
    if(adminAuthority == 0){
        adminAuthority = "一般";
    } else {
        adminAuthority = "最高";
    }

    // 顯示輸入新增資料的欄位
    $('tr.title').after('<tr class="insert"><td></td><td><input class="msg_text" type="text"></td><td><input class="msg_textque" type="text"></td><td><input class="msg_textleng" type="text"></td><td><select id="adminAuthority" class="msg_text_sta"><option value="0">一般</option><option value="1">最高</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

    // 按下儲存
    $('.save').click(function(){
        var msg_text = $('.msg_text').val();
        var msg_textque = $('.msg_textque').val();
        var msg_textleng = $('.msg_textleng').val();
        var msg_text_sta = $('.msg_text_sta').val();
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
               show();
            }
        }
        var message_content = {};
        message_content.msg_text = msg_text;
        message_content.msg_textque = msg_textque;
        message_content.msg_textleng = msg_textleng;
        message_content.msg_text_sta = msg_text_sta;
        var message_content_str = JSON.stringify(message_content);

       // windows
        xhr.open('POST',  './php/backend_admin_insert.php',  true);

       // Mac
        // xhr.open('POST','http://localhost:8080/backend_admin_insert.php');
        xhr.send(message_content_str);
    })
    // 取消新增
    $('.cancel').click(function() {
       $('tr.insert').remove();
       $('.addbtn').removeAttr('disabled');

   });
})
//新增管理員

function show(){
    $(`table tr`).not("tr.title").not("tr.insert").remove();
    $('tr.insert').remove();
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            let message_row = JSON.parse(xhr.responseText);
            console.log(message_row)
            let trlength = message_row.length;

            adminAuthority = $('.adminAuthority').val();
            if(adminAuthority == 0){
                adminAuthority = "一般";
            } else {
                adminAuthority = "最高";
            }
            
            //先從資料庫把所有欄位撈出
            for(let i=0;i<trlength;i++){
                
                $("table").append(`<tr>
                <td id="message_num_${message_row[i].adminNo}">${message_row[i].adminNo}</td>
                <td id="message_text_${message_row[i].adminNo}">${message_row[i].adminId}</td>
                <td id="message_quest_${message_row[i].adminNo}">${message_row[i].adminPsw}</td>
                <td id="message_input_${message_row[i].adminNo}">${message_row[i].adminName}</td>
                <td id="message_status_${message_row[i].adminNo}">
                    <div><select id="message_auth_${message_row[i].adminNo}"><option class="adminAuthority" value="0">一般</option><option class="adminAuthority" value="1">最高</option></select></div>
                </td>
                <td>
                    <div>
                        <button class="update btn btn-info edit" id="update_${message_row[i].adminNo}">編輯</button>
                    </div>
                </td>
            </tr>`)
            }
            //先從資料庫把所有欄位撈出

            //再把所有編輯註冊事件
            $('.update').click(function(e){
                var num_id = e.target.id;
                var num = num_id.substr(num_id.length-1,1);
                update(num);
            })
            //再把所有編輯註冊事件
        }
    }
    // windows
    xhr.open('GET',  './php/backend_Admin.php',  true);
    // Mac
    // xhr.open('GET','http://localhost:8080/backend_Admin.php');
    xhr.send(null);
}

//更新
function update(id){
    var message_id = $(`#message_auth_${id}`).val();
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            // console.log(xhr.responseText);
        }
    }
    var message_row_update = {};
    message_row_update.message_id = message_id;
    message_row_update.message_text = id;
    var message_row_update_str = JSON.stringify(message_row_update);
    // windows
    xhr.open('POST',  './php/backend_admin_update.php',  true);
    // Mac
    // xhr.open('POST','http://localhost:8080/backend_admin_update.php');
    xhr.send(message_row_update_str);
}
//更新