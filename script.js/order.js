$(function() {

    // 按步驟切換頁面位置

    // $('.section2').css('display', 'none');
    // $('.section3').css('display', 'none');

    $('.section1 .next').click(function() {
        $('html').animate({
            scrollTop: $('.section2').offset().top
        }, 600);
        // $('.section1').css('display', 'none');
        // $('.section2').css('display', 'block');

    });
    $('.section2 .next').click(function() {
        $('html').animate({
            scrollTop: $('.section3').offset().top
        }, 600);
        // $('.section2').css('display', 'none');
        // $('.section3').css('display', 'block');

    });
    $('.section2 .previous').click(function() {
        $('html').animate({
            scrollTop: $('.section1').offset().top
        }, 600);
        // $('.section1').css('display', 'block');
        // $('.section2').css('display', 'none');

    });
    $('.section3 .previous').click(function() {
        $('html').animate({
            scrollTop: $('.section2').offset().top
        }, 600);
        // $('.section2').css('display', 'block');
        // $('.section3').css('display', 'none');

    });

    // 地圖

    // function initMap() {
    //     var port1 = {
    //         lat: 25.132219,
    //         lng: 121.819155
    //     };
    //     var port2 = {
    //         lat: 24.2922424,
    //         lng: 120.5136367
    //     };
    //     var port3 = {
    //         lat: 22.6266234,
    //         lng: 120.2747798
    //     };
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 7,
    //         center: port2
    //     });
    //     var marker1 = new google.maps.Marker({
    //         position: port1,
    //         map: map
    //     });
    //     var marker2 = new google.maps.Marker({
    //         position: port2,
    //         map: map
    //     });
    //     var marker3 = new google.maps.Marker({
    //         position: port3,
    //         map: map
    //     });
    // }



    // 餐點數量不小於0、不是空值

    $('.meal').change(function() {

        let inputVal = $(this).val();

        if (inputVal == "") {
            $(this).val(0);
        }
        if (parseInt(inputVal) < 0) {
            $(this).val(0);
        }
        console.log($(this).val());

    });

});