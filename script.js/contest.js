$(document).ready(function () {


    let select = document.getElementById("order"); // 排序篩選
    let custos; //存放參賽料理的陣列
    let comments; //存放留言的陣列

    // 計算這個月比賽，各料理的得票數和排名，存進 custco 表格
    // vote()呼叫php存資料，再呼叫page("time")，預設依照參賽時間排序
    vote("time");

    // 抓這個月參賽料理的留言
    comment();


    // 從資料庫抓排行前三名資料
    var xhr2 = new XMLHttpRequest();
    xhr2.onload = function () {
        
        if (xhr2.status == 200) {
            custoRKRows = JSON.parse(xhr2.responseText);
            // console.log(custoRKRows);

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
                        <button class="RK_vote_btn" id="RK_vote_${custoRKRows[1].custoNo}">投票</button>
                    </div>
                    <div class="msg">
                        <P class="big">留言板</p>
                        <div class="msg_text" id="RKmsg_text_${custoRKRows[1].custoNo}">
                            
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
                    $(`#RKmsg_text_${custoRKRows[1].custoNo}`).append(`
                    <p>
                    ${custoRKRows[1].comments[j].memName}：
                    ${custoRKRows[1].comments[j].commentContent}
                    </p>
                    `);
                }
            }else{
                $(`#RKmsg_text_${custoRKRows[1].custoNo}`).append(`
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
                        <button class="RK_vote_btn" id="RK_vote_${custoRKRows[0].custoNo}">投票</button>
                    </div>
                    <div class="msg">
                        <P class="big">留言板</p>
                        <div class="msg_text" id="RKmsg_text_${custoRKRows[0].custoNo}">
                            
                        </div>
                        <div class="msg_btn">
                            <button class="RKmsg_btn" id="RKmsg_btn_${custoRKRows[0].custoNo}">留言</button>
                        </div>
                    </div>
                </div>
            </div>
            `);
            //取出所有留言
            // console.log(custoRKRows[0].comments.length);
            if(custoRKRows[0].comments.length){
                for (j = 0; j < custoRKRows[0].comments.length; j++) {
                    $(`#RKmsg_text_${custoRKRows[0].custoNo}`).append(`
                    <p>
                    ${custoRKRows[0].comments[j].memName}：
                    ${custoRKRows[0].comments[j].commentContent}
                    </p>
                    `);
                }
            }else{
                $(`#RKmsg_text_${custoRKRows[0].custoNo}`).append(`
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
                        <button class="RK_vote_btn" id="RK_vote_${custoRKRows[2].custoNo}">投票</button>
                    </div>
                    <div class="msg">
                        <P class="big">留言板</p>
                        <div class="msg_text" id="RKmsg_text_${custoRKRows[2].custoNo}">
                            
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
                    $(`#RKmsg_text_${custoRKRows[2].custoNo}`).append(`
                    <p>
                    ${custoRKRows[2].comments[j].memName}：
                    ${custoRKRows[2].comments[j].commentContent}
                    </p>
                    `);
                }
            }else{
                $(`#RKmsg_text_${custoRKRows[2].custoNo}`).append(`
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
                            <img src="./images/${custoRKRows[0].comments[j].memPic}" alt="">
                        </div>
                        <div class="mem_msg" id="mem_msg_${custoRKRows[0].comments[j].commentNo}">
                            <p>${custoRKRows[0].comments[j].commentContent}</p>
                        </div>
                        <div class="report">
                            <button class="RK_report_btn" id="rep_${custoRKRows[0].comments[j].commentNo}">檢舉</button>
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
                            <img src="./images/${custoRKRows[1].comments[j].memPic}" alt="">
                        </div>
                        <div class="mem_msg" id="mem_msg_${custoRKRows[1].comments[j].commentNo}">
                            <p>${custoRKRows[1].comments[j].commentContent}</p>
                        </div>
                        <div class="report">
                            <button class="RK_report_btn" id="rep_${custoRKRows[1].comments[j].commentNo}">檢舉</button>
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
                            <img src="./images/${custoRKRows[2].comments[j].memPic}" alt="">
                        </div>
                        <div class="mem_msg" id="mem_msg_${custoRKRows[2].comments[j].commentNo}">
                            <p>${custoRKRows[2].comments[j].commentContent}</p>
                        </div>
                        <div class="report">
                            <button class="RK_report_btn" id="rep_${custoRKRows[2].comments[j].commentNo}">檢舉</button>
                        </div>
                    </div>
                    <div class="msg_date">
                        <p>${custoRKRows[2].comments[j].commentTime}</p>
                    </div>
                </div>
                `);
            }



            // 點擊留言
            $(".RKmsg_btn").on("click", function (e) {
                var RKid = e.target.id;
                RKid = RKid.slice(10); 
                showMsg(RKid); //打開燈箱
                rankingEnterInput(RKid);
                // alert(RKid);
                // event.stopPropagation();
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
            //點擊送出留言
            $(".RK_input_btn").on("click", function (e) {
                //判斷是否登入
                if ($('.pu_mem_login_suc_div').text() != false){
                    var RKinputBtn = e.target.id;
                    RKinputBtn = RKinputBtn.slice(15);

                    //檢查留言框是否有輸入內容
                    if ($.trim($(`#text_${RKinputBtn}`).val()) == "") {
                        alert("您還沒有輸入任何文字喔~");
                        return false;
                    }
                    inputMsg(RKinputBtn);
                } else {
                    //未登入
                    $('#nologin').css('display', 'block'); //好像沒作用?
                    alert("尚未登入，請先進行登入喔~");
                }
                
            });
            

            // 點擊投票
            $(".RK_vote_btn").on("click", function (e) {
                //判斷是否登入
                if ($('.pu_mem_login_suc_div').text() != false){
                    var RKvote = e.target.id;
                    RKvote = RKvote.slice(8); 
                    // showMsg(RKid); //打開燈箱
                    alert(RKvote);
                    inputRKvote(RKvote);
                    
                } else {
                    //未登入
                    $('#nologin').css('display', 'block'); //好像沒作用?
                    alert("尚未登入，請先進行登入喔~");
                }
                
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

    


    



    











    // 計算這個月比賽，各料理的得票數和排名，存進 custco 表格，再顯示料理排序
    function vote(index) {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
                voteRank = JSON.parse(xhr.responseText);
                // console.log("v",voteRank);
                page(index);
            } else {
                console.log(xhr.status);
            }
        };

        // windows
        xhr.open('get', './php/contest_voteRank.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_voteRank.php', true);
        xhr.send(null);
    };

    // 抓這個月參賽料理的留言
    function comment() {
        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {
                comments = JSON.parse(xhr.responseText);
                // console.log(comments);

            } else {
                console.log(xhr.status);

            }
        };

        // windows
        xhr.open('get', './php/contest_comment.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_comment.php', true);
        xhr.send(null);
    };


    // 改變排序
    // 每次改變排序，都要先呼叫vote()重新計算票數和排名，vote()會再呼叫page()顯示內容
    $('#order').change(function() {
        $('.cookList_contain').empty();
        $('.a4').empty(); //清空參賽列表燈箱
        $('span.wrapper').empty();
        if (select.selectedIndex == 0) {
            vote("time");
        } else {
            vote("vote")
        };
    });


    // 排序參賽料理
    function page(index) {

        let xhr = new XMLHttpRequest;
        xhr.onload = function() {
            if (xhr.status == 200) {

                custos = JSON.parse(xhr.responseText);

                // 預設所有料理的留言是一個陣列
                for (let i = 0; i < custos.length; i++) {
                    custos[i].comment = new Array();
                }
                // 根據參賽編號，每個留言存成一個物件
                for (let j = 0; j < comments.length; j++) {
                    for (let i = 0; i < custos.length; i++) {
                        if (custos[i].custoNo == comments[j].custoNo) {
                            let object = {
                                commentNo: comments[j].commentNo,
                                commentContent: comments[j].commentContent,
                                memNo: comments[j].memNo,
                                memName: comments[j].memName,
                                memPic: comments[j].memPic,
                            };
                            custos[i].comment.push(object);

                        }
                    };
                };

                //////////// 切換頁數  ///////////

                // 總頁數
                let pages = Math.ceil(custos.length / 6);

                // 加入所有頁碼
                for (let i = 1; i <= pages; i++) {
                    $('span.wrapper').append(`<span class="pages" id="page${i}">${i}</span>`);
                }

                // 目前頁數(預設第一頁)
                let nowpage = 1;

                // 先顯示第一頁
                $('#page1').addClass("on");

                // 上一頁
                $('#prevPage').click(function() {
                    if (nowpage > 1) {
                        nowpage--;
                        pagenow(nowpage);
                    }
                });
                // 下一頁
                $('#nextPage').click(function() {
                    if (nowpage < pages) {
                        nowpage++;
                        pagenow(nowpage);
                    }
                });
                // 按每一個頁碼
                $('.pages').click(function() {
                    pagenow($(this).text());

                });



                //////////// 決定排序方式  ////////////////
                // 先排序才呼叫pagenow()顯示內容

                if (index == "time") {
                    // 根據參賽時間排序
                    custos.sort(function(a, b) {
                        return b.contestCustoNo - a.contestCustoNo;
                    });
                    // 先顯示第一頁
                    pagenow(nowpage);
                } else if (index == "vote") {
                    // 根據得票數由低到高排序
                    custos.sort(function(a, b) {
                        return b.contestCustoVote - a.contestCustoVote;
                    });
                    // 先顯示第一頁
                    pagenow(nowpage);
                };


                // console.log(custos);


                //////////// 切換排序方式、顯示內容  ///////////

                function pagenow(now) {

                    // 更新現在頁數
                    nowpage = now;

                    // 現在這頁頁碼變色
                    $('.pages').removeClass("on");
                    $(`#page${now}`).addClass("on");

                    // 清空內容
                    $('.cookList_contain').empty();
                    $('.a4').empty();
                    

                    now--;

                    // 顯示料理
                    for (let i = 0; i < 6; i++) {

                        // 出現的第幾個料理
                        let no = i + now * 6;
                        
                        if (custos[no]) {

                            // 料理編號(由大到小，等於時間由新到舊)
                            custoNo = custos[no].custoNo;
                            
                            // 料理名稱
                            custoName = custos[no].custoName;
                            // 圖片
                            custoPic = custos[no].custoPic;
                            // 票數
                            custoVote = custos[no].contestCustoVote;

                            $('.cookList_contain').append(`
                            <div class="cookList_item">
                                <div class="cookList_img">
                                    <figure class="cookList_cook">
                                        <img src="./images/${custoPic}" alt="">
                                        <figcaption>
                                            
                                            <p>${custoName}</p>
                                            <p>票數:${custoVote}票</p>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div class="cookList_vote">
                                    <button class="vote_btn" id="vote_${custoNo}">投票</button>
                                </div>
                                <div class="msg">
                                    <P class="big">留言板</p>
                                    <div class="msg_text" id="msg_${custoNo}">
                                    <p>目前沒有人留言~</p>              
                                    </div>
                                    <div class="msg_btn">
                                        <button class="List_msg_btn" id="List_msg_btn_${custoNo}">留言</button>
                                    </div>
                                </div>
                            </div>`);
                            //參賽列表留言燈箱
                            $(".a4").append(`
                            <div class="msg_overlay" id="List_msg_overlay_${custoNo}">
                                <div class="msg_board">
                                    <div class="msg_title">
                                        留言板
                                        <img class="msg_close" src="./images/blue-cross-icon.png" alt="">
                                    </div>
                                    <div class="msg_wrap List_msg_wrap${custoNo}">
                                        
                                    </div>
                                    <form action="" class="msg_input" id="List_msg_input_${custoNo}">
                                        <input type="text" id="List_text_${custoNo}" name="" placeholder="最多輸入10個字喔～～" maxlength="10">
                                        <button class="msginput_btn List_input_btn" id="msginput_Listbtn_${custoNo}" type="button">留言</button>
                                    </form>
                                </div>
                            </div>
                            `);


                            // 留言
                            if (custos[no].comment.length != 0) {
                                $(`#msg_${custoNo}`).empty();
                                $(`.List_msg_wrap${custoNo}`).empty();
                                for (let j = 0; j < custos[no].comment.length; j++) {

                                    // 留言編號
                                    commentNo = custos[no].comment[j].commentNo;
                                    // 留言內容
                                    commentContent = custos[no].comment[j].commentContent;
                                    // 留言會員編號
                                    commemNo = custos[no].comment[j].memNo;
                                    // 留言會員姓名
                                    commemName = custos[no].comment[j].memName;
                                    // 留言會員照片
                                    commemPic = custos[no].comment[j].memPic;


                                    $(`#msg_${custoNo}`).append(`
                                        <p>
                                            <img src="./images/${commemPic}" alt="">
                                            ${commemName}:${commentContent}
                                        </p>  
                                    `);

                                    //取出所有留言
                                    
                                    $(`.List_msg_wrap${custoNo}`).append(`
                                    <div class="mem_contain">
                                        <div class="flex_wrap">
                                            <div class="mem_name">
                                                <p>${commemName}</p>
                                                <img src="./images/${commemPic}" alt="">
                                            </div>
                                            <div class="mem_msg" id="List_mem_msg_${commentNo}">
                                                <p>${commentContent}</p>
                                            </div>
                                            <div class="report">
                                                <button class="List_report_btn" id="List_rep_${commentNo}">檢舉</button>
                                            </div>
                                        </div>
                                        <div class="msg_date">
                                            <p></p>
                                        </div>
                                    </div>
                                    `);
                                    // ${custoRows[i].comments[j].commentTime}  要抓時間


                                }

                            }


                        }


                    };
                    // 按下留言
                    $(".List_msg_btn").on("click", function (e) {
                        var LTid = e.target.id;
                        LTid = LTid.slice(13); 
                        listMsg(LTid); //打開燈箱
                        listEnterInput(LTid);
                        alert(LTid);
                        event.stopPropagation();
                    });
                    //按下送出留言
                    $(".List_input_btn").on("click", function (e) {
                        e.preventDefault();
                        //判斷是否登入
                        if ($('.pu_mem_login_suc_div').text() != false){
                            var LTinputBtn = e.target.id;
                            LTinputBtn = LTinputBtn.slice(17);
                            // alert(LTinputBtn);
                            // alert($(`#List_text_${LTinputBtn}`).val());
                            //檢查留言框是否有輸入內容
                            if ($.trim($(`#List_text_${LTinputBtn}`).val()) == "") {
                                alert("您還沒有輸入任何文字喔~");
                                return false;
                            }
                            inputListMsg(LTinputBtn);
                        } else {
                            //未登入
                            $('#nologin').css('display', 'block'); //好像沒作用?
                            alert("尚未登入，請先進行登入喔~");
                        }
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

                    //抓到檢舉留言的按鈕，開啟燈箱
                    $(".List_report_btn").on("click", function (e) {
                        //判斷是否登入
                        if ($('.pu_mem_login_suc_div').text() != false){
                            RKreportNo = e.target.id; 
                            // alert(RKreportNo)
                            // RKreportNo = RKreportNo.slice(4);
                            // alert(RKreportNo);
                            $("div.report_overlay").addClass("-on");
                        } else {
                            //未登入
                            $('#nologin').css('display', 'block'); //好像沒作用?
                            alert("尚未登入，請先進行登入喔~");
                        }
                    });
                    //抓到(前三名)檢舉留言的按鈕，開啟燈箱
                    $(".RK_report_btn").on("click", function (e) {
                        //判斷是否登入
                        if ($('.pu_mem_login_suc_div').text() != false){
                            RKreportNo = e.target.id; 
                            // alert(RKreportNo)
                            // RKreportNo = RKreportNo.slice(4);
                            // alert(RKreportNo);
                            $("div.report_overlay").addClass("-on");
                        } else {
                            //未登入
                            $('#nologin').css('display', 'block'); //好像沒作用?
                            alert("尚未登入，請先進行登入喔~");
                        }
                    });
                    //檢舉確定送出
                    $(".rep_submit").on("click", function () {
                        var RKreportNo_replace = RKreportNo.replace('rep', 'mem_msg');
                        aaa = RKreportNo_replace.replace("List_","");
                        aaa_str = aaa.slice(8)
                        alert(RKreportNo_replace)
                        alert(aaa_str)
                        inputReport(RKreportNo_replace);
                        
                        event.stopPropagation();
                        $("div.report_overlay").addClass("-opacity-zero");
                        // 設定隔一秒後，移除相關 class
                        setTimeout(function () {
                            $("div.report_overlay").removeClass("-on -opacity-zero");
                        }, 1000);
                    });
                    //取消
                    $(".rep_cancel").on("click", function () {
                        $("div.report_overlay").addClass("-opacity-zero");
                        // 設定隔一秒後，移除相關 class
                        setTimeout(function () {
                            $("div.report_overlay").removeClass("-on -opacity-zero");
                        }, 1000);
                    });
                    // 點叉叉圖示關閉燈箱
                    $("img.report_close").on("click", function () {
                        $("div.report_overlay").addClass("-opacity-zero");

                        // 設定隔一秒後，移除相關 class
                        setTimeout(function () {
                            $("div.report_overlay").removeClass("-on -opacity-zero");
                        }, 1000);
                    });

                }

            } else {
                console.log(xhr.status);
            }
        };

        // windows
        xhr.open('get', './php/contest_pagesvote.php', true);

        // Mac
        // xhr.open('get', 'http://localhost:8080/contest_pagesvote.php', true);
        xhr.send(null);

        

    };



//開啟留言燈箱
function showMsg(id) {
    $(`#msg_overlay_${id}`).addClass("-on");
}
//按下enter送出留言(前三名)
function rankingEnterInput(id) {
    $(`#text_${id}`).keydown(function (e) {
        if(e.which == 13){
            e.preventDefault();
            //判斷是否登入
            if ($('.pu_mem_login_suc_div').text() != false){
                //檢查留言框是否有輸入內容
                if ($.trim($(`#text_${id}`).val()) == "") {
                    alert("您還沒有輸入任何文字喔~");
                    return false;
                }
                inputMsg(id);
            } else {
                //未登入
                $('#nologin').css('display', 'block'); //好像沒作用?
                alert("尚未登入，請先進行登入喔~");
            }

        }
    });
}

//新增留言(前三名)
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
                        <button class="RK_report_btn" id="rep_${(last_commentNo+1)}">檢舉</button>
                    </div>
                </div>
                <div class="msg_date">
                    <p>${time}</p>
                </div>
            </div>
            `);
            
        } else {
            alert(xhr3.status);
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
    // console.log(commentData_str);

    xhr3.open('POST', './php/contest_last_commentNo.php', true);
    xhr3.send(commentData_str);
    //清空留言框
    $(`#text_${id}`).val("");
}

//新增投票
function inputRKvote(RKvote_num) {

    var contestNo = custoRKRows[0].contestNo;
    var custoNo = RKvote_num;


    var xhr5 = new XMLHttpRequest();
    xhr5.onload = function () {
        if (xhr5.status == 200) {
            
        } else {
            alert(xhr5.status);
        }
    }
    // FTP
    // xhr.open('post', './php/test.php', true);

    // Mac
    // xhr.open('post', 'http://localhost:8080/test.php', true);

    // windows

    var voteData = {};
    voteData.contestNo = contestNo;
    voteData.custoNo = custoNo;

    var voteData_str = JSON.stringify(voteData);
    // console.log(voteData_str);

    xhr5.open('POST', './php/contest_vote_input.php', true);
    xhr5.send(voteData_str);
}






//新增檢舉
function inputReport(RKreportNo) {
    // alert(`#${RKreportNo}`)
    var commentContent = $(`#${RKreportNo} p`).text();  
    // alert(commentContent)
        // RKreportNo = RKreportNo.slice(13);

    var ReportReason = $('input[name=rep_reason]:checked').val();
    if(ReportReason == "reason1"){
        ReportReason = "仇恨言論";
    }else if(ReportReason == "reason2"){
        ReportReason = "色情暴力";
    }else{
        ReportReason = "與主題無關";
    }

    var xhr4 = new XMLHttpRequest();
    xhr4.onload = function () {
        if (xhr4.status == 200) {
            
        } else {
            alert(xhr4.status);
        }
    }
    // FTP
    // xhr.open('post', './php/test.php', true);

    // Mac
    // xhr.open('post', 'http://localhost:8080/test.php', true);

    // windows

    var reportData = {};
    reportData.commentNo = aaa_str;
    reportData.commentContent = commentContent;
    reportData.ReportReason = ReportReason;
    var reportData_str = JSON.stringify(reportData);
    // console.log(reportData_str);

    xhr4.open('POST', './php/contest_report_comment.php', true);
    xhr4.send(reportData_str);
}







//開啟留言燈箱(參賽列表)
function listMsg(id) {
    $(`#List_msg_overlay_${id}`).addClass("-on");
}

 //按下enter送出留言(參賽列表)
 function listEnterInput(id) {
    $(`#List_text_${id}`).keydown(function (e) {
        if(e.which == 13){
            e.preventDefault();
            //判斷是否登入
            if ($('.pu_mem_login_suc_div').text() != false){
                //檢查留言框是否有輸入內容
                if ($.trim($(`#List_text_${id}`).val()) == "") {
                    alert("您還沒有輸入任何文字喔~");
                    return false;
                }
                inputListMsg(id);
            } else {
                //未登入
                $('#nologin').css('display', 'block'); //好像沒作用?
                alert("尚未登入，請先進行登入喔~");
            }
        }
    });
}

//新增留言(參賽列表)
function inputListMsg(id) {

    var inputText = $(`#List_text_${id}`).val();
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

            // //判斷是否登入會員
            // if ($('.pu_mem_login_suc_div').text() != false) {
                
                $(`.List_msg_wrap${id}`).append(`
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
                            <button class="List_report_btn" id="List_rep_${(last_commentNo+1)}">檢舉</button>
                        </div>
                    </div>
                    <div class="msg_date">
                        <p>${time}</p>
                    </div>
                </div>
                `);

            // } else {
            //     //未登入
            //     $('#nologin').css('display', 'block'); //好像沒作用?
            // }
            
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
    // console.log(commentData_str);

    xhr3.open('POST', './php/contest_last_commentNo.php', true);
    xhr3.send(commentData_str);
    //清空留言框
    $(`#List_text_${id}`).val("");
}











});






// //排行榜作品留言顯示區域
// $('.textHover').mousemove(function (e) { //當滑鼠移入顯示
//     let theText = $(this).attr('hovertext');

//     $('#contestant_msg').text(theText).show().css({
//         left: e.pageX + 10,
//         top: e.pageY + 10,
//     });
// }).mouseout(function () { //當滑鼠移出隱藏
//     $('#contestant_msg').hide();
// });
