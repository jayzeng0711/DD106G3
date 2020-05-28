window.addEventListener('load', function() {

    AOS.init();


    /////////////////////第一屏//////////////////////

    // 進入首頁，第一屏島嶼移動，背景圖改變位置
    let islandMoveTime = setInterval(islandMove, 30);

    function islandMove() {

        let i = 380;
        let layer1Left = parseInt($('.layer1').css('left'));
        let layer1width = ($('.layer1').width());
        let layer2Right = parseInt($('.layer2').css('right'));
        let layer2width = ($('.layer2').width());

        $('.layer1').css({
            left: layer1Left - i + "px",
            width: layer1width + i + "px",

        });
        $('.layer2').css({
            right: layer2Right - (i / 60) + "px",
            width: (layer2width + i / 300) + "px",
        });


        $('.section1').addClass('bg');
        if (layer1Left < -1000 && layer2Right < -1000) {
            clearInterval(islandMoveTime);

        }


    }

    // 滾動滑鼠船前進
    window.addEventListener('wheel', move);

    function move() {

        if ($('.wrapperWheel').css('display') == "none") {
            let divLeft = parseInt($('.boat').css('left'));

            if (divLeft < $(window).width()) {
                $('.boat').css('left', '+=300');
            } else {
                $('.wrapperWheel').css('display', 'block');
                $('.wrapperBg').css('display', 'block');
                $('footer').css('display', 'block');
                window.removeEventListener('wheel', move);

            }

            let boatWid = $('.boat').width();
            let boatLeft = $('.boat').offset().left;
            let layer3Left = $('.layer3').offset().left;

            // 船碰到港口
            if ((boatWid / 2) + boatLeft > layer3Left) {
                $('.port').css('opacity', 1);

            }


            // 船經過，海鮮飛起來
            let fishFlyTime = setInterval(function() {
                    let divLeft = parseInt($('.boat').css('left'));
                    if (divLeft > 100) {
                        $('img.flyfish1').addClass('fly1');
                    }
                    if (divLeft > 200) {
                        $('img.flyfish2').addClass('fly2');
                    }
                    if (divLeft > 350) {
                        $('img.flyfish3').addClass('fly3');
                        clearInterval(fishFlyTime);

                    }
                },
                10);
        }
    };

    // 變換港口的文字
    setInterval(changePort, 2000)
    let port = 1;

    function changePort() {

        let portName = $('.section1 .port p')
        if (port % 3 == 0) {
            portName.text('深澳港');

        } else if (port % 3 == 1) {
            $('.section1 .port p').text('梧棲港');

        } else {
            $('.section1 .port p').text('高雄港');
        }

        port++;

    }



    /////////////////////第二屏 訂位//////////////////////

    let selectdate = document.getElementById("date"); //日期下拉選單
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
    $('.section2 .port label').click(function() {
        $(this).addClass("on");
        $('.port label').not(this).removeClass("on");
        portnow = $(this).text();

        // 換地圖位置
        changeMap();

        // 燈箱裡的港口跟著改變
        $(".btnport").removeClass("on");
        for (let i = 0; i < $(".btnport").length; i++) {
            if ($(`.btnport:eq(${i})`).text() == portnow) {
                $(`.btnport:eq(${i})`).addClass("on");
            }
        }
        selectDate();
    });

    // 換地圖位置

    function changeMap() {
        if (portnow == "深澳港") {
            map = "port1";
        } else if (portnow == "梧棲港") {
            map = "port2";
        } else {
            map = "port3";
        }
        initMap(map);

    };



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
                    date[i].routeRemaining = date[i].routeSeat - date[i].routeCount;

                    // 訂位沒有額滿，顯示選項
                    if (date[i].routeRemaining > 0) {
                        // 只顯示5個選項
                        // if (selectdate.options.length < 5) {
                        option = new Option(date[i].routeDate, date[i].routeDate);
                        selectdate.add(option);
                        $('#date option:last-child').attr("remaining", date[i].routeRemaining);
                        $('#date option:last-child').attr("routeNo", date[i].routeNo);

                        // }
                    };

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
                // console.log(xhr.status);
            };
        };

        let data = {};
        data.port = portnow;
        data.from = `${firstYear}-${firstMonth}-${today}`;

        data = JSON.stringify(data);
        // console.log(data);
        // windows
        xhr.open("POST", "./php/order_calendar.php", true);
        // Mac
        // xhr.open('POST', 'http://localhost:8080/order_calendar.php');
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
    if (localStorage['people']) {
        $('#people').val(localStorage['people']);
    }



    /////////////////////航程月曆燈箱//////////////////////

    // 燈箱顯示、消失
    $('#calimg').click(function() {


        // 清除燈箱裡的港口
        $(".btnport").removeClass("on");

        // 打開燈箱先抓外面選的港口
        for (let i = 0; i < 3; i++) {
            if ($(`.section2 .port label:eq(${i})`).hasClass('on')) {
                portnow = $(`.section2 .port label:eq(${i})`).text();
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

    // 資料庫只顯示現在這個月到最後有營業日的那個月份
    hideCalender();

    let first, //可顯示最早的年月
        last; //可顯示最晚的年月

    function hideCalender() {

        // 連資料庫找所有航程
        let xhr = new XMLHttpRequest;

        xhr.onload = function ans() {
            if (xhr.status == 200) {
                let routes = JSON.parse(xhr.responseText);
                // console.log(routes);

                let p1 = 0,
                    p2 = 0,
                    p3 = 0;
                let datearr = [];

                for (let i = 0; i < routes.length; i++) {
                    if (routes[i].routePort == "深澳港" && p1 < 5) {
                        p1++;
                        datearr.push(routes[i].routeDate);
                    } else if (routes[i].routePort == "梧棲港" && p2 < 5) {
                        p2++;
                        datearr.push(routes[i].routeDate);
                    } else if (routes[i].routePort == "高雄港" && p3 < 5) {
                        p3++;
                        datearr.push(routes[i].routeDate);
                    }
                }


                lastRoute = datearr.pop();
                // console.log(lastRoute);

                // 最後月份
                lastYear = lastRoute.substr(0, 4);
                lastMonth = lastRoute.substr(5, 2);
                last = lastYear + lastMonth; //可顯示最晚的年月

                // 目前月份
                if (firstMonth < 10) {
                    firstMonth = "0" + firstMonth;
                }
                first = firstYear + firstMonth; //可顯示最早的年月

            } else {
                // console.log(xhr.status);
            }
        };


        data_info = `from=${firstYear}-${firstMonth}-${today}`;
        // console.log(data_info);

        // windows
        xhr.open("post", "./php/order_route.php");
        // Mac
        // xhr.open('post', 'http://localhost:8080/order_route.php');

        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data_info);

    };



    //  燈箱裡按上個月
    $('.boxprev').click(function() {
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


    // 月曆上的資料
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
                    // 每個港口只顯示5個航程

                    if (month < 10) {
                        month = "0" + month;
                    };
                    for (i = 0; i < routenow.length; i++) {
                        // 訂位沒有額滿，顯示選項
                        if (routenow[i].routeRemaining > 0) {
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
                                            } else if (portnow == "梧棲港") {;
                                                $(`.day:eq(${j})`).addClass("on2");
                                            } else if (portnow == "高雄港") {
                                                $(`.day:eq(${j})`).addClass("on3");
                                            }

                                            $(`.day:eq(${j})`).attr("remaining", routenow[i].routeRemaining);


                                        }
                                    }
                                };
                            }

                        }
                    };

                    // 避免重複觸發點擊營業日期的事件
                    $('td').unbind();
                    tdClick();
                    boxRemaining();


                } else {
                    // console.log(xhr.status);
                };


            };


            let data = {};
            data.port = portnow;
            data.from = `${year}-${now.getMonth() + 1}-1`;

            data = JSON.stringify(data);
            // console.log(data);


            // windows
            xhr.open("POST", "./php/order_calendar.php", true);
            // Mac
            // xhr.open('POST', 'http://localhost:8080/order_calendar.php');
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(data);


        };


    };



    /////////////////////第三屏 點餐//////////////////////



    // 顯示三個套餐的內容
    showMeal();

    function showMeal() {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {

            if (xhr.status == 200) {
                meals = JSON.parse(xhr.responseText);
                // console.log(meals);

                // 套餐內容
                $('.mealPicA').attr("src", "./images/" + meals[0].mealPic);
                $('.mealMainA').text(`A套餐：${meals[0].mealMain}`);
                $('.mealSoupA').text(`湯品：${meals[0].mealSoup}`);
                $('.mealDrinkA').text(`飲品：${meals[0].mealDrink}`);
                $('.mealPriceA').text(`金額：${meals[0].mealPrice}元`);

                $('.mealPicB').attr("src", "./images/" + meals[1].mealPic);
                $('.mealMainB').text(`B套餐：${meals[1].mealMain}`);
                $('.mealSoupB').text(`湯品：${meals[1].mealSoup}`);
                $('.mealDrinkB').text(`飲品：${meals[1].mealDrink}`);
                $('.mealPriceB').text(`金額：${meals[1].mealPrice}元`);

                $('.mealPicC').attr("src", "./images/" + meals[2].mealPic);
                $('.mealMainC').text(`C套餐：${meals[2].mealMain}`);
                $('.mealSoupC').text(`湯品：${meals[2].mealSoup}`);
                $('.mealDrinkC').text(`飲品：${meals[2].mealDrink}`);
                $('.mealPriceC').text(`金額：${meals[2].mealPrice}元`);

            } else {
                // console.log(xhr.status);
            }


        };

        // windows
        xhr.open("GET", "./php/order_meal.php");
        // Mac
        // xhr.open('POST', 'http://localhost:8080/order_meal.php');
        xhr.send(null);

    };


    // 點餐卡片會動

    VanillaTilt.init(document.querySelectorAll(".menu"), {
        max: 25,
        speed: 1000,
        // scale: 1.2
    });


    //泡泡動畫
    setInterval(bubblePop, 4000);

    function bubblePop() {
        TweenMax.staggerFrom(['.bubble1', '.bubble2', '.bubble3', '.bubble4', '.bubble5'], 1, {
            x: 0,
            y: 50,
            opacity: 0,
            scale: 0.5,

        }, .3);

    }

    /////////////////////第五屏 客製化料理//////////////////////////

    changeDish();

    function changeDish() {
        $('.main').fadeOut();
        $('.ingre').fadeOut();
        $('.dish').fadeOut();

        custo1();
        setTimeout(custo2, 500);
        setTimeout(custo3, 1000);
    };


    function custo1() {
        main = "./images/main" + (Math.floor(Math.random() * 6) + 1) + ".png";

        setTimeout(function() {
            $('.main').attr("src", main);
            $('.main').fadeIn();
        }, 500);
    }

    function custo2() {
        ingre = "./images/ingre" + (Math.floor(Math.random() * 4) + 1) + ".png";

        setTimeout(function() {
            $('.ingre').attr("src", ingre);
            $('.ingre').fadeIn();
        }, 500);
    }

    function custo3() {
        dish = "./images/dish" + (Math.floor(Math.random() * 5) + 1) + ".png";
        $('.dish').fadeOut();
        setTimeout(function() {
            $('.dish').attr("src", dish);
            $('.dish').fadeIn();
        }, 500);
        setTimeout(function() {
            changeDish();
        }, 3500);
    }




    /////////////////////第六屏 美食大賽//////////////////////

    let custos; //存放參賽料理的陣列
    let comments; //存放留言的陣列
    let contestNo; //比賽編號


    // 計算這個月比賽，各料理的得票數和排名，存進 custco 表格
    // vote()呼叫php存資料，再呼叫page("time")，預設依照參賽時間排序
    vote();
    // 抓這個月參賽料理的留言
    comment();

    // 計算這個月比賽，各料理的得票數和排名，存進 custco 表格，再顯示料理排序
    function vote() {


        // console.log("vote");
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
                voteRank = JSON.parse(xhr.responseText);
                // console.log(voteRank);
                page();
            } else {
                console.log(xhr.status);
            }
        };

        // windows
        xhr.open('get', './php/contest_voteRank.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_voteRank.php', true);
        xhr.send(null);
    };

    // 抓這個月參賽料理的留言
    function comment() {

        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
                comments = JSON.parse(xhr.responseText);
                // console.log(comments);

            } else {
                // console.log(xhr.status);

            }
        };

        // windows
        xhr.open('get', './php/contest_comment.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_comment.php', true);
        xhr.send(null);
    };


    // 排序參賽料理
    function page() {

        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {

                custos = JSON.parse(xhr.responseText);

                // 清空客製化料理
                $(".custo").empty();

                // 比賽編號
                contestNo = custos[0].contestNo;

                // 預設所有料理的留言是一個陣列
                for (let i = 0; i < custos.length; i++) {
                    custos[i].comment = new Array();
                }
                // 根據參賽編號，每個留言存成一個物件
                for (let j = 0; j < comments.length; j++) {
                    for (let i = 0; i < custos.length; i++) {
                        if (custos[i].custoNo == comments[j].custoNo) {
                            let object = {
                                commentNo: comments[j].commentNo,
                                commentContent: comments[j].commentContent,
                                memNo: comments[j].memNo,
                                memName: comments[j].memName,
                                memPic: comments[j].memPic,
                            };
                            custos[i].comment.push(object);

                        }
                    };
                };

                // 根據得票數由高到低排序
                custos.sort(function(a, b) {
                    return b.contestCustoVote - a.contestCustoVote;
                });

                // console.log(custos);


                // 顯示料理
                for (let i = 0; i < 3; i++) {
                    // 料理編號(由大到小，等於時間由新到舊)
                    custoNo = custos[i].custoNo;

                    // 料理名稱
                    custoName = custos[i].custoName;
                    // 圖片
                    custoPic = custos[i].custoPic;
                    // 票數
                    custoVote = custos[i].contestCustoVote;

                    $(`.custo:eq(${i})`).append(`
                            <div class="cookList_item">
                                <div class="cookList_img">
                                    <figure class="cookList_cook">
                                   
                                        <img src="./images/${custoPic}" alt="">
                                        <figcaption>
                                      
                                            <p>第${i+1}名 ${custoName}</p>
                                            <p class="nowvote">票數:${custoVote}票</p>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div class="cookList_vote"><button class="vote_btn" id="vote_${custoNo}">投票</button>
                                </div>
                                <div class="msg">
                                    <P class="big">留言板</p>
                                    <div class="msg_text" id="msg_${custoNo}">
                                    <p>目前沒有人留言~</p>              
                                    </div>
                                   
                                </div>
                            </div>`);

                    // 留言
                    if (custos[i].comment.length != 0) {
                        $(`#msg_${custoNo}`).empty();
                        $(`.List_msg_wrap${custoNo}`).empty();
                        for (let j = 0; j < custos[i].comment.length; j++) {

                            // 留言編號
                            commentNo = custos[i].comment[j].commentNo;
                            // 留言內容
                            commentContent = custos[i].comment[j].commentContent;
                            // 留言會員編號
                            commemNo = custos[i].comment[j].memNo;
                            // 留言會員姓名
                            commemName = custos[i].comment[j].memName;
                            // 留言會員照片
                            commemPic = custos[i].comment[j].memPic;


                            $(`#msg_${custoNo}`).append(`
                                        <p>
                                            <img src="./images/${commemPic}" alt="">
                                            ${commemName}:${commentContent}
                                        </p>  
                                    `);

                            //取出所有留言

                            $(`.List_msg_wrap${custoNo}`).append(`
                                    <div class="mem_contain">
                                        <div class="flex_wrap">
                                            <div class="mem_name">
                                                <p>${commemName}</p>
                                                <img src="./images/${commemPic}" alt="">
                                            </div>
                                            <div class="mem_msg" id="List_mem_msg_${commentNo}">
                                                <p>${commentContent}</p>
                                            </div>
                                            <div class="report">
                                                <button class="List_report_btn" id="List_rep_${commentNo}">檢舉</button>
                                            </div>
                                        </div>
                                        <div class="msg_date">
                                            <p></p>
                                        </div>
                                    </div>
                                    `);

                        }

                    }

                }

                // 點擊投票
                $(".vote_btn").on("click", function(e) {
                    //判斷是否登入
                    if ($('.pu_mem_login_suc_div').text() != false) {
                        votes = $(this).attr("id").slice(5);
                        inputVote(votes);

                    } else {
                        //未登入
                        $('#Login,#Login_back').css('display', 'block');
                        $('#pu_mem_resist_wrap').css('display', 'none');
                        $('#pu_mem_forget_wrap').css('display', 'none');
                        $('#pu_mem_login_wrap').css('display', 'block');
                    }

                });
            } else {
                // console.log(xhr.status);
            }
        };

        // windows
        xhr.open('get', './php/contest_pagesvote.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_pagesvote.php', true);
        xhr.send(null);

    };

    //投票(參賽列表)，檢查會員今日是否已投過
    function inputVote(LTvote_num) {

        var xhr5 = new XMLHttpRequest();
        var custoNo = LTvote_num;

        xhr5.onload = function() {
            if (xhr5.status == 200) {
                vList_check_Row = JSON.parse(xhr5.responseText);
                // console.log(vList_check_Row);

                if (vList_check_Row == false) {

                    var xhr6 = new XMLHttpRequest();
                    xhr6.onload = function() {
                        if (xhr6.status == 200) {
                            $('.alertbox .wrapper').text("投票成功!");
                            $('.alertbox').addClass("on");

                            // 重新計算票數
                            vote();
                        } else {
                            // console.log(xhr6.status);
                        }
                    }


                    var voteData = {};
                    voteData.contestNo = contestNo;
                    voteData.custoNo = custoNo;

                    var voteData_str = JSON.stringify(voteData);
                    // console.log(voteData_str);

                    // windows
                    xhr6.open('POST', './php/contest_vote_input.php', true);
                    // Mac
                    // xhr.open('post', 'http://localhost:8080/contest_vote_input.php', true);

                    xhr6.send(voteData_str);

                } else {
                    $('.alertbox .wrapper').text("您今日已投過票囉~");
                    $('.alertbox').addClass("on");
                }


            } else {
                // console.log(xhr5.status);
            }
        }


        var voteData = {};
        voteData.contestNo = contestNo;
        voteData.custoNo = custoNo;

        var voteData_str = JSON.stringify(voteData);
        // console.log(voteData_str);

        // windows
        xhr5.open('POST', './php/contest_vote_check.php', true);

        // Mac
        // xhr.open('post', 'http://localhost:8080/contest_vote_check.php', true);
        xhr5.send(null);
    }


    // 關掉提示燈箱
    $('.alertbox .boxclose').click(function() {
        $('.alertbox').removeClass("on");
    });







    // 船移動

    var controller = new ScrollMagic.Controller();

    let boatmove = new TimelineLite();
    boatmove.add(
        TweenLite.to('.boatmove', 5, {
            bezier: {
                curviness: 2,
                autoRotate: false,
                values: [
                    { x: 50, y: 100 },
                    { x: 100, y: 200 },
                    { x: 50, y: 400 },
                    { x: 100, y: 600 },

                ]

            },
            ease: Power1.eaeInOut,

        })
    );

    var ourScene = new ScrollMagic.Scene({
            triggerElement: '.section5',
            triggerHook: 0.5,

        }).setTween(boatmove)
        // .addIndicators({
        //     name: 'boat',
        //     colorTrigger: '#f00',
        // })
        .addTo(controller);













});