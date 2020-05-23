$(document).ready(function(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            let ingreRows = JSON.parse(xhr.responseText);
            let trLength = ingreRows.length;

            for (let i = 0; i < trLength; i++) {
                if(`${ingreRows[i].ingreState}` == 1){
                    $(".ingre-wrap").append(`<li class="ingret"><figure><figcaption><p>${ingreRows[i].ingreName}</p></figcaption><img src="./images/${ingreRows[i].forCus}" alt=""></figure></li>`);
                }
                
            }

        }else{
            alert(xhr.status);
        }
    }

      // FTP
    // xhr.open('post', './php/test.php', true);

    // Mac
    // xhr.open('post', 'http://localhost:8080/test.php', true);

    // windows
    xhr.open('GET', './php/backend_Ingredient_show.php', true);
    xhr.send(null);
});