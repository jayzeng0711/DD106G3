window.addEventListener("load", function () {

    //////////////////// 打字效果 ///////////////////////

    // type();

    function type() {
        var str = "這位客人，您似乎還沒進行登入";
        var str2 = " 提醒您，在沒有登入的情況下製作料理會無法儲存料理";
        var str3 = "請問要進行登入嗎？";
        var str4 = "這樣呀...我明白了。祝您有段美好的時光";
        var btny = document.createElement('div');
        btny.textContent = "是";
        btny.setAttribute('class', 'yes');
        var btnn = document.createElement('div');
        btnn.textContent = "否";
        btnn.setAttribute('class', 'no');
        var click_next = document.createElement('div');
        click_next.textContent = "click";
        click_next.setAttribute('class', 'click_next');
        var br = document.createElement('br');
        var i = 0,
            j = 0,
            k = 0,
            l = 0;

        function typing() {
            if (i <= str.length) {
                $(".talk")[0].innerHTML = str.slice(0, i++);
                setTimeout('typing()', 100); //遞歸調用
            } else {
                //文字輸入完成後再出現
                $(".talk")[0].appendChild(click_next);
            }
        }
        $(document).ready(function () {
            if ($(".act1").hasClass("on") == 1) {
                setTimeout('typing()', 2500);
            } else if ($(".no-fish1").hasClass("on") == 1) {
                setTimeout('goCatch()', 2500);
            }
        });

        function typing2() {
            if (j <= str2.length) {
                $(".talk")[1].innerHTML = str2.slice(0, j++);
                setTimeout('typing2()', 100);
            } else {
                $(".talk")[1].appendChild(click_next);
            }
        }

        function typing3() {
            if (k <= str3.length) {
                $(".talk")[2].innerHTML = str3.slice(0, k++);
                setTimeout('typing3()', 100);
                if ($(window).width() > 576) {
                    $(".talk")[2].appendChild(btny);
                    $(".talk")[2].appendChild(btnn);
                } else {
                    $(".talk")[2].appendChild(br);
                    $(".talk")[2].appendChild(btny);
                    $(".talk")[2].appendChild(btnn);
                }

            } else {
                $(".no").click(function () {
                    $(".act3").removeClass("on");
                    $(".act4").addClass("on");
                    setTimeout('typing4()', 100);
                });
            }
        }

        function typing4() {
            if (l <= str4.length) {
                $(".talk")[3].innerHTML = str4.slice(0, l++);
                setTimeout('typing4()', 100);
            }
        }

        $(".talking-here").click(function () {
            if ($(".act1").hasClass("on") == 1) {
                $(".act1").removeClass("on");
                $(".act2").addClass("on");
                setTimeout('typing2()', 300);
            } else if ($(".act2").hasClass("on") == 1) {
                $(".act2").removeClass("on");
                $(".act3").addClass("on");
                setTimeout('typing3()', 300);
            } else if ($(".act4").hasClass("on") == 1) {
                $(".attn").delay(3000).fadeOut(1000);
                $("main").addClass("on");
            } else if ($(".no-fish1").hasClass("on") == 1) {
                $(".no-fish1").removeClass("on");
                $(".no-fish2").addClass("on");
                setTimeout('goCatch2()', 300);
            }
        });

        // 沒有料理時的畫面
        var con = "您目前的海鮮清單空空如也，請先抓取海鮮再來製作料理";
        var con2 = "想抓取海鮮請往這邊";
        var a = 0,
            b = 0;
        var goFish = document.createElement('a');
        goFish.textContent = "前往現撈海鮮";
        goFish.setAttribute('class', 'go-fish');
        goFish.setAttribute('href', './game.html');

        function goCatch() {
            if (a <= con.length) {
                $(".talk")[4].innerHTML = con.slice(0, a++);
                setTimeout('goCatch()', 100);
            } else {
                $(".talk")[4].appendChild(click_next);
            }
        }

        function goCatch2() {
            if (b <= con2.length) {
                $(".talk")[5].innerHTML = con2.slice(0, b++);
                setTimeout('goCatch2()', 100);
                $(".talk")[5].appendChild(goFish);
            }
        }

    };

    // 4隻魚
    let fishss = [{
        "name": "蛤仔",
        "price": "200",
        "img": "./images/seafood1.svg"
    }, {
        "name": "章魚",
        "price": "400",
        "img": "./images/seafood3.svg"
    }, {
        "name": "鮭魚",
        "price": "600",
        "img": "./images/seafood5.svg"
    }, {
        "name": "胭脂蝦",
        "price": "1200",
        "img": "./images/seafood8.svg"
    }];

    localStorage["fish"] = JSON.stringify(fishss);



    // 最後一個海鮮編號
    let lastSeafoodNo;
    // 最後一個海鮮價格
    let lastSeafoodPrice;
    // 最後一個烹調方式編號
    let lastCookNo;



    //////////////////// 顯示抓到的海鮮 ///////////////////////

    let fish = JSON.parse(localStorage["fish"]);

    for (let i = 0; i < fish.length; i++) {

        // 海鮮名稱
        let name = fish[i].name;
        // 海鮮價格
        let price = fish[i].price;
        // 海鮮圖片
        let img = fish[i].img;

        $(`.fishName:eq(${i})`).text(name);
        $(`.fishPrice:eq(${i})`).text(`價格：NT$${price}元`);
        $(`.fish-pic:eq(${i})`).append(`<img src=${img} alt="" class="fishImg">`);
        // 手機
        $(`.tab_fishName:eq(${i})`).text(name);
        $(`.tab_fishPic:eq(${i})`).attr('src', `${img}`);

        // 存海鮮價格
        $(`.fish-pic:eq(${i})`).attr("price", price);

    }

    //桌機版的海鮮與手機版連動
    for (let i = 0; i < $(".fish-pic").length; i++) {
        $(".fish-pic")[i].addEventListener('click', function () {
            for (let j = 0; j < $(".tab_fish").length; j++) {
                if (j == i) {
                    $(".tab_fish")[j].classList.add("selected");
                } else {
                    $(".tab_fish")[j].classList.remove("selected");
                }
            }
        });
    }
    for (let i = 0; i < $(".tab_fish").length; i++) {
        $(".tab_fish")[i].addEventListener('click', function () {
            for (let j = 0; j < $(".note").length; j++) {
                if (j == i) {
                    $(".note")[j].classList.add("selected-fish");
                } else {
                    $(".note")[j].classList.remove("selected-fish");
                }
            }
        });
    }

    //////////////////// 海鮮slider ///////////////////////
    seafoodSlider();

    function seafoodSlider() {

        var fishRight = document.getElementById("fishR"),
            fishLeft = document.getElementById("fishL"),
            fishSlider = document.querySelector(".fish-select-wrap"),
            fishPosition = 1;
        var w = $(window).width();
        if (w > 1200) {
            fishRight.onclick = function () {
                if (fishPosition == 3) {} else {
                    fishSlider.style.transform = "translateX(-" + fishPosition * 20 + "%)";
                    fishPosition += 1;
                }
            }

            fishLeft.onclick = function () {
                if (fishPosition == 1) {} else {
                    fishSlider.style.transform = "translateX(-" + ((fishPosition - 2) * 20) + "%)";
                    fishPosition -= 1;
                }
            }
        } else {
            fishRight.onclick = function () {
                if (fishPosition == 4) {} else {
                    fishSlider.style.transform = "translateX(-" + fishPosition * 20 + "%)";
                    fishPosition += 1;
                }
            }

            fishLeft.onclick = function () {
                if (fishPosition == 1) {} else {
                    fishSlider.style.transform = "translateX(-" + ((fishPosition - 2) * 20) + "%)";
                    fishPosition -= 1;
                }
            }
        }

        $(window).resize(function () {
            var w = $(window).width();
            if (w > 1200) {
                //考慮當小視窗posi = 4時，換成大posi要等於3
                if (fishPosition == 4) {
                    fishSlider.style.transform = "translateX(-" + 40 + "%)";
                    fishPosition = 3;
                }

                fishRight.onclick = function () {
                    if (fishPosition == 3) {} else {
                        fishSlider.style.transform = "translateX(-" + fishPosition * 20 + "%)";
                        fishPosition += 1;
                    }
                }

                fishLeft.onclick = function () {
                    if (fishPosition == 1) {} else {
                        fishSlider.style.transform = "translateX(-" + ((fishPosition - 2) *
                            20) + "%)";
                        fishPosition -= 1;
                    }
                }
            } else {
                fishRight.onclick = function () {
                    if (fishPosition == 4) {} else {
                        fishSlider.style.transform = "translateX(-" + fishPosition * 20 +
                            "%)";
                        fishPosition += 1;
                    }
                }
                fishLeft.onclick = function () {
                    if (fishPosition == 1) {} else {
                        fishSlider.style.transform = "translateX(-" + ((fishPosition - 2) *
                            20) + "%)";
                        fishPosition -= 1;
                    }
                }
            }
        });

    };

    //////////////////// 配料slider ///////////////////////
    var xhrn = new XMLHttpRequest();

    xhrn.onload = function () {
        if (xhrn.status == 200) {
            let ingreRows = JSON.parse(xhrn.responseText);
            let trLength = ingreRows.length;

            for (let i = 0; i < trLength; i++) {
                if (`${ingreRows[i].ingreState}` == 1) {
                    $(".ingre-wrap").append(`<li class="ingret"><figure><figcaption><p>${ingreRows[i].ingreName}</p></figcaption><img src="./images/${ingreRows[i].forCus}" alt=""></figure></li>`);
                }

            }
            $(".ingret").click(function () {
                if ($(".cook-type").hasClass("selected") != 1) {
                    //開燈箱
                    $('.alertbox .wrapper').text("先選烹調方式才能加配料喔!");
                    $('.alertbox').addClass("on");
                    return;
                }
                if (count == 3) {
                    //開燈箱
                    $('.alertbox .wrapper').text("最多只能放三個配料喔!");
                    $('.alertbox').addClass("on");
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
                    //開燈箱
                    $('.alertbox .wrapper').text("先選烹調方式才能加配料喔!");
                    $('.alertbox').addClass("on");
                    return;
                }
                if (count == 3) {
                    //開燈箱
                    $('.alertbox .wrapper').text("最多只能放三個配料喔!");
                    $('.alertbox').addClass("on");
                } else {
                    ingretImgSrc = $(this).find("img").attr("src");
                    dot = ingretImgSrc.lastIndexOf('.');
                    cus = ingretImgSrc.substr(0, dot);
                    str = cus + "_in.png";
                    addIngret(str);
                }

            });


        } else {
            alert(xhrn.status);
        }
    }


    // Mac
    // xhr.open('post', 'http://localhost:8080/backend_Ingredient_show.php', true);

    // windows
    xhrn.open('GET', './php/backend_Ingredient_show.php', true);
    xhrn.send(null);



    ingretSlider();

    function ingretSlider() {
        var right = document.getElementById("arrowR"),
            left = document.getElementById("arrowL"),
            slider = document.querySelector(".ingre-wrap"),
            position = 1,
            finalPosition = 3;

        right.onclick = function () {
            if (position == 3) {
                $('#arrowR').attr('disabled', true);

            } else {
                slider.style.transform = "translateX(-" + position * 16.66 + "%)";
                position += 1;
                $('#arrowL').attr('disabled', false);
            }
        }

        left.onclick = function () {
            if (position == 1) {
                $('#arrowL').attr('disabled', true);

            } else {
                slider.style.transform = "translateX(-" + ((position - 2) * 16.66) + "%)";
                position -= 1;
                $('#arrowR').attr('disabled', false);
            }
        }

    };

    //////////////////// 被選擇的海鮮會有紅圈 ///////////////////////

    $(".fish-pic, .note-content").on("click", function () {
        $(".note").removeClass("selected-fish");
        $(this.parentNode).addClass("selected-fish");
        $(".cook-type").removeClass("selected");
        $(".tab_cook li").removeClass("selected");
        $(".food-display .pic").remove(); //點海鮮時配料會重置
    });
    $(".tab_fish").on("click", function () {
        $(".tab_fish").removeClass("selected");
        $(this).addClass("selected");
        $(".cook-type").removeClass("selected");
        $(".tab_cook li").removeClass("selected");
        $(".food-display .pic").remove();
    });


    //////////////////// 選了海鮮會換烹調 ///////////////////////

    // 存放海鮮烹調方式的陣列
    let cooks;

    // 預設先顯示第一隻海鮮的烹調方式
    changeCook(fish[0].name);

    function changeCook(name) {
        let xhr = new XMLHttpRequest;

        xhr.onload = function () {
            if (xhr.status == 200) {
                cooks = JSON.parse(xhr.responseText)
                console.log(cooks);
                for (let i = 0; i < cooks.length; i++) {
                    $(`.cook-type:eq(${i})`).text(cooks[i].cookName);
                    $(`.cook-type:eq(${i})`).attr("id", cooks[i].seafoodCookPic);
                    $(`.cook-type:eq(${i})`).attr("cookNo", cooks[i].cookNo);
                    // console.log(cooks[i].seafoodCookPic);

                    $(`.cook-type-mb:eq(${i})`).text(cooks[i].cookName);
                    $(`.cook-type-mb:eq(${i})`).attr("id", cooks[i].seafoodCookPic);
                    $(`.cook-type-mb:eq(${i})`).attr("cookNo", cooks[i].cookNo);

                };

                // 存現在選的海鮮的編號、價格
                lastSeafoodNo = cooks[0].seafoodNo;
                lastSeafoodPrice = cooks[0].seafoodPrice;

            } else {
                console.log(xhr.status);
            }

        };

        let data_info = `name=${name}`;

        // windows
        xhr.open('post', './php/customized_seafoodCook.php', true);

        // Mac
        // xhr.open('POST', 'http://localhost:8080/customized_seafoodCook.php', true);

        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        console.log(data_info);
        xhr.send(data_info);

    };


    //////////////////// 海鮮預覽圖 ///////////////////////
    //開發用，直接顯示主畫面
    $('.attn').css("display", "none");
    $("main").addClass("on");


    // 建立canvas畫布
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    width = $("#canvas").width();
    height = $("#canvas").height();

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

    // 選海鮮，找圖片、價格、手機版中提示顯示海鮮名
    $(".fish-pic").click(function () {
        foodImgSrc = $(this).find("img").attr("src");
        addSeafood(foodImgSrc);

        name = $(this).parent().find(".fishName").text();
        changeCook(name);
        $(".now-fish").text(name);
        
    });

    $(".note-content").click(function () {
        
        foodImgSrc = $(this).next().find("img").attr("src");
        addSeafood(foodImgSrc);

        name = $(this).find(".fishName").text();
        changeCook(name);
        $(".now-fish").text(name);
        $(".now-type").text("");
    });

    $(".tab_fish").click(function () {
        foodImgSrc = $(this).find("img").attr('src');
        name = $(this).find(".tab_fishName").text();
        addSeafood(foodImgSrc);
        $(".now-fish").text(name);
        $(".now-type").text();
    });

    // 選烹調方式，找烹調方式編號
    $(".cook-type").click(function () {
        $(".cook-type").removeClass("selected");
        $(".cook-type-mb").removeClass("selected");
        $(this).addClass("selected");

        var str = $(this).text();
        $(".now-type").text(str);
        var id = $(this).attr("id");
        // 選了烹調會換預覽圖
        cookImgSrc = `./images/${id}`;
        addSeafood(cookImgSrc);
        // 存烹調方式的編號
        lastCookNo = $(this).attr("cookNo");
        
    });
    $(".cook-type-mb").click(function () {
        $(".cook-type").removeClass("selected");
        $(".cook-type-mb").removeClass("selected");
        $(this).addClass("selected");
        //確認桌機版也會跟著改

        var str = $(this).text();
        $(".now-type").text(str);
        var id = $(this).attr("id");
        // 選了烹調會換預覽圖
        cookImgSrc = `./images/${id}`;
        addSeafood(cookImgSrc);

        // 存烹調方式的編號
        lastCookNo = $(this).attr("cookNo");
        if (find($(".cook-type-mb")).attr("cookNo") == lastCookNo) {
            $(".cook-type-mb").addClass("selected");
        }
    });


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
            //開燈箱
            $('.alertbox .wrapper').text("先選配料才能移動喔!");
            $('.alertbox').addClass("on");
            return;
        }
        move(nowX + 20, nowY);
        nowX = nowX + 20;
    });
    $('#moveleft').click(function () {
        if (count== 0) {
            //開燈箱
            $('.alertbox .wrapper').text("先選配料才能移動喔!");
            $('.alertbox').addClass("on");
            return;
        }
        move(nowX - 20, nowY);
        nowX = nowX - 20;
    });
    $('#movetop').click(function () {
        if (count== 0) {
            //開燈箱
            $('.alertbox .wrapper').text("先選配料才能移動喔!");
            $('.alertbox').addClass("on");
            return;
        }
        move(nowX, nowY - 20);
        nowY = nowY - 20;
    });
    $('#movebottom').click(function () {
        if (count== 0) {
            //開燈箱
            $('.alertbox .wrapper').text("先選配料才能移動喔!");
            $('.alertbox').addClass("on");
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
        data.custoPrice = lastSeafoodPrice;
        data.memNo = member.memNo;
        data.seafoodNo = lastSeafoodNo;
        data.cookNo = lastCookNo;
        data.custoTime = datenow;


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

        console.log(data_info);
        xhr.send(data_info);

    });



    //////////////////// 開啟彈跳視窗(完成料理) ///////////////////////
    $("button.to_lightbox").on("click", function () {
        $(".overlay").addClass("-on");
    });
    $(".close, .cancel").on("click", function () {
        $(".overlay").addClass("-opacity-zero");

        // 設定隔一秒後，移除相關 class
        setTimeout(function () {
            $(".overlay").removeClass("-on -opacity-zero");
        }, 1000);
    });



    //關燈箱
    $('.alertbox .boxclose').click(function () {
        $('.alertbox').removeClass("on");
    });




});