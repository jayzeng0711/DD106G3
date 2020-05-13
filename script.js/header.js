//desktop
$(document).ready(function() {
        $('.pu_text_a').hover(function() {
            $(this).toggleClass('pu_flow-wave');
        }, )
    })
    //desktop

//mobile
$(document).ready(function() {
    window_w = $(window).width();
    $('.pu_mb_text_a').hover(function() {
        $(this).toggleClass('pu_flow-wave');
    }, )
    $('.burger').click(function(e) {
        if (this.classList[1] == 'burger--close') {
            $(this).removeClass('burger--close');
            $('.mb_sma_cloud_img').css('display', 'block');
            $('.mb_big_cloud_img_div').animate({ right: "-770px" }, 800, function() {
                $('.mb_big_cloud_img_div').css('display', 'none');
            });
        } else {
            $(this).addClass('burger--close');
            $('.mb_big_cloud_img_div').css('display', 'block');
            $('.mb_big_cloud_img').css('width', `${window_w}`);
            $('.mb_big_cloud_img_div').animate({ right: "0px" }, 800);
        }
    })
})
$(window).resize(function() {
        window_w = $(window).width();
        $('.mb_big_cloud_img').css('width', `${window_w}`);
    })
    //mobile

//判斷滾輪方向
$(window).scroll(function() {
    // 一開始滾先記住原本的位置
    var before = $(window).scrollTop();
    //再一次滾的時候，判斷第二次滾的位置
    $(window).scroll(function() {
        var after = $(window).scrollTop();
        //如果第二次滾的時候大於之前滾的位置，代表滾輪往下
        if (before < after) {
            $('.pu_head_wrap_div').css('transform', 'translateY(-150%)');
            //把第一次滾的位置改成現在滾的位置

        };
        if (before > after) {
            $('.pu_head_wrap_div').css('transform', 'translateY(0%)');

        };
    });
});
//判斷滾輪方向

//h1標題抓網頁標題
$(document).ready(function() {
        $('.pu_div_text').text(document.title);
    })
    //h1標題抓網頁標題

//機器人移動
$(document).ready(function() {
        var window_open = $('.pu_big_content_wrap').css('display');
        $('.reboot_btn_div').click(function(e) {
            $('.pu_big_content_wrap').css('display', 'block');
            e.stopPropagation();
        })
        $('.pu_big_content_cancel').click(function() {
            $('.pu_big_content_wrap').css('display', 'none');
            $('.reboot_div').animate({ bottom: "-160px" }, 1000);
        })
        $('.reboot_div').click(function() {
            if (window_open == 'none') {
                if ($('.reboot_div').css('bottom') == "-10px") {
                    $('.reboot_div').animate({ bottom: "-160px" }, 1000);
                    $('.pu_big_content_wrap').css('display', 'none');
                } else {
                    $(this).animate({ bottom: "-10px" }, 1000);
                }
            }
        })
    })
    //機器人移動

//會員登入燈箱
$(document).ready(function() {
        $("#mem_lohin_btn,#mem_lohin_btn_mobile").click(function(e) {
            e.preventDefault();
            $('#Login,#Login_back').css('display', 'block');
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'block');
        })
        $('#cancel').click(function() {
            $('#Login,#Login_back').css('display', 'none');
        })
        $('.showRegister').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'block');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'none');
        })
        $('.showForget').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'block');
            $('#pu_mem_login_wrap').css('display', 'none');
        })
        $('.return_login').click(function() {
            $('#pu_mem_resist_wrap').css('display', 'none');
            $('#pu_mem_forget_wrap').css('display', 'none');
            $('#pu_mem_login_wrap').css('display', 'block');
        })
    })
    //會員登入燈箱

//會員註冊欄位檢查    
$('#mem_regisit_finish').click(function() {
        var mem_name = $('#mem_name').val();
        var mem_email = $('#mem_email').val();
        var mem_psw = $('#mem_psw').val();
        var mem_psw_confirm = $('#mem_psw_confirm').val();
        var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (mem_name == "" || mem_email == "" || mem_psw == "" || mem_psw_confirm == "") {
            alert('欄位不可為空');
            return false;
        }
        if (mem_email.search(emailRule) == -1) {
            alert('請填寫正確的email格式');
            return false;
        }
        if (mem_psw.length < 3 || mem_psw_confirm.length < 3) {
            alert('密碼長度不可小於3位數');
            return false;
        }
        if (mem_psw != mem_psw_confirm) {
            alert('密碼不一致，請重新輸入');
            return false;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
                if (xhr.status == 200) {
                    if (xhr.responseText == '註冊成功') {
                        alert('註冊成功');
                        window.location.reload();
                    } else {
                        alert(xhr.responseText);
                    }
                }
            }
            // FTP
            // xhr.open('post', './php/member_regisit.php', true);

        // windows
        // xhr.open('post',  'http://localhost/dd106g3/member_regisit.php',  true);

        // Mac
        xhr.open('POST', 'http://localhost:8888/member_regisit.php', true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        var member_rigist = {};
        member_rigist.memName = mem_name;
        member_rigist.memId = mem_email;
        member_rigist.memPsw = mem_psw;
        member_rigist.mem_psw_confirm = mem_psw_confirm;
        var mem_str = JSON.stringify(member_rigist);
        xhr.send(mem_str);
    })
    //會員註冊欄位檢查

//會員登入
$('#signInBtn').click(function() {
        var loginEmail = $('#loginEmail').val();
        var loginPassword = $('#loginPassword').val();
        var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (loginEmail == "" || loginPassword == "") {
            alert('請填寫所有欄位');
            return false;
        }
        if (loginEmail.search(emailRule) == -1) {
            alert('請填寫正確的email格式');
            return false;
        }
        if (loginPassword.length < 3) {
            alert('密碼長度不可小於3位數');
            return false;
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                var mem_login = xhr.responseText;
                if (!mem_login) {
                    alert('查無此帳號');
                    return false;
                } else {
                    window.location.reload();
                }
            }
        }

        // FTP
        // xhr.open('post', './php/member_login.php', true);

        // windows
        // xhr.open('post',  'http://localhost/dd106g3/member_login.php',  true);

        // Mac
        xhr.open('POST', 'http://localhost:8888/member_login.php', true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var member_login = {};
        member_login.mem_email = loginEmail;
        member_login.mem_psw = loginPassword;
        var member_login_str = JSON.stringify(member_login);
        xhr.send(member_login_str);
    })
    //會員登入

//檢查會員是否已登入
$(document).ready(function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) {
                var member = JSON.parse(xhr.responseText);
                // console.log(member);
                if (member.memName) {
                    $('.pu_mem_login_suc_div').text(`hi~${member.memName}`);
                    $('.pu_mem_login_div_wrap').css('display', 'none');
                    $('.pu_mem_login_div_suc_wrap').css('display', 'flex');
                } else {
                    $('.pu_mem_login_div_wrap').css('display', 'flex');
                    $('.pu_mem_login_div_suc_wrap').css('display', 'none');
                }
            }
        }

        // FTP
        // xhr.open('post', './php/member_login.php', true);

        // windows
        // xhr.open('post',  'http://localhost/dd106g3/getlogininfo.php',  true);

        // Mac
        xhr.open('GET', "http://localhost:8888/getlogininfo.php");
        xhr.send(null);
    })
    //檢查會員是否已登入

//會員登出
$('.pu_mem_login_suc_div').click(function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
                if (xhr.status == 200) {
                    $('.pu_mem_login_div_wrap').css('display', 'flex');
                    $('.pu_mem_login_div_suc_wrap').css('display', 'none');
                }
            }
            // FTP
            // xhr.open('post', './php/member_logout.php', true);

        // windows
        // xhr.open('post',  'http://localhost/dd106g3/member_logout.php',  true);

        // Mac
        xhr.open('POST', 'http://localhost:8888/member_logout.php', true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(null);
    })
    //會員登出

//機器人對話按下送出
$('.pu_reb_btn').click(function(e) {
        e.preventDefault();
        //如果輸入匡是空白就不給過
        if ($.trim($('#textarea').val()) == "") {
            return false;
        }
        //如果輸入匡是空白就不給過

        //先找到輸入什麼文字塞進對話框
        var text = $('#textarea').val();
        $('.pu_big_content_center').append(
                ` <div class="pu_big_content_text_ans">
        ${text}
    </div>`)
            //先找到輸入什麼文字塞進對話框

        //把對話框清空
        $('#textarea').val("");
        //把對話框清空

        //把找到的文字傳給後端
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
                if (xhr.status == 200) {
                    var reboot_ans_str = JSON.parse(xhr.responseText);
                    if (reboot_ans_str.messageQueConrent === undefined) {
                        setTimeout(function() {
                            $('.pu_big_content_center').append(
                                    `<div class="pu_big_content_text">
                                客服人員會再聯繫您</div>`)
                                //讓滾動條保持最下方
                            $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                            //讓滾動條保持最下方
                        }, 500)
                    } else {
                        setTimeout(function() {
                            $('.pu_big_content_center').append(
                                    ` <div class="pu_big_content_text">
                                ${reboot_ans_str.messageQueConrent}
                                </div>`)
                                //讓滾動條保持最下方
                            $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                            //讓滾動條保持最下方
                        }, 500)
                    }
                }
            }
            // FTP
            // xhr.open('post', './php/reboot_ans.php', true);

        // windows
        // xhr.open('post',  'http://localhost/dd106g3/reboot_ans.php',  true);

        // Mac
        xhr.open('Post', 'http://localhost:8888/reboot_ans.php', true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var ans = {};
        ans.text = text;
        var ans_str = JSON.stringify(ans);
        console.log(ans_str)
        xhr.send(ans_str);
        //把找到的文字傳給後端
    })
    //機器人對話按下送出

//機器人對話按下enter
$('#textarea').keydown(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            //如果輸入匡是空白就不給過
            if ($.trim($('#textarea').val()) == "") {
                return false;
            }
            //如果輸入匡是空白就不給過

            //先找到輸入什麼文字塞進對話框
            var text = $('#textarea').val();
            $('.pu_big_content_center').append(
                    ` <div class="pu_big_content_text_ans">
        ${text}
    </div>`
                )
                //先找到輸入什麼文字塞進對話框

            //把對話框清空
            $('#textarea').val("");
            //把對話框清空

            //把找到的文字傳給後端
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status == 200) {
                    var reboot_ans_str = JSON.parse(xhr.responseText);
                    if (reboot_ans_str.messageQueConrent === undefined) {
                        setTimeout(function() {
                            $('.pu_big_content_center').append(
                                    `<div class="pu_big_content_text">
                                客服人員會再聯繫您</div>`)
                                //讓滾動條保持最下方
                            $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                            //讓滾動條保持最下方
                        }, 500)
                    } else {
                        setTimeout(function() {
                            $('.pu_big_content_center').append(
                                    ` <div class="pu_big_content_text">
                                ${reboot_ans_str.messageQueConrent}
                                </div>`)
                                //讓滾動條保持最下方
                            $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                            //讓滾動條保持最下方
                        }, 500)
                    }
                }
            }

            // FTP
            // xhr.open('post', './php/reboot_ans.php', true);

            // windows
            // xhr.open('post',  'http://localhost/dd106g3/reboot_ans.php',  true);

            // Mac
            xhr.open('Post', 'http://localhost:8888/reboot_ans.php', true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var ans = {};
            ans.text = text;
            var ans_str = JSON.stringify(ans);
            console.log(ans_str)
            xhr.send(ans_str);
            //把找到的文字傳給後端
        }
    })
    //機器人對話按下enter

//機器人選項從資料庫撈出
$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            var message = JSON.parse(xhr.responseText);
            for(i = 0;i<message.length;i++){
                $('.pu_reb_ul').append(`<li class="pu_reb_li">${message[i].messageContent}</li> `)
            }
            $('.pu_reb_li').click(function(e) {
                var text = $(e.target).text();
                $('.pu_big_content_center').append(
                        ` <div class="pu_big_content_text_ans">
                ${text}
            </div>`
                    )
                //把找到的文字傳給後端
                //機器人對話點選文字
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                        if (xhr.status == 200) {
                            var reboot_ans_str = JSON.parse(xhr.responseText);
                            console.log(reboot_ans_str)
                            if (reboot_ans_str.messageQueConrent === undefined) {
                                setTimeout(function() {
                                    $('.pu_big_content_center').append(
                                            ` <div class="pu_big_content_text">
                                    客服人員會再聯繫您</div>`)
                                        //讓滾動條保持最下方
                                    $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                                    //讓滾動條保持最下方
                                }, 500)
                            } else {
                                setTimeout(function() {
                                    $('.pu_big_content_center').append(
                                            ` <div class="pu_big_content_text">
                                ${reboot_ans_str.messageQueConrent} </div>`)
                                        //讓滾動條保持最下方
                                    $('.pu_big_content_center').scrollTop($('.pu_big_content_center')[0].scrollHeight);
                                    //讓滾動條保持最下方
                                }, 500)
                            }
                        }
                    }
                    // FTP
                    // xhr.open('post', './php/select_reboot_ans.php', true);
        
                // windows
                // xhr.open('post',  'http://localhost/dd106g3/select_reboot_ans.php',  true);
        
                // Mac
                xhr.open('Post', 'http://localhost:8888/select_reboot_ans.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                var ans = {};
                ans.text = text;
                var ans_str = JSON.stringify(ans);
                console.log(ans_str)
                xhr.send(ans_str);
                //把找到的文字傳給後端
                //機器人對話點選文字
            })
        }
    }
    // FTP
    // xhr.open('post', './php/reboor_item.php', true);

    // windows
    // xhr.open('post',  'http://localhost/dd106g3/reboor_item.php',  true);

    // Mac
    xhr.open('GET','http://localhost:8888/reboor_item.php');
    xhr.send(null)
})
//機器人選項從資料庫撈出

// init controller
var controller = new ScrollMagic.Controller();

let scroll = TweenMax.from('#go_top', 1, {
    x: '-200%',
    y: '100%',

});
let Scene = new ScrollMagic.Scene({
        triggerElement: '#keypoint',
        triggerHook: 0.2,


    }).setTween(scroll)
    // .addIndicators({  //加上名稱
    //     name: '#go_top',
    // })
    .addTo(controller);

$(window).scrollTop()

$('#go_top').click(function() {
    $('html').animate({
        scrollTop: 0
    }, 600);

});