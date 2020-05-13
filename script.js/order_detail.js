window.addEventListener('load', function() {


    // 客製化料理訂單明細
    // 訂位信箱自動帶入會員帳號
    // 訂位姓名自動帶入會員帳號
    // 點數抓會員點數、不可超過總計
    // 點數旁邊有一個小框，可打開看點數規則
    // 送出訂單，資訊填寫不完整的提示


    // localStorage.clear();

    // 套餐訂單明細

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


    // 訂位付款資訊
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

    // 顯示訂位總金額
    if ($('.subtotal').text()) {
        total();
    }
    $('#ordepoint').change(function() {
        total();
    });


    function total() {
        let subtotal = parseInt($('.subtotal').text());
        let point = parseInt($('#ordepoint').val());

        if (point) {
            $('.total').text(subtotal - point);
        } else {
            $('.total').text(subtotal);
            $('#ordepoint').val(0);
        }


    };


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


            //客製化料理訂單明細
            c1 = ['A餐', 1, 1200];
            c2 = ['B餐', 2, 1200];
            c3 = ['C餐', 2, 1200];
            data.custo = "[1, 1, 1200],[2, 2, 1200],[3, 2, 1200]";




            // $(`.meal1amount:eq(0)`).text();
            // data.mealListCount1 = $(`.meal1amount:eq(0)`).text();


            let data_info = JSON.stringify(data);
            console.log(data_info);
            xhr.send(data_info);

        }
    });


});