$('.logout').click(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            $('.membername').text("管理員");
            window.location.href = "backend_login.html";
        }
    }

    // windows
    xhr.open('GET',  './php/member_logout.php',  true);

    // Mac
    // xhr.open('GET', 'http://localhost:8080/member_logout.php', true);
    xhr.send(null);
})