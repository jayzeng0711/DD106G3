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