window.addEventListener('load', function() {

    AOS.init();


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

    // 變換料理

    setInterval(changeCookImg, 1000);
    setInterval(changeCookImg, 1500);

    function changeCookImg() {
        let cookNum = Math.floor(Math.random() * 7);
        let cookImg = document.getElementsByClassName('cookImg')[cookNum];
        let cookImgSrc = Math.floor(Math.random() * 13) + 1;
        cookImg.src = "./image/cook" + cookImgSrc + ".png";

    };

    // 滾動滑鼠船前進

    window.onmousewheel = move;

    function move() {

        let divLeft = parseInt($('.boat img').css('left'));

        if (divLeft < $(window).width()) {
            $('.boat img').css('left', '+=300');
        } else {
            $('.wrapperWheel').css('display', 'block');
            ocean();
        }

    };

    // 雲和島嶼消失

    function ocean() {

        function oceanmove() {

            oceanTween1 = new TweenMax('.cloud', 3, {
                x: -1000,
                delay: 1,
            });
            oceanTween2 = new TweenMax('.island', 4, {
                x: -3000,
                delay: 1,
            });
            setTimeout(captain, 2500);

            function captain() {
                $('.captain img').css('opacity', '1');
                $('.section2 .text').css('opacity', '1');

            };
        };

        var ourScene2 = new ScrollMagic.Scene({
                triggerElement: '.cloud',
                triggerHook: 0.3,

            }).setTween(oceanmove)
            // .addIndicators({
            //     name: 'cloud',
            //     colorTrigger: '#f00',
            // })
            .addTo(controller);


    }


    // 出發按鈕，船長和公告消失

    $('.buttonGo').click(function() {

        $('.section2 .text').css('display', 'none');
        TweenMax.to('.captain img', 0.5, {
            x: -2000,
            delay: 1,

        });

        setTimeout(reservation, 3000);
        boat();
        $('.wrapperBg').css('display', 'block');
        $('.boat2').css('display', 'block');


    });


    // 訂位
    function reservation() {

        $('.cloud1').css('display', 'flex');
        $('.reservation').css('display', 'inline-block');
        $('.map ').css('display', 'inline-block');



    }



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

    }

    // 客製化料理
    let timeCook = new TimelineMax();

    timeCook.from('.cookPic1', 3, {
        x: -150,
        y: 100,
        ease: Power3.easeInOut

    }).from('.cookPic2', 3, {
        x: -250,
        y: 30,
        ease: Power3.easeInOut

    }).from('.cookPic3', 3, {
        x: -200,
        y: 20,
        ease: Power3.easeInOut

    }).from('.cookPic4', 3, {
        x: -100,
        y: 20,
        ease: Power3.easeInOut

    })


    var ourScene3 = new ScrollMagic.Scene({
            triggerElement: '.cookPin',
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








});