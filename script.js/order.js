window.addEventListener('load', function() {

    // 按步驟切換頁面位置
    // $('.section2').css('display', 'none');
    // $('.section3').css('display', 'none');


    /////////////////////各頁面切換//////////////////////

    // localStorage.clear();
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
            // 存訂位港口、日期、人數
            localStorage['port'] = $('.port label.on').prev().attr('id');
            dateNow = document.getElementById('date').value;
            localStorage['date'] = dateNow;
            localStorage['people'] = $('#people').val();
            $('.section1').css('display', 'none');
            $('.section2').css('display', 'block');

        }
        // 檢查訂位人數是否超過剩餘人數
        people();
        // 關掉月曆燈箱
        $('.box').css("display", "none");
    });

    // 第二屏按下一步，確認訂位人數
    $('.section2 .next').click(function() {

        let people = parseInt($('#people').val());
        let total = parseInt($('.amount').text());

        // 套餐數量小於訂位人數，無法下一步
        if (total < people) {
            alert('每人低消一份套餐喔！');
        } else {
            // 存套餐資料
            localStorage['meal1amount'] = $('#mealAamount').val();
            localStorage['meal2amount'] = $('#mealBamount').val();
            localStorage['meal3amount'] = $('#mealCamount').val();
            localStorage['meal1price'] = $('.mealAprice').text();
            localStorage['meal2price'] = $('.mealBprice').text();
            localStorage['meal3price'] = $('.mealCprice').text();

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

        if (member.memNo) {
            // 存訂位港口、日期、人數
            localStorage['port'] = $('.port label.on').prev().attr('id');
            dateNow = document.getElementById('date').value;
            localStorage['date'] = dateNow;
            localStorage['people'] = $('#people').val();

            // 存套餐資料
            localStorage['meal1amount'] = $('#mealAamount').val();
            localStorage['meal2amount'] = $('#mealBamount').val();
            localStorage['meal3amount'] = $('#mealCamount').val();
            localStorage['meal1price'] = $('.mealAprice').text();
            localStorage['meal2price'] = $('.mealBprice').text();
            localStorage['meal3price'] = $('.mealCprice').text();

            // 存會員資料
            localStorage['memNo'] = member.memNo; //編號
            localStorage['memName'] = member.memName; //姓名
            localStorage['memId'] = member.memId; //信箱


            // 存客製化料理數量
            localStorage['custoLength'] = $('.custo').length;

            // 存客製化料理資料
            let custoStorage = [];
            if ($('.custo').length != 0) {

                for (let i = 0; i < $('.custo').length; i++) {
                    let custo = {};
                    custo.name = $.trim($(`.custo:eq(${i})`).text());
                    custo.price = $(`.custoPrice:eq(${i})`).text();
                    custo.amount = $(`.custoAmount:eq(${i})`).val();
                    custo.custoNo = $(`.dishname:eq(${i})`).attr("custono");
                    custoStorage.push(custo);
                }

                localStorage['custo'] = JSON.stringify(custoStorage);
            };

            // 進入訂購資料頁
            location.href = "order_detail.html";

        } else {
            alert("請先登入會員");
            $('#Login,#Login_back').css('display', 'block');
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'block');
        }

    });



    // 套餐、人數，按加改變數字

    $('.plus').click(function() {
        let val = parseInt($(this).prev().val());
        $(this).prev().val(val + 1);
        people();
    });

    // 套餐、人數，按減改變數字

    $('.minus').click(function() {
        let val = parseInt($(this).next().val());

        if ($(this).next().attr('id') == 'people') {
            if (val >= 2) {
                $(this).next().val(val - 1);
            }
        } else {
            if (val >= 1) {
                $(this).next().val(val - 1);
            }
        }
        people();
    });

    // 套餐、客製化料理數量，不小於0、不是空值

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


    /////////////////////訂位頁面//////////////////////

    let selectdate = document.getElementById("date");
    let routenow; //存放航程紀錄的陣列
    let now = new Date(); //今天日期
    let today = now.getDate(); //今天日期
    let firstYear = (now.getFullYear()).toString(); //今天月份字串
    let firstMonth = (now.getMonth() + 1).toString(); //今天年份字串

    if (firstMonth < 10) {
        Month = "0" + firstMonth;
    } else {
        Month = firstMonth;
    }
    if (today < 10) {
        Day = "0" + today;
    } else {
        Day = today;
    }

    let todayDate = firstYear + Month + Day; //今天年份字串



    //選港口
    //外面選不同港口，燈箱裡的港口跟著改變
    let portnow = "深澳港"; // 現在點選的港口
    if (localStorage['port']) {
        portnow = localStorage['port'];
        if (portnow == "port1") {
            portnow = "深澳港";
        } else if (portnow == "port2") {
            portnow = "梧棲港";
        } else {
            portnow = "高雄港";
        }
        $('.section1 .port label').removeClass('on');
        for (let i = 0; i < 3; i++) {
            if ($(`.section1 .port label:eq(${i})`).text() == portnow) {
                $(`.section1 .port label:eq(${i})`).addClass('on');
            }

        };
    }
    $('.section1 .port label').click(function() {
        $(this).addClass('on');
        $('.port label').not(this).removeClass('on');
        portnow = $(this).text();

        // 燈箱裡的港口跟著改變
        $(".btnport").removeClass("on");
        for (let i = 0; i < $(".btnport").length; i++) {
            if ($(`.btnport:eq(${i})`).text() == portnow) {
                $(`.btnport:eq(${i})`).addClass("on");
            }
        }
        selectDate();

    });


    // 選日期
    // 下拉選單預設顯示目前選擇的港口、接下來5個航程
    selectDate();

    function selectDate(index) {
        $("#date").empty();
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
                date = JSON.parse(xhr.responseText);
                // console.log(date);

                for (let i = 0; i < date.length; i++) {
                    // 只顯示5個選項
                    if (i < 5) {
                        option = new Option(date[i].routeDate, date[i].routeDate)
                        date[i].routeRemaining = date[i].routeSeat - date[i].routeCount;
                        selectdate.add(option);
                        $('#date option:last-child').attr("remaining", date[i].routeRemaining);

                    }
                }

                // 按燈箱裡的td，會傳參數，改變選項
                if (index) {
                    for (let i = 0; i < $(`#date option`).length; i++) {
                        if ($(`#date option:eq(${i})`).text() == index) {
                            $(`#date option:eq(${i})`).attr("selected", "selected");
                        }

                    }
                    // //顯示剩餘座位數
                    let i = selectdate.selectedIndex;
                    remaining = $(`#date option:eq(${i})`).attr("remaining");
                    $('.answer .remaining').text(remaining);
                } else {
                    //顯示剩餘座位數
                    let i = selectdate.selectedIndex;
                    remaining = $(`#date option:eq(${i})`).attr("remaining");
                    $('.answer .remaining').text(remaining);

                    // 燈箱裡的年月變成現在選的時間
                    let nowdate = $(`#date option:eq(${i})`).val();
                    $('.year').text(nowdate.substr(0, 4));
                    $('.month').text(parseInt(nowdate.substr(5, 2)));
                    showCalender();
                }


            } else {
                alert(xhr.status);
            };
        };

        let data = {};
        data.port = portnow;
        data.form = `${firstYear}-${firstMonth}-${today}`;

        data = JSON.stringify(data);
        console.log(data);
        xhr.open("POST", "./php/order_calendar.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    }

    //下拉選單選擇的日期改變，顯示的剩餘座位數不同
    selectdate.onchange = selectChange;

    function selectChange() {
        let i = selectdate.selectedIndex;
        remaining = $(`#date option:eq(${i})`).attr("remaining");
        $('.answer .remaining').text(remaining);
        let nowdate = $(`#date option:eq(${i})`).val();

        // 燈箱裡的年月變成現在選的時間
        $('.year').text(nowdate.substr(0, 4));
        $('.month').text(parseInt(nowdate.substr(5, 2)));

        // 改變燈箱顯示的月曆
        showCalender();
    };

    //選人數
    // 人數不小於0、不是空值
    if (localStorage['people']) {
        $('#people').val(localStorage['people']);
    }
    $('#people').change(function() {
        people();
    });

    function people() {
        let inputVal = $('#people').val();
        let maxVal = parseInt($('.answer .remaining').text());
        if (inputVal == "" || parseInt(inputVal) < 0) {
            alert('請先選擇訂位人數！');
            $('#people').val("1");
        } else if (inputVal > maxVal) {
            alert('超過可訂位人數！');
            $('#people').val("1");
        }

    };


    /////////////////////航程月曆燈箱//////////////////////
    // 燈箱顯示、消失
    $('#calimg').click(function() {
        // 清除燈箱裡的港口
        $(".btnport").removeClass("on");

        // 打開燈箱先抓外面選的港口
        for (let i = 0; i < 3; i++) {
            if ($(`.section1 .port label:eq(${i})`).hasClass('on')) {
                portnow = $(`.section1 .port label:eq(${i})`).text();
                // console.log(portnow);
                // 改變燈箱裡的港口
                if ($(`.btnport:eq(${i})`).text() == portnow) {
                    $(`.btnport:eq(${i})`).addClass("on");

                    // 改變燈箱裡的時間
                    let j = selectdate.selectedIndex;
                    change = $(`#date option:eq(${j})`).text(); //下拉選單現在選的時間
                    $('.year').text(change.substr(0, 4));
                    $('.month').text(parseInt(change.substr(5, 2)));

                    showCalender();
                    $('.box').css("display", "block");

                }

            }
        }

    });

    $(".boxclose").click(function() {
        $('.box').css("display", "none");
    });


    // 月曆內容
    let days = document.getElementsByClassName('day'); //每一格td

    // 現在年月
    $('.year').text(now.getFullYear());
    $('.month').text(now.getMonth() + 1);

    // 資料庫沒有營業日的月曆，不顯示
    hideCalender();

    let first, //可顯示最早的年月
        last; //可顯示最晚的年月

    function hideCalender() {

        // 連資料庫找所有航程
        let xhr = new XMLHttpRequest;

        xhr.onload = function ans() {
            if (xhr.status == 200) {
                let lastMonth = JSON.parse(xhr.responseText);
                // 最後月份
                lastYear = lastMonth.routeDate.substr(0, 4);
                lastMonth = lastMonth.routeDate.substr(5, 2);
                last = lastYear + lastMonth;
                // 目前月份
                if (firstMonth < 10) {
                    firstMonth = "0" + firstMonth;
                }
                first = firstYear + firstMonth;

            } else {
                alert("xhr.status");
            }
        };

        xhr.open("GET", "./php/order_route.php");
        xhr.send(null);
    };


    //  燈箱裡按上個月
    $('.boxprev').click(function() {
        // console.log("first", first);
        // console.log("last", last);
        let year = $('.year').text();
        let month = $('.month').text();

        if (month < 2) {
            newmonth = 12;
            newyear = year - 1;
        } else {
            newmonth = month - 1;
            newyear = year;
        }

        if (newmonth < 10) {
            newmonth = "0" + newmonth;
        }
        change = newyear.toString() + newmonth;
        // console.log(change);
        if (first <= change && change <= last) {
            $('.year').text(newyear);
            $('.month').text(parseInt(newmonth));
        }
        showCalender();
    });

    //  燈箱裡按下個月
    $('.boxnext').click(function() {
        let year = parseInt($('.year').text());
        let month = parseInt($('.month').text());

        if (month > 11) {
            newmonth = 1;
            newyear = year + 1;
        } else {
            newmonth = month + 1;
            newyear = year;
        }
        if (newmonth < 10) {
            newmonth = "0" + newmonth;
        }
        change = newyear.toString() + newmonth;
        if (first <= change && change <= last) {
            $('.year').text(newyear);
            $('.month').text(parseInt(newmonth));
        }

        showCalender();
    });

    // 燈箱裡面按港口
    $(".btnport").click(function() {

        $(this).addClass("on");
        $(".btnport").not(this).removeClass("on");
        portnow = $(this).text();
        showCalender();

    });

    // 營業日被摸到會顯示剩餘座位數
    function boxRemaining() {
        $('td').mouseover(function() {
            if ($(this).attr("remaining")) {
                $('.box .remaining').text($(this).attr("remaining"));
                $(this).css("pointer", "cursor");
            } else {
                $('.box .remaining').text(0);

            }
        });

    }


    // 點擊燈箱裡的日期，外面的資料跟著改變
    function tdClick() {
        $('td').click(function() {


            if ($(this).attr("remaining")) {

                // 改變港口
                $('.port label').removeClass("on");
                for (let i = 0; i < $(".btnport").length; i++) {
                    if ($(`.btnport:eq(${i})`).hasClass('on')) {
                        $(`.port label:eq(${i})`).addClass("on");
                    }
                }

                // 改變日期
                year = $('.year').text();
                month = $('.month').text();
                day = $(this).text();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                date = year + "-" + month + "-" + day;
                // console.log(date);

                selectDate(date);
            }
        });

    }




    //月曆上的資料
    // 先顯示所有日期
    // 找出營業日變色
    // 資料庫沒有營業資料的月份不顯示(上個月和下個月的按鈕失效)
    showCalender();


    function showCalender() {
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
            };

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

        };

        // 營業日變色
        changeColor();

        function changeColor() {
            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                if (xhr.status == 200) {
                    routenow = JSON.parse(xhr.responseText);
                    // console.log(routenow);

                    for (i in routenow) {

                        // 營業日期存成數字
                        routenow[i].oridate = routenow[i].routeDate.replace("-", "").replace("-", "");
                        // 把營業日期存成斜線的格式
                        routenow[i].routeDate = routenow[i].routeDate.replace("-", "/").replace("-", "/");
                        // 把營業日期存成斜線的格式
                        routenow[i].routeDate = routenow[i].routeDate.replace("-", "/").replace("-", "/");
                        // 把營業日單獨存成一個陣列，parseInt()讓10號以前，從01變成1
                        routenow[i].routeDay = parseInt(routenow[i].routeDate.substr(8, 2));
                        // 計算剩餘座位
                        routenow[i].routeRemaining = routenow[i].routeSeat - routenow[i].routeCount;
                    };


                    // 找出是營業日的標籤，改變顏色

                    if (month < 10) {
                        month = "0" + month;
                    };
                    for (i = 0; i < routenow.length; i++) {
                        // 判斷日期大於本月
                        if (routenow[i].oridate > todayDate) {
                            // 營業時間的年月和目前顯示的年月相同
                            for (j = 0; j < $('.day').length; j++) {
                                a = routenow[i].oridate.substr(0, 6); //營業時間的年月
                                b = year + month; //目前顯示的年月
                                if (a == b) {
                                    if ($(`.day:eq(${j})`).text() == routenow[i].routeDay) {

                                        if (portnow == "深澳港") {
                                            $(`.day:eq(${j})`).addClass("on1");
                                        } else if (portnow == "梧棲港") {
                                            $(`.day:eq(${j})`).addClass("on2");
                                        } else {
                                            $(`.day:eq(${j})`).addClass("on3");
                                        }

                                        $(`.day:eq(${j})`).attr("remaining", routenow[i].routeRemaining);


                                    }
                                }
                            };

                        }
                    };

                    // 避免重複觸發點擊營業日期的事件
                    $('td').unbind();
                    tdClick();
                    boxRemaining();


                } else {
                    alert(xhr.status);
                };


            };


            let data = {};
            data.port = portnow;
            data.form = `${year}-${month}-1`;
            // data.to = `${year}-${month}-${day}`;

            data = JSON.stringify(data);
            // console.log(data);
            xhr.open("POST", "./php/order_calendar.php", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);


        };


    };

    /////////////////////套餐頁面//////////////////////

    let meals; //套餐資料陣列

    // 顯示三個套餐的圖片、菜名、價格
    showMeal();

    function showMeal() {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                meals = JSON.parse(xhr.responseText);
                // console.log(meals);

                for (let i = 0; i < meals.length; i++) {

                    // 套餐價格、菜名、圖片
                    if (meals[i].mealName == "A套餐") {
                        $('.mealAprice').text(meals[i].mealPrice);
                        name = "A套餐";
                        changeMeal(name);

                    } else if (meals[i].mealName == "B套餐") {
                        $('.mealBprice').text(meals[i].mealPrice);

                    } else {
                        $('.mealCprice').text(meals[i].mealPrice);

                    };
                }

            } else {
                alert(xhr.status);
            }


        };

        xhr.open("GET", "./php/order_meal.php");
        xhr.send(null);

    };

    // 下一個套餐按鈕

    $('#nextmeal').click(function() {
        if ($('.mealname h3').text() == "A套餐") {
            name = "B套餐";
        } else if ($('.mealname h3').text() == "B套餐") {
            name = "C套餐";
        } else if ($('.mealname h3').text() == "C套餐") {
            name = "A套餐";
        }
        changeMeal(name);
    });
    // 上一個套餐按鈕
    $('#previousmeal').click(function() {
        if ($('.mealname h3').text() == "A套餐") {
            name = "C套餐";
        } else if ($('.mealname h3').text() == "B套餐") {
            name = "A套餐";
        } else if ($('.mealname h3').text() == "C套餐") {
            name = "B套餐";
        }
        changeMeal(name);
    });

    // 抓上次選取的套餐資料
    if (localStorage['meal1amount']) {
        $('#mealAamount').val(localStorage['meal1amount']);
        $('#mealBamount').val(localStorage['meal2amount']);
        $('#mealCamount').val(localStorage['meal3amount']);
    }

    // 改變左邊套餐內容
    function changeMeal(name) {
        for (let i = 0; i < meals.length; i++) {
            // 套餐價格、菜名、圖片
            if (meals[i].mealName == name) {
                $('.mealname h3').text(meals[i].mealName);
                $('.mealFirst').text(meals[i].mealFirst);
                $('.mealMain').text(meals[i].mealMain);
                $('.mealDishOne').text(meals[i].mealDishOne);
                $('.mealDishTwo').text(meals[i].mealDishTwo);
                $('.mealSoup').text(meals[i].mealSoup);
                $('.mealPrice').text(meals[i].mealPrice);

            };
        }


    };

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


    /////////////////////客製化料理頁面//////////////////////


    let custos; //客製化料理陣列

    // 先判斷是否登入

    // if (member.memNo != "") {
    if ($('.pu_mem_login_suc_div').text() != false) {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                custos = JSON.parse(xhr.responseText);
                // console.log(custos);

                if (custos == "") {
                    //已登入，沒有客製化料理
                    $('#nocusto').css('display', 'block');

                } else {
                    //已登入，有料理

                    // 抓同帳號上次存取的客製化料理
                    if (localStorage['memNo'] == member.memNo && localStorage['custoLength']) {
                        $('.custotable .nocusto').remove();
                        custoarr = JSON.parse(localStorage['custo']);
                        console.log(custoarr);
                        for (let i = 0; i < custoarr.length; i++) {
                            $('.custotable').append(`<tr><td class="custo" custono="${custoarr[i].custono}">${custoarr[i].name}</td><td class="custoPrice">${custoarr[i].price}</td><td><span class="minus">-</span><input type="number" name="meal" min="0" class="custoAmount meal" value="1"><span class="plus">+</span></td><td><img src="./images/trash.svg" alt="刪除" class="delete"></td></tr>`);
                            $('.custotable tr:last-child input').val(custoarr[i].amount);

                        };


                        // 改變客製化料理數量
                        custoamount();

                        // 從購物車刪除客製化料理
                        deleteCusto();
                    }
                    showCusto(0);
                };
            } else {
                alert(xhr.status);
            }
        };

        data = ` memNo=${member.memNo}`;
        // console.log(data);
        xhr.open("POST", "./php/order_custo.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    } else {
        //未登入
        $('#nologin').css('display', 'block');
    }

    // 客製化料理點擊登入按鈕，出現登入燈箱
    $('.buttonlogin').click(function() {
        $('#Login,#Login_back').css('display', 'block');
        $('#pu_mem_resist_wrap').css('display', 'none');
        $('#pu_mem_forget_wrap').css('display', 'none');
        $('#pu_mem_login_wrap').css('display', 'block');
    });

    // 顯示客製化料理
    function showCusto(nowpage) {
        let pages = Math.ceil(custos.length / 3);

        if (nowpage + 1 <= pages) {
            $('.section3 .leftrow2').removeClass("justify-content-center").empty();

            for (let i = 0; i < 3; i++) {
                no = i + nowpage * 3;
                if (custos[no]) {
                    $('.section3 .leftrow2').append(`
                        <div class="col-6 col-md-4">
                            <div class="dish">
                                <div class="img">
                                        <img src="./images/cook2.png " alt="">
                                </div>
                                <div class="name">
                                    <p class="dishname" custoNo="${custos[no].custoNo}">${custos[no].custoName}
                                            <img src="./images/cart.svg" alt="" class="cart">
                                    </p>
                                    <p><span class="dishprice">${custos[no].custoPrice}</span>元</p> 
                            </div>
                       </div>`);
                }

            }
            $('.nowpage').text(nowpage + 1 + "/" + pages);

        } else {
            $('.nowpage').text(pages + "/" + pages);
        }
        addCart();

    };

    // 客製化料理按前一頁
    $('.previouscusto').click(function() {
        nowpage = $('.nowpage').text().substr(0, 1) - 1; //現在第幾頁，0是第一頁
        if (nowpage > 0) {
            nowpage--
            showCusto(nowpage);
        }
    });

    // 客製化料理按下一頁
    $('.nextcusto').click(function() {
        nowpage = $('.nowpage').text().substr(0, 1) - 1; //現在第幾頁，0是第一頁
        nowpage++;
        showCusto(nowpage);
    });


    // 客製化料理加入購物車
    function addCart() {
        $('.cart').click(function() {

            // 清除「目前沒有客製化料理」
            $('.custotable .nocusto').remove();
            // 料理名稱
            let name = $(this).parent().text();
            // 價格
            let price = $(this).parent().next().find("span").text();
            // 料理編號
            let custono = $(this).parent().attr('custono');

            // 確認是否已加入購物車
            let a = true; //已加入
            if ($('.custo').length == 0) {
                add();

            } else {
                for (let i = 0; i < $('.custo').length; i++) {
                    if ($(`.custo:eq(${i})`).attr("custono") == custono) {
                        a = false;
                        alert("已加入購物車");
                        break;
                    }
                }

                if (a == true) {
                    add();
                }

            };

            // 加入購物車
            function add() {
                // 取消加減數量的觸發事件
                $('.section3 .plus').unbind();
                $('.section3 .minus').unbind();

                $('.custotable').append(`<tr><td class="custo" custono="${custono}">${name}</td><td class="custoPrice">${price}元</td><td><span class="minus">-</span><input type="number" name="meal" min="0" class="custoAmount meal" value="1"><span class="plus">+</span></td><td><img src="./images/trash.svg" alt="刪除" class="delete"></td></tr>`);

            };


            // 改變客製化料理數量
            custoamount();

            // 從購物車刪除客製化料理
            deleteCusto();

        });



    };


    // 改變客製化料理數量
    function custoamount() {
        $('.section3 .plus').click(function() {
            let val = parseInt($(this).prev().val());
            $(this).prev().val(val + 1);

        });

        $('.section3 .minus').click(function() {
            let val = parseInt($(this).next().val());
            if ($(this).next().attr('id') == 'people') {
                if (val >= 2) {
                    $(this).next().val(val - 1);
                }
            } else {
                if (val >= 1) {
                    $(this).next().val(val - 1);
                }
            }

        });


    };


    // 從購物車刪除客製化料理
    function deleteCusto() {
        $('.delete').click(function() {
            $(this).parent().parent().remove();
            let trLength = $('.section3 table tr').length;
            if (trLength == "1") {
                $('.section3 table').append('<tr  class="nocusto"><td colspan = "4" > 目前沒有客製化料理 </td></tr>');
            }
        });

    };



});