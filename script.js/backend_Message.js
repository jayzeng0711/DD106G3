$(document).ready(function(){
    show_message();
})

//新增關鍵字
$('.addbtn').click(function(){
     // 停用新增按鈕
     $(this).attr('disabled', 'disabled');

     // 顯示輸入新增資料的欄位
     $('tr.title').after('<tr class="insert"><td></td><td><input class="msg_text" type="text" size="10"></td><td><input class="msg_textque" type="text"></td><td><input class="msg_textleng" type="text" size="30"></td><td><select name="msg_text_sta" id="msg_text_sta"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

     // 按下儲存
     $('.save').click(function(){
         var msg_text = $('.msg_text').val();
         var msg_textque = $('.msg_textque').val();
         var msg_textleng = $('.msg_textleng').val();
         var msg_text_sta = $('#msg_text_sta').val();
         var xhr = new XMLHttpRequest();
         xhr.onload = function(){
             if(xhr.status == 200){
                show_message();
                window.location.reload();
             }
         }
         var message_content = {};
         message_content.msg_text = msg_text;
         message_content.msg_textque = msg_textque;
         message_content.msg_textleng = msg_textleng;
         message_content.msg_text_sta = msg_text_sta;
         var message_content_str = JSON.stringify(message_content);
         console.log(message_content_str)

        // windows
        xhr.open('GET',  './php/backend_message_insert.php',  true);
        // Mac
        //  xhr.open('POST','http://localhost:8080/backend_message_insert.php');
         xhr.send(message_content_str);
     })
     // 取消新增
     $('.cancel').click(function() {
        $('tr.insert').remove();
        $('.addbtn').removeAttr('disabled');

    });
})
//新增關鍵字


function show_message(){
    $(`table tr`).not("tr.title").not("tr.insert").remove();
    $('tr.insert').remove();
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var message_row = JSON.parse(xhr.responseText);
            console.log(message_row)
            
            //先從資料庫把所有欄位撈出
            for(i=0;i<message_row.length;i++){
                if(message_row[i].messageState == 0){
                    $("table").append(`<tr>
                <td id="message_num_${message_row[i].messageNo}">${message_row[i].messageNo}</td>
                <td><input id="message_text_${message_row[i].messageNo}" type="text" value="${message_row[i].messageContent}" size="10"></td>
                <td><input id="message_quest_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQue}"></td>
                <td><input id="message_input_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQueConrent}" size="30"></td>
                <td class="yesNo">
                    <select name="cookState" id="cookState_${message_row[i].messageNo}"><option id="no_show_${message_row[i].messageNo}" selected="selected" value="0">未上架</option><option id="show_${message_row[i].messageNo}" value="1">上架</option></select>
                </td>
                <td>
                    <div>
                        <button class="update btn btn-info edit" id="update_${message_row[i].messageNo}">儲存</button>
                    </div>
                </td>
                </tr>`)
                }else{
                    $("table").append(`<tr>
                <td id="message_num_${message_row[i].messageNo}">${message_row[i].messageNo}</td>
                <td><input id="message_text_${message_row[i].messageNo}" type="text" value="${message_row[i].messageContent}" size="10"></td>
                <td><input id="message_quest_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQue}"></td>
                <td><input id="message_input_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQueConrent}" size="30"></td>
                <td class="yesNo">
                    <select name="cookState" id="cookState_${message_row[i].messageNo}"><option id="no_show_${message_row[i].messageNo}" value="0">未上架</option><option selected="selected" id="show_${message_row[i].messageNo}" value="1">上架</option></select>
                </td>
                <td>
                    <div>
                        <button class="update btn btn-info edit" id="update_${message_row[i].messageNo}">儲存</button>
                    </div>
                </td>
                </tr>`)
                }
            }
            //先從資料庫把所有欄位撈出

            //再把所有編輯註冊事件
            $('.update').click(function(e){
                var num_id = e.target.id;
                var num = num_id.slice(7);
                update(num);
            })
            //再把所有編輯註冊事件
        }
    }
    // windows
    xhr.open('GET',  './php/backend_message.php',  true);
    // Mac
    // xhr.open('GET','http://localhost:8080/backend_message.php');
    xhr.send(null);
}

//更新
function update(id){
    var message_id = $(`#message_num_${id}`).text();
    var message_text = $(`#message_text_${id}`).val();
    var message_quest = $(`#message_quest_${id}`).val();
    var message_input = $(`#message_input_${id}`).val();
    var message_status = $(`#cookState_${id}`).val();
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            console.log(xhr.responseText);
        }
    }
    var message_row_update = {};
    message_row_update.message_id = message_id;
    message_row_update.message_text = message_text;
    message_row_update.message_quest = message_quest;
    message_row_update.message_input = message_input;
    message_row_update.message_status = message_status;
    var message_row_update_str = JSON.stringify(message_row_update);
    // windows
    xhr.open('POST',  './php/backend_message_update.php',  true);
    // Mac
    // xhr.open('POST','http://localhost:8080/backend_message_update.php');
    xhr.send(message_row_update_str);
}
//更新