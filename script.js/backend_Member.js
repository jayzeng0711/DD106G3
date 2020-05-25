mem_status = 0;

$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var member = JSON.parse(xhr.responseText);
            for(i=0;i<member.length;i++){
                if(member[i].memPic){
                    if(member[i].memState == 1){
                        $('table').append(`<tr>
                        <td>${member[i].memNo}</td>
                        <td>${member[i].memId}</td>
                        <td>${member[i].memPsw}</td>
                        <td>${member[i].memName}</td>
                        <td>${member[i].levelName}</td>
                        <td>${member[i].memScore}</td>
                        <td>${member[i].memPoints}</td>
                        <td>
                            <div class="bigimg"><img style="width: 50px;" src="./php/images/${member[i].memPic}"></div>
                        </td>
                        <td class="yesNo">
                            <div class="yes_div status" id="yes_div_${member[i].memNo}"></div>
                        </td>
                    </tr>`)
                    }else{
                        $('table').append(`<tr>
                        <td>${member[i].memNo}</td>
                        <td>${member[i].memId}</td>
                        <td>${member[i].memPsw}</td>
                        <td>${member[i].memName}</td>
                        <td>${member[i].levelName}</td>
                        <td>${member[i].memScore}</td>
                        <td>${member[i].memPoints}</td>
                        <td>
                            <div class="bigimg"><img style="width: 50px;" src="./php/images/${member[i].memPic}"></div>
                        </td>
                        <td class="yesNo">
                            <div class="no_div status" id="no_div_${member[i].memNo}"></div>
                        </td>
                    </tr>`)
                    }
                }else{
                    if(member[i].memState == 1){
                        $('table').append(`<tr>
                        <td>${member[i].memNo}</td>
                        <td>${member[i].memId}</td>
                        <td>${member[i].memPsw}</td>
                        <td>${member[i].memName}</td>
                        <td>${member[i].levelName}</td>
                        <td>${member[i].memScore}</td>
                        <td>${member[i].memPoints}</td>
                        <td>
                            <div class="bigimg"><img style="width: 40px;" src="./images/login.png"></div>
                        </td>
                        <td class="yesNo">
                            <div class="yes_div status" id="yes_div_${member[i].memNo}"></div>
                        </td>
                    </tr>`)
                    }else{
                        $('table').append(`<tr>
                <td>${member[i].memNo}</td>
                <td>${member[i].memId}</td>
                <td>${member[i].memPsw}</td>
                <td>${member[i].memName}</td>
                <td>${member[i].levelName}</td>
                <td>${member[i].memScore}</td>
                <td>${member[i].memPoints}</td>
                <td>
                    <div class="bigimg"><img style="width: 40px;" src="./images/login.png"></div>
                </td>
                <td class="yesNo">
                    <div class="no_div status" id="no_div_${member[i].memNo}"></div>
                </td>
            </tr>`)
                    }
                }
            }
            //切換狀態
            $('.status').click(function(e){
                var status_id = e.target.id;
                status(status_id);
            })
            //切換狀態
            console.log(JSON.parse(xhr.responseText))
        }
    }
    // windows
    xhr.open('GET',  './php/backend_Member.php',  true);
    // Mac
    // xhr.open('GET','http://localhost:8080/backend_Member.php');
    xhr.send(null);
})

//找出會員的狀態做改變
function status(id){
    var id_num = id.substr(id.length-1,1);
    var hasclass = $(`#${id}`).hasClass('no_div');
    if(hasclass){
        $(`#${id}`).addClass('yes_div').removeClass('no_div');
        mem_status =1;
        change_sta(id_num)
    }else{
        $(`#${id}`).addClass('no_div').removeClass('yes_div');
        mem_status = 0;
        change_sta(id_num)
    }
}
//找出會員的狀態做改變

//傳送會員切換的狀態
function change_sta(id_num){
    var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                
            }
        }
        var mem_row ={};
        mem_row.id = id_num;
        mem_row.status = mem_status;
        var mem_row_str = JSON.stringify(mem_row)
        // windows
        xhr.open('POST',  './php/backend_member_update.php',  true);
        // Mac
        // xhr.open('POST','http://localhost:8080/backend_member_update.php');
        xhr.send(mem_row_str)
}
//傳送會員切換的狀態
