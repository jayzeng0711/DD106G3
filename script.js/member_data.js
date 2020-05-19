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
            if(mem_basic_data.memName){
                $('.mem_data_right_div').append(`<div class="mem_img_div">
                <img src="./images/${mem_basic_data.memPic}" alt="">
            </div>
            <div class="mem_data_name_update_div">
                <div>
                ${mem_basic_data.memName}
                </div>
                <div class="mem_data_name_update_button">
                    <button>更新相片</button>
                </div>
            </div>
            <div class="mem_data_input_div">
                <div class="mem_data_input">
                    <div>
                        會員信箱> <input style="border: none;" type="email" name="" id="" value="${mem_basic_data.memId}">   
                    </div>
                    <div>
                        會員密碼> <input class="input_cannoy_mod" type="password" value="${mem_basic_data.memPsw}" readonly>
                    </div>
                    <div>
                        會員暱稱> <input type="text" value="${mem_basic_data.memName}">
                    </div>
                </div>
                <div class="mem_data_input">
                    <div>
                        會員等級> <input style="border: none;" class="input_cannoy_mod" type="text" name="" id="" value="${mem_basic_data.levelName}" readonly>
                    </div>
                    <div>
                        會員積分> <input style="border: none;" class="input_cannoy_mod" type="number" value="${mem_basic_data.memScore}" readonly>
                    </div>
                    <div>
                        會員點數> <input style="border: none;" class="input_cannoy_mod" type="number" value="${mem_basic_data.memPoints}" readonly>
                    </div>
                </div>
            </div><button class="mem_modify_btn">
            修改
        </button>`)
            }else{
                alert('無登入會員');
                window.location.href = "order.html";
            }
        }
    }

    // windows
    xhr3.open('GET',  './php/member_data_show.php',  true);

    // Mac
    // xhr.open('GET','http://localhost:8888/member_data_show.php');
    xhr.send(null);
})
//載入網頁，撈出會員的基本資料



// 訂單細節收缩展开效果
$(document).ready(function(){
    $(".order_history_btn").click(function(){
     $(this).next(".order_detail_div_wrap",).slideToggle;
    },function(){
     $(this).next(".order_detail_div_wrap").slideToggle("slow");
    });
 });


 