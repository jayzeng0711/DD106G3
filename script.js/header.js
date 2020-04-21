$(document).ready(function(){
    $('.ship_img_div').hover(function(){
        $(this).children('div:first-child').css('opacity','1');
        $('.opacity_div img').addClass('img_cruise');
    },function(){
        $(this).children('div:first-child').css('opacity','0');
        $('.opacity_div img').removeClass('img_cruise');
    })
})