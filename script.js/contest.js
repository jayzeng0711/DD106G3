
$(document).ready(function () {

    // 顯示參賽料理列表
    // 從資料庫抓所有參賽作品
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            let custoRows = JSON.parse(xhr.responseText);

            // 顯示參賽作品列表
            for (i = 0; i < custoRows.length; i++) {
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


                if (custoRows[i].comments.length) {
                    for (j = 0; j < custoRows[i].comments.length; j++) {
                        $(`#msg_text_${custoRows[i].custoNo}`).append(`
                            <p>
                            ${custoRows[i].comments[j].memName}：
                            ${custoRows[i].comments[j].commentContent}
                            </p>
                        `);
                    }
                } else {
                    $(`#msg_text_${custoRows[i].custoNo}`).append(`
                        <p class="no_msg">
                        來當第一個留言的人吧!
                        </p>
                    `);
                }
            }


            // 從資料庫抓排行前三名資料
            var xhr2 = new XMLHttpRequest();
            xhr2.onload = function () {
                if (xhr2.status == 200) {
                    let custoRKRows = JSON.parse(xhr2.responseText);

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
                    //取出所有留言
                    if(custoRKRows[1].comments.length){
                        for (j = 0; j < custoRKRows[1].comments.length; j++) {
                            $(`#msg_text_${custoRKRows[1].custoNo}`).append(`
                            <p>
                            ${custoRKRows[1].comments[j].memName}：
                            ${custoRKRows[1].comments[j].commentContent}
                            </p>
                            `);
                        }
                    }else{
                        $(`#msg_text_${custoRows[1].custoNo}`).append(`
                            <p class="no_msg">來當第一個留言的人吧!</p>
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
                    //取出所有留言
                    if(custoRKRows[0].comments.length){
                        for (j = 0; j < custoRKRows[0].comments.length; j++) {
                            $(`#msg_text_${custoRKRows[0].custoNo}`).append(`
                            <p>
                            ${custoRKRows[0].comments[j].memName}：
                            ${custoRKRows[0].comments[j].commentContent}
                            </p>
                            `);
                        }
                    }else{
                        $(`#msg_text_${custoRows[0].custoNo}`).append(`
                            <p class="no_msg">來當第一個留言的人吧!</p>
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
                    //取出所有留言
                    if(custoRKRows[2].comments.length){
                        for (j = 0; j < custoRKRows[2].comments.length; j++) {
                            $(`#msg_text_${custoRKRows[2].custoNo}`).append(`
                            <p>
                            ${custoRKRows[2].comments[j].memName}：
                            ${custoRKRows[2].comments[j].commentContent}
                            </p>
                            `);
                        }
                    }else{
                        $(`#msg_text_${custoRows[2].custoNo}`).append(`
                            <p class="no_msg">來當第一個留言的人吧!</p>
                        `);
                    }
                    

                    //第一名留言燈箱
                    $(".a1").append(`
                    <div class="msg_overlay" id="msg_overlay_${custoRKRows[0].custoNo}">
                    <div class="msg_board">
                        <div class="msg_title">
                            留言板
                            <img class="msg_close" src="./images/blue-cross-icon.png" alt="">
                        </div>
                        <div class="msg_wrap msg_wrap${custoRKRows[0].custoNo}">
                            
                        </div>
                        <form action="" class="msg_input" id="msg_input_${custoRKRows[0].custoNo}">
                            <input type="text" id="text_${custoRKRows[0].custoNo}" name="" placeholder="最多輸入10個字喔～～" maxlength="10">
                            <button class="msginput_btn RK_input_btn" id="msginput_RKbtn_${custoRKRows[0].custoNo}" type="button">留言</button>
                        </form>
                    </div>
                    </div>
                    `);
                    //取出所有留言
                    for (j = 0; j < custoRKRows[0].comments.length; j++) {
                        $(`.msg_wrap${custoRKRows[0].custoNo}`).append(`
                        <div class="mem_contain">
                            <div class="flex_wrap">
                                <div class="mem_name">
                                    <p>${custoRKRows[0].comments[j].memName}</p>
                                    <img src="./images/unnamed.jpg" alt="">
                                </div>
                                <div class="mem_msg" id="mem_msg_${custoRKRows[0].comments[j].commentNo}">
                                    <p>${custoRKRows[0].comments[j].commentContent}</p>
                                </div>
                                <div class="report">
                                    <button class="report_btn" id="rep_${custoRKRows[0].comments[j].commentNo}">檢舉</button>
                                </div>
                            </div>
                            <div class="msg_date">
                                <p>${custoRKRows[0].comments[j].commentTime}</p>
                            </div>
                        </div>
                        `);
                    }

                    //第二名留言燈箱
                    $(".a2").append(`
                    <div class="msg_overlay" id="msg_overlay_${custoRKRows[1].custoNo}">
                    <div class="msg_board">
                        <div class="msg_title">
                            留言板
                            <img class="msg_close" src="./images/blue-cross-icon.png" alt="">
                        </div>
                        <div class="msg_wrap msg_wrap${custoRKRows[1].custoNo}">
                            
                        </div>
                        <form action="" class="msg_input" id="msg_input_${custoRKRows[1].custoNo}">
                            <input type="text" id="text_${custoRKRows[1].custoNo}" name="" placeholder="最多輸入10個字喔～～" maxlength="10">
                            <button class="msginput_btn RK_input_btn" id="msginput_RKbtn_${custoRKRows[1].custoNo}" type="button">留言</button>
                        </form>
                    </div>
                    </div>
                    `);
                    //取出所有留言
                    for (j = 0; j < custoRKRows[1].comments.length; j++) {
                        $(`.msg_wrap${custoRKRows[1].custoNo}`).append(`
                        <div class="mem_contain">
                            <div class="flex_wrap">
                                <div class="mem_name">
                                    <p>${custoRKRows[1].comments[j].memName}</p>
                                    <img src="./images/unnamed.jpg" alt="">
                                </div>
                                <div class="mem_msg id="mem_msg_${custoRKRows[1].comments[j].commentNo}">
                                    <p>${custoRKRows[1].comments[j].commentContent}</p>
                                </div>
                                <div class="report">
                                    <button class="report_btn" id="rep_${custoRKRows[1].comments[j].commentNo}">檢舉</button>
                                </div>
                            </div>
                            <div class="msg_date">
                                <p>${custoRKRows[1].comments[j].commentTime}</p>
                            </div>
                        </div>
                        `);
                    }

                    //第三名留言燈箱
                    $(".a3").append(`
                    <div class="msg_overlay" id="msg_overlay_${custoRKRows[2].custoNo}">
                    <div class="msg_board">
                        <div class="msg_title">
                            留言板
                            <img class="msg_close" src="./images/blue-cross-icon.png" alt="">
                        </div>
                        <div class="msg_wrap msg_wrap${custoRKRows[2].custoNo}">
                            
                        </div>
                        <form action="" class="msg_input"  id="msg_input_${custoRKRows[2].custoNo}">
                            <input type="text" id="text_${custoRKRows[2].custoNo}" name="" placeholder="最多輸入10個字喔～～" maxlength="10">
                            <button class="msginput_btn RK_input_btn" id="msginput_RKbtn_${custoRKRows[2].custoNo}" type="button">留言</button>
                        </form>
                    </div>
                    </div>
                    `);
                    //取出所有留言
                    for (j = 0; j < custoRKRows[2].comments.length; j++) {
                        $(`.msg_wrap${custoRKRows[2].custoNo}`).append(`
                        <div class="mem_contain">
                            <div class="flex_wrap">
                                <div class="mem_name">
                                    <p>${custoRKRows[2].comments[j].memName}</p>
                                    <img src="./images/unnamed.jpg" alt="">
                                </div>
                                <div class="mem_msg id="mem_msg_${custoRKRows[2].comments[j].commentNo}">
                                    <p>${custoRKRows[2].comments[j].commentContent}</p>
                                </div>
                                <div class="report">
                                    <button class="report_btn" id="rep_${custoRKRows[2].comments[j].commentNo}">檢舉</button>
                                </div>
                            </div>
                            <div class="msg_date">
                                <p>${custoRKRows[2].comments[j].commentTime}</p>
                            </div>
                        </div>
                        `);
                    }



                    // 抓到點留言的按鈕
                    $(".RKmsg_btn").on("click", function (e) {
                        var RKid = e.target.id;
                        RKid = RKid.slice(10); 
                        showMsg(RKid);
                        alert(RKid);
                        event.stopPropagation();
                    });
                    //開啟留言燈箱
                    function showMsg(id) {
                        $(`#msg_overlay_${id}`).addClass("-on");
                    }
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

                    //抓到輸入留言的按鈕
                    $(".RK_input_btn").on("click", function (e) {
                        var RKinputBtn = e.target.id;
                        RKinputBtn = RKinputBtn.slice(15);

                        //檢查留言框是否有輸入內容
                        if ($.trim($(`#text_${RKinputBtn}`).val()) == "") {
                            alert("您還沒有輸入任何文字喔~");
                            return false;
                        }
                        
                        inputMsg(RKinputBtn);
                    });



                    //抓到檢舉留言的按鈕，開啟燈箱
                    $(".report_btn").on("click", function (e) {
                        RKreportNo = e.target.id;
                        RKreportNo = RKreportNo.slice(4);
                        // alert(RKreportNo);
                        $("div.report_overlay").addClass("-on");
                        
                    });
                    //檢舉確定送出
                    $(".rep_submit").on("click", function () {
                        alert(RKreportNo);
                        // var RKreportNo = e.target.id;
                        // RKreportNo = RKreportNo.slice(4);
                        // alert(RKreportNo);
                        // inputReport(RKreportNo);
                        alert($(`#mem_msg_${RKreportNo} p`).text());
                    });
                    
                    
                    // 點檢舉按鈕開啟燈箱
                    // $(`#rep_${RKreportBtn}`).on("click", function () {
                    //     event.stopPropagation();
                    //     $("div.report_overlay").addClass("-on");
                    // });

                    // 點叉叉圖示關閉燈箱
                    $("img.report_close").on("click", function () {
                        $("div.report_overlay").addClass("-opacity-zero");

                        // 設定隔一秒後，移除相關 class
                        setTimeout(function () {
                            $("div.report_overlay").removeClass("-on -opacity-zero");
                        }, 1000);
                    });




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


    //新增留言
    function inputMsg(id) {

        var inputText = $(`#text_${id}`).val();
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth() + 1;
        var nowDate = now.getDate();
        var nowHour = now.getHours();
        var nowMin = now.getMinutes();
        var nowSec = now.getSeconds();
        //將日期資料轉換為和資料庫相同格式
        if (nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        if (nowDate <= 9) {
            nowDate = "0" + nowDate;
        }
        if (nowHour <= 9) {
            nowHour = "0" + nowHour;
        }
        if (nowMin <= 9) {
            nowMin = "0" + nowMin;
        }
        if (nowSec <= 9) {
            nowSec = "0" + nowSec;
        }
        var time = nowYear + "-" + nowMonth + "-" + nowDate + " " + nowHour + ":" + nowMin + ":" + nowSec;
        
        // 從資料庫抓最後一筆留言編號            
        var xhr3 = new XMLHttpRequest();
        xhr3.onload = function () {
            if (xhr3.status == 200) {
                let commentRow = JSON.parse(xhr3.responseText);
                // console.log(commentRow)
                // console.log(commentRow.commentNo)
                var last_commentNo = parseInt(commentRow.commentNo);

                //判斷是否登入會員
                if ($('.pu_mem_login_suc_div').text() != false) {
                    
                    $(`.msg_wrap${id}`).append(`
                    <div class="mem_contain">
                        <div class="flex_wrap">
                            <div class="mem_name">
                                <p>${member.memName}</p>
                                <img src="./images/unname.jpg" alt="">
                            </div>
                            <div class="mem_msg">
                                <p>${inputText}</p>
                            </div>
                            <div class="report">
                                <button class="report_btn" id="rep_${(last_commentNo+1)}">檢舉</button>
                            </div>
                        </div>
                        <div class="msg_date">
                            <p>${time}</p>
                        </div>
                    </div>
                    `);

                } else {
                    //未登入
                    $('#nologin').css('display', 'block'); //好像沒作用?
                }
                
            } else {
                // alert(xhr3.status);
                alert("尚未登入，請先進行登入喔~");
            }
        }
        // FTP
        // xhr.open('post', './php/test.php', true);

        // Mac
        // xhr.open('post', 'http://localhost:8080/test.php', true);

        // windows
        var commentData = {};
        commentData.commentContent = inputText;
        commentData.commentTime = time;
        commentData.custoNo = id;
        var commentData_str = JSON.stringify(commentData);
        console.log(commentData_str);

        xhr3.open('POST', './php/contest_last_commentNo.php', true);
        xhr3.send(commentData_str);
        //清空留言框
        $(`#text_${id}`).val("");
    }

    // //新增檢舉
    // function inputReport(RKreportNo) {
                    
    //     var xhr4 = new XMLHttpRequest();
    //     xhr4.onload = function () {
    //         if (xhr4.status == 200) {
                

    //             //判斷是否登入會員
    //             if ($('.pu_mem_login_suc_div').text() != false) {
                    
    //             } else {
    //                 //未登入
    //                 $('#nologin').css('display', 'block'); //好像沒作用?
    //                 alert("尚未登入，請先進行登入喔~");
    //             }
                
    //         } else {
    //             alert(xhr4.status);
    //             // alert("尚未登入，請先進行登入喔~");
    //         }
    //     }
    //     // FTP
    //     // xhr.open('post', './php/test.php', true);

    //     // Mac
    //     // xhr.open('post', 'http://localhost:8080/test.php', true);

    //     // windows

    //     var reportData = {};
    //     reportData.commentNo = RKreportNo;
    //     reportData.commentContent = ;
    //     reportData.ReportReason = ;
    //     var reportData_str = JSON.stringify(reportData);
    //     console.log(commentData_str);

    //     xhr4.open('POST', './php/contest_report_comment.php', true);
    //     xhr4.send(reportData_str);
    // }






    //排行榜作品留言顯示區域
    $('.textHover').mousemove(function (e) { //當滑鼠移入顯示
        let theText = $(this).attr('hovertext');

        $('#contestant_msg').text(theText).show().css({
            left: e.pageX + 10,
            top: e.pageY + 10,
        });
    }).mouseout(function () { //當滑鼠移出隱藏
        $('#contestant_msg').hide();
    });


    // //檢舉燈箱
    // $(function () {

    //     // 點檢舉按鈕開啟燈箱
    //     $("#rep1").on("click", function () {
    //         event.stopPropagation();
    //         $("div.report_overlay").addClass("-on");
    //     });

    //     // 點叉叉圖示關閉燈箱
    //     $("img.report_close").on("click", function () {
    //         $("div.report_overlay").addClass("-opacity-zero");

    //         // 設定隔一秒後，移除相關 class
    //         setTimeout(function () {
    //             $("div.report_overlay").removeClass("-on -opacity-zero");
    //         }, 1000);
    //     });


    // });




});




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