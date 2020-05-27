//會員等級初始化，全域變數，想到到的地訪都可
mem_level_no = 0;

//成功率初始化
successRate = 0;

//分數初始化
score = 0;

//點數初始化
point = 0;

// 把海鮮存入session的key初值
seafood_arr = [];

// 把會員資料初始化，如果沒登入是空的物件
memberLevel = {};


//第一層ajax是撈出會員等級
$(document).ready(function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                memlevel = JSON.parse(xhr.responseText);
                //第二層ajax是藉由第一層撈出的會員等級，找出memberLevel那張資料表的所有欄位
                var xhr2 = new XMLHttpRequest();
                xhr2.onload = function() {
                    if (xhr2.status == 200) {
                        if (xhr2.responseText) {
                            memberLevel = JSON.parse(xhr2.responseText);
                            //這邊要把遊戲頁面的資料都依照會員等級放進去
                            Resources = {
                                pokeball: `./images/${memberLevel.levelSrc}`,
                                pokeballActive: `./images/${memberLevel.levelSrc2}`,
                                pokeballClosed: `./images/${memberLevel.levelSrc1}`
                            };
                            $('.ball_img_change').attr('src',`./images/${memberLevel.levelSrc}`)
                            $('.fake_ball,#capture-ball').css('background-image', `url("./images/${memberLevel.levelSrc}")`);

                            //設定捕捉機率
                            successRate = memberLevel.levelBallValue * 100;
                            //設定捕捉機率

                            //這邊要把遊戲頁面的資料都依照會員等級放進去

                            //第三層ajax是如果前面兩層ajax有成功，代表有會員登入，就去把對應等級的海鮮顯示出來，如果沒成功代表沒會員，就顯示html的
                            var xhr3 = new XMLHttpRequest();
                            xhr3.onload = function() {
                                if (xhr3.status == 200) {
                                    seafood_info = JSON.parse(xhr3.responseText);
                                    switch (mem_level_no) {
                                        case '1':
                                            $('.show_seafood_wrap').empty();
                                            for (i = 0; i < seafood_info.length; i++) {
                                                if (seafood_info[i].seafoodLevel == 1) {
                                                    $('.show_seafood_wrap').append(`<div>
                                            <div class="show_seafood_img_div">
                                                <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/${seafood_info[i].seafoodPic}">
                                                <div id="show_seafood_price_${i}" class="show_seafood_price">${seafood_info[i].seafoodPrice}元</div>
                                            </div>
                                            <div class="show_seafood_point">${seafood_info[i].seafoodName} ${seafood_info[i].seafoodPoint}點</div>
                                            </div>`)
                                                } else {
                                                    $('.show_seafood_wrap').append(`<div>
                                            <div class="show_seafood_img_div">
                                                <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/unknow.png">
                                                <div id="show_seafood_price_${i}" class="show_seafood_price">???元</div>
                                            </div>
                                            <div class="show_seafood_point">??? ?點</div>
                                            </div>`)
                                                }
                                            }
                                            break;
                                        case '2':
                                            $('.show_seafood_wrap').empty();
                                            for (i = 0; i < seafood_info.length; i++) {
                                                if (seafood_info[i].seafoodLevel <= 2) {
                                                    $('.show_seafood_wrap').append(`<div>
                                            <div class="show_seafood_img_div">
                                                <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/${seafood_info[i].seafoodPic}">
                                                <div id="show_seafood_price_${i}" class="show_seafood_price">${seafood_info[i].seafoodPrice}元</div>
                                            </div>
                                            <div class="show_seafood_point">${seafood_info[i].seafoodName} ${seafood_info[i].seafoodPoint}點</div>
                                        </div>`)
                                                } else {
                                                    $('.show_seafood_wrap').append(`<div>
                                            <div class="show_seafood_img_div">
                                                <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/unknow.png">
                                                <div id="show_seafood_price_${i}" class="show_seafood_price">???元</div>
                                            </div>
                                            <div class="show_seafood_point">??? ?點</div>
                                            </div>`)
                                                }
                                            }
                                            break;
                                        case '3':
                                            $('.show_seafood_wrap').empty();
                                            for (i = 0; i < seafood_info.length; i++) {
                                                $('.show_seafood_wrap').append(`<div>
                                        <div class="show_seafood_img_div">
                                            <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/${seafood_info[i].seafoodPic}">
                                            <div id="show_seafood_price_${i}" class="show_seafood_price">${seafood_info[i].seafoodPrice}元</div>
                                        </div>
                                        <div class="show_seafood_point">${seafood_info[i].seafoodName} ${seafood_info[i].seafoodPoint}點</div>
                                        </div>`)
                                            }
                                            break;
                                        default:
                                    }
                                    //魚的價格hover
                                    $('.show_seafood_img_div').hover(function(e) {
                                            var last_num = e.target.id.substr(e.target.id.length - 1, 1);
                                            $(`#show_seafood_img_${last_num}`).css('opacity', '0');
                                            $(`#show_seafood_price_${last_num}`).css('opacity', '1');
                                        }, function(e) {
                                            var last_num = e.target.id.substr(e.target.id.length - 1, 1);
                                            $(`#show_seafood_img_${last_num}`).css('opacity', '1');
                                            $(`#show_seafood_price_${last_num}`).css('opacity', '0');
                                        })
                                        //魚的價格hover
                                }
                            }

                            // // windows
                            xhr3.open('GET',  './php/seafood_info.php',  true);

                            // Mac
                            // xhr3.open('GET', "http://localhost:8080/seafood_info.php");
                            xhr3.send(null);
                        }
                    }
                }
                var mem = {};
                mem.level = memlevel.levelNo;
                mem.memId = memlevel.memId;
                mem_level_no = memlevel.levelNo;
                var mem_str = JSON.stringify(mem);
                // console.log(mem_str)

                // windows 
                xhr2.open('post',  './php/member_level.php',  true);

                // Mac
                // xhr2.open('POST', "http://localhost:8080/member_level.php");
                xhr2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr2.send(mem_str);
                //第二層ajax是藉由第一層撈出的會員等級，找出memberLevel那張資料表的所有欄位
            }
        }


        // windows
         
        xhr.open('GET',  './php/getlogininfo.php');

        // Mac
        // xhr.open('GET', "http://localhost:8080/getlogininfo.php");
        xhr.send(null);
    })
    //第一層ajax是撈出會員等級

//一載入頁面，撈出所有的球種類及機率
$(document).ready(function() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            mem_info = JSON.parse(xhr.responseText);
            for (i = 0; i < mem_info.length; i++) {
                $('.ball_cate_div').append(`<div class="singke_ball_div">
        <div>
            ${mem_info[i].levelBall}
        </div>
        <div class="singke_ball_div_img">
            <img src="./images/${mem_info[i].levelSrc}" alt="">
        </div>
        <div>
            捕捉率：${mem_info[i].levelBallValue*100}%
        </div>
    </div>`)
            }
        }
    }
    // windows
    xhr.open('GET',  './php/getmember_level_info.php');

    // Mac
    // xhr.open('GET', "http://localhost:8080/getmember_level_info.php");
    xhr.send(null);
})
//一載入頁面，撈出所有的球種類及機率

//一載入頁面，如果沒有登入會員，顯示的海鮮
$(document).ready(function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                seafood_info = JSON.parse(xhr.responseText);
                for (i = 0; i < seafood_info.length; i++) {
                    if (seafood_info[i].seafoodLevel == 1) {
                        $('.show_seafood_wrap').append(`<div>
                    <div class="show_seafood_img_div">
                        <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/${seafood_info[i].seafoodPic}">
                        <div id="show_seafood_price_${i}" class="show_seafood_price">${seafood_info[i].seafoodPrice}元</div>
                    </div>
                    <div class="show_seafood_point">${seafood_info[i].seafoodName} ${seafood_info[i].seafoodPoint}點</div>
                </div>`)
                    } else {
                        $('.show_seafood_wrap').append(`<div>
                    <div class="show_seafood_img_div">
                        <img id="show_seafood_img_${i}" class="show_seafood_img" src="./images/unknow.png">
                        <div id="show_seafood_price_${i}" class="show_seafood_price">???元</div>
                    </div>
                    <div class="show_seafood_point">??? ?點</div>
                </div>`)
                    }
                }
                Resources = {
                    pokeball: './images/Group%2071.png',
                    pokeballActive: './images/one_open_ball.png',
                    pokeballClosed: './images/one_ball.png'
                };
                $('.ball_img_change').attr('src',`./images/Group%2071.png`)
                $('.fake_ball').css('background-image', `url("./images/Group%2071.png")`);
                successRate = 50;
                //魚的價格hover
                $('.show_seafood_img_div').hover(function(e) {
                        var last_num = e.target.id.substr(e.target.id.length - 1, 1);
                        $(`#show_seafood_img_${last_num}`).css('opacity', '0');
                        $(`#show_seafood_price_${last_num}`).css('opacity', '1');
                    }, function(e) {
                        var last_num = e.target.id.substr(e.target.id.length - 1, 1);
                        $(`#show_seafood_img_${last_num}`).css('opacity', '1');
                        $(`#show_seafood_price_${last_num}`).css('opacity', '0');
                    })
                    //魚的價格hover
            }
        }
        // windows
        xhr.open('GET',  './php/seafood_info.php');

        // Mac
        // xhr.open('GET', "http://localhost:8080/seafood_info.php");
        xhr.send(null);
    })
    //一載入頁面，如果沒有登入會員，顯示的海鮮

//遊戲開始按鈕
$(document).ready(function() {
    $('#game_start,#click_text').click(function() {

        //清除storage
        var storge = localStorage;
        storge.removeItem('fish');;
        //清除storage

        $('#game_start').css('display', 'none');
        $('#asd,#asd_fail,.game_statement_bottom').css('display', 'none');

        seafood_level_num = 0
        $(document).ready(function() {
            //依照會員等級出現的海鮮
            switch (mem_level_no) {
                case '1':
                    for (i = 0; i < seafood_info.length; i++) {
                        if (seafood_info[i].seafoodLevel == 1) {
                            seafood_level_num += 1;
                        }
                    }
                    var seafood_img = anime.random(1, seafood_level_num);
                    $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                    seafood_level_num = 0;
                    break;
                case '2':
                    for (i = 0; i < seafood_info.length; i++) {
                        if (seafood_info[i].seafoodLevel <= 2) {
                            seafood_level_num += 1;
                        }
                    }
                    var seafood_img = anime.random(1, seafood_level_num);
                    $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                    seafood_level_num = 0;
                    break;
                case '3':
                    var seafood_img = anime.random(1, seafood_info.length);
                    $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                    break;
                default:
                    var seafood_img = anime.random(1, 5);
                    $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                    break;
            }
            //依照會員等級出現的海鮮
        })

        $('#fake_ball').mousemove(function() {
                $(this).css('cursor', 'pointer');
            })
            // 遊戲倒數
        time = 60;

        function timeup() {
            $('#time_up').html(time);
            if (time <= 0) {
                if (score == 0) {
                    $('#asd_fail').css('display', 'block');
                    $('.screen_back').css('display', 'block');
                } else {
                    $('#asd').css('display', 'block');
                    $('.screen_back').css('display', 'block');
                }
                seafood_animate.pause();
                clearInterval(clear);
            }
            time--;
        }
        var clear = setInterval(timeup, 1000);
        timeup();

        //球數的變數，實際是5顆球，因為一開始resetState();先執行過一次，要把球數加回來
        ball_num = 6;

        var Screen = {
            // 抓螢幕高度(100%)
            height: window.innerHeight,
            // 抓螢幕寬度(100%)
            width: window.innerWidth
        };

        // 丟球的力量，決定球被丟多遠
        var MAX_VELOCITY = Screen.height * 0.005;
        // var MAX_VELOCITY = Screen.height * 0.01;

        var Ball = {
            id: 'ball',
            size: 50,
            x: 0,
            y: 0,
            //決定球是否有成功甩出去，預設是沒有
            inMotion: false,

            //球出發在螢幕上的位置，隨著螢幕大小變化
            moveBall: function(x, y) {
                Ball.x = x;
                Ball.y = y;
                var BallElement = document.getElementById(Ball.id);
                BallElement.style.top = Ball.y + 'px';
                BallElement.style.left = Ball.x + 'px';
            },

            //找到球的物件，Ball.getElement() = document.getElementById("ball");
            getElement() {
                return document.getElementById(Ball.id);
            },

            //球丟出去沒抓到的話，球會回去他位置
            resetBall: function() {
                Ball.moveBall(Screen.width / 2 - (Ball.size / 2), Screen.height - (Ball.size + 10));
                var BallElement = document.getElementById(Ball.id);
                BallElement.style.transform = "";
                BallElement.style.width = BallElement.style.height = Ball.size + 'px';
                BallElement.style.backgroundImage = "url('" + Resources.pokeball + "')";
                Ball.inMotion = false;
            },


            savePosition: function() {
                var ballEle = document.getElementById('ball');
                var ballRect = ballEle.getBoundingClientRect();
                ballEle.style.transform = "";
                ballEle.style.top = ballRect.top + 'px';
                ballEle.style.left = ballRect.left + 'px';
                ballEle.style.height = ballEle.style.width = ballRect.width + 'px';
            }
        };

        //Initial Setup
        resetState();

        //海鮮的動畫，利用anime.js套件
        // 使用方式 http://www.htmleaf.com/jQuery/jquery-tools/201607013672.html
        path_random = anime.random(1, 4);
        path = anime.path(`.cls-${path_random}`);
        seafood_animate = anime({
            targets: ['#target'],
            rotate: 20,
            duration: 18000,
            loop: true,
            translateX: path,
            translateY: path,
            easing: 'linear',
            direction: 'alternate'
        });


        //隨著螢幕變化，rwd球的位置
        window.onresize = function() {
            Screen.height = window.innerHeight;
            Screen.width = window.innerWidth;
            MAX_VELOCITY = Screen.height * 0.009;
            // resetState();
        }


        // zingtouch套件，用來丟球的行為
        // 使用方式 https://zingchart.github.io/zingtouch/   https://www.noupe.com/development/zingtouch-extensive-gesture-recognition-98540.html

        //第一步：先找出需要作動的區塊，touch-layer是指整個瀏覽器畫面
        touchElement = document.getElementById('touch-layer');

        //第二步：new ZingTouch.Region(需要作動的區塊)，會監聽下面六種行為
        var touchRegion = new ZingTouch.Region(touchElement);

        //zingtouch有六種行為： 1.Tap(點擊)  2.Rotate(旋轉) 3.Pinch 4.Expand 5.Pan(滑鼠按住移動) 6.Swipe(甩動)
        var CustomSwipe = new ZingTouch.Swipe({
            escapeVelocity: 0.1
        })
        var CustomPan = new ZingTouch.Pan();

        //按著滑鼠，放開的時候
        var endPan = CustomPan.end;

        //滑鼠放開的時候呼叫此function
        CustomPan.end = function(inputs) {

            //如果球沒有成功甩出去，就把球回歸位置
            setTimeout(function() {
                if (Ball.inMotion === false) {
                    Ball.resetBall();
                    $('#ball').hide();
                    $('#fake_ball').show();
                }
            }, 100);

            //意義不明
            return endPan.call(this, inputs);
        }

        //第三步：綁定行為，語法 第二部設的區域.bind("第一部的物件","六種行為的哪一種",行為)
        //滑鼠按著寶貝球跟著跑到滑鼠位置
        //這邊要處理一個bug，滑鼠點任一區塊，寶貝球都會移動
        touchRegion.bind(touchElement, CustomPan, function(e) {
            $('#ball').show();
            $('#fake_ball').hide();
            Ball.moveBall(e.detail.events[0].x - Ball.size / 2, e.detail.events[0].y - Ball.size / 2);
            //滑鼠按住球的時候，超出遊戲範圍時，球回歸位置
            $('#screen').mouseleave(function() {
                Ball.resetBall();
                $('#ball').hide();
                $('#fake_ball').show();
            })
        });

        touchRegion.bind(touchElement, CustomSwipe, function(e) {

            $('#ball').show();
            $('#fake_ball').hide();
            Ball.moveBall(e.detail.events[0].x - Ball.size / 2, e.detail.events[0].y - Ball.size / 2);
            //滑鼠按住球的時候，超出遊戲範圍時，球回歸位置
            $('#screen').mouseleave(function() {
                Ball.resetBall();
                $('#ball').hide();
                $('#fake_ball').show();
            })

            //當發生丟球事件，就成功甩出球，執行以下程式，如果發生丟球，但滑鼠卻沒放開，球就會跟著滑鼠，不會被甩出
            Ball.inMotion = true;
            var screenEle = document.getElementById('screen');
            var screenPos = screenEle.getBoundingClientRect();


            //球甩出後，取消綁定滑鼠移出球回歸位置事件
            $("#screen").unbind("mouseleave");

            //丟球角度
            var angle = e.detail.data[0].currentDirection;

            //丟球力量
            var rawVelocity = velocity = e.detail.data[0].velocity;

            //不懂
            velocity = (velocity > MAX_VELOCITY) ? MAX_VELOCITY : velocity;

            //決定最後球的位置
            //最大力的話scalePercent為1
            var scalePercent = Math.log(velocity + 1) / Math.log(MAX_VELOCITY + 1);
            var destinationY = (Screen.height - (Screen.height * scalePercent)) + screenPos.top;
            var movementY = destinationY - e.detail.events[0].y;

            //決定球被丟多遠
            var translateYValue = -0.75 * Screen.height * scalePercent;
            var translateXValue = 1 * (90 - angle) * -(translateYValue / 100);

            //球丟出時，中間瞄準暫停
            anime.remove('#ring-fill');

            //球丟出時，計算球的位置，跑動畫
            anime({
                targets: ['#ball'],
                translateX: {
                    duration: 300,
                    value: translateXValue,
                    easing: 'easeOutSine'
                },
                translateY: {
                    value: movementY * 1.25 + 'px',
                    duration: 300,
                    easing: 'easeOutSine'
                },
                scale: {
                    value: 1 - (0.5 * scalePercent),
                    easing: 'easeInSine',
                    duration: 300
                },
                complete: function() {
                    if (movementY < 0) {
                        throwBall(movementY, translateXValue, scalePercent);
                    } else {
                        setTimeout(resetState, 400);
                        if (ball_num <= 1) {
                            if (score == 0) {
                                $('#asd_fail').css('display', 'block');
                                $('.screen_back').css('display', 'block');
                            } else {
                                $('#asd').css('display', 'block');
                                $('.screen_back').css('display', 'block');
                            }
                            seafood_animate.pause();
                            clearInterval(clear);
                        }
                    }
                }
            })
        });

        //丟出球後，算出球的x,y位置及大小變化，在執行丟球結果的函數
        function throwBall(movementY, translateXValue, scalePercent) {
            //Treat translations as fixed.
            Ball.savePosition();
            anime({
                targets: ['#ball'],
                translateY: {
                    value: movementY * -0.5 + 'px',
                    duration: 400,
                    easing: 'easeInOutSine'
                },
                translateX: {
                    value: -translateXValue * 0.25,
                    duration: 400,
                    easing: 'linear'
                },
                scale: {
                    value: 1 - (0.25 * scalePercent),
                    easing: 'easeInSine',
                    duration: 400
                },
                complete: determineThrowResult
            })
        }


        //決定丟球的結果 有抓到或沒抓到
        function determineThrowResult() {

            //找出目標的中心座標
            var targetCoords = getCenterCoords('target');
            //找出球的中心座標
            var ballCoords = getCenterCoords('ball');


            //決定球是否有碰到目標
            var radius = document.getElementById('target').getBoundingClientRect().width / 2;

            //球碰到了海鮮
            if (ballCoords.x > targetCoords.x - radius &&
                ballCoords.x < targetCoords.x + radius &&
                ballCoords.y > targetCoords.y - radius &&
                ballCoords.y < targetCoords.y + radius) {

                Ball.savePosition();
                var ballOrientation = (ballCoords.x < targetCoords.x) ? -1 : 1;
                anime({
                    targets: ['#ball'],
                    // translateY: {
                    //     value: -1.15 * radius,
                    //     duration: 200,
                    //     easing: 'linear'
                    // },
                    translateX: {
                        value: 1.15 * radius * ballOrientation,
                        duration: 200,
                        easing: 'linear'
                    },
                    scaleX: {
                        value: ballOrientation,
                        duration: 200,
                    },
                    complete: function() {
                        var ball = Ball.getElement();
                        //球碰到海鮮時候暫停
                        seafood_animate.pause();
                        //抓到時候換圖
                        ball.style.backgroundImage = "url('" + Resources.pokeballActive + "')";
                        //並且換成搖三下的動畫
                        emitParticlesToPokeball();
                    }
                });
            } else {
                if (ball_num <= 1) {
                    if (score == 0) {
                        $('#asd_fail').css('display', 'block');
                        $('.screen_back').css('display', 'block');
                    } else {
                        $('#asd').css('display', 'block');
                        $('.screen_back').css('display', 'block');
                    }
                    seafood_animate.pause();
                    clearInterval(clear);
                }
                setTimeout(resetState, 400);
            }
        }


        function emitParticlesToPokeball() {
            var particles = [];
            var targetEle = getCenterCoords('target');
            var ballEle = Ball.getElement();
            var ballRect = ballEle.getBoundingClientRect();
            var particleLeft;
            var particleRight;
            var palette = [
                '#E4D3A8',
                '#6EB8C0',
                '#FFF',
                '#2196F3'
            ]
            var particleContainer = document.getElementById('particles');
            for (var i = 0; i < 50; i++) {
                var particleEle = document.createElement('div');
                particleEle.className = 'particle';
                particleEle.setAttribute('id', 'particle-' + i);;
                particleLeft = getRandNum(-60, 60) + targetEle.x;
                particleEle.style.left = particleLeft + 'px';
                particleRight = getRandNum(-60, 60) + targetEle.y;
                particleEle.style.top = particleRight + 'px';
                particleEle.style.backgroundColor = palette[getRandNum(0, palette.length)]
                particleContainer.appendChild(particleEle);
                anime({
                    targets: ['#particle-' + i],
                    translateX: {
                        value: ballRect.left - particleLeft,
                        delay: 100 + (i * 10)
                    },
                    translateY: {
                        value: ballRect.top + (Ball.size / 2) - particleRight,
                        delay: 100 + (i * 10),
                    },
                    opacity: {
                        value: 0,
                        delay: 100 + (i * 10),
                        duration: 800,
                        easing: 'easeInSine'
                    }
                });
                anime({
                    targets: ['#target'],
                    opacity: {
                        value: 0,
                        delay: 200,
                        easing: 'easeInSine'
                    }
                });
            }
            setTimeout(function() {
                //收服成功後，寶可夢消失，球關起來
                var ball = Ball.getElement();
                ball.style.backgroundImage = "url('" + Resources.pokeballClosed + "')";
                document.getElementById('particles').innerHTML = "";
                Ball.savePosition();
                anime({
                    targets: ['#ball'],
                    translateY: {
                        value: "200px",
                        delay: 400,
                        duration: 400,
                        easing: 'linear'
                    },
                    complete: function() {
                        Ball.resetBall();
                    }
                });
                setTimeout(function() {
                    //跳進搖三下的動畫
                    animateCaptureState();
                    resetState();
                }, 750);

            }, 1000);
        }

        function animateCaptureState() {
            var ballContainer = document.getElementById('capture-screen');
            ballContainer.classList.toggle('hidden');

            var duration = 500;
            anime({
                targets: ['#capture-ball'],
                rotate: 40,
                duration: duration,
                easing: 'easeInOutBack',
                loop: true,
                direction: 'alternate'
            });
            //ringRect是什麼
            var ringRect = (document.getElementById('ring-active')).getBoundingClientRect();

            //成功率
            // var successRate = ((150 - ringRect.width) / 150) * 100;
            var seed = getRandNum(0, 100);
            setTimeout(function() {

                //一秒搖一下，三秒停止搖動
                anime.remove('#capture-ball');
                //如果抓到了
                if (seed < Math.floor(successRate)) {
                    var captureBall = document.getElementById('capture-ball');
                    var buttonContainer = document.getElementById('capture-ball-button-container');
                    buttonContainer.classList.toggle('hidden');
                    var captureStatus = document.getElementById('capture-status');
                    captureStatus.classList.toggle('hidden');
                    captureStatus.innerHTML = "恭喜捕捉成功";

                    //捕捉成功時的特效
                    makeItRainConfetti();
                    anime({
                        targets: ['#capture-ball-button-container'],
                        opacity: {
                            value: 0,
                            duration: 800,
                            easing: 'easeInSine'
                        },
                        complete: function() {
                            setTimeout(function() {
                                var ballContainer = document.getElementById('capture-screen');
                                ballContainer.classList.toggle('hidden');
                                var buttonContainer = document.getElementById('capture-ball-button-container');
                                buttonContainer.classList.toggle('hidden');
                                buttonContainer.style.opacity = "";
                                document.getElementById('capture-status').classList.toggle('hidden');
                            }, 800);
                            seafood_animate.play(); //球搖三下結束後，海鮮繼續跑
                            //捕捉成功後，把img塞到捕獲裡
                            $(document).ready(function() {
                                    var target_img = $('#target').css('background-image');
                                    //把url()去掉
                                    target_img = target_img.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                                    //找是第幾個海鮮
                                    target_img = target_img.substr(-5, 1)
                                    $('.capture_poke').append(`<div><img src="./images/seafood${target_img}.svg"></div>`);
                                    // console.log(seafood_info);
                                    //存到session裡面，把抓到的海鮮的圖片，跟上面八個海鮮做比對，如果圖片相同，把海鮮名稱跟價格存入
                                    for(var i = 0;i<seafood_info.length;i++){
                                        if(`seafood${target_img}.svg` == seafood_info[i].seafoodPic){
                                            seafood_object = {};
                                            seafoodName = seafood_info[i].seafoodName;
                                            seafoodPrice = seafood_info[i].seafoodPrice;
                                            seafood_object.name = seafoodName;
                                            seafood_object.img = `./images/seafood${target_img}.svg`;
                                            seafood_object.price = seafoodPrice;
                                            seafood_arr.push(seafood_object);
                                        }
                                    }
                                    localStorage['fish'] = JSON.stringify(seafood_arr);
                                    //存到session裡面，把抓到的海鮮的圖片，跟上面八個海鮮做比對，如果圖片相同，把海鮮名稱跟價格存入
                                    if (memberLevel.memId) {
                                        switch (target_img) {
                                            case '1':
                                                point += parseInt(seafood_info[0].seafoodPoint);
                                                score += parseInt(seafood_info[0].seafoodScore);
                                                $('#mem_score,#final_score').html(score);
                                                $('#mem_point,#final_point').html(point);
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '2':
                                                point += parseInt(seafood_info[1].seafoodPoint);
                                                score += parseInt(seafood_info[1].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '3':
                                                point += parseInt(seafood_info[2].seafoodPoint);
                                                score += parseInt(seafood_info[2].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '4':
                                                point += parseInt(seafood_info[3].seafoodPoint);
                                                score += parseInt(seafood_info[3].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '5':
                                                point += parseInt(seafood_info[4].seafoodPoint);
                                                score += parseInt(seafood_info[4].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '6':
                                                point += parseInt(seafood_info[5].seafoodPoint);
                                                score += parseInt(seafood_info[5].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '7':
                                                point += parseInt(seafood_info[6].seafoodPoint);
                                                score += parseInt(seafood_info[6].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            case '8':
                                                point += parseInt(seafood_info[7].seafoodPoint);
                                                score += parseInt(seafood_info[7].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                update_mem_info()
                                                end_game();
                                                break;
                                            default:
                                        }
                                    } else {
                                        switch (target_img) {
                                            case '1':
                                                point += parseInt(seafood_info[0].seafoodPoint);
                                                score += parseInt(seafood_info[0].seafoodScore);
                                                $('#mem_score,#final_score').html(score);
                                                $('#mem_point,#final_point').html(point);
                                                end_game();
                                                break;
                                            case '2':
                                                point += parseInt(seafood_info[1].seafoodPoint);
                                                score += parseInt(seafood_info[1].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '3':
                                                point += parseInt(seafood_info[2].seafoodPoint);
                                                score += parseInt(seafood_info[2].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '4':
                                                point += parseInt(seafood_info[3].seafoodPoint);
                                                score += parseInt(seafood_info[3].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '5':
                                                point += parseInt(seafood_info[4].seafoodPoint);
                                                score += parseInt(seafood_info[4].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '6':
                                                point += parseInt(seafood_info[5].seafoodPoint);
                                                score += parseInt(seafood_info[5].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '7':
                                                point += parseInt(seafood_info[6].seafoodPoint);
                                                score += parseInt(seafood_info[6].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            case '8':
                                                point += parseInt(seafood_info[7].seafoodPoint);
                                                score += parseInt(seafood_info[7].seafoodScore);
                                                $('#mem_score,#final_score').html(score)
                                                $('#mem_point,#final_point').html(point)
                                                end_game();
                                                break;
                                            default:
                                        }
                                    }
                                })
                                //抓到後換海鮮
                            $(document).ready(function() {
                                    //依照會員等級出現的海鮮
                                    switch (mem_level_no) {
                                        case '1':
                                            for (i = 0; i < seafood_info.length; i++) {
                                                if (seafood_info[i].seafoodLevel == 1) {
                                                    seafood_level_num += 1;
                                                }
                                            }
                                            var seafood_img = anime.random(1, seafood_level_num);
                                            $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                            seafood_level_num = 0;
                                            break;
                                        case '2':
                                            for (i = 0; i < seafood_info.length; i++) {
                                                if (seafood_info[i].seafoodLevel <= 2) {
                                                    seafood_level_num += 1;
                                                }
                                            }
                                            var seafood_img = anime.random(1, seafood_level_num);
                                            $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                            seafood_level_num = 0;
                                            break;
                                        case '3':
                                            var seafood_img = anime.random(1, seafood_info.length);
                                            $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                            break;
                                        default:
                                    }
                                    //依照會員等級出現的海鮮
                                })
                                //如果球丟完了，遊戲結束
                            function end_game() {
                                if (ball_num <= 0) {
                                    if (score == 0) {
                                        $('#asd_fail').css('display', 'block');
                                        $('.screen_back').css('display', 'block');
                                    } else {
                                        $('#asd').css('display', 'block');
                                        $('.screen_back').css('display', 'block');
                                    }
                                    seafood_animate.pause();
                                    clearInterval(clear);
                                }
                            }
                        }
                    });
                }
                //如果沒抓到
                else {
                    var poofContainer = document.getElementById('poof-container');
                    poofContainer.classList.toggle('hidden');

                    var captureStatus = document.getElementById('capture-status');
                    captureStatus.innerHTML = "海鮮逃跑了!"
                    captureStatus.classList.toggle('hidden');
                    anime({
                        targets: ['#poof'],
                        scale: {
                            value: 20,
                            delay: 400,
                            easing: 'linear',
                            duration: 600
                        },
                        complete: function() {
                            var ballContainer = document.getElementById('capture-screen');
                            ballContainer.classList.toggle('hidden');

                            var poofEle = document.getElementById('poof');
                            poofEle.style.transform = "";
                            var poofContainer = document.getElementById('poof-container');
                            poofContainer.classList.toggle('hidden');

                            var captureStatus = document.getElementById('capture-status');
                            captureStatus.classList.toggle('hidden');
                            //沒抓到後換海鮮
                            $(document).ready(function() {
                                //依照會員等級出現的海鮮
                                switch (mem_level_no) {
                                    case '1':
                                        for (i = 0; i < seafood_info.length; i++) {
                                            if (seafood_info[i].seafoodLevel == 1) {
                                                seafood_level_num += 1;
                                            }
                                        }
                                        var seafood_img = anime.random(1, seafood_level_num);
                                        $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                        seafood_level_num = 0;
                                        break;
                                    case '2':
                                        for (i = 0; i < seafood_info.length; i++) {
                                            if (seafood_info[i].seafoodLevel <= 2) {
                                                seafood_level_num += 1;
                                            }
                                        }
                                        var seafood_img = anime.random(1, seafood_level_num);
                                        $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                        seafood_level_num = 0;
                                        break;
                                    case '3':
                                        var seafood_img = anime.random(1, seafood_info.length);
                                        $('#target').css('background-image', `url("./images/seafood${seafood_img}.svg")`);
                                        break;
                                    default:
                                }
                                //依照會員等級出現的海鮮
                            })
                            seafood_animate.play(); //球搖三下結束後，海鮮繼續跑
                            if (ball_num <= 0) {
                                if (score == 0) {
                                    $('#asd_fail').css('display', 'block');
                                    $('.screen_back').css('display', 'block');
                                } else {
                                    $('#asd').css('display', 'block');
                                    $('.screen_back').css('display', 'block');
                                }
                                seafood_animate.pause();
                                clearInterval(clear);
                            }
                        }
                    })
                }
            }, duration * 6);
        }

        //捕捉成功時的特效 煙火
        function makeItRainConfetti() {
            for (var i = 0; i < 100; i++) {
                var particleContainer = document.getElementById('capture-confetti');
                var particleEle = document.createElement('div');
                particleEle.className = 'particle';
                particleEle.setAttribute('id', 'particle-' + i);
                particleLeft = window.innerWidth / 2;
                particleEle.style.left = particleLeft + 'px';
                particleTop = window.innerHeight / 2;
                particleEle.style.top = particleTop + 'px';
                particleEle.style.backgroundColor = ((getRandNum(0, 2)) ? '#FFF' : '#4aa6fb')
                particleContainer.appendChild(particleEle);
                anime({
                    targets: ['#particle-' + i],
                    translateX: {
                        value: ((getRandNum(0, 2)) ? -1 : 1) * getRandNum(0, window.innerWidth / 2),
                        delay: 100
                    },
                    translateY: {
                        value: ((getRandNum(0, 2)) ? -1 : 1) * getRandNum(0, window.innerHeight / 2),
                        delay: 100,
                    },
                    opacity: {
                        value: 0,
                        duration: 800,
                        easing: 'easeInSine'
                    },
                    complete: function() {
                        document.getElementById('capture-confetti').innerHTML = "";
                    }
                });
            }
        }

        //意義不明
        function toggleInfoScreen() {
            var infoScreen = document.getElementById('info-screen');
            var infoButton = document.getElementById('info-button');
            infoScreen.classList.toggle('hidden');
            infoButton.innerHTML = (infoScreen.className === 'hidden') ? "?" : 'X';
        }

        function resetState() {
            Ball.resetBall();
            $('#ball').hide();
            $('#fake_ball').show();
            // 海鮮透明度
            document.getElementById('target').style.opacity = 1;

            // 綠色準心
            var ring = document.getElementById('ring-fill');
            ring.style.height = "150px";
            ring.style.width = "150px";
            anime({
                    targets: ['#ring-fill'],
                    height: "5px",
                    width: "5px",
                    duration: 3000,
                    loop: true,
                    easing: 'linear'
                })
                //每次重置球的時候，球數減少
            ball_num--;
            $(`.ball_num_img_div_${ball_num+1}`).remove();
            if (ball_num <= 0) {
                $('#fake_ball,#ball').hide();
                $('#ball_num').html(0);
            } else {
                $('#ball_num').html(ball_num);
            }
        }
    })
})

$(document).ready(function() {
        $('#re_game_start,#fail_re_game_start').click(function() {
            window.location.reload();
        })
        $('#re_game_start').click(function() {
            var storge = localStorage;
            storge.removeItem('fish');
        })
    })
    //抓到海鮮後更新積分及點數
function update_mem_info() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            var mem_info_detail = JSON.parse(xhr.responseText);
            // console.log(mem_info_detail)
            //判斷是否到達了升級銀鷗積分
            if (mem_info_detail.levelNo == 1) {
                if (mem_info_detail.memScore >= mem_info[1].levelScore && mem_info_detail.memScore < mem_info[2].levelScore) {
                    var xhr2 = new XMLHttpRequest();
                    xhr2.onload = function() {
                        if (xhr2.status == 200) {
                            var memlevel_score = JSON.parse(xhr2.responseText);
                            $('.alertbox .wrapper').text(`恭喜升等為${memlevel_score.levelName}會員`);
                            $('.alertbox').addClass("on");
                            Resources = {
                                pokeball: `./images/${memlevel_score.levelSrc}`,
                                pokeballActive: `./images/${memlevel_score.levelSrc2}`,
                                pokeballClosed: `./images/${memlevel_score.levelSrc1}`
                            };
                            $('.ball_img_change').attr('src',`./images/${memlevel_score.levelSrc}`)
                            $('.fake_ball').css('background-image', `url("./images/${memlevel_score.levelSrc}")`);
                            //設定捕捉機率
                            successRate = memlevel_score.levelBallValue * 100;
                            // 設定捕捉機率
                        }
                    }
                    var mem_email = {};
                    mem_email.email = mem_info_detail.memId;
                    var mem_email_str = JSON.stringify(mem_email);

                    // windows
                    xhr2.open('POST',  './php/update_mem_levelno.php',  true);

                    // Mac
                    // xhr2.open('POST', 'http://localhost:8080/update_mem_levelno.php');
                    xhr2.send(mem_email_str);
                }
            }
            //判斷是否到達了升級銀鷗積分

            //判斷是否到達了升級金鷗積分
            if (mem_info_detail.levelNo == 2) {
                if (mem_info_detail.memScore >= mem_info[2].levelScore) {
                    var xhr2 = new XMLHttpRequest();
                    xhr2.onload = function() {
                        if (xhr2.status == 200) {
                            var memlevel_score = JSON.parse(xhr2.responseText);
                            $('.alertbox .wrapper').text(`恭喜升等為${memlevel_score.levelName}會員`);
                            $('.alertbox').addClass("on");
                            Resources = {
                                pokeball: `./images/${memlevel_score.levelSrc}`,
                                pokeballActive: `./images/${memlevel_score.levelSrc2}`,
                                pokeballClosed: `./images/${memlevel_score.levelSrc1}`
                            };
                            $('.ball_img_change').attr('src',`./images/${memlevel_score.levelSrc}`)
                            $('.fake_ball').css('background-image', `url("./images/${memlevel_score.levelSrc}")`);

                            //設定捕捉機率
                            successRate = memlevel_score.levelBallValue * 100;
                            // 設定捕捉機率
                        }
                    }
                    var mem_email = {};
                    mem_email.email = mem_info_detail.memId;
                    var mem_email_str = JSON.stringify(mem_email);


                    // windows
                    xhr2.open('POST',  './php/update_mem_levelno2.php',  true);

                    // Mac
                    // xhr2.open('POST', 'http://localhost:8080/update_mem_levelno2.php');
                    xhr2.send(mem_email_str);
                }
            }
            //判斷是否到達了升級金鷗積分
        }
    }
    var point_score = {};
    point_score.score = score;
    point_score.point = point;
    point_score.member = memberLevel.memId;
    var point_score_str = JSON.stringify(point_score);
    // console.log(point_score_str)

    // windows
    xhr.open('POST',  './php/member_seafood_point_score.php',  true);

    // Mac
    // xhr.open('POST', 'http://localhost:8080/member_seafood_point_score.php')
    xhr.send(point_score_str)
}
//抓到海鮮後更新積分及點數


//找到物件的中心點
function getCenterCoords(elementId) {
    var rect = document.getElementById(elementId).getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

//隨機產生min~max的數
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}