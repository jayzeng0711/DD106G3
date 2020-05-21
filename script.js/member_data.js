filename ="";

//側邊欄切換
$(document).ready(function(){
    $('#preson_data').css({
        "background-color": "#777",
        "border-radius": "10px",
        "color": "#fff",
    })
    $('#preson_data').click(function(){
        $('.mem_data_right_div').css('display','flex');
        $('.order_detail_wrap').css('display','none');
        $('.curisine_wrap').css('display','none');
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
    $('#order_record').click(function(){
        $('.mem_data_right_div').css('display','none');
        $('.order_detail_wrap').css('display','block');
        $('.curisine_wrap').css('display','none');
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
    $('#customized_curisine').click(function(){
        $('.mem_data_right_div').css('display','none');
        $('.order_detail_wrap').css('display','none');
        $('.curisine_wrap').css('display','block');
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
$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var mem_basic_data = JSON.parse(xhr.responseText);
            console.log(mem_basic_data)
            // <div>
            // 名字看要不要
            //     ${mem_basic_data.memName}
            // </div>
            if(mem_basic_data.memName){
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
                                會員信箱: <input style="border: none;" type="email" name="email" id="email" value="${mem_basic_data.memId}">   
                            </div>
                            <div>
                                會員密碼: <input class="input_cannoy_mod" name="input_cannoy_mod" type="text" value="${mem_basic_data.memPsw}">
                            </div>
                            <div>
                                會員暱稱: <input class="name" type="text" name="name" value="${mem_basic_data.memName}">
                            </div>
                        </div>
                        <div class="mem_data_input">
                            <div>
                                會員等級: <input style="border: none;" class="input_cannoy_mod" type="text" name="" id="" value="${mem_basic_data.levelName}" readonly>
                            </div>
                            <div>
                                會員積分: <input style="border: none;" class="input_cannoy_mod" type="number" value="${mem_basic_data.memScore}" readonly>
                            </div>
                            <div>
                                會員點數: <input style="border: none;" class="input_cannoy_mod" type="number" value="${mem_basic_data.memPoints}" readonly>
                            </div>
                        </div>
                    </div>
                </form>
                <button type="button" class="mem_modify_btn">
                    修改
                </button>
                `)
                //更改大頭貼
                $('#file').change(function(e){
                    filename = e.target.files[0].name;
                    const file = this.files[0];
                    const fr = new FileReader();
                    fr.onload = function (e) {
                        $('.img_src').attr('src', e.target.result);
                    };
                    fr.readAsDataURL(file);
                })
            
                //按下修改 找img 密碼 名稱三個欄位
                $('.mem_modify_btn').click(function(){
                    var xhr = new XMLHttpRequest();
                    var imageform = new FormData(document.getElementById("imageform"));
                    if(xhr.status == 200){
                        console.log(xhr.responseText);
                    }

                    // windows
                    // xhr.open('POST', './php/member_data_update.php',  true);

                    // Mac
                    xhr.open('POST','http://localhost:8888/member_data_update.php');
                    xhr.send(imageform);
            })
            }else{
                alert('無登入會員');
                window.location.href = "order.html";
            }

            var xhr2 = new XMLHttpRequest();
            xhr2.onload = function(){
                if(xhr2.status == 200){
                    console.log(JSON.parse(xhr2.responseText));
                    order_record = JSON.parse(xhr2.responseText);
                    for(i = 0;i<order_record.length;i++){
                        var time = order_record[i].orderTime;
                        var time_str = time.split(" ");
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
                    </div>
                        <div class="order_history_test">
                        <div class="order_history_list test">
                            <div class="orderno_id" id="orderno_id_${i}">${order_record[i].orderNo[0].orderNo}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${time_str[0]}</div>
                        </div>
                        <div class="order_history_list test">
                        <div>${order_record[i].routePort}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderCount}</div>
                        </div>
                        <div class="order_history_list test">
                            <div>${order_record[i].orderStatue}</div>
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
                            <div class="order_detail_right_div_custom_wrap" id="order_detail_right_div_custom_wrap_${i}">
                                <div class="order_detail_right_div_custom">
                                    <div>客製化料理</div>
                                    <div>數量</div>
                                    <div>單價</div>
                                    <div>小計</div>
                                </div>
                            </div>
                            <div class="order_detail_right_div_point_wrap">
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_point_text">使用點數</div>
                                    <div>${order_record[i].orderPoints}</div>
                                </div>
                                <div class="order_detail_right_div_point">
                                    <div class="order_detail_right_div_total">總金額</div>
                                    <div>${order_record[i].orderTotal}</div>
                                </div>
                            </div>
                            <div>
                                <button class="order_detail_cancel_btn" id="order_detail_cancel_btn_${order_record[i].orderNo[0].orderNo}">
                                    取消訂單
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr>`)
                    for(j=0;j<order_record[i].orderNo.length;j++){
                        $(`.order_div_wrap_${i}`).append(` 
                        <div class="order_detail_right_div_item">
                        <div>${order_record[i].orderNo[j].mealNo}</div>
                        <div id="mealListCount_${j}_${i}">${order_record[i].orderNo[j].mealListCount}</div>
                        <div id="mealListPrice_${j}_${i}">${order_record[i].orderNo[j].mealListPrice}</div>
                        <div id="mealListToatl_${j}_${i}"></div>
                        </div>
                        `)
                        $(`#mealListToatl_${j}_${i}`).text($(`#mealListCount_${j}_${i}`).text()*$(`#mealListPrice_${j}_${i}`).text())
                        }
                    }
                    //判斷每個取消訂單按鈕
                    $(`.order_detail_cancel_btn`).click(function(e){
                        if(confirm("確認要取消訂單嗎")==true){
                            var order_detail_last_num = e.target.id;
                            order_detail_last_num = order_detail_last_num.substr(order_detail_last_num.length-1,1);
                            var xhr5 = new XMLHttpRequest();
                            xhr5.onload = function(){
                                if(xhr5.status == 200){
                                    window.location.reload()
                                }
                            }
                            var order_detail ={};
                            order_detail.num_id = order_detail_last_num;
                            order_detail_str = JSON.stringify(order_detail);
                            // windows
                            // xhr5.open('POST',  './php/mem_cancel_order.php',  true);
    
                            // Mac
                            xhr5.open('POST','http://localhost:8888/mem_cancel_order.php');
                            xhr5.send(order_detail_str);
                        }else{
                            return false;
                        }
                    })
                    //判斷每個取消訂單按鈕
                    //判斷每個展開按鈕
                    $(`.order_history_btn`).click(function(e){
                        var id_num =e.target.id;
                        id_num = id_num.substr(id_num.length-1,1);
                        if($(`#order_detail_div_wrap_${id_num}`).css('display') =="none"){
                            $(`#order_detail_div_wrap_${id_num}`).slideDown();
                            $(`#order_history_btn_${id_num}`).text('-');
                        }else{
                            $(`#order_detail_div_wrap_${id_num}`).slideUp();
                            $(`#order_history_btn_${id_num}`).text('+');
                        }
                    })
                    //判斷每個展開按鈕
                    var xhr3 = new XMLHttpRequest();
                    xhr3.onload = function(){
                        if(xhr3.status ==200){
                            console.log(JSON.parse(xhr3.responseText));
                            var custo = JSON.parse(xhr3.responseText);
                            for(i=0;i<custo.length;i++){
                                $('.curisine_desktop').append(`<div class="curisine_div_title_item_bot">
                                <div class="curisine_div_title_item_bot_img"><img src="./images/${custo[i].custoPic}" alt=""></div>
                                <div>${custo[i].seafoodName}</div>
                                <div>${custo[i].cookName}</div>
                                <div id="ingreNo_${i}"></div>
                                <div>${custo[i].seafoodPrice}</div>
                                </div>`)
                                for(j=0;j<custo[i].ingreNo.length;j++){
                                    $(`#ingreNo_${i}`).append(`${custo[i].ingreNo[j].ingreName}<br>`);
                                }
                                if($(`#ingreNo_${i}`).text()==""){
                                    $(`#ingreNo_${i}`).text("無配料");
                                }
                            }  
                            for(k=0;k<custo.length;k++){
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
                                    <div>${custo[k].seafoodPrice}</div>
                                </div>
                            </div>`)
                                for(l=0;l<custo[k].ingreNo.length;l++){
                                    $(`.mobile_ingre_${k}`).append(`${custo[k].ingreNo[l].ingreName}<br>`)
                                }
                                if($(`.mobile_ingre_${k}`).text()==""){
                                    $(`.mobile_ingre_${k}`).text("無配料");
                                }
                            }
                            var xhr4 = new XMLHttpRequest();
                            xhr4.onload = function(){
                                if(xhr4.status == 200){
                                    order_custo_num = JSON.parse(xhr4.responseText);
                                    console.log(order_custo_num)
                                    for(m=0;m<order_record.length;m++){
                                        for(n=0;n<order_custo_num.length;n++){
                                            if(order_custo_num[n].orderNo == order_record[m].orderNo[0].orderNo){
                                                $(`#order_detail_right_div_custom_wrap_${m}`).append(`
                                                <div class="order_detail_right_div_custom_item">
                                                <div>${order_custo_num[n].custoName}</div>
                                                <div id="custoListCount_${n}">${order_custo_num[n].custoListCount}</div>
                                                <div id="custoListPrice_${n}">${order_custo_num[n].custoListPrice}</div>
                                                <div id="custoListTotal_${n}"></div>
                                            </div>`)
                                            $(`#custoListTotal_${n}`).text($(`#custoListCount_${n}`).text()*$(`#custoListPrice_${n}`).text())
                                            }
                                        }   
                                    }
                                }
                            }
                            // windows
                            // xhr4.open('POST',  './php/mem_data_order_custo.php',  true);

                            // Mac
                            xhr4.open('GET','http://localhost:8888/mem_data_order_custo.php');
                            xhr4.send(null)
                        }
                    }
                    // windows
                    // xhr3.open('POST',  './php/customeal_show.php',  true);

                    // Mac
                    xhr3.open('POST','http://localhost:8888/customeal_show.php');
                    xhr3.send(null);
                }
            }
            // windows
            // xhr2.open('GET', './php/member_order_record_show.php',  true);

            // Mac
            xhr2.open('GET','http://localhost:8888/member_order_record_show.php');
            xhr2.send(null);

        }
    }

    // windows
    // xhr.open('GET',  './php/member_data_show.php',  true);

    // Mac
    xhr.open('GET','http://localhost:8888/member_data_show.php');
    xhr.send(null);
})
//載入網頁，撈出會員的基本資料

//判斷滾輪方向

var scrolltop = new Array();
var index = 0;
scrolltop[0] = 0;
$(document).scroll(function(){
    index ++;
    scrolltop[index] = $(document).scrollTop();
    if (scrolltop[index] > scrolltop[index-1]) {
        if($(window).width() <=576){
            $('.mem_data_left_div').slideUp(500);
        }
    }else{
        if($(window).width() <=576){
            $('.mem_data_left_div').slideDown(500);
        }
    };
 })
//判斷滾輪方向


