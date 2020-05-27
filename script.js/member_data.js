//側邊欄切換
$(document).ready(function() {
        $('#preson_data').css({
            "background-color": "#777",
            "border-radius": "10px",
            "color": "#fff",
        })
        $('#preson_data').click(function() {
            $('.mem_data_right_div').css('display', 'flex');
            $('.order_detail_wrap').css('display', 'none');
            $('.curisine_wrap').css('display', 'none');
            $('#preson_data').css({
                "background-color": "#777",
                "border-radius": "10px",
                "color": "#fff",
            })
            $('#order_record,#customized_curisine').css({
                "background-color": "#D9E8EC",
                "border-radius": "0px",
                "color": "#000",
            });
        })
        $('#order_record').click(function() {
            $('.mem_data_right_div').css('display', 'none');
            $('.order_detail_wrap').css('display', 'block');
            $('.curisine_wrap').css('display', 'none');
            $('#order_record').css({
                "background-color": "#777",
                "border-radius": "10px",
                "color": "#fff",
            })
            $('#preson_data,#customized_curisine').css({
                "background-color": "#D9E8EC",
                "border-radius": "0px",
                "color": "#000",
            });
        })
        $('#customized_curisine').click(function() {
            $('.mem_data_right_div').css('display', 'none');
            $('.order_detail_wrap').css('display', 'none');
            $('.curisine_wrap').css('display', 'block');
            $('#customized_curisine').css({
                "background-color": "#777",
                "border-radius": "10px",
                "color": "#fff",
            })
            $('#order_record,#preson_data').css({
                "background-color": "#D9E8EC",
                "border-radius": "0px",
                "color": "#000",
            });
        })
    })
    //側邊欄切換

//載入網頁，撈出會員的基本資料
$(document).ready(function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                var mem_basic_data = JSON.parse(xhr.responseText);
                // console.log(mem_basic_data)
                if (mem_basic_data.memId) {
                    $('.mem_data_right_div').append(`<div class="mem_img_div">
                <img class="img_src" src="./php/images/${mem_basic_data.memPic}" alt="">
                </div>
                <form id="imageform">
                    <div class="mem_data_name_update_div">
                        <div class="mem_data_name_update_button">
                            <input id="file" type="file" name="file" accept=".png,.svg,.jpg,.jpeg,.gif" style="display: none";>
                            <button type="button" onclick="file.click()">更新相片</button>
                        </div>
                    </div>
                    <div class="mem_data_input_div">
                        <div class="mem_data_input">
                            <div>
                                會員信箱: <input style="border: none;background-color: transparent;" size="25" type="email" name="email" id="email" value="${mem_basic_data.memId}" readonly>   
                            </div>
                            <div>
                                會員密碼: <input id="input_cannoy_mod" class="input_cannoy_mod" name="input_cannoy_mod" type="password" value="${mem_basic_data.memPsw}" size="25">
                            </div>
                            <input id="psw_hidden" type="text" value="${mem_basic_data.memPsw}" hidden>
                            <div>
                                會員暱稱: <input class="name" type="text" name="name" value="${mem_basic_data.memName}" size="25">
                            </div>
                        </div>
                        <div class="mem_data_input">
                            <div>
                                會員等級: <input style="border: none;background-color: transparent;" size="25" class="input_cannoy_mod" type="text" name="" id="" value="${mem_basic_data.levelName}" readonly>
                            </div>
                            <div>
                                會員積分: <input style="border: none;background-color: transparent;" size="25" class="input_cannoy_mod" type="text" value="${mem_basic_data.memScore}" readonly>
                            </div>
                            <div>
                                會員點數: <input style="border: none;background-color: transparent;" size="25" class="input_cannoy_mod" type="text" value="${mem_basic_data.memPoints}" readonly>
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" class="mem_modify_btn">
                    儲存
                </button>
                `)
                //點下會員密碼欄位觸發燈箱
                $('#input_cannoy_mod').click(function(){
                    // if(confirm('要修改密碼嗎？')==true){
                        $('#Login').css('display', 'block');
                        $('#pu_mem_resist_wrap').css('display', 'none');
                        $('#pu_mem_login_wrap').css('display', 'none');
                        $('#pu_mem_forget_wrap').css('display', 'block');
                        $('#Login_back').css('display', 'block');
                    // }else{
                    //     return false;
                    // }
                })
                //點下會員密碼欄位觸發燈箱
                //點下修改密碼
                $('#modify_signInBtn').click(function(e){
                    var input_cannoy_mod =$('#input_cannoy_mod').val();
                    var psw_hidden =$('#psw_hidden').val();
                    var memid =$('#email').val();
                    var old_psw = $('#old_psw').val();
                    var new_psw = $('#new_psw').val();
                    if(old_psw == "" || new_psw ==""){
                        $('.alertbox .wrapper').text("請填寫舊密碼與新密碼");
                        $('.alertbox').addClass("on");
                        return false;
                    }
                    if(old_psw.length<3 || new_psw.length<3){
                        $('.alertbox .wrapper').text("密碼長度不可小於3位");
                        $('.alertbox').addClass("on");
                        return false;
                    }
                    if(old_psw == new_psw){
                        $('.alertbox .wrapper').text("舊密碼與新密碼相同");
                        $('.alertbox').addClass("on");
                        return false;
                    }
                    if(psw_hidden != old_psw){
                        $('.alertbox .wrapper').text("舊密碼不相同，請重新輸入");
                        $('.alertbox').addClass("on");
                        return false;
                    }
                    $('#input_cannoy_mod').val(new_psw);
                    $('#Login').css('display', 'none');
                    $('#pu_mem_forget_wrap').css('display', 'none');
                    $('#Login_back').css('display', 'none');
                    $('#old_psw').val("");
                    $('#new_psw').val("");
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr == 200){

                                }
                            }
                            var psw = {};
                            psw.new_psw = new_psw;
                            psw.memid = memid;
                            var psw_str = JSON.stringify(psw);
                            // console.log(psw_str)
                            // windows
                            xhr.open('POST', './php/member_data_update_psw.php',  true);

                            // Mac
                            // xhr.open('POST','http://localhost:8080/member_data_update_psw.php');
                            xhr.send(psw_str);
                        })
                        //點下修改密碼

                    //更改大頭貼
                    $('#file').change(function(e) {
                        filename = e.target.files[0].name;
                        const file = this.files[0];
                        const fr = new FileReader();
                        fr.onload = function(e) {
                            $('.img_src').attr('src', e.target.result);
                        };
                        fr.readAsDataURL(file);
                    })

                    //按下儲存 找img 密碼 名稱三個欄位
                    $('.mem_modify_btn').click(function() {
                            var xhr = new XMLHttpRequest();
                            var imageform = new FormData(document.getElementById("imageform"));
                            window.location.reload();
                            // windows
                            xhr.open('POST', './php/member_data_update.php',  true);

                            // Mac
                            // xhr.open('POST','http://localhost:8080/member_data_update.php');
                            xhr.send(imageform);
                        })
                        //按下修改 找img 密碼 名稱三個欄位
                } else {
                    $('.alertbox .wrapper').text("無登入會員");
                    $('.alertbox').addClass("on");
                    window.location.href = "order.html";
                }

                var xhr2 = new XMLHttpRequest();
                xhr2.onload = function() {
                        if (xhr2.status == 200) {
                            // console.log(JSON.parse(xhr2.responseText));
                            order_record = JSON.parse(xhr2.responseText);
                            for (i = 0; i < order_record.length; i++) {
                                if (order_record[i].orderState == 0) {
                                    order_record[i].orderState = '已取消';
                                    $('.order_detail_wrap').append(`<div class="order_history">
                            <div class="order_history_list">
                                <div>訂單編號</div>
                            </div>
                            <div class="order_history_list">
                                <div>日期</div>
                            </div>
                            <div class="order_history_list">
                                <div>港口</div>
                            </div>
                            <div class="order_history_list">
                                <div>人數</div>
                            </div>
                            <div class="order_history_list">
                                <div>狀態</div>
                            </div>
                            <div class="order_history_list">
                                <div>QRcode</div>
                            </div>
                        </div>
                            <div class="order_history_test">
                            <div class="order_history_list test">
                                <div class="orderno_id" id="orderno_id_${i}">${order_record[i].orderNo[0].orderNo}</div>
                            </div>
                            <div class="order_history_list test">
                                <div>${order_record[i].routeDate}</div>
                            </div>
                            <div class="order_history_list test">
                            <div>${order_record[i].routePort}</div>
                            </div>
                            <div class="order_history_list test">
                                <div>${order_record[i].orderPeople}</div>
                            </div>
                            <div class="order_history_list test">
                                <div>${order_record[i].orderState}</div>
                            </div>
                            <div class="order_history_list test">
                                <div><button class="order_detail_btn" id="order_code${order_record[i].orderNo[0].orderNo}">掃描QRcode</button></div>
                            </div>
                        </div>
                        <div class="order_history_btn" id="order_history_btn_${i}">
                            +
                        </div>
                        <div class="order_detail_div_wrap" id="order_detail_div_wrap_${i}" style="display: none;">
                            <div class="order_detail_right_div">
                                <div class="order_div_wrap_${i}">
                                    <div class="order_detail_right_div_title">
                                        <div>套餐名稱</div>
                                        <div>數量</div>
                                        <div>單價</div>
                                        <div>小計</div>
                                    </div>
                                </div>
                                <hr style="width: 100%;">
                                <div class="order_detail_right_div_custom_wrap" id="order_detail_right_div_custom_wrap_${i}" style="margin-bottom: 2%;">
                                    <div class="order_detail_right_div_custom">
                                        <div>客製化料理</div>
                                        <div>數量</div>
                                        <div>單價</div>
                                        <div>小計</div>
                                    </div>
                                </div>
                                <hr style="width: 100%;">
                                <div class="order_detail_right_div_point_wrap">
                                    <div class="order_detail_right_div_point">
                                        <div class="order_detail_right_div_point_text">使用點數</div>
                                        <div><input value="${order_record[i].orderPoints}點" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                    </div>
                                    <div class="order_detail_right_div_point">
                                        <div class="order_detail_right_div_total">總金額</div>
                                        <div><input value="${order_record[i].orderTotal}元" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>`)
                                } else if (order_record[i].orderState == 1) {
                                    order_record[i].orderState = '訂單成立，尚未報到';
                                    $('.order_detail_wrap').append(`<div class="order_history">
                        <div class="order_history_list">
                            <div>訂單編號</div>
                        </div>
                        <div class="order_history_list">
                            <div>日期</div>
                        </div>
                        <div class="order_history_list">
                            <div>港口</div>
                        </div>
                        <div class="order_history_list">
                            <div>人數</div>
                        </div>
                        <div class="order_history_list">
                            <div>狀態</div>
                        </div>
                        <div class="order_history_list">
                            <div>QRcode</div>
                        </div>
                    </div>
                        <div class="order_history_test">
                        <div class="order_history_list test">
                            <div class="orderno_id" id="orderno_id_${i}">${order_record[i].orderNo[0].orderNo}</div>
                        </div>
                        <div class="order_history_list test">
                            <div id="routedate_${order_record[i].orderNo[0].orderNo}">${order_record[i].routeDate}</div>
                        </div>
                        <div class="order_history_list test">
                        <div>${order_record[i].routePort}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderPeople}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderState}</div>
                        </div>
                        <div class="order_history_list test">
                            <div><button class="order_detail_btn" id="order_code${order_record[i].orderNo[0].orderNo}">掃描QRcode</button></div>
                        </div>
                    </div>
                    <div class="order_history_btn" id="order_history_btn_${i}">
                        +
                    </div>
                    <div class="order_detail_div_wrap" id="order_detail_div_wrap_${i}" style="display: none;">
                        <div class="order_detail_right_div">
                            <div class="order_div_wrap_${i}">
                                <div class="order_detail_right_div_title">
                                    <div>套餐名稱</div>
                                    <div>數量</div>
                                    <div>單價</div>
                                    <div>小計</div>
                                </div>
                            </div>
                            <hr style="width: 100%;">
                            <div class="order_detail_right_div_custom_wrap" id="order_detail_right_div_custom_wrap_${i}" style="margin-bottom: 2%;">
                                <div class="order_detail_right_div_custom">
                                    <div>客製化料理</div>
                                    <div>數量</div>
                                    <div>單價</div>
                                    <div>小計</div>
                                </div>
                            </div>
                            <hr style="width: 100%;">
                            <div class="order_detail_right_div_point_wrap">
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_point_text">使用點數</div>
                                    <div><input value="${order_record[i].orderPoints}點" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                </div>
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_total">總金額</div>
                                    <div><input value="${order_record[i].orderTotal}元" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                </div>
                            </div>
                            <div>
                                <button class="order_detail_cancel_btn" id="order_detail_cancel_btn_${order_record[i].orderNo[0].orderNo}">
                                    取消訂單
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr><div class="overlay">
                    <article>
                        <div class="box-title">
                            確認要取消訂單嗎
                            <img class="close" src="./images/blue-cross-icon.png" alt="">
                        </div>
                        <p>按下確定後訂單無法恢復，必須重新訂餐喔！</p>
                        <div class="cancel">取消</div>
                        <div class="download" id="download_${order_record[i].orderNo[0].orderNo}">確定</div>
                    </article>
                </div>`)
                                } else if (order_record[i].orderState == 2) {
                                    order_record[i].orderState = '訂單成立，報到成功';
                                    $('.order_detail_wrap').append(`<div class="order_history">
                        <div class="order_history_list">
                            <div>訂單編號</div>
                        </div>
                        <div class="order_history_list">
                            <div>日期</div>
                        </div>
                        <div class="order_history_list">
                            <div>港口</div>
                        </div>
                        <div class="order_history_list">
                            <div>人數</div>
                        </div>
                        <div class="order_history_list">
                            <div>狀態</div>
                        </div>
                        <div class="order_history_list">
                            <div>QRcode</div>
                        </div>
                    </div>
                        <div class="order_history_test">
                        <div class="order_history_list test">
                            <div class="orderno_id" id="orderno_id_${i}">${order_record[i].orderNo[0].orderNo}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].routeDate}</div>
                        </div>
                        <div class="order_history_list test">
                        <div>${order_record[i].routePort}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderPeople}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderState}</div>
                        </div>
                        <div class="order_history_list test">
                            <div><button class="order_detail_btn" id="order_code${order_record[i].orderNo[0].orderNo}">掃描QRcode</button></div>
                        </div>
                    </div>
                    <div class="order_history_btn" id="order_history_btn_${i}">
                        +
                    </div>
                    <div class="order_detail_div_wrap" id="order_detail_div_wrap_${i}" style="display: none;">
                        <div class="order_detail_right_div">
                            <div class="order_div_wrap_${i}">
                                <div class="order_detail_right_div_title">
                                    <div>套餐名稱</div>
                                    <div>數量</div>
                                    <div>單價</div>
                                    <div>小計</div>
                                </div>
                            </div>
                            <hr style="width: 100%;">
                            <div class="order_detail_right_div_custom_wrap" id="order_detail_right_div_custom_wrap_${i}" style="margin-bottom: 2%;">
                                <div class="order_detail_right_div_custom">
                                    <div>客製化料理</div>
                                    <div>數量</div>
                                    <div>單價</div>
                                    <div>小計</div>
                                </div>
                            </div>
                            <hr style="width: 100%;">
                            <div class="order_detail_right_div_point_wrap">
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_point_text">使用點數</div>
                                    <div><input value="${order_record[i].orderPoints}點" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                </div>
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_total">總金額</div>
                                    <div><input value="${order_record[i].orderTotal}元" size="10" style="text-align: right;font-size: 16px;border: none;background-color: transparent;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>`)
                                }
                                for (j = 0; j < order_record[i].orderNo.length; j++) {
                                    if (order_record[i].orderNo[j].mealNo == 1) {
                                        order_record[i].orderNo[j].mealNo = "A套餐"
                                    }
                                    if (order_record[i].orderNo[j].mealNo == 2) {
                                        order_record[i].orderNo[j].mealNo = "B套餐"
                                    }
                                    if (order_record[i].orderNo[j].mealNo == 3) {
                                        order_record[i].orderNo[j].mealNo = "C套餐"
                                    }
                                    $(`.order_div_wrap_${i}`).append(` 
                        <div class="order_detail_right_div_item">
                        <div>${order_record[i].orderNo[j].mealNo}</div>
                        <div id="mealListCount_${j}_${i}">${order_record[i].orderNo[j].mealListCount}</div>
                        <div class="mealListCount" id="mealListPrice_${j}_${i}">${order_record[i].orderNo[j].mealListPrice}元</div>
                        <div id="mealListToatl_${j}_${i}"></div>
                        </div>
                        `)
                                    var mealListPrice = $(`#mealListPrice_${j}_${i}`).text();
                                    //把元刪掉
                                    mealListPrice = mealListPrice.substring(0, mealListPrice.length - 1);
                                    $(`#mealListToatl_${j}_${i}`).text($(`#mealListCount_${j}_${i}`).text() * mealListPrice + '元')
                                }
                            }
                            //判斷每個掃描qrcode按鈕
                            $('.order_detail_btn').click(function(e){
                                $('.alertbox .wrapper').empty();
                                var qrcode = e.target.id;
                                qrcode_last = qrcode.slice(10);
                                $('.alertbox .wrapper').append(`<img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://140.115.236.71/demo-projects/DD106/DD106G3/0526dest/php/order_getQRcode.php?orderId=${qrcode_last}&choe=UTF-8
                                "></img>`).css('height','150px');
                                $('.alertbox').addClass("on").css('height','200px');
                            })
                            //判斷每個掃描qrcode按鈕
                            //判斷每個取消訂單按鈕
                            $(`.order_detail_cancel_btn`).click(function() {
                                $(".overlay").addClass("-on");
                            })
                            $(".close, .cancel").on("click", function () {
                                $(".overlay").addClass("-opacity-zero");
                        
                        
                                // 設定隔一秒後，移除相關 class
                                setTimeout(function () {
                                    $(".overlay").removeClass("-on -opacity-zero");
                                }, 1000);
                            });
                            //確認取消訂單
                            $('.download').click(function(e){
                                var route_last = e.target.id;
                                route_last = route_last.slice(9);
                                var roure_date = $(`#routedate_${route_last}`).text();
                                var cancel_time = new Date();
                                var year = cancel_time.getFullYear();
                                var month = cancel_time.getMonth() + 1;
                                var date = cancel_time.getDate();
                                var today = `${year}-${month}-${date}`;
                                var DateDiff = function(sDate1, sDate2) {
                                    var oDate1 = new Date(sDate1);
                                    var oDate2 = new Date(sDate2);
                                    var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
                                    return iDays;
                                };

                                var GetDateDiff1 = DateDiff(today, roure_date);
                                if (GetDateDiff1 >= 7) {
                                    var order_detail_last_num = e.target.id;
                                    order_detail_last_num = order_detail_last_num.slice(9);
                                    var xhr5 = new XMLHttpRequest();
                                    xhr5.onload = function() {
                                        if (xhr5.status == 200) {
                                            window.location.reload()
                                        }
                                    }
                                    var order_detail = {};
                                    order_detail.num_id = order_detail_last_num;
                                    order_detail_str = JSON.stringify(order_detail);
                                    // windows
                                    xhr5.open('POST',  './php/mem_cancel_order.php',  true);

                                    // Mac
                                    // xhr5.open('POST','http://localhost:8080/mem_cancel_order.php');
                                    xhr5.send(order_detail_str);
                                } else {
                                    $('.alertbox .wrapper').text("出發前七日內無法取消訂單");
                                    $('.alertbox').addClass("on");
                                    return false;
                                }
                            })

                            //判斷每個取消訂單按鈕
                            //判斷每個展開按鈕
                            $(`.order_history_btn`).click(function(e) {
                                    var id_num = e.target.id;
                                    id_num = id_num.slice(18);
                                    if ($(`#order_detail_div_wrap_${id_num}`).css('display') == "none") {
                                        $(`#order_detail_div_wrap_${id_num}`).slideDown();
                                        $(`#order_history_btn_${id_num}`).text('-');
                                    } else {
                                        $(`#order_detail_div_wrap_${id_num}`).slideUp();
                                        $(`#order_history_btn_${id_num}`).text('+');
                                    }
                                })
                                //判斷每個展開按鈕
                            var xhr3 = new XMLHttpRequest();
                            xhr3.onload = function() {
                                    if (xhr3.status == 200) {
                                        // console.log(JSON.parse(xhr3.responseText));
                                        var custo = JSON.parse(xhr3.responseText);
                                        for (i = 0; i < custo.length; i++) {
                                            $('.curisine_desktop').append(`<div class="curisine_div_title_item_bot">
                                <div class="curisine_div_title_item_bot_img"><img src="./images/${custo[i].custoPic}" alt=""></div>
                                <div>${custo[i].seafoodName}</div>
                                <div>${custo[i].cookName}</div>
                                <div id="ingreNo_${i}"></div>
                                <div>${custo[i].seafoodPrice}</div>
                                </div><hr>`)
                                            for (j = 0; j < custo[i].ingreNo.length; j++) {
                                                $(`#ingreNo_${i}`).append(`${custo[i].ingreNo[j].ingreName}<br>`);
                                            }
                                            if ($(`#ingreNo_${i}`).text() == "") {
                                                $(`#ingreNo_${i}`).text("無配料");
                                            }
                                        }
                                        for (k = 0; k < custo.length; k++) {
                                            $('.curisine_mobile').append(`<div class="curisine_mobile_img_div">
                                <img src="./images/${custo[k].custoPic}" alt="">
                            </div>
                            <div class="curisine_mobile_div">
                                <div class="curisine_mobile_div_item">
                                    <div>海鮮</div>
                                    <div>${custo[k].seafoodName}</div>
                                </div>
                                <div class="curisine_mobile_div_item">
                                    <div>烹調方式</div>
                                    <div>${custo[k].cookName}</div>
                                </div>
                                <div class="curisine_mobile_div_item">
                                    <div>配料</div>
                                    <div class="mobile_ingre_${k}"></div>
                                </div>
                                <div class="curisine_mobile_div_item">
                                    <div>金額</div>
                                    <div>${custo[k].seafoodPrice}元</div>
                                </div>
                            </div>`)
                                            for (l = 0; l < custo[k].ingreNo.length; l++) {
                                                $(`.mobile_ingre_${k}`).append(`${custo[k].ingreNo[l].ingreName}<br>`)
                                            }
                                            if ($(`.mobile_ingre_${k}`).text() == "") {
                                                $(`.mobile_ingre_${k}`).text("無配料");
                                            }
                                        }
                                        var xhr4 = new XMLHttpRequest();
                                        xhr4.onload = function() {
                                                if (xhr4.status == 200) {
                                                    order_custo_num = JSON.parse(xhr4.responseText);
                                                    // console.log(order_custo_num)
                                                    for (m = 0; m < order_record.length; m++) {
                                                        for (n = 0; n < order_custo_num.length; n++) {
                                                            if (order_custo_num[n].orderNo == order_record[m].orderNo[0].orderNo) {
                                                                $(`#order_detail_right_div_custom_wrap_${m}`).append(`
                                                <div class="order_detail_right_div_custom_item">
                                                <div>${order_custo_num[n].custoName}</div>
                                                <div id="custoListCount_${n}">${order_custo_num[n].custoListCount}</div>
                                                <div id="custoListPrice_${n}">${order_custo_num[n].custoListPrice}元</div>
                                                <div id="custoListTotal_${n}"></div>
                                            </div>`)
                                                                var custoListPrice = $(`#custoListPrice_${n}`).text();
                                                                //把元刪掉
                                                                custoListPrice = custoListPrice.substring(0, custoListPrice.length - 1);
                                                                $(`#custoListTotal_${n}`).text($(`#custoListCount_${n}`).text() * custoListPrice + '元')
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            // windows
                                        xhr4.open('GET',  './php/mem_data_order_custo.php',  true);

                                        // Mac
                                        // xhr4.open('GET','http://localhost:8080/mem_data_order_custo.php');
                                        xhr4.send(null)
                                    }
                                }
                                // windows
                            xhr3.open('GET',  './php/customeal_show.php',  true);

                            // Mac
                            // xhr3.open('GET','http://localhost:8080/customeal_show.php');
                            xhr3.send(null);
                        }
                    }
                    // windows
                xhr2.open('GET', './php/member_order_record_show.php',  true);

                // Mac
                // xhr2.open('GET','http://localhost:8080/member_order_record_show.php');
                xhr2.send(null);

            }
        }

        // windows
        xhr.open('GET',  './php/member_data_show.php',  true);
        // Mac

        // xhr.open('GET','http://localhost:8080/member_data_show.php');
        xhr.send(null);
    })
    //載入網頁，撈出會員的基本資料


//判斷滾輪方向

var scrolltop = new Array();
var index = 0;
scrolltop[0] = 0;
$(document).scroll(function() {
        index++;
        scrolltop[index] = $(document).scrollTop();
        if (scrolltop[index] > scrolltop[index - 1]) {
            if ($(window).width() <= 576) {
                $('.mem_data_left_div').slideUp(500);
                $(window).resize(function() {
                    if ($(window).width() > 576) {
                        $('.mem_data_left_div').slideDown();
                    }
                })
            }
        } else {
            if ($(window).width() <= 576) {
                $('.mem_data_left_div').slideDown(500);
            }
        };
    })
    //判斷滾輪方向