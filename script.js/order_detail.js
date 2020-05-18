window.addEventListener('load', function() {


    // localStorage.clear();

    // 第三屏按下一步，訂位點餐資訊存進Storage
    $('.section3 .next').click(function() {


        localStorage['port'] = $('.port label.on').prev().attr('id');
        localStorage['people'] = $('#people').val();
        localStorage['date'] = $('#date').value;
        localStorage['mealAamount'] = $('#mealAamount').val();
        localStorage['mealBamount'] = $('#mealBamount').val();
        localStorage['mealCamount'] = $('#mealCamount').val();
        localStorage['mealAprice'] = $('.mealAprice').text();
        localStorage['mealBprice'] = $('.mealBprice').text();
        localStorage['mealCprice'] = $('.mealCprice').text();



        custoLength = $('.section3 table').find('td.custo').length;
        custo = "";
        for (i = 2; i <= (custoLength + 1); i++) {
            custo += $(`.section3 table tr:nth-child(${i}) td.custo`).text() + "|";
        }
        localStorage['custo'] = custo;


    });



    // if(localStorage['mealAamount'] != 0){

    // }

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

});