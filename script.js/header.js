//desktop
$(document).ready(function(){
    $('.pu_text_a').hover(function(){
        $(this).toggleClass('pu_flow-wave');
    },)
})
//desktop

//mobile
$(document).ready(function(){
    window_w = $(window).width();
    $('.pu_mb_text_a').hover(function(){
        $(this).toggleClass('pu_flow-wave');
    },)
    $('.burger').click(function(){
        if(this.classList[1] == 'burger--close'){
            $(this).removeClass('burger--close');
            $('.mb_sma_cloud_img').css('display','block');
            $('.mb_big_cloud_img_div').animate({right:"-770px"},800,function(){
                $('.mb_big_cloud_img_div').css('display','none');
            });
        }else{
            $(this).addClass('burger--close');
            $('.mb_big_cloud_img_div').css('display','block');
            $('.mb_big_cloud_img').css('width',`${window_w}`);
            $('.mb_big_cloud_img_div').animate({right:"0px"},800);
        }
    })
})
$(window).resize(function(){
    window_w = $(window).width();
    $('.mb_big_cloud_img').css('width',`${window_w}`);
})
//mobile

//h1標題抓網頁標題
$(document).ready(function(){
    $('.pu_div_text').text(document.title);
})
//h1標題抓網頁標題

//機器人移動
$(document).ready(function(){
    var window_open = $('.pu_big_content_wrap').css('display');
    $('.reboot_btn_div').click(function(){
        $('.pu_big_content_wrap').css('display','block');
    })
    $('.pu_big_content_cancel').click(function(){
        $('.pu_big_content_wrap').css('display','none');
        $('.reboot_div').animate({bottom:"-150px"},1000);
    })
    $('.reboot_div').click(function(){
        if(window_open == 'block'){
            $(this).animate({bottom:"-150px"},1000);
        }else{
            $(this).animate({bottom:"0px"},1000);
        }
    })
})
//機器人移動

//會員登入燈箱
$(document).ready(function(){
    $("#mem_lohin_btn").click(function(){
        $('#Login,#Login_back').css('display','block');
    })
    $('#cancel').click(function(){
        $('#Login,#Login_back').css('display','none');
    })
})
//會員登入燈箱
