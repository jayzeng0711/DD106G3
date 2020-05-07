//desktop
$(document).ready(function() {
        $('.pu_text_a').hover(function() {
            $(this).toggleClass('pu_flow-wave');
        }, )
    })
    //desktop

//mobile
$(document).ready(function() {
    window_w = $(window).width();
    $('.pu_mb_text_a').hover(function() {
        $(this).toggleClass('pu_flow-wave');
    }, )
    $('.burger').click(function(e) {
        if (this.classList[1] == 'burger--close') {
            $(this).removeClass('burger--close');
            $('.mb_sma_cloud_img').css('display', 'block');
            $('.mb_big_cloud_img_div').animate({ right: "-770px" }, 800, function() {
                $('.mb_big_cloud_img_div').css('display', 'none');
            });
        } else {
            $(this).addClass('burger--close');
            $('.mb_big_cloud_img_div').css('display', 'block');
            $('.mb_big_cloud_img').css('width', `${window_w}`);
            $('.mb_big_cloud_img_div').animate({ right: "0px" }, 800);
        }
    })
})
$(window).resize(function() {
    window_w = $(window).width();
    $('.mb_big_cloud_img').css('width', `${window_w}`);
})
//mobile

//判斷滾輪方向
$(window).scroll(function(){
    // 一開始滾先記住原本的位置
    var before = $(window).scrollTop();
    //再一次滾的時候，判斷第二次滾的位置
    $(window).scroll(function() {
        var after = $(window).scrollTop();
        //如果第二次滾的時候大於之前滾的位置，代表滾輪往下
        if (before<after) {
        $('.pu_head_wrap_div').css('transform','translateY(-150%)');
        //把第一次滾的位置改成現在滾的位置
        before = after;
    };
    if (before>after) {
        $('.pu_head_wrap_div').css('transform','translateY(0%)');
        before = after;
        };
    });
});
//判斷滾輪方向

//h1標題抓網頁標題
$(document).ready(function() {
        $('.pu_div_text').text(document.title);
    })
    //h1標題抓網頁標題

//機器人移動
$(document).ready(function() {
        var window_open = $('.pu_big_content_wrap').css('display');
        $('.reboot_btn_div').click(function(e) {
            $('.pu_big_content_wrap').css('display', 'block');
            e.stopPropagation();
        })
        $('.pu_big_content_cancel').click(function() {
            $('.pu_big_content_wrap').css('display', 'none');
            $('.reboot_div').animate({ bottom: "-160px" }, 1000);
        })
        $('.reboot_div').click(function() {
            if (window_open == 'none') {
                if($('.reboot_div').css('bottom') == "-10px"){
                    $('.reboot_div').animate({ bottom: "-160px" }, 1000);
                    $('.pu_big_content_wrap').css('display', 'none');
                }else{
                    $(this).animate({ bottom: "-10px" }, 1000);
                }
            }
        })
    })
    //機器人移動

//會員登入燈箱
$(document).ready(function() {
        $("#mem_lohin_btn,#mem_lohin_btn_mobile").click(function(e) {
            e.preventDefault();
            $('#Login,#Login_back').css('display', 'block');
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'block');
        })
        $('#cancel').click(function() {
            $('#Login,#Login_back').css('display', 'none');
        })
        $('.showRegister').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'block');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'none');
        })
        $('.showForget').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'block');
            $('#pu_mem_login_wrap').css('display', 'none');
        })
        $('.return_login').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'block');
        })
    })
    //會員登入燈箱



// init controller
var controller = new ScrollMagic.Controller();

let scroll = TweenMax.from('#go_top', 1, {
    x: '-200%',
    y: '100%',

});
let Scene = new ScrollMagic.Scene({
        triggerElement: '#keypoint',
        triggerHook: 0.2,


    }).setTween(scroll)
    // .addIndicators({  //加上名稱
    //     name: '#go_top',
    // })
    .addTo(controller);

$(window).scrollTop()

$('#go_top').click(function() {
    $('html').animate({
        scrollTop: 0
    }, 600);

});