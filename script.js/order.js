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
            // $('.section1').css('display', 'none');
            $('.section2').css('display', 'block');

        }
        // 檢查訂位人數是否超過剩餘人數
        people();
        // 關掉燈箱
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
        people();
    });

    // 套餐、客製化料理、人數，按減改變數字
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
        console.log('1');
    });


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


    /////////////////////訂位頁面//////////////////////

    let selectdate = document.getElementById("date");
    let n = 1; //n = 1 改變日期下拉選單
    let routenow; //存放航程紀錄的陣列
    //選港口
    // 外面選不同港口，燈箱裡的港口跟著改變
    let portnow = "深澳港"; // 現在點選的港口
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
        n = 1;
        showCalender();

    });

    // 選日期
    // 下拉選單只顯示目前選擇的港口，這個月的航程
    function showDate() {
        $("#date").empty();
        for (let i = 0; i < routenow.length; i++) {
            option = new Option(routenow[i].routeDate, routenow[i].routeDate)
            selectdate.add(option);
        }
        selectChange();

    };

    //下拉選單選擇的日期改變，顯示的剩餘座位數不同
    selectdate.onchange = selectChange;

    function selectChange() {
        let i = selectdate.selectedIndex;
        $('.answer .remaining').text(routenow[i].routeRemaining);
    };

    //選人數
    // 人數不小於0、不是空值
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
        $('.box').css("display", "block");
    });

    $(".boxclose").click(function() {
        $('.box').css("display", "none");
    });


    // 月曆內容
    let now = new Date(), //今天日期
        days = document.getElementsByClassName('day'); //每一格td

    // 現在年月
    $('.year').text(now.getFullYear());
    $('.month').text(now.getMonth() + 1);

    //  燈箱裡按上個月
    $('.boxprev').click(function() {
        let month = $('.month').text();
        if (month < 2) {
            month = 13;
            $('.year').text($('.year').text() - 1);
        }
        $('.month').text(month - 1);
        showCalender();
    });

    //  燈箱裡按下個月
    $('.boxnext').click(function() {
        let month = parseInt($('.month').text());
        if (month > 11) {
            month = 0;
            year = parseInt($('.year').text());
            $('.year').text(year + 1);
        }
        $('.month').text(month + 1);
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
    let tdclickIndex = 0; //點擊的日期，在當月份營業日的的索引直

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
                n = -1;
                showCalender();

                // 改變日期
                for (let i = 0; i < routenow.length; i++) {
                    if ($(this).text() == routenow[i].routeDay) {
                        tdclickIndex = i;
                    }

                }

            }
        });

    }

    // 日期下拉選單改為燈箱中點擊的日期
    function selectedBox() {
        selectdate.selectedIndex = tdclickIndex;
        selectChange();
    };

    //下載完就執行
    showCalender();



    function showCalender() {
        n++;
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


        changeColor();

        function changeColor() {
            // 營業日變色

            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                if (xhr.status == 200) {
                    routenow = JSON.parse(xhr.responseText);
                    console.log(routenow);
                    // 營業日期改成日
                    // 計算剩餘座位
                    for (i in routenow) {

                        // 把營業日期存成斜線的格式
                        routenow[i].routeDate = routenow[i].routeDate.replace("-", "/").replace("-", "/");

                        // 把營業日單獨存成一個陣列
                        routenow[i].routeDay = routenow[i].routeDate.substr(8, 2);

                        if (routenow[i].routeDay < 10) {
                            routenow[i].routeDay = routenow[i].routeDay.substr(1, 1);
                        }

                        // 計算剩餘座位
                        routenow[i].routeRemaining = routenow[i].routeSeat - routenow[i].routeCount;
                    };


                    // 找出是營業日的標籤，改變顏色
                    for (i = 0; i < $('.day').length; i++) {
                        for (j = 0; j < routenow.length; j++) {
                            if ($(`.day:eq(${i})`).text() == routenow[j].routeDay) {

                                if (portnow == "深澳港") {
                                    $(`.day:eq(${i})`).addClass("on1");
                                } else if (portnow == "梧棲港") {
                                    $(`.day:eq(${i})`).addClass("on2");
                                } else {
                                    $(`.day:eq(${i})`).addClass("on3");
                                }

                                $(`.day:eq(${i})`).attr("remaining", routenow[j].routeRemaining);
                                boxRemaining();

                            }
                        }
                    };


                    if (n == 2) {
                        showDate();
                    } else if (n == 0) {
                        showDate();
                        selectedBox();
                    };
                    tdClick();


                } else {
                    alert(xhr.status);
                };


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

    /////////////////////套餐頁面//////////////////////

    let meals; //套餐資料陣列

    // 顯示三個套餐的圖片、菜名、價格
    showMeal();

    function showMeal() {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                meals = JSON.parse(xhr.responseText);
                console.log(meals);

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

    // 先判斷是否登入
    if (member.memNo == undefined) {
        $('#nologin').css('display', 'block');
    } else if (member.memNo) {

        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                custos = JSON.parse(xhr.responseText);
                console.log(custos);

                if (custos == "") {
                    console.log("沒有客製化料理");
                    $('#nocusto').css('display', 'block');

                } else {
                    console.log("有料理");


                    for (let i = 0; i < custos.length; i++) {



                        //     <!-- <div class="col-6 col-md-3">
                        //     <div class="dish">
                        //         <div class="img">
                        //             <img src="./images/menupic1.png " alt="">
                        //         </div>
                        //         <div class="name"> 香蒜奶油龍蝦</div>
                        //     </div>
                        // </div> -->
                    }
                };


            } else {
                alert(xhr.status);
            }


        };

        // memId=${$id("memId").value}
        // data = member.memNo;
        data = ` memNo=${member.memNo}`;
        console.log(data);
        xhr.open("POST", "./php/order_custo.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    }




    // 是否有客製化料理
    // 顯示客製化料理






});