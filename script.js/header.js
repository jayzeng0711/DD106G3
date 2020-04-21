$(document).ready(function(){
    $('.ship_img_div').hover(function(){
        $(this).children('div:first-child').css('opacity','1');
    },function(){
        $(this).children('div:first-child').css('opacity','0');
    })
})