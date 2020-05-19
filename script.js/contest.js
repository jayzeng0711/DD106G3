//查看詳情燈箱
// $(document).ready(function(){
//     $('.look_detail').click(function(){
//         id_num = this.id;
//         id_num_last = id_num.substr(id_num.length-1,1);
//         aaa(id_num_last);
//     })
//     $('.cross').click(function(){
//         $('.look_back,.look').css('display','none');
//     })
// })

// function aaa(id){
//     var food_name = $(`#name_${id}`).text();
//     var cook_img = $(`#cook_${id}`).attr('src');
//     var window_w = $(window).width();
//     var window_h = $(window).height();
//     var look_w = $('.look').width();
//     var look_h = $('.look').height();
//     $('.light_title').text(food_name);
//     $('.light_img').attr('src',cook_img);
//     $('.look_back').css('display','block');
//     $('.look').css({
//         'display': 'block',
//         'left':(window_w-look_w)/2+'px',
//         'top':(window_h-look_h)/2+'px',
//     });
// }


$(document).ready(function(){

    showPage();
    function showPage() {
        
        // 從資料庫抓資料顯示於網頁
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {

                let custoRows = JSON.parse(xhr.responseText);
                // console.log(custoRows);
                // console.log(custoRows.length);

                // console.log(custoRows[0]);
                // console.log(custoRows[0].comments[0].commentContent);
                // console.log(custoRows[0].comments.length);
                // console.log(custoRows[1].comments.length);
                // console.log(custoRows[2].comments.length);


                // 顯示參賽作品列表
                for(i=0; i<custoRows.length; i++){
                    $(".cookList_contain").append(`
                    <div class="cookList_item">
                        <div class="cookList_img">
                            <figure class="cookList_cook">
                                <img id="cook_${custoRows[i].custoNo}" src="./images/${custoRows[i].custoPic}" alt="">
                                <figcaption>
                                    <p id="name_${custoRows[i].custoNo}">${custoRows[i].custoName}</p>
                                    <p>票數:${custoRows[i].contestCustoVote}</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="cookList_vote">
                            <button id="vote_${custoRows[i].custoNo}">投票</button>
                        </div>
                        <div class="msg">
                            <P class="big">留言板</p>
                            
                            <div class="msg_text" id="msg_text_${custoRows[i].custoNo}">
                                
                            </div>
                            <div class="msg_btn">
                                <button id="msg_btn${custoRows[i].custoNo}">留言</button>
                            </div>
                        </div>
                    </div>
                    `);
                   

                    
                    for(j=0; j<custoRows[i].comments.length; j++){ // [0]:3 [1]:2 [2]:2
                            // console.log(custoRows[i].comments.length);

                            $(`#msg_text_${custoRows[i].custoNo}`).append(`
                            <p>
                            <img src="./images/unnamed.jpg" alt="">
                            ${custoRows[i].comments[j].commentContent}
                            </p>
                            `);

                    }


                }
                
                
            } else {
                alert(xhr.status);
            }
        }

        // FTP
        // xhr.open('post', './php/test.php', true);

        // Mac
        // xhr.open('post', 'http://localhost:8080/test.php', true);

        // windows
        xhr.open('GET', './php/contest_showlist.php', true);
        xhr.send(null);
    }





    


    //排行榜作品留言顯示區域
    $('.textHover').mousemove(function(e){ //當滑鼠移入顯示
        let theText = $(this).attr('hovertext');

        $('#contestant_msg').text(theText).show().css({
            left: e.pageX+10,
            top: e.pageY+10,
        });
    }).mouseout(function(){ //當滑鼠移出隱藏
        $('#contestant_msg').hide();
    });


    //留言燈箱
    $(function () {

        // 點留言按鈕開啟燈箱
        $("#msg_btn9").on("click", function () {
            event.stopPropagation();
            $("div.msg_overlay").addClass("-on");
        });

        // 點叉叉圖示關閉燈箱
        $("img.msg_close").on("click", function () {
            $("div.msg_overlay").addClass("-opacity-zero");

            // 設定隔一秒後，移除相關 class
            setTimeout(function () {
                $("div.msg_overlay").removeClass("-on -opacity-zero");
            }, 1000);
        });

        //點選空白處關閉燈箱
        $("div.msg_overlay").click(function (e) {
            var _con = $('div.msg_board'); // 設定目標區域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $("div.msg_overlay").addClass("-opacity-zero");

                setTimeout(function () {
                    $("div.msg_overlay").removeClass("-on -opacity-zero");
                }, 1000);
            }
        });

    });


    //檢舉燈箱
    $(function () {

        // 點檢舉按鈕開啟燈箱
        $("#rep1").on("click", function () {
            event.stopPropagation();
            $("div.report_overlay").addClass("-on");
        });

        // 點叉叉圖示關閉燈箱
        $("img.report_close").on("click", function () {
            $("div.report_overlay").addClass("-opacity-zero");

            // 設定隔一秒後，移除相關 class
            setTimeout(function () {
                $("div.report_overlay").removeClass("-on -opacity-zero");
            }, 1000);
        });


    });




});

