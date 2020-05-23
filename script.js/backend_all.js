//確認後台有無登入
$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var mem = JSON.parse(xhr.responseText);
            if(mem.adminName){
                $('.membername').text(`${mem.adminName} 管理員`);
                show();
            }else{
                alert("尚未登入");
                window.location.href = "backend_login.html";
            }
        }
    }
    // windows
     xhr.open('GET',  './php/backend_getlogin_info.php',  true);
// 
    // Mac
    // xhr.open('GET','http://localhost:8080/backend_getlogin_info.php');
    xhr.send(null);
})
//確認後台有無登入