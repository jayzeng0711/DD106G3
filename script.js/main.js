window.addEventListener('load', function() {

    AOS.init();


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
                window.removeEventListener('wheel', move);


                // 視窗滑到地圖頂端，地圖變小
                window.addEventListener("wheel", function() {
                    timeMap = setInterval(check, 10)


                });

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





    // 視窗滑到地圖頂端，地圖變小
    function check() {
        if ($(window).scrollTop() >= ($('.map').offset().top - 200)) {
            small();
            clearInterval(timeMap);

        }
    };



    // 測試用
    // window.addEventListener("wheel", function() {
    //     setInterval(check, 100)
    // });

    // 地圖變小
    function small() {
        let imgWid = $('.map').width();
        let winWid = $(window).width();

        if (imgWid > winWid / 2) {
            imgWid = imgWid * 0.8;
            $('.map').width(imgWid);
        } else {
            $('.wrapperBg').css('display', 'block');
            // $('.section2').css('background', '#2E4581 url(../images/mainbg2.svg) bottom');
            $('.section2 .title ').css('opacity', '1');
            $('.section2 .text').css('opacity', '1');
            $('.section2 .boat').css('opacity', '1');
            $('.section2 .reservation ').css('opacity', '1');
            $('.section2 .smallwave ').css('opacity', '1');

        }
        window.removeEventListener('wheel', small);
    }


    // 訂位頁面，選不同港口
    $('.section2 .port label').click(function() {
        $(this).css('background', '#4EB6E6');
        $(this).css('color', '#fff');

        $('.port label').not(this).css('background', '#fff');
        $('.port label').not(this).css('color', '#034');
    });



    // 訂位頁面，人數不小於0、不是空值

    $('#people').change(function() {

        let inputVal = $(this).val();

        if (inputVal == "") {
            $(this).val(0);
        }
        if (parseInt(inputVal) < 0) {
            $(this).val(0);
        }
        console.log($(this).val());

    });

    // 點餐卡片會動

    VanillaTilt.init(document.querySelectorAll(".menu"), {
        max: 25,
        speed: 1000,
        // scale: 1.2
    });





    // 進入套餐頁面

    var controller = new ScrollMagic.Controller();

    // function boat() {
    //     let boatmove = new TimelineLite();
    //     boatmove.add(
    //         TweenLite.to('.boat2', 5, {
    //             bezier: {
    //                 curviness: 2,
    //                 autoRotate: false,
    //                 values: [
    //                     { x: 50, y: 100 },
    //                     { x: 100, y: 200 },
    //                     { x: 50, y: 400 },
    //                     { x: 100, y: 500 }
    //                 ]
    //             },
    //             ease: Power1.eaeInOut,
    //         })
    //     );

    //     var ourScene = new ScrollMagic.Scene({
    //             triggerElement: '.ocean',
    //             triggerHook: 0.3,

    //         }).setTween(boatmove)
    //         // .addIndicators({
    //         //     name: 'boat',
    //         //     colorTrigger: '#f00',
    //         // })
    //         .addTo(controller);


    // };



    // 客製化料理
    // let timeCook = new TimelineMax();

    // timeCook.from('.cookPic1', 3, {
    //     x: -150,
    //     y: 0,
    //     ease: Power3.easeInOut

    // }).from('.cookPic2', 3, {
    //     x: -200,
    //     y: 30,
    //     ease: Power3.easeInOut

    // }).from('.cookPic3', 3, {
    //     x: -200,
    //     y: 20,
    //     ease: Power3.easeInOut

    // }).from('.cookPic4', 3, {
    //     x: -200,
    //     y: 50,
    //     ease: Power3.easeInOut

    // }).from('.cookPic5', 3, {
    //     x: -250,
    //     y: 20,
    //     ease: Power3.easeInOut

    // }).from('.cookPic6', 3, {
    //     x: -100,
    //     y: 20,
    //     ease: Power3.easeInOut

    // }).from('.cookPic7', 3, {
    //     x: -100,
    //     y: 20,
    //     ease: Power3.easeInOut

    // })


    // var ourScene3 = new ScrollMagic.Scene({
    //         triggerElement: '#cookPin',
    //         duration: '300%',
    //         triggerHook: 0,
    //         // offset: '200'

    //     }).setTween(timeCook)
    //     .setPin('.cookPinWrapper')
    //     // .addIndicators({
    //     //     name: 'boat',
    //     //     colorTrigger: '#f00',
    //     // })
    //     .addTo(controller);



    // // 泡泡動畫
    // bubblePop();
    // bubblePop1();
    // setInterval(bubblePop, 5000);
    // setInterval(bubblePop1, 4000);

    // function bubblePop() {
    //     TweenMax.staggerFrom(['.seafood .bubble1', '.seafood .bubble2', '.seafood .bubble3'], 1, {
    //         x: 0,
    //         y: 50,
    //         opacity: 0,
    //         scale: 0.5,


    //     }, .3);

    // }

    // function bubblePop1() {
    //     TweenMax.staggerFrom(['.seafood .bubble4', '.seafood .bubble5', '.seafood .bubble6'], 1, {
    //         x: -50,
    //         y: 50,
    //         opacity: 0,
    //         scale: 0.5,
    //         delay: 1,


    //     }, .3);
    // }








});