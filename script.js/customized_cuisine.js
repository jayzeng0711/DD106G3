$(document).ready(function () {

    // 開發用，直接顯示主畫面
    $('.attn').css("display", "none");
    $("main").addClass("on");

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status == 200) {
            let ingreRows = JSON.parse(xhr.responseText);
            let trLength = ingreRows.length;

            for (let i = 0; i < trLength; i++) {
                if (`${ingreRows[i].ingreState}` == 1) {
                    $(".ingre-wrap").append(`<li class="ingret"><figure><figcaption><p>${ingreRows[i].ingreName}</p></figcaption><img src="./images/${ingreRows[i].forCus}" alt=""></figure></li>`);
                }

            }
            $(".ingret").click(function () {
                if ($(".cook-type").hasClass != 1) {
                    alert("先選烹調方式才能加配料喔");
                    return;
                }
                if (count == 3) {
                    alert("最多只能放三個配料喔!");
                } else {
                    ingretImgSrc = $(this).find("img").attr("src");
                    dot = ingretImgSrc.lastIndexOf('.');
                    cus = ingretImgSrc.substr(0, dot);
                    str = cus + "_in.png";
                    addIngret(str);
                }
            });

            for (let a = 0; a < trLength - 3; a++) {
                if (`${ingreRows[a].ingreState}` == 1) {
                    $(".ct-in").append(`<li class="tab_in"><figure><figcaption><p>${ingreRows[a].ingreName}</p></figcaption><img src="./images/${ingreRows[a].forCus}" alt=""></figure></li>`);
                }
            }

            for (let b = 3; b < trLength; b++) {
                if (`${ingreRows[b].ingreState}` == 1) {
                    $(".cb-in").append(`<li class="tab_in"><figure><figcaption><p>${ingreRows[b].ingreName}</p></figcaption><img src="./images/${ingreRows[b].forCus}" alt=""></figure></li>`);
                }
            }
            $(".tab_in").click(function () {
                if ($(".cook-type").hasClass != 1) {
                    alert("先選烹調方式才能加配料喔");
                    return;
                }
                if (count == 3) {
                    alert("最多只能放三個配料喔!");
                } else {
                    ingretImgSrc = $(this).find("img").attr("src");
                    dot = ingretImgSrc.lastIndexOf('.');
                    cus = ingretImgSrc.substr(0, dot);
                    str = cus + "_in.png";
                    addIngret(str);
                }
                
            });


        } else {
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




    // 建立canvas畫布
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    width = $("#canvas").width();
    height = $("#canvas").height();


    // 最後一個烹調方式
    let lastCookSrc;
    // 最後一個配料
    let lastIngreSrc;
    // 存放配料圖片
    let IngreSrc1 = 0,
        IngreSrc2 = 0,
        IngreSrc3 = 0;
    // 存放配料在canvas畫布上的位置
    let x1, x2, y1, y2;
    // 加配料的次數
    let count = 0;


    // 放預設的海鮮圖片
    foodImgSrc = $(".fish-pic:eq(0)").find("img").attr("src");
    addSeafood(foodImgSrc);

    // 選海鮮
    $(".fish-pic").click(function () {
        foodImgSrc = $(this).find("img").attr("src");
        addSeafood(foodImgSrc);
    });
    $(".note-content").click(function () {
        foodImgSrc = $(this).next().find("img").attr("src");
        addSeafood(foodImgSrc);
    });
    $(".tab_fish").click(function () {
        foodImgSrc = $(this).find("img").attr('src');
        addSeafood(foodImgSrc);
    });

    // 選烹調方式
    $(".cook-type").click(function () {
        var str = $(this).attr("id");
        id = str.substr(str.length - 1, 1);
        cookImgSrc = `./images/cook${id}.png`;
        addSeafood(cookImgSrc);
    });

    // 選配料
    // $(".ingret").click(function() {
    //     if (count == 3) {
    //         alert("最多只能放三個配料喔!");
    //     } else {
    //         ingretImgSrc = $(this).find("img").attr("src");
    //         addIngret(ingretImgSrc);
    //     }
    // });

    // 存放海鮮和烹調方式
    function addSeafood(ImgSrc) {

        // 清除畫布
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 建立新的海鮮圖片
        var img = new Image();
        img.src = ImgSrc;
        lastCookSrc = ImgSrc;

        // 放新的海鮮
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);
        };

        // 加配料的次數歸零
        count = 0;
    };



    // 存放配料
    function addIngret(ImgSrc) {

        // 計算放配料次數
        count++;
        // 存現在這個配料的圖片，和前一個配料的位置
        if (count == 1) {
            IngreSrc1 = ImgSrc;
        } else if (count == 2) {
            IngreSrc2 = ImgSrc;
            x1 = nowX;
            y1 = nowY;
        } else if (count == 3) {
            IngreSrc3 = ImgSrc;
            x2 = nowX;
            y2 = nowY;
        };

        // 移動位置歸零
        nowX = 0;
        nowY = 0;


        // 建立新的配料圖片
        var img = new Image();
        img.src = ImgSrc;
        lastIngreSrc = ImgSrc;

        // 放新的配料
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);
        };

    };

    // 上下左右移動
    let nowX = 0,
        nowY = 0; //現在圖片的x,y位置
    $('#moveright').click(function () {
        if (count == 0) {
            alert("先選配料才能移動喔");
            return;
        }
        move(nowX + 20, nowY);
        nowX = nowX + 20;
    });
    $('#moveleft').click(function () {
        if (count == 0) {
            alert("先選配料才能移動喔");
            return;
        }
        move(nowX - 20, nowY);
        nowX = nowX - 20;
    });
    $('#movetop').click(function () {
        if (count == 0) {
            alert("先選配料才能移動喔");
            return;
        }
        move(nowX, nowY - 20);
        nowY = nowY - 20;
    });
    $('#movebottom').click(function () {
        if (count == 0) {
            alert("先選配料才能移動喔");
            return;
        }
        move(nowX, nowY + 20);
        nowY = nowY + 20;
    });

    // 移動事件
    function move(x, y) {
        // 清除畫布
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 先建立原本的海鮮烹調圖片
        var img = new Image();
        img.src = lastCookSrc;

        // 放原本的海鮮烹調圖片
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);

        };

        // 放原本的配料
        if (count == 2) {
            // 放第一個配料的圖片
            var imgA = new Image();
            imgA.src = IngreSrc1;
            xA = x1;
            yA = y1;

            // 放原本的海鮮烹調圖片
            imgA.onload = function () {
                canvas.getContext('2d').drawImage(imgA, xA, yA);
            };

        } else if (count == 3) {
            // 放第一個配料的圖片
            var imgA = new Image();
            imgA.src = IngreSrc1;
            xA = x1;
            yA = y1;

            // 放原本的海鮮烹調圖片
            imgA.onload = function () {
                canvas.getContext('2d').drawImage(imgA, xA, yA);
            };
            // 放第二個配料的圖片
            var imgB = new Image();
            imgB.src = IngreSrc2;
            xB = x2;
            yB = y2;

            // 放原本的海鮮烹調圖片
            imgB.onload = function () {
                canvas.getContext('2d').drawImage(imgB, xB, yB);
            };


        };

        // 建立新的配料圖片
        var img2 = new Image();
        img2.src = lastIngreSrc;

        img2.onload = function () {
            canvas.getContext('2d').drawImage(img2, x, y);
        }

    };


    // 清空配料
    $('#delete').click(function () {
        // 清除畫布
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 先建立原本的海鮮烹調圖片
        var img = new Image();
        img.src = lastCookSrc;

        // 放原本的海鮮烹調圖片
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);
        }

        // 放配料次數歸零、清空配料圖片紀錄、配料位置歸零
        count = 0;
        IngreSrc1 = 0;
        IngreSrc2 = 0;
        IngreSrc3 = 0;
        x1 = 0;
        x2 = 0;
        y1 = 0;
        y1 = 0;
    });

    // 儲存客製化料理
    // 名稱、圖片、價格、會員編號、海鮮編號、烹調方式編號、烹調時間、想說的話

    $('#download').click(function () {

        let xhr = new XMLHttpRequest;
        xhr.onload = function () {
            if (xhr.status == 200) {
                // let img = JSON.parse(xhr.responseText);
                // console.log(img);

            } else {
                console.log(xhr.status);
            }
        };

        // 現在時間
        let now = new Date();
        datenow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

        let data = {};
        /////////////請幫忙補custoPrice、seafoodNo、cookNo////////////

        data.custoName = $("#custoName").val();
        data.custoPic = canvas.toDataURL('png');
        data.custoContent = $("#content").val();
        data.custoPrice = "100";
        data.memNo = member.memNo;
        data.seafoodNo = "1";
        data.cookNo = "1";
        data.custoTime = datenow;

        // 換成資料庫裡的配料編號，存成陣列
        // 資料庫裡真正的配料編號 lemon 是 1、rosemary 是2 、chili是3..
        // 在陣列中尋找配料名稱的索引值，lemon 的索引值是 1，真實的編號就是索引值加1，把找到的編號放進陣列，傳到php
        let arrName = ["lemon", "rosemary", "gold", "chili", "butter", "wasabi"];

        data.ingret = [];

        if (IngreSrc1 != 0) {
            IngreSrc1 = IngreSrc1.slice(9).replace(".png", "");
            ingretNo = arrName.indexOf(IngreSrc1) + 1;
            data.ingret.push(ingretNo);
        }

        if (IngreSrc2 != 0) {
            IngreSrc2 = IngreSrc2.slice(9).replace(".png", "");
            ingretNo = arrName.indexOf(IngreSrc2) + 1;
            data.ingret.push(ingretNo);
        }

        if (IngreSrc3 != 0) {
            IngreSrc3 = IngreSrc3.slice(9).replace(".png", "");
            ingretNo = arrName.indexOf(IngreSrc3) + 1;
            data.ingret.push(ingretNo);
        }


        let data_info = JSON.stringify(data);

        // windows
        xhr.open('post', './php/customized_save.php', true);

        // Mac
        // xhr.open('POST', 'http://localhost:8080/customized_save.php', true);

        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        // console.log(data_info);
        xhr.send(data_info);

    });

});