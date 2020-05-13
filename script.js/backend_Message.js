$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var message_row = JSON.parse(xhr.responseText);
            console.log(message_row)
            
            //先從資料庫把所有欄位撈出
            for(i=0;i<message_row.length;i++){
                $("table").append(`<tr>
                <td id="message_num_${message_row[i].messageNo}">${message_row[i].messageNo}</td>
                <td><input id="message_text_${message_row[i].messageNo}" type="text" value="${message_row[i].messageContent}" size="10"></td>
                <td><input id="message_quest_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQue}"></td>
                <td><input id="message_input_${message_row[i].messageNo}" type="text" value="${message_row[i].messageQueConrent}" size="30"></td>
                <td class="yesNo">
                    <div><input id="message_status_${message_row[i].messageNo}" type="text" value="${message_row[i].messageState}" size="10" style="text-align: center;"></div>
                </td>
                <td>
                    <div>
                        <button class="update btn btn-info" id="update_${message_row[i].messageNo}">編輯</button>
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
    xhr.open('GET','http://localhost:8888/backend_message.php');
    xhr.send(null);
})
function update(id){
    var message_id = $(`#message_num_${id}`).text();
    var message_text = $(`#message_text_${id}`).val();
    var message_quest = $(`#message_quest_${id}`).val();
    var message_input = $(`#message_input_${id}`).val();
    var message_status = $(`#message_status_${id}`).val();
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
    console.log(message_row_update_str)
    xhr.open('POST','http://localhost:8888/backend_message_update.php');
    xhr.send(message_row_update_str);
}