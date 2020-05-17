window.addEventListener('load', function() {
    // console.log(1);

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

    // 訂位月曆

    // 顯示燈箱
    $('#calimg').click(function() {
        $('.box').css("display", "block");
    });

    $(".boxclose").click(function() {
        $('.box').css("display", "none");
    });


    let now = new Date(), //今天日期
        days = document.getElementsByClassName('day'), //每一格td
        portnow; //現在點選的港口

    // 現在年月
    $('.year').text(now.getFullYear());
    $('.month').text(now.getMonth() + 1);

    // 按上個月
    $('.prev').click(function() {
        let month = $('.month').text();
        if (month < 2) {
            month = 13;
            $('.year').text($('.year').text() - 1);
        }
        $('.month').text(month - 1);
        showCalender();
    });

    // 按下個月
    $('.next').click(function() {
        let month = parseInt($('.month').text());
        if (month > 11) {
            month = 0;
            year = parseInt($('.year').text());
            $('.year').text(year + 1);
        }
        $('.month').text(month + 1);
        showCalender();
    });

    // 按港口
    portnow = "深澳港";
    $(".btnport").click(function() {
        $(this).addClass("on");
        $(".btnport").not(this).removeClass("on");
        portnow = $(this).text();
        showCalender();

        // console.log(portnow);
    });



    // 營業日被摸到會顯示剩餘座位數

    function people() {
        $('td').mouseover(function() {
            if ($(this).attr("remaining")) {
                $('.remaining').text($(this).attr("remaining"));
            } else {
                $('.remaining').text(0);

            }

        });

    }

    //下載完就執行
    showCalender();

    function showCalender() {
        console.log(portnow);

        let year = $('.year').text(), //現在選的年份
            month = $('.month').text(), //現在選的月份
            day = 0, //這個月有幾天
            first = new Date(year, month - 1, 1).getDay(); //現在選的月份的第一天是禮拜幾?

        // 歸零：清空月曆、清除顏色、顯示第5和第6星期
        $('.day').text("");
        $('.day').removeClass("on1").removeClass("on2").removeClass("on3").removeAttr("remaining");

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
                day = 29;
            } else if (year % 100 == 0) {
                for (let i = 0; i <= 27; i++) {
                    days[first + i].innerText = i + 1;

                }
                day = 28;

            } else if (year % 4 == 0) {
                for (let i = 0; i <= 28; i++) {
                    days[first + i].innerText = i + 1;

                }
                day = 29;

            } else {
                for (let i = 0; i <= 27; i++) {
                    days[first + i].innerText = i + 1;

                }
                day = 28;
            }

        } else if (Month.indexOf(parseInt(month)) != -1) {
            for (let i = 0; i <= 30; i++) {
                days[first + i].innerText = i + 1;

            }
            day = 31;

        } else {
            for (let i = 0; i <= 29; i++) {
                days[first + i].innerText = i + 1;
            }
            day = 30;

        }


        changeColor();

        function changeColor() {
            // 營業日變色

            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                if (xhr.status == 200) {
                    let routenow = JSON.parse(xhr.responseText);

                    // 營業日期改成日
                    // 計算剩餘座位
                    for (i in routenow) {
                        routenow[i].routeDate = routenow[i].routeDate.substr(8, 2);
                        if (routenow[i].routeDate < 10) {
                            routenow[i].routeDate = routenow[i].routeDate.substr(1, 1);
                        }
                        routenow[i].routeRemaining = routenow[i].routeSeat - routenow[i].routeCount;
                    }
                    // console.log(routenow);

                    // 找出是營業日的標籤，改變顏色
                    for (i = 0; i < $('.day').length; i++) {
                        for (j = 0; j < routenow.length; j++) {
                            if ($(`.day:eq(${i})`).text() == routenow[j].routeDate) {

                                if (portnow == "深澳港") {
                                    $(`.day:eq(${i})`).addClass("on1");
                                } else if (portnow == "梧棲港") {
                                    $(`.day:eq(${i})`).addClass("on2");
                                } else {
                                    $(`.day:eq(${i})`).addClass("on3");
                                }

                                $(`.day:eq(${i})`).attr("remaining", routenow[j].routeRemaining);
                                people();

                            }
                        }
                    }

                } else {
                    alert(xhr.status);
                }


            };


            let data = {};
            data.port = portnow;
            data.form = `${year}-${month}-1`;
            data.to = `${year}-${month}-${day}`;

            data = JSON.stringify(data);
            // console.log(data);
            xhr.open("POST", "./php/order_calendar.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);


        };


    };




});