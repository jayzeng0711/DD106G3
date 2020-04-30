$(document).ready(function(){
    $('.look_detail').click(function(){
        id_num = this.id;
        id_num_last = id_num.substr(id_num.length-1,1);
        aaa(id_num_last);
    })
    $('.cross').click(function(){
        $('.look_back,.look').css('display','none');
    })
})

function aaa(id){
    var food_name = $(`#name_${id}`).text();
    var cook_img = $(`#cook_${id}`).attr('src');
    var window_w = $(window).width();
    var window_h = $(window).height();
    var look_w = $('.look').width();
    var look_h = $('.look').height();
    $('.light_title').text(food_name);
    $('.light_img').attr('src',cook_img);
    $('.look_back').css('display','block');
    $('.look').css({
        'display': 'block',
        'left':(window_w-look_w)/2+'px',
        'top':(window_h-look_h)/2+'px',
    });
}


  //燈箱
$(function () {

    // 開啟 Modal 彈跳視窗
    $("#msg_btn9").on("click", function () {
        $("div.msg_overlay").addClass("-on");
    });

    // 關閉 Modal
    $("img.msg_close").on("click", function () {
        $("div.msg_overlay").addClass("-opacity-zero");

        // 設定隔一秒後，移除相關 class
        setTimeout(function () {
            $("div.msg_overlay").removeClass("-on -opacity-zero");
        }, 1000);
    });

});