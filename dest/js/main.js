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
            let divLeft = parseInt($('.boat img').css('left'));

            if (divLeft < $(window).width()) {
                $('.boat img').css('left', '+=300');
            } else {

                setTimeout(function() {
                    $('.captain').css('opacity', '1');
                    $('.section1 .text').css('opacity', '0');

                }, 500);
                window.removeEventListener('wheel', move);

            }

            let boatWid = $('.boat img').width();
            let boatLeft = $('.boat img').offset().left;
            let layer3Left = $('.layer3').offset().left;

            // 船碰到港口
            if ((boatWid / 2) + boatLeft > layer3Left) {
                $('.port').css('opacity', 1);

            }


            // 船經過，海鮮飛起來
            let fishFlyTime = setInterval(function() {
                    let divLeft = parseInt($('.boat img').css('left'));
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

    let timeMap
        // 出發按鈕，船長和公告消失
    $('.buttonGo').click(function() {

        $('.captain').css('opacity', '0');
        $('.section1 .text').css('opacity', '1');
        $('.wrapperWheel').css('display', 'block');

        // 視窗滑到地圖頂端，地圖變小
        window.addEventListener("wheel", function() {
            timeMap = setInterval(check, 100)
        });

        function check() {
            if ($(window).scrollTop() >= $('.map img').offset().top) {
                small();

            }
        }

    });

    // 開發測試用
    // window.addEventListener("wheel", function() {
    //     setInterval(check, 100)
    // });

    // function check() {
    //     if ($(window).scrollTop() >= $('.map img').offset().top) {
    //         small();

    //     }
    // }



    // 地圖變小
    function small() {
        let imgWid = $('.map img').width();
        let winWid = $(window).width();

        if (imgWid > winWid / 2) {
            imgWid = imgWid * 0.8;
            $('.map img').width(imgWid);
        } else {
            $('.wrapperBg').css('display', 'block');
            $('.title').css('opacity', '1');
            $('.reservation ').css('opacity', '1');
            $('.datetable').css('opacity', '1');
            $('.map').addClass('small');
            clearInterval(timeMap);

        }
        window.removeEventListener('wheel', small);
    }



    // 點餐卡片會動

    VanillaTilt.init(document.querySelectorAll(".menu"), {
        max: 25,
        speed: 1000,
        scale: 1.2
    });





    // 進入套餐頁面

    var controller = new ScrollMagic.Controller();

    function boat() {
        let boatmove = new TimelineLite();
        boatmove.add(
            TweenLite.to('.boat2', 5, {
                bezier: {
                    curviness: 2,
                    autoRotate: false,
                    values: [
                        { x: 50, y: 100 },
                        { x: 100, y: 200 },
                        { x: 50, y: 400 },
                        { x: 100, y: 500 }
                    ]
                },
                ease: Power1.eaeInOut,
            })
        );

        var ourScene = new ScrollMagic.Scene({
                triggerElement: '.ocean',
                triggerHook: 0.3,

            }).setTween(boatmove)
            // .addIndicators({
            //     name: 'boat',
            //     colorTrigger: '#f00',
            // })
            .addTo(controller);


    };



    // 客製化料理
    let timeCook = new TimelineMax();

    timeCook.from('.cookPic1', 3, {
        x: -150,
        y: 0,
        ease: Power3.easeInOut

    }).from('.cookPic2', 3, {
        x: -200,
        y: 30,
        ease: Power3.easeInOut

    }).from('.cookPic3', 3, {
        x: -200,
        y: 20,
        ease: Power3.easeInOut

    }).from('.cookPic4', 3, {
        x: -200,
        y: 50,
        ease: Power3.easeInOut

    }).from('.cookPic5', 3, {
        x: -250,
        y: 20,
        ease: Power3.easeInOut

    }).from('.cookPic6', 3, {
        x: -100,
        y: 20,
        ease: Power3.easeInOut

    }).from('.cookPic7', 3, {
        x: -100,
        y: 20,
        ease: Power3.easeInOut

    })


    var ourScene3 = new ScrollMagic.Scene({
            triggerElement: '#cookPin',
            duration: '100%',
            triggerHook: 0,
            // offset: '200'

        }).setTween(timeCook)
        .setPin('.cookPinWrapper')
        // .addIndicators({
        //     name: 'boat',
        //     colorTrigger: '#f00',
        // })
        .addTo(controller);



    // 泡泡動畫
    bubblePop();
    bubblePop1();
    setInterval(bubblePop, 5000);
    setInterval(bubblePop1, 4000);

    function bubblePop() {
        TweenMax.staggerFrom(['.seafood .bubble1', '.seafood .bubble2', '.seafood .bubble3'], 1, {
            x: 0,
            y: 50,
            opacity: 0,
            scale: 0.5,


        }, .3);
        console.log(1);
    }

    function bubblePop1() {
        TweenMax.staggerFrom(['.seafood .bubble4', '.seafood .bubble5', '.seafood .bubble6'], 1, {
            x: -50,
            y: 50,
            opacity: 0,
            scale: 0.5,
            delay: 1,


        }, .3);
    }








});