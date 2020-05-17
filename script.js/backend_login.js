$('#login_btn').click(function(){
    var account = $('#account').val();
    var psw = $('#psw').val();
    if(account=="" || psw==""){
        alert('請填寫所有欄位');
        return false;
    }else{
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                if(xhr.responseText == "登入成功"){
                    window.location.href = "backend_Admin.html";
                }else{
                    alert(xhr.responseText);
                }
            }
        }
        var mem_login_data = {};
        mem_login_data.acc = account;
        mem_login_data.psw = psw;
        var mem_login_data_str = JSON.stringify(mem_login_data);

        // windows
        xhr.open('GET',  './php/backend_login.php',  true);

        // Mac
        // xhr.open('POST', "http://localhost:8888/backend_login.php");
        xhr.send(mem_login_data_str)
    }
})