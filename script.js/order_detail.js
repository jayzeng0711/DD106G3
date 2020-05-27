window.addEventListener('load', function() {



    // 登出就會跳轉到訂位頁
    $('.pu_login_logout').click(function() {
        location.href = "order.html";
    });


    // 關掉提示燈箱

    $('.alertbox .boxclose').click(function() {
        $('.alertbox').removeClass("on");
    });


    // localStorage.clear();
    //////////////////套餐訂單明細//////////////////

    let mealtotal = 0;
    for (let i = 1; i <= 3; i++) {

        // 套餐數量為0不顯示項目
        if (localStorage[`meal${i}amount`] == 0) {
            if (i == 1) {
                $('.mdmealA').css('display', 'none');
                $('.smmealA').css('display', 'none');
                $('.lineA').css('display', 'none');
            }
            if (i == 2) {
                $('.mdmealB').css('display', 'none');
                $('.smmealB').css('display', 'none');
                $('.lineB').css('display', 'none');
            }
            if (i == 3) {
                $('.mdmealC').css('display', 'none');
                $('.smmealC').css('display', 'none');
                $('.lineC').css('display', 'none');
            }
        }

        // 顯示套餐數量、單價、小計、總計

        $(`.meal${i}amount`).text(localStorage[`meal${i}amount`]);
        $(`.meal${i}price`).text(localStorage[`meal${i}price`]);
        subtotal = $(`.meal${i}amount:eq(0)`).text() * $(`.meal${i}price:eq(0)`).text();
        $(`.meal${i}subtotal`).text(subtotal);
        mealtotal += subtotal;
    }
    $('.mealtotal').text(mealtotal);

    //////////////////客製化料理訂單明細//////////////////


    let custoLength = localStorage['custoLength'];

    if (custoLength == 0) {
        $('.custowrapper').css("display", "none");
    } else {

        let custototal = 0; // 小計總和
        for (let i = 0; i < custoLength; i++) {
            custos = JSON.parse(localStorage['custo']);
            // 圖片
            imgsrc = custos[i].custoPic;
            // 料理名稱
            name = custos[i].name;
            // 數量
            amount = custos[i].amount;
            // 單價
            price = custos[i].price;
            // 小計
            total = parseInt(amount) * parseInt(price);
            // 編號
            custoNo = custos[i].custoNo;
            // 桌機顯示
            $('.custoafterline').before(`
            <div class="row mdcusto align-items-center ">
            <div class="col-md-4 ">
                <div class="row ">
                    <div class="col-6 col-md-12 divorder ">
                        <div class="row align-items-center custorow">
                            <div class="col-6 ">
                                <img src="${imgsrc}" alt=" ">
                            </div>
                            <div class="col-5 divorder ">
                                <p class="custonow " custono="${custoNo}">${name}</p>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
            <div class="col-md-2 divorder custoAmount">
                <p class="custocount ">${amount}</p>
            </div>
            <div class="col-md-3 divorder custoPrice">
                <p class="custoprice ">${price}</p>
            </div>
            <div class="col-md-3 divorder ">
                <p class="custoamount ">${total}元</p>
            </div>
            <div class="line "></div>
        
        </div>`);

            // 手機顯示
            $('.custoafterline').before(`
            <div class="row smcusto ">
            <div class="col-12 ">
                <div class="row align-items-center divorder ">
                    <div class="col-6 ">
                    <p class="custonow " custono="${custoNo}">${name}</p>
                    </div>
                    <div class="col-6 ">
                        <img src="${imgsrc}" alt=" ">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row align-items-center ">
                    <div class="col-6 d-md-none divtitle ">
                        <p>數量</p>
                    </div>
                    <div class="col-6 col-md-12 divorder ">
                        <p class="custocount ">${amount}</p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row ">
                    <div class="col-6 d-md-none divtitle ">
                        <p>單價</p>
                    </div>
                    <div class="col-6 col-md-12 divorder ">
                        <p class="custoprice ">${price}</p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row ">
                    <div class="col-6 d-md-none divtitle ">
                        <p>小計</p>
                    </div>
                    <div class="col-6 col-md-12 divorder ">
                        <p class="custoamount ">${total}元</p>
                    </div>
                </div>
            </div>
            <div class="line "></div>
        </div>`);

            custototal += total;

        }

        // 計算客製化料理總金額
        $('.custototal').text(custototal);


    };




    /////////////////訂位付款資訊//////////////////
    // 顯示日期
    $('.datenow').text(localStorage['date']);

    // 顯示港口
    let portnow = localStorage['port'];
    if (portnow == 'port1') {
        $('.portnow').text('深澳港');
    } else if (portnow == 'port2') {
        $('.portnow').text('梧棲港');
    } else {
        $('.portnow').text('高雄港');
    }

    // 顯示人數
    $('.peoplenow').text(localStorage['people'] + '人');

    // 顯示訂位小計
    let mtotal = parseInt($('.mealtotal').text());
    let ctotal = parseInt($('.custototal').text());

    $('.subtotal').text(mtotal + ctotal);

    // 顯示姓名
    $('#ordername').val(localStorage['memName']);

    // 顯示信箱
    $('#orderemail').val(localStorage['memId']);

    // 顯示訂位總金額
    checkTotal();

    function checkTotal() {
        $('.total').text($('.subtotal').text() - $('#ordepoint').val());
    };


    // 確認會員可用點數
    let point = 0;
    checkPoint();

    function checkPoint() {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                point = JSON.parse(xhr.responseText);
                $('#maxpoint').text(point);

            } else {
                console.log(xhr.status);
            };

        };
        let data = `memNo=${localStorage['memNo']}`;
        // console.log(data);

        // windows
        xhr.open("POST", "./php/orderdetail_point.php");

        // Mac
        // xhr.open('POST', 'http://localhost:8080/orderdetail_point.php');

        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    };

    // 點數不可超過最大可用點數
    $('#ordepoint').change(function() {
        changePoint();
    });

    function changePoint() {
        let val = $('#ordepoint').val();

        if (val < 0 || val == "") {
            $('#ordepoint').val(0);
        } else if (val > point) {
            $('#ordepoint').val(point);
        } else if (val < point) {
            $('#ordepoint').val(parseInt(val));
        } else {
            $('#ordepoint').val(val);
        };
        checkTotal();
    }

    // 送出訂單
    // 檢查訂位資訊都填寫好



    $('.next').click(function() {

        changePoint(); //計算點數和總金額

        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

        if ($('#ordername').val() == "") {
            $('.alertbox .wrapper').text("請填寫姓名～");
            $('.alertbox').addClass("on");
        } else if ($('#ordertel').val() == "" || $('#ordertel').val().length < 9) {
            $('.alertbox .wrapper').text("請填寫正確的聯絡電話～");
            $('.alertbox').addClass("on");
        } else if ($('#orderemail').val() == "" || $('#orderemail').val().search(emailRule) == -1) {
            $('.alertbox .wrapper').text("請填寫正確的信箱～");
            $('.alertbox').addClass("on");
        } else {

            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                if (xhr.status == 200) {
                    let order = xhr.responseText;
                    // console.log(order);
                    $('.alertbox .wrapper').text("訂位成功！");
                    $('.alertbox').addClass("on");

                    // 關掉提示燈箱
                    $('.alertbox .boxclose').click(function() {
                        $('.alertbox').removeClass("on");
                        location.href = "main.html";
                    });


                } else {
                    console.log(xhr.status);
                }
            };

            //訂單 
            let data = {};
            data.memNo = localStorage['memNo'];


            let now = new Date();
            datenow = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

            data.datenow = datenow;

            data.orderName = $('#ordername').val();
            data.orderPhone = $('#ordertel').val();
            data.orderEmail = $('#orderemail').val();
            data.orderPrice = $('.subtotal').text();
            data.orderPoints = $('#ordepoint').val();
            data.orderTotal = $('.total').text();
            data.routeNo = localStorage['routeNo'];
            data.orderPeople = localStorage['people'];


            //套餐訂單明細：數量、價格
            data.meal = [];

            for (let i = 1; i <= 3; i++) {
                let meal = {};
                meal.mealNo = i;
                meal.mealListCount = $(`.meal${i}amount:eq(0)`).text();
                meal.mealListPrice = $(`.meal${i}price:eq(0)`).text();

                // 套餐數量不為0，才存進資料庫
                if (meal.mealListCount != 0) {
                    data.meal.push(meal);
                }
            }


            //客製化料理訂單明細：料理編號、數量、單價
            data.custo = [];
            for (let i = 0; i < $('.mdcusto .custonow').length; i++) {
                let custo = {};
                custo.custoNo = $(`.mdcusto .custonow:eq(${i})`).attr("custono");
                custo.custoCount = $(`.mdcusto .custocount:eq(${i})`).text();
                custo.custoPrice = parseInt($(`.mdcusto .custoprice:eq(${i})`).text());
                data.custo.push(custo);
            }


            let data_info = JSON.stringify(data);
            // console.log(data_info);

            // windows
            xhr.open('post',  './php/orderdetail_order.php',  true);

            // Mac
            // xhr.open('POST', 'http://localhost:8080/orderdetail_order.php', true);

            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data_info);

        }
    });

});