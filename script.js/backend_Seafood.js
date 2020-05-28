window.addEventListener('load', function() {

    // 顯示資料
    show();

    function show() {
        // 清除表格內容
        $(`table tr`).not("tr.title").remove();

        // 顯示資料庫內容
        let xhr = new XMLHttpRequest;

        xhr.onload = function() {
            if (xhr.status == 200) {

                let seafoodRows = JSON.parse(xhr.responseText);
                let trLength = seafoodRows.length;
                // console.log("長度", trLength);


                for (let i = 0; i < trLength; i++) {

                    if (seafoodRows[i].seafoodState == 0) {
                        seafoodState = "未上架";
                    } else {
                        seafoodState = "上架";
                    }
                    if (seafoodRows[i].seafoodLevel == 1) {
                        seafoodLevel = "銅鷗";
                    } else if (seafoodRows[i].seafoodLevel == 2) {
                        seafoodLevel = "銀鷗";
                    } else {
                        seafoodLevel = "金鷗";
                    }


                    $('table').append(`<tr><td>${seafoodRows[i].seafoodNo}</td><td>${seafoodRows[i].seafoodName}</td><td><img src="./images/${seafoodRows[i].seafoodPic}"></td><td>${seafoodRows[i].seafoodPrice}</td><td>${seafoodRows[i].seafoodScore}/${seafoodRows[i].seafoodPoint}</td><td>${seafoodLevel}</td><td>${seafoodRows[i].cookName}</td><td><img src="./images/${seafoodRows[i].seafoodCookPic}"></td><td>${seafoodState}</td><td><button type="button" class="btn btn-info edit">編輯</button></td></tr>`);

                }
                edit();


            } else {
                // alert(xhr.status);
            }
        };

        // windows
        xhr.open('GET', './php/backend_Seafood_show.php', true);
        // Mac
        // xhr.open('GET', 'http://localhost:8888/backend_Seafood_show.php', true);
        xhr.send(null);
    };




    // 新增資料
    $('.addbtn').click(function() {

        // 停用新增按鈕
        $(this).attr('disabled', 'disabled');

        // 顯示輸入新增資料的欄位
        $('tr.title').after('<tr class="insert"><td></td><td><input type="text" name="seafoodName" id="seafoodName" placeholder="名稱"></td><td><form name="addSeafoodPic" id="addSeafoodPic" method="POST" action="./php/uploadNewFish.php"><button class="addNew">新增</button><br><button class="selectExist">從已有的選</button><div class="forNew" style="display:none;"><label for="newFish"><img id="newFishPreview"></label><div id="uploadNewFish"><input type="file" name="newFish" id="newFish"><input type="submit" value="上傳新海鮮"></div></div><div class="chooseExist" style="display:none;"><select class="existFish"></select></div></form></td><td><input type="text" name="seafoodPrice" id="seafoodPrice"></td><td><input type="text" name="seafoodScore" id="seafoodScore">/<input type="text" name="seafoodPoint" id="seafoodPoint"></td><td><select name="seafoodLevel" id="seafoodLevel"><option value="1">銅鷗</option><option value="2">銀鷗</option><option value="3">金鷗</option></select></td><td></td><td><label for="cookImg"><img src="" id="preview"></label><br><form action="./php/uploadCookPic.php" id="uploadCookPic" method="post"><input type="file" name="cookImg" id="cookImg"><input type="submit" value="上傳圖片" class="btnSubmit"></form></td><td><select name="seafoodState" id="seafoodState"><option value="0">未上架</option><option value="1">上架</option></select></td><td><button type="submit" class="btn btn-info save">儲存</button><button type="button" class="btn btn-info cancel">取消</button></td></tr>');

        let xhr = new XMLHttpRequest;
        let xhr2 = new XMLHttpRequest;
        let tr = $(this).next().children().children().eq(1).children().eq(6);

        xhr.onload = function() {
            if (xhr.status == 200) {
                let seafoodRows = JSON.parse(xhr.responseText);
                let trLength = seafoodRows.length;
                for (let i = 0; i < trLength; i++) {
                    if ($(".existFish option").hasClass(`${seafoodRows[i].seafoodPic}`) == 0) {
                        $(".existFish").append(`<option value="${seafoodRows[i].seafoodNo}" class="${seafoodRows[i].seafoodPic}" id="fishes">${seafoodRows[i].seafoodName}</option>`);
                    }
                }
            } else {
                // alert(xhr2.status);
            }
        };

        xhr2.onload = function() {
            if (xhr2.status == 200) {
                let cookRows = JSON.parse(xhr2.responseText);
                let cookLength = cookRows.length;
                // console.log("長度", cookLength);
                tr.append("<select class='cooks' name='cooks'></select>");
                for (let a = 0; a < cookLength; a++) {
                    if (`${cookRows[a].cookState}` == 1) {
                        $(".cooks").append(`<option value="${cookRows[a].cookNo}">${cookRows[a].cookName}</option>`);
                    }
                }
            } else {
                // alert(xhr2.status);
            }
        };

        // windows
        xhr.open('GET', './php/backend_Seafood_show.php', true);
        // Mac
        // xhr.open('GET', 'http://localhost:8888/backend_Seafood_show.php', true);
        xhr.send(null);

        // windows
        xhr2.open('GET', './php/backend_Cook_show.php', true);
        // Mac
        // xhr.open('GET', 'http://localhost:8888/backend_Seafood_show.php', true);
        xhr2.send(null);

        $(".addNew").click(function() {
            $(".addNew").remove();
            $(".selectExist").remove();
            $(".forNew").css('display', 'block');
        });
        $(".selectExist").click(function() {
            $(".addNew").remove();
            $(".selectExist").remove();
            $(".chooseExist").css('display', 'block');
        });

        $("#uploadCookPic").on('submit', (function(e) {
            e.preventDefault();
            $.ajax({
                url: "./php/uploadCookPic.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    alert("上傳成功");
                },
                error: function() {
                    alert("上傳失敗");
                }
            });
            // console.log(new FormData(this));
        }));
        $("#addSeafoodPic").on('submit', (function(e) {
            e.preventDefault();
            $.ajax({
                url: "./php/uploadNewFish.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    alert("上傳成功");
                },
                error: function() {
                    alert("上傳失敗");
                }
            });
            // console.log(new FormData(this));
        }));


        //從海鮮圖片點新增
        $(".addNew").click(function() {
            document.getElementById("newFish").onchange = function(e) {
                let fish = e.target.files[0];
                let reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("newFishPreview").src = reader.result;
                }
                reader.readAsDataURL(fish);

                document.getElementById("cookImg").onchange = function(e) {
                    let file = e.target.files[0];
                    let read = new FileReader();
                    read.onload = function(e) {
                        document.getElementById("preview").src = read.result;
                    }
                    read.readAsDataURL(file);

                    // 儲存新增
                    $('.save').click(function() {
                        let xhr = new XMLHttpRequest;

                        xhr.onload = function() {

                            if (xhr.status == 200) {
                                $('tr.insert').remove();
                                show();

                            } else {
                                // alert(xhr.status);
                            }

                        };


                        // windows
                        xhr.open('post', './php/backend_Seafood_insert.php', true);
                        // Mac
                        // xhr.open('POST', 'http://localhost:8888/backend_Seafood_insert.php', true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                        let seafood = {};
                        seafoodState = $('#seafoodState').val();
                        if (seafoodState == "未上架") {
                            seafoodState = 0;
                        } else if (seafoodState == "上架") {
                            seafoodState = 1;
                        };
                        seafoodLevel = $('#seafoodLevel').val();
                        if (seafoodLevel == "銅鷗") {
                            seafoodLevel = 1;
                        } else if (seafoodLevel == "銀鷗") {
                            seafoodLevel = 2;
                        } else {
                            seafoodLevel = 3;
                        };

                        seafood.seafoodName = $('#seafoodName').val();
                        seafood.seafoodLevel = seafoodLevel;
                        seafood.seafoodPic = `${fish.name}`;
                        seafood.seafoodPrice = $('#seafoodPrice').val();
                        seafood.seafoodScore = $('#seafoodScore').val();
                        seafood.seafoodPoint = $('#seafoodPoint').val();
                        seafood.cookNo = $(".cooks").val();
                        seafood.seafoodCookPic = `${file.name}`;
                        seafood.seafoodState = seafoodState;

                        let data_info = JSON.stringify(seafood);
                        // console.log(data_info);
                        xhr.send(data_info);

                        $('.addbtn').removeAttr('disabled');
                    });
                }

            }
        });


        //從海鮮圖片選已有海鮮圖
        $("select.existFish").on('change', function() {
            document.getElementById("cookImg").onchange = function(e) {
                let file = e.target.files[0];
                let read = new FileReader();
                read.onload = function(e) {
                    document.getElementById("preview").src = read.result;
                }
                read.readAsDataURL(file);

                // 儲存新增
                $('.save').click(function() {
                    let xhr = new XMLHttpRequest;

                    xhr.onload = function() {

                        if (xhr.status == 200) {
                            $('tr.insert').remove();
                            show();

                        } else {
                            // alert(xhr.status);
                        }

                    };


                    // windows
                    xhr.open('post', './php/backend_Seafood_insert.php', true);
                    // Mac
                    // xhr.open('POST', 'http://localhost:8888/backend_Seafood_insert.php', true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                    let seafood = {};
                    seafoodState = $('#seafoodState').val();
                    if (seafoodState == "未上架") {
                        seafoodState = 0;
                    } else if (seafoodState == "上架") {
                        seafoodState = 1;
                    };
                    seafoodLevel = $('#seafoodLevel').val();
                    if (seafoodLevel == "銅鷗") {
                        seafoodLevel = 1;
                    } else if (seafoodLevel == "銀鷗") {
                        seafoodLevel = 2;
                    } else {
                        seafoodLevel = 3;
                    };

                    seafood.seafoodName = $('#seafoodName').val();
                    seafood.seafoodLevel = seafoodLevel;
                    seafood.seafoodPic = $("select.existFish").find("option:selected").attr('class');
                    seafood.seafoodPrice = $('#seafoodPrice').val();
                    seafood.seafoodScore = $('#seafoodScore').val();
                    seafood.seafoodPoint = $('#seafoodPoint').val();
                    seafood.cookNo = $(".cooks").val();
                    seafood.seafoodCookPic = `${file.name}`;
                    seafood.seafoodState = seafoodState;

                    let data_info = JSON.stringify(seafood);
                    // console.log(data_info);
                    xhr.send(data_info);

                    $('.addbtn').removeAttr('disabled');
                });
            }
        });

        //從後方先更新烹調圖片
        document.getElementById("cookImg").onchange = function(e) {
            let file = e.target.files[0];
            let read = new FileReader();
            read.onload = function(e) {
                document.getElementById("preview").src = read.result;
            }
            read.readAsDataURL(file);
            //選擇新增海鮮圖
            $("#newFish").click(function() {
                document.getElementById("newFish").onchange = function(e) {
                    let fish = e.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("newFishPreview").src = reader.result;
                    }
                    reader.readAsDataURL(fish);

                    $('.save').click(function() {

                        let xhr = new XMLHttpRequest;

                        xhr.onload = function() {

                            if (xhr.status == 200) {
                                $('tr.insert').remove();
                                show();

                            } else {
                                // alert(xhr.status);
                            }

                        };

                        // windows
                        xhr.open('post', './php/backend_Seafood_insert.php', true);
                        // Mac
                        // xhr.open('POST', 'http://localhost:8888/backend_Seafood_insert.php', true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                        let seafood = {};
                        seafoodState = $('#seafoodState').val();
                        if (seafoodState == "未上架") {
                            seafoodState = 0;
                        } else if (seafoodState == "上架") {
                            seafoodState = 1;
                        }

                        seafood.seafoodName = $('#seafoodName').val();
                        seafood.seafoodPic = `${fish.name}`;
                        seafood.seafoodPrice = $('#seafoodPrice').val();
                        seafood.seafoodScore = $('#seafoodScore').val();
                        seafood.seafoodPoint = $('#seafoodPoint').val()
                        seafood.seafoodLevel = $('#seafoodLevel').val();
                        seafood.cookNo = $('.cooks').val();
                        seafood.seafoodCookPic = `${file.name}`;
                        seafood.seafoodState = seafoodState;

                        let data_info = JSON.stringify(seafood);
                        // console.log(data_info);
                        xhr.send(data_info);

                        $('.addbtn').removeAttr('disabled');
                        return;
                    });
                }
            });
            // 選擇已有海鮮
            $('.save').click(function() {

                let xhr = new XMLHttpRequest;

                xhr.onload = function() {

                    if (xhr.status == 200) {
                        $('tr.insert').remove();
                        show();

                    } else {
                        // alert(xhr.status);
                    }

                };

                // windows
                xhr.open('post', './php/backend_Seafood_insert.php', true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Seafood_insert.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


                let seafood = {};
                seafoodState = $('#seafoodState').val();
                if (seafoodState == "未上架") {
                    seafoodState = 0;
                } else if (seafoodState == "上架") {
                    seafoodState = 1;
                }

                seafood.seafoodName = $('#seafoodName').val();
                seafood.seafoodPic = $("select.existFish").find("option:selected").attr('class');
                seafood.seafoodPrice = $('#seafoodPrice').val();
                seafood.seafoodScore = $('#seafoodScore').val();
                seafood.seafoodPoint = $('#seafoodPoint').val()
                seafood.seafoodLevel = $('#seafoodLevel').val();
                seafood.cookNo = $('.cooks').val();
                seafood.seafoodCookPic = `${file.name}`;
                seafood.seafoodState = seafoodState;

                let data_info = JSON.stringify(seafood);
                // console.log(data_info);
                xhr.send(data_info);

                $('.addbtn').removeAttr('disabled');
            });

        }

        // 取消新增
        $('.cancel').click(function() {
            $('tr.insert').remove();
            $('.addbtn').removeAttr('disabled');

        });

    });

    // 編輯資料

    function edit() {

        $('.edit').click(function() {

            // 停用所有編輯按鈕
            $('.edit').attr('disabled', 'disabled');

            let tr = $(this).parent().parent();
            let xhr2 = new XMLHttpRequest;

            xhr2.onload = function() {
                if (xhr2.status == 200) {
                    let cookRows = JSON.parse(xhr2.responseText);
                    let cookLength = cookRows.length;

                    //海鮮烹調方式
                    tr.find('td:eq(6)').text("");
                    tr.find('td:eq(6)').append("<select class='cookChange' name='cookChange'></select>");
                    for (let a = 0; a < cookLength; a++) {
                        if (`${cookRows[a].cookState}` == 1) {
                            $(".cookChange").append(`<option value="${cookRows[a].cookNo}">${cookRows[a].cookName}</option>`);
                        }
                    }
                } else {
                    // alert(xhr2.status);
                }
            };

            // 海鮮名稱
            let seafoodName = tr.find('td:eq(1)').text();
            tr.find('td:eq(1)').text("");
            tr.find('td:eq(1)').append(`<input type="text" name="seafoodName" class="seafoodName" value="${seafoodName}">`);

            // 海鮮圖片
            let seafoodPic = tr.find('td:eq(2)').children().attr('src');
            tr.find('td:eq(2)').text("");
            tr.find('td:eq(2)').append(`<form id="uploadSf"><div class="changeSeafood"><div class="seafoodNow">更新前圖片：<img src="${seafoodPic}"><button class="chNewSf">換一張新圖片</button></div>   <div class="forNewSf" style="display:none;"><label for="newSfIn"><img id="newSfPreview"></label><div id="uploadNewSf"><input type="file" name="newSfIn" id="newSfIn"><input type="submit" value="上傳新海鮮圖"></div></div></div></form>`);

            $(".chNewSf").click(function() {
                $(".seafoodNow").remove();
                $(".forNewSf").css('display', 'block');
            });

            $("#uploadSf").on('submit', (function(e) {
                e.preventDefault();
                $.ajax({
                    url: "./php/uploadSfIn.php",
                    type: "POST",
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(data) {
                        alert("上傳成功");
                    },
                    error: function() {
                        alert("上傳失敗");
                    }
                });
                // console.log(new FormData(this));
            }));

            // 海鮮價格
            let seafoodPrice = tr.find('td:eq(3)').text();
            tr.find('td:eq(3)').text("");
            tr.find('td:eq(3)').append(`<input type="text" name="seafoodPrice" class="seafoodPrice" value="${seafoodPrice}">`);

            // 海鮮積分和點數
            let str = tr.find('td:eq(4)').text().indexOf("/");
            let last = tr.find('td:eq(4)').text().length;
            let seafoodScore = tr.find('td:eq(4)').text().substring(0, str);
            let seafoodPoint = tr.find('td:eq(4)').text().substring(str + 1, last);
            tr.find('td:eq(4)').text("");
            tr.find('td:eq(4)').append(`<input type="text" name="seafoodScore" class="seafoodScore" value="${seafoodScore}">/<input type="text" name="seafoodPoint" class="seafoodPoint" value="${seafoodPoint}">`);

            // 海鮮等級
            let seafoodLevel = tr.find('td:eq(5)').text();
            tr.find('td:eq(5)').text("");
            tr.find('td:eq(5)').append(`<select name="seafoodLevel" class="seafoodLevel"><option value="1">銅鷗</option><option value="2">銀鷗</option><option value="3">金鷗</option></select>`);
            if (seafoodLevel == "銅鷗") {
                tr.find('td:eq(5) option:eq(0)').attr("selected", "selected");
            } else if (seafoodLevel == "銀鷗") {
                tr.find('td:eq(5) option:eq(1)').attr("selected", "selected");
            } else {
                tr.find('td:eq(5) option:eq(2)').attr("selected", "selected");
            }

            // 海鮮料理圖
            let seafoodCookPic = tr.find('td:eq(7)').children().attr('src');
            tr.find('td:eq(7)').text("");
            tr.find('td:eq(7)').append(`<form id="uploadCookPic"><div class="chCook"><div class="cookPicNow">更新前圖片：<img class="cookNow" src="${seafoodCookPic}"><button class="chNewCook">換一張新圖片</button></div><div class="toNewCook" style="display:none;"><label for="newC"><img id="newCookPre"></label><div id="uploadNewCook"><input type="file" name="newC" id="newC"><input type="submit" value="上傳新海鮮"></div></div></div></form>`);

            $(".chNewCook").click(function() {
                $(".cookPicNow").remove();
                $(".toNewCook").css('display', 'block');
            });

            $("#uploadCookPic").on('submit', (function(e) {
                e.preventDefault();
                $.ajax({
                    url: "./php/uploadNewC.php",
                    type: "POST",
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(data) {
                        alert("上傳成功");
                    },
                    error: function() {
                        alert("上傳失敗");
                    }
                });
                // console.log(new FormData(this));
            }));



            // 狀態
            let cookState = tr.find('td:eq(8)').text();
            tr.find('td:eq(8)').text("");
            tr.find('td:eq(8)').append(`<select name="seafoodState" class="seafoodState"><option value="0">未上架</option><option value="1">上架</option></select>`);
            if (cookState == "未上架") {
                tr.find('td:eq(8) option:eq(0)').attr("selected", "selected");
            } else {
                tr.find('td:eq(8) option:eq(1)').attr("selected", "selected");
            }

            // 編輯
            tr.find('td:eq(9)').text("");
            tr.find('td:eq(9)').append(`<button type="submit" class="btn btn-info save">儲存</button>
            <button type="button" class="btn btn-info cancel">取消</button>`);

            let seafoodState = $("select.seafoodState").find("option:selected").val();

            // windows
            xhr2.open('GET', './php/backend_Cook_show.php', true);
            // Mac
            // xhr.open('GET', 'http://localhost:8888/backend_Seafood_show.php', true);
            xhr2.send(null);


            //選擇換新海鮮圖
            $(".chNewSf").click(function() {
                document.getElementById("newSfIn").onchange = function(e) {
                    let fish = e.target.files[0];
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById("newSfPreview").src = reader.result;
                    }
                    reader.readAsDataURL(fish);
                    //也換新烹調圖
                    document.getElementById("newC").onchange = function(e) {
                            let file = e.target.files[0];
                            let read = new FileReader();
                            read.onload = function(e) {
                                document.getElementById("newCookPre").src = read.result;
                            }
                            read.readAsDataURL(file);

                            // 儲存
                            $('.save').click(function() {
                                let xhr = new XMLHttpRequest;

                                xhr.onload = function() {

                                    if (xhr.status == 200) {
                                        show();

                                    } else {
                                        // alert(xhr.status);
                                    }

                                };


                                // windows
                                xhr.open('post', './php/backend_Seafood_edit.php', true);
                                // Mac
                                // xhr.open('POST', 'http://localhost:8888/backend_Seafood_edit.php', true);
                                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                                let editSeafood = {};

                                editSeafood.seafoodNo = tr.find('td:eq(0)').text();
                                editSeafood.seafoodName = tr.find('.seafoodName').val();
                                editSeafood.seafoodPic = `${fish.name}`;
                                editSeafood.seafoodPrice = tr.find('.seafoodPrice').val();
                                editSeafood.seafoodScore = tr.find('.seafoodScore').val();
                                editSeafood.seafoodPoint = tr.find('.seafoodPoint').val();
                                editSeafood.seafoodLevel = tr.find('.seafoodLevel').val();
                                editSeafood.cookNo = tr.find('select.cookChange').val();
                                editSeafood.seafoodCookPic = `${file.name}`;
                                editSeafood.seafoodState = tr.find('.seafoodState').val();

                                let data_info = JSON.stringify(editSeafood);
                                // console.log(data_info);
                                xhr.send(data_info);
                                return;
                            });
                        }
                        //  沒換烹調圖
                    $('.save').click(function() {
                        let xhr = new XMLHttpRequest;

                        xhr.onload = function() {

                            if (xhr.status == 200) {
                                show();
                            } else {
                                // alert(xhr.status);
                            }
                        };

                        // windows
                        xhr.open('post', './php/backend_Seafood_edit.php', true);
                        // Mac
                        // xhr.open('POST', 'http://localhost:8888/backend_Seafood_edit.php', true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                        let editSeafood = {};
                        let forCook = parseInt(`${seafoodCookPic}`.lastIndexOf('/')) + 1;

                        editSeafood.seafoodNo = tr.find('td:eq(0)').text();
                        editSeafood.seafoodName = tr.find('.seafoodName').val();
                        editSeafood.seafoodPic = `${fish.name}`;
                        editSeafood.seafoodPrice = tr.find('.seafoodPrice').val();
                        editSeafood.seafoodScore = tr.find('.seafoodScore').val();
                        editSeafood.seafoodPoint = tr.find('.seafoodPoint').val();
                        editSeafood.seafoodLevel = tr.find('.seafoodLevel').val();
                        editSeafood.cookNo = tr.find('select.cookChange').val();
                        editSeafood.seafoodCookPic = `${seafoodCookPic}`.substr(forCook, `${seafoodCookPic}`.length);
                        editSeafood.seafoodState = tr.find('.seafoodState').val();

                        let data_info = JSON.stringify(editSeafood);
                        // console.log(data_info);
                        xhr.send(data_info);
                    });
                }
            });

            //從後方先更新烹調圖片
            document.getElementById("newC").onchange = function(e) {
                let file = e.target.files[0];
                let read = new FileReader();
                read.onload = function(e) {
                    document.getElementById("newCookPre").src = read.result;
                }
                read.readAsDataURL(file);
                //也換了海鮮圖
                $(".chNewSf").click(function() {
                    document.getElementById("newSfIn").onchange = function(e) {
                        let fish = e.target.files[0];
                        let reader = new FileReader();
                        reader.onload = function(e) {
                            document.getElementById("newSfPreview").src = reader.result;
                        }
                        reader.readAsDataURL(fish);

                        $('.save').click(function() {
                            let xhr = new XMLHttpRequest;

                            xhr.onload = function() {

                                if (xhr.status == 200) {
                                    show();

                                } else {
                                    // alert(xhr.status);
                                }

                            };


                            // windows
                            xhr.open('post', './php/backend_Seafood_edit.php', true);
                            // Mac
                            // xhr.open('POST', 'http://localhost:8888/backend_Seafood_edit.php', true);
                            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                            let editSeafood = {};

                            editSeafood.seafoodNo = tr.find('td:eq(0)').text();
                            editSeafood.seafoodName = tr.find('.seafoodName').val();
                            editSeafood.seafoodPic = `${fish.name}`;
                            editSeafood.seafoodPrice = tr.find('.seafoodPrice').val();
                            editSeafood.seafoodScore = tr.find('.seafoodScore').val();
                            editSeafood.seafoodPoint = tr.find('.seafoodPoint').val();
                            editSeafood.seafoodLevel = tr.find('.seafoodLevel').val();
                            editSeafood.cookNo = tr.find('select.cookChange').val();
                            editSeafood.seafoodCookPic = `${file.name}`;
                            editSeafood.seafoodState = tr.find('.seafoodState').val();

                            let data_info = JSON.stringify(editSeafood);
                            // console.log(data_info);
                            xhr.send(data_info);
                            return;
                        });
                    }
                });

                //沒更新海鮮圖
                $('.save').click(function() {
                    let xhr = new XMLHttpRequest;

                    xhr.onload = function() {

                        if (xhr.status == 200) {
                            show();
                        } else {
                            // alert(xhr.status);
                        }
                    };

                    // windows
                    xhr.open('post', './php/backend_Seafood_edit.php', true);
                    // Mac
                    // xhr.open('POST', 'http://localhost:8888/backend_Seafood_edit.php', true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                    let editSeafood = {};
                    let forSf = parseInt(`${seafoodPic}`.lastIndexOf('/')) + 1;

                    editSeafood.seafoodNo = tr.find('td:eq(0)').text();
                    editSeafood.seafoodName = tr.find('.seafoodName').val();
                    editSeafood.seafoodPic = `${seafoodPic}`.substr(forSf, `${seafoodPic}`.length);
                    editSeafood.seafoodPrice = tr.find('.seafoodPrice').val();
                    editSeafood.seafoodScore = tr.find('.seafoodScore').val();
                    editSeafood.seafoodPoint = tr.find('.seafoodPoint').val();
                    editSeafood.seafoodLevel = tr.find('.seafoodLevel').val();
                    editSeafood.cookNo = tr.find('select.cookChange').val();
                    editSeafood.seafoodCookPic = `${file.name}`;
                    editSeafood.seafoodState = tr.find('.seafoodState').val();

                    let data_info = JSON.stringify(editSeafood);
                    // console.log(data_info);
                    xhr.send(data_info);
                });
            }

            //海鮮圖和烹調圖都不換
            $('.save').click(function() {
                let xhr = new XMLHttpRequest;

                xhr.onload = function() {

                    if (xhr.status == 200) {
                        show();

                    } else {
                        // alert(xhr.status);
                    }

                };

                // windows
                xhr.open('post', './php/backend_Seafood_edit.php', true);
                // Mac
                // xhr.open('POST', 'http://localhost:8888/backend_Seafood_edit.php', true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                let editSeafood = {};
                let forSf = parseInt(`${seafoodPic}`.lastIndexOf('/')) + 1;
                let forCook = parseInt(`${seafoodCookPic}`.lastIndexOf('/')) + 1;

                editSeafood.seafoodNo = tr.find('td:eq(0)').text();
                editSeafood.seafoodName = tr.find('.seafoodName').val();
                editSeafood.seafoodPic = `${seafoodPic}`.substr(forSf, `${seafoodPic}`.length);
                editSeafood.seafoodPrice = tr.find('.seafoodPrice').val();
                editSeafood.seafoodScore = tr.find('.seafoodScore').val();
                editSeafood.seafoodPoint = tr.find('.seafoodPoint').val();
                editSeafood.seafoodLevel = tr.find('.seafoodLevel').val();
                editSeafood.cookNo = tr.find('select.cookChange').val();
                editSeafood.seafoodCookPic = `${seafoodCookPic}`.substr(forCook, `${seafoodCookPic}`.length);
                editSeafood.seafoodState = tr.find('.seafoodState').val();

                let data_info = JSON.stringify(editSeafood);
                // console.log(data_info);
                xhr.send(data_info);
            });

            // 取消
            tr.find('.cancel').click(function() {
                show();
            });

        });


    };

});