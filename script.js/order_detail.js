window.addEventListener('load', function() {



    // 訂位信箱自動帶入會員帳號
    // 訂位姓名自動帶入會員帳號
    // 點數抓會員點數、不可超過總計
    // 點數旁邊有一個小框，可打開看點數規則
    // 送出訂單，資訊填寫不完整的提示


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
    let custototal = 0; // 小計總和
    for (let i = 0; i < custoLength; i++) {
        custos = JSON.parse(localStorage['custo']);
        // 圖片
        // img = custos[i].name;
        // 料理名稱
        name = custos[i].name;
        // 數量
        amount = custos[i].amount;
        // 單價
        price = custos[i].price;
        // 小計
        total = parseInt(amount) * parseInt(price);
        // 編號custo.custoNo
        custoNo = custos[i].custoNo;
        // 桌機顯示
        $('.custoline').after(`
        <div class="row mdcusto align-items-center ">
        <div class="col-md-4 ">
            <div class="row ">
                <div class="col-6 col-md-12 divorder ">
                    <div class="row align-items-center custorow">
                        <div class="col-6 ">
                            <img src="./images/menupic1.png " alt=" ">
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
        $('.smline').after(`
        <div class="row smcusto ">
        <div class="col-12 ">
            <div class="row align-items-center divorder ">
                <div class="col-6 ">
                <p class="custonow " custono="${custoNo}">${name}</p>
                </div>
                <div class="col-6 ">
                    <img src="./images/menupic1.png " alt=" ">
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
                alert(xhr.status);
            };

        };

        let data = `memNo=${localStorage['memNo']}`;
        console.log(data);
        xhr.open("POST", "./php/orderdetail_point.php");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    };

    // 點數不可超過最大可用點數
    $('#ordepoint').change(function() {
        let val = $('#ordepoint').val();
        if (val < 0) {
            $('#ordepoint').val(0);
        } else if (val > point) {
            $('#ordepoint').val(point);
        } else if (val < point) {
            $('#ordepoint').val(parseInt(val));
        } else {
            $('#ordepoint').val(0);
        };
        checkTotal();

    });




    // 送出訂單
    // 檢查訂位資訊都填寫好
    $('.next').click(function() {
        if ($('#ordername').val() == "") {
            alert('請填寫姓名');
        } else if ($('#ordertel').val() == "") {
            alert('請填寫聯絡電話');
        } else if ($('#orderemail').val() == "") {
            alert('請填寫信箱');
        } else {

            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                if (xhr.status == 200) {
                    let order = xhr.responseText;
                    // alert(order);

                } else {
                    alert(xhr.status);
                }
            };


            // windows
            xhr.open('post',  './php/orderdetail_order.php',  true);

            // Mac
            // xhr.open('POST', 'http://localhost:8888/orderdetail_order.php', true);

            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            //訂單 
            let data = {};
            data.memNo = '1';

            datenow = $('.datenow').text();
            datenow = datenow.replace('/', '-');
            datenow = datenow.replace('/', '-');
            data.datenow = datenow;

            data.orderName = $('#ordername').val();
            data.orderPhone = $('#ordertel').val();
            data.orderEmail = $('#orderemail').val();
            data.orderPrice = $('.subtotal').text();
            data.orderPoints = $('#ordepoint').val();
            data.orderTotal = $('.total').text();
            data.routeNo = '1';

            // 共有幾個套餐
            data.meals = $('main').find($('.mdmeal')).length;

            //套餐訂單明細：數量、價格
            data.mealListCount1 = $(`.meal1amount:eq(0)`).text();
            data.mealListCount1 = $(`.meal1amount:eq(0)`).text();
            data.mealListPrice1 = $(`.meal1price:eq(0)`).text();
            data.mealListCount2 = $(`.meal2amount:eq(0)`).text();
            data.mealListPrice2 = $(`.meal2price:eq(0)`).text();
            data.mealListCount3 = $(`.meal3amount:eq(0)`).text();
            data.mealListPrice3 = $(`.meal3price:eq(0)`).text();

            //客製化料理訂單明細：料理編號、數量、單價
            data.custo = [];
            for (let i = 0; i < $('.custonow').length / 2; i++) {
                let custo = {};
                custo.custoNo = $(`.custonow:eq(${i})`).attr("custono");
                custo.custoCount = $(`.custocount:eq(${i})`).text();
                custo.custoPrice = parseInt($(`.custoprice:eq(${i})`).text());
                data.custo.push(custo);
                alert(parseInt($(`.custoprice:eq(${i})`).text()));
            }

            let data_info = JSON.stringify(data);
            console.log(data_info);
            xhr.send(data_info);

        }
    });


});