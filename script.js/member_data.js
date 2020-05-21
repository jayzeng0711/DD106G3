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
                    xhr.open('POST', './php/member_data_update.php',  true);

                    // Mac
                    // xhr.open('POST','http://localhost:8888/member_data_update.php');
                    xhr.send(imageform);
            })
            }else{
                alert('無登入會員');
                window.location.href = "order.html";
            }
        }
    }

    // windows
    xhr.open('GET',  './php/member_data_show.php',  true);

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

