window.addEventListener('load', function() {

    // 按步驟切換頁面位置
    // $('.section2').css('display', 'none');
    // $('.section3').css('display', 'none');


    // 第一屏按下一步，確認訂位人數
    $('.section1 .next').click(function() {

        let inputVal = parseInt($('#people').val());

        // 訂位人數小於1，無法下一步
        if (inputVal < 0) {
            alert('請先選擇訂位人數！');

        } else {
            // $('html').animate({
            //     scrollTop: $('.section2').offset().top
            // }, 600);
            $('.section1').css('display', 'none');
            $('.section2').css('display', 'block');

        }

    });

    // 第二屏按下一步，確認訂位人數
    $('.section2 .next').click(function() {

        let people = parseInt($('#people').val());
        let total = parseInt($('.amount').text());

        // 套餐數量小於訂位人數，無法下一步
        if (total < people) {
            alert('每人低消一份套餐喔！');
        } else {
            $('html').animate({
                scrollTop: $('.section3').offset().top
            }, 600);
            $('.section2').css('display', 'none');
            $('.section3').css('display', 'block');

        }

    });

    // 第二屏按上一步
    $('.section2 .previous').click(function() {
        $('html').animate({
            scrollTop: $('.section1').offset().top
        }, 600);
        $('.section1').css('display', 'block');
        $('.section2').css('display', 'none');

    });

    // 第三屏按上一步
    $('.section3 .previous').click(function() {
        $('html').animate({
            scrollTop: $('.section2').offset().top
        }, 600);
        $('.section2').css('display', 'block');
        $('.section3').css('display', 'none');

    });

    // localStorage.clear();

    // 第三屏按下一步，訂位點餐資訊存進Storage
    $('.section3 .next').click(function() {


        localStorage['port'] = $('.port label.on').prev().attr('id');
        localStorage['people'] = $('#people').val();
        dateNow = document.getElementById('date').value;
        localStorage['date'] = dateNow;
        localStorage['meal1amount'] = $('#mealAamount').val();
        localStorage['meal2amount'] = $('#mealBamount').val();
        localStorage['meal3amount'] = $('#mealCamount').val();
        localStorage['meal1price'] = $('.mealAprice').text();
        localStorage['meal2price'] = $('.mealBprice').text();
        localStorage['meal3price'] = $('.mealCprice').text();

        custoLength = $('.section3 table').find('td.custo').length;
        custo = "";
        for (i = 2; i <= (custoLength + 1); i++) {
            custo += $(`.section3 table tr:nth-child(${i}) td.custo`).text() + "|";
        }
        localStorage['custo'] = custo;


    });


    // 訂位頁面，選不同港口
    $('.section1 .port label').click(function() {

        $(this).addClass('on');
        $('.port label').not(this).removeClass('on');
    });


    // 訂位頁面，人數不小於0、不是空值
    $('#people').change(function people() {
        let inputVal = $('#people').val();
        if (inputVal == "" || parseInt(inputVal) < 0) {
            // $('#people').val(1);
            alert('請先選擇訂位人數！');
        }
    });

    // 套餐、客製化料理數量，不小於0、不是空值
    $('.meal').change(function() {

        let inputVal = $(this).val();
        if (inputVal == "" || parseInt(inputVal) < 0) {
            $(this).val(0);
        }


    });




    // 套餐、客製化料理、人數，按加改變數字
    $('.plus').click(function() {
        let val = parseInt($(this).prev().val());
        $(this).prev().val(val + 1);
    });

    // 套餐、客製化料理、人數，按減改變數字
    $('.minus').click(function() {
        let val = parseInt($(this).next().val());

        if ($(this).next().attr('id') == 'people') {
            if (val >= 2) {
                $(this).next().val(val - 1);
                console.log('1');
            }
        } else {
            if (val >= 1) {
                $(this).next().val(val - 1);
            }
        }

    });

    // 計算套餐數量

    $('#mealAamount').change(function() {
        mealAmount();
    });
    $('#mealBamount').change(function() {
        mealAmount();
    });
    $('#mealCamount').change(function() {
        mealAmount();
    });

    $('.section2 .minus').click(function() {
        mealAmount();
    });
    $('.section2 .plus').click(function() {
        mealAmount();
    });

    function mealAmount() {
        let mealA = parseInt($('#mealAamount').val());
        let mealB = parseInt($('#mealBamount').val());
        let mealC = parseInt($('#mealCamount').val());

        total = mealA + mealB + mealC;
        $('.amount').text(total);
    };

    // 客製化料理按刪除，清單中消失，表格列數不變

    $('.delete').click(function() {

        $(this).parent().parent().remove();
        $('.section3 table').append('<tr><td></td><td></td><td></td><td></td></tr>');
        let firsttd = $('.section3 table tr:nth-child(2) td:first-child');
        if (firsttd.text() == "") {
            firsttd.parent().html('<td colspan = "4"> 目前沒有客製化料理 </td>');
        }
    });

    // 月曆

    let now = new Date(), //今天日期
        days = document.getElementsByClassName('day'); //每一格td

    // 顯示年份
    let nowyear = document.getElementById('nowyear');
    // for (let i = 1900; i <= 2100; i++) {
    //     option = new Option(i, i);
    //     nowyear.add(option);
    // }
    // nowyear.selectedIndex = now.getFullYear() - 1900;


    // 顯示月份
    let nowmonth = document.getElementById('nowmonth');
    // for (let i = 1; i <= 12; i++) {
    //     option = new Option(i, i);
    //     nowmonth.add(option);
    // }
    // nowmonth.selectedIndex = now.getMonth();





    //下載完就執行
    // showCalender();


    function showCalender() {
        let year = nowyear.value, //現在選的年份
            month = nowmonth.value, //現在選的月份
            first = new Date(year, month - 1, 1).getDay(), //現在選的月份的第一天是禮拜幾?
            week5 = document.getElementById('week5'),
            week6 = document.getElementById('week6');


        // 歸零：清空月曆、清除顏色、顯示第5和第6星期
        for (i in days) {
            days[i].innerText = "";
            // days[i].style.backgroundColor = "white";

        }

        for (let i = 0; i < days.length; i++) {
            days[i].style.backgroundColor = "white";
        };

        week5.style.display = '';
        week6.style.display = '';


        // Month陣列存放有31天的月份
        let Month = [1, 3, 5, 7, 8, 10, 12];


        // 先判斷2月(400的倍數閏年 > 100的倍數平年 > 4的倍數閏年)
        // 再判斷有31天的月份
        // 其他就是30天


        if (month == 2) {

            if (year % 400 == 0) {
                for (let i = 0; i <= 28; i++) {
                    days[first + i].innerText = i + 1;
                }

            } else if (year % 100 == 0) {
                for (let i = 0; i <= 27; i++) {
                    days[first + i].innerText = i + 1;
                }

            } else if (year % 4 == 0) {
                for (let i = 0; i <= 28; i++) {
                    days[first + i].innerText = i + 1;
                }

            } else {
                for (let i = 0; i <= 27; i++) {
                    days[first + i].innerText = i + 1;
                }

            }

        } else if (Month.indexOf(parseInt(month)) != -1) {
            for (let i = 0; i <= 30; i++) {
                days[first + i].innerText = i + 1;
            }

        } else {
            for (let i = 0; i <= 29; i++) {
                days[first + i].innerText = i + 1;
            }

        }


        // 確認有沒有第5和第6個星期

        if (days[28].innerText == "") {
            week5.style.display = 'none';
            week6.style.display = 'none';
        } else if (days[35].innerText == "") {
            week6.style.display = 'none';
        }


        // 今天的那一格變色
        if (year == now.getFullYear() && month == now.getMonth() + 1) {
            days[first + now.getDate() - 1].style.backgroundColor = 'yellow';

        }


    }

    // 改變年份
    // nowyear.addEventListener('change', function() {
    //     showCalender();
    // });


    // // 改變月份
    // nowmonth.addEventListener('change', function() {
    //     showCalender();
    // });



    // 地圖

    // function initMap() {
    //     var port1 = {
    //         lat: 25.132219,
    //         lng: 121.819155
    //     };
    //     var port2 = {
    //         lat: 24.2922424,
    //         lng: 120.5136367
    //     };
    //     var port3 = {
    //         lat: 22.6266234,
    //         lng: 120.2747798
    //     };
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 7,
    //         center: port2
    //     });
    //     var marker1 = new google.maps.Marker({
    //         position: port1,
    //         map: map
    //     });
    //     var marker2 = new google.maps.Marker({
    //         position: port2,
    //         map: map
    //     });
    //     var marker3 = new google.maps.Marker({
    //         position: port3,
    //         map: map
    //     });
    // }



    // 餐點數量不小於0、不是空值

    $('.meal').change(function() {

        let inputVal = $(this).val();

        if (inputVal == "") {
            $(this).val(0);
        }
        if (parseInt(inputVal) < 0) {
            $(this).val(0);
        }
        console.log($(this).val());

    });


});