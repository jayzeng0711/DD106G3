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


        // 顯示參賽料理列表
        // 從資料庫抓資料顯示於網頁
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {

            // 從資料庫抓前三名資料顯示於網頁
            var xhr2 = new XMLHttpRequest();
            xhr2.onload = function () {
                if (xhr2.status == 200) {

                    let custoRKRows = JSON.parse(xhr2.responseText);
                    console.log(custoRKRows)
                    // console.log(custoRKRows[0].comments.length)
                    // console.log(custoRKRows[1].comments.length)
                    // console.log(custoRKRows[2].comments.length)
                    
                        //取出排行榜第二名資訊
                        $(".ranking_contain").append(`
                        <div class="cookList_item">   
                            <div class="cookList_pic animated bounceInLeft delay-.5s">
                                <figure class="food_img textHover" hovertext="作品留言放在這~作品留言放在這~作品留言放在這~">
                                <img id="cook_${custoRKRows[1].custoNo}" src="./images/${custoRKRows[1].custoPic}" alt="">
                                </figure>
                                <figure class="barrel">
                                    <img src="./images/barrel_r02.png" alt="">
                                </figure>
                            </div>
                            <div class="list_bg">    
                                <div class="food_title">
                                    <p id="name_${custoRKRows[1].custoNo}">${custoRKRows[1].custoName}</p>
                                    <p>票數:${custoRKRows[1].contestCustoVote}</p>
                                </div>
                                <div class="cookList_vote">
                                    <button id="vote_${custoRKRows[1].custoNo}">投票</button>
                                </div>
                                <div class="msg">
                                    <P class="big">留言板</p>
                                    <div class="msg_text" id="msg_text_${custoRKRows[1].custoNo}">
                                        
                                    </div>
                                    <div class="msg_btn">
                                        <button class="RKmsg_btn" id="RKmsg_btn_${custoRKRows[1].custoNo}">留言</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    
                        for(j=0; j<custoRKRows[1].comments.length; j++){ 
                            $(`#msg_text_${custoRKRows[1].custoNo}`).append(`
                            <p>
                            ${custoRKRows[1].comments[j].memName}：
                            ${custoRKRows[1].comments[j].commentContent}
                            </p>
                            `);
                        }

                        //取出排行榜第一名資訊
                        $(".ranking_contain").append(`
                        <div class="cookList_item">   
                            <div class="cookList_pic animated bounceInDown delay-1s">
                                <figure class="food_img textHover" hovertext="作品留言放在這~作品留言放在這~作品留言放在這~">
                                <img id="cook_${custoRKRows[0].custoNo}" src="./images/${custoRKRows[0].custoPic}" alt="">
                                </figure>
                                <figure class="barrel">
                                    <img src="./images/barrel_r01.png" alt="">
                                </figure>
                            </div>
                            <div class="list_bg">    
                                <div class="food_title">
                                    <p id="name_${custoRKRows[0].custoNo}">${custoRKRows[0].custoName}</p>
                                    <p>票數:${custoRKRows[0].contestCustoVote}</p>
                                </div>
                                <div class="cookList_vote">
                                    <button id="vote_${custoRKRows[0].custoNo}">投票</button>
                                </div>
                                <div class="msg">
                                    <P class="big">留言板</p>
                                    <div class="msg_text" id="msg_text_${custoRKRows[0].custoNo}">
                                        
                                    </div>
                                    <div class="msg_btn">
                                        <button class="RKmsg_btn" id="RKmsg_btn_${custoRKRows[0].custoNo}">留言</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    
                        for(j=0; j<custoRKRows[0].comments.length; j++){ 
                            $(`#msg_text_${custoRKRows[0].custoNo}`).append(`
                            <p>
                            ${custoRKRows[0].comments[j].memName}：
                            ${custoRKRows[0].comments[j].commentContent}
                            </p>
                            `);
                        }

                        //取出排行榜第三名資訊
                        $(".ranking_contain").append(`
                        <div class="cookList_item">   
                            <div class="cookList_pic animated bounceInRight delay-.5s">
                                <figure class="food_img textHover" hovertext="作品留言放在這~作品留言放在這~作品留言放在這~">
                                <img id="cook_${custoRKRows[2].custoNo}" src="./images/${custoRKRows[2].custoPic}" alt="">
                                </figure>
                                <figure class="barrel">
                                    <img src="./images/barrel_r03.png" alt="">
                                </figure>
                            </div>
                            <div class="list_bg">    
                                <div class="food_title">
                                    <p id="name_${custoRKRows[2].custoNo}">${custoRKRows[2].custoName}</p>
                                    <p>票數:${custoRKRows[2].contestCustoVote}</p>
                                </div>
                                <div class="cookList_vote">
                                    <button id="vote_${custoRKRows[2].custoNo}">投票</button>
                                </div>
                                <div class="msg">
                                    <P class="big">留言板</p>
                                    <div class="msg_text" id="msg_text_${custoRKRows[2].custoNo}">
                                        
                                    </div>
                                    <div class="msg_btn">
                                        <button class="RKmsg_btn" id="RKmsg_btn_${custoRKRows[2].custoNo}">留言</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    
                        for(j=0; j<custoRKRows[2].comments.length; j++){ 
                            $(`#msg_text_${custoRKRows[2].custoNo}`).append(`
                            <p>
                            ${custoRKRows[2].comments[j].memName}：
                            ${custoRKRows[2].comments[j].commentContent}
                            </p>
                            `);
                        }
                    
                        // 點留言按鈕開啟燈箱
                        
                        $(".RKmsg_btn").on("click", function (e) {
                            var RKid = e.target.id;
                            RKid = RKid.substr(RKid.length - 1, 1);
                            showMsg(RKid);
                            alert(RKid);
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
                        function showMsg(id){
                            $(".mem_name p").text(`${custoRKRows[0].comments[0].memName}`);

                        }

                } else {
                    alert(xhr2.status);
                }
            }
            // FTP
            // xhr.open('post', './php/test.php', true);

            // Mac
            // xhr.open('post', 'http://localhost:8080/test.php', true);

            // windows
            xhr2.open('GET', './php/contest_showRanking.php', true);
            xhr2.send(null);


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
                                <button id="msg_btn_${custoRows[i].custoNo}">留言</button>
                            </div>
                        </div>
                    </div>
                    `);
                   

                    
                    for(j=0; j<custoRows[i].comments.length; j++){ // [0]:3 [1]:2 [2]:2
                            // console.log(custoRows[i].comments.length);

                            $(`#msg_text_${custoRows[i].custoNo}`).append(`
                            <p>
                            ${custoRows[i].comments[j].memName}：
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

