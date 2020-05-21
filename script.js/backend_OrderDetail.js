// 顯示資料
function show() {
    // 清除表格內容
    $(`table tr`).not("tr.title").remove();

    // 顯示訂單基本資料
    let xhr = new XMLHttpRequest;
    xhr.onload = function() {
        if (xhr.status == 200) {

            let orderRow = JSON.parse(xhr.responseText);
            // console.log(orderRow);
            // 訂單資料
            $('table.main').append(`<tr><td>${orderRow.orderNo}</td><td>${orderRow.orderName}</td><td>${orderRow.routePort}</td><td>${orderRow.routeDate}</td><td>${orderRow.orderPeople} 人</td><td>${orderRow.orderTotal} 元</td><td><select name="routeState" class="routeState" id="state"><option value="0">取消</option>
            <option value="1">尚未報到</option></option>
            <option value="2">已報到</option></select></td></tr>`);
            if (orderRow.orderState == 1) {
                $('select option:eq(1)').attr("selected", "selected");
            } else if (orderRow.orderState == 2) {
                $('select option:eq(2)').attr("selected", "selected");
            }

            // 價格
            $('table.price').append(`<tr><td>${orderRow.orderPrice} 元</td><td>${orderRow.orderPoints} 點</td><td>${orderRow.orderTotal} 元</td></tr>`);

        } else {
            alert(xhr.status);
        }
    };

    let data = `orderNo=${localStorage['orderNo']}`;
    // console.log(data);

    // windows
    xhr.open('POST', './php/backend_OrderDetail_show.php',  true);
    // Mac
    // xhr.open(''POST', 'http://localhost:8888/backend_OrderDetail_show.php', true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);


    // 顯示套餐資料
    let xhrm = new XMLHttpRequest;
    xhrm.onload = function() {
        if (xhrm.status == 200) {
            let mealRows = JSON.parse(xhrm.responseText);
            // console.log(mealRows);
            for (let i = 0; i < mealRows.length; i++) {
                $('table.meal').append(`<tr><td>${mealRows[i].mealName}</td><td>${mealRows[i].mealListCount}</td><td>${mealRows[i].mealListPrice} 元</td><td>${mealRows[i].mealTotal} 元</td></tr>`);
            }

        } else {
            alert(xhrm.status);
        }
    };

    // windows
    xhrm.open('POST', './php/backend_OrderDetail_meal.php',  true);
    // Mac
    // xhr.open(''POST', 'http://localhost:8888/backend_OrderDetail_meal.php', true);
    xhrm.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhrm.send(data);



    // 顯示客製化料理資料
    let xhrc = new XMLHttpRequest;
    xhrc.onload = function() {
        if (xhrc.status == 200) {

            let custoRows = JSON.parse(xhrc.responseText);
            // console.log(custoRows);
            if (custoRows != "") {
                for (let i = 0; i < custoRows.length; i++) {
                    $('table.custo').append(`<tr><td>${custoRows[i].custoName}</td><td>${custoRows[i].custoListCount}</td><td>${custoRows[i].custoListPrice} 元</td><td>${custoRows[i].custoTotal} 元</td></tr>`);

                }

            } else {
                $('table.custo').css("display", "none");
            }

        } else {
            alert(xhrm.status);
        }
    };

    // windows
    xhrc.open('POST', './php/backend_OrderDetail_custo.php',  true);
    // Mac
    // xhr.open(''POST', 'http://localhost:8888/backend_OrderDetail_custo.php', true);
    xhrc.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhrc.send(data);

};


// 編輯

$('.cancel').click(function() {
    location.href = "backend_OrderMaster.html";
});
$('.save').click(function() {
    let xhrs = new XMLHttpRequest;
    xhrs.onload = function() {
        if (xhrs.status == 200) {

            show();

        } else {
            alert(xhrs.status);
        }
    };

    let select = document.getElementById('state');
    let state = select.selectedIndex;
    let data = `orderNo=${localStorage['orderNo']}&&orderState=${state}`;

    // windows
    xhrs.open('POST', './php/backend_OrderDetail_save.php',  true);
    // Mac
    // xhr.open(''POST', 'http://localhost:8888/backend_OrderDetail_save.php', true);
    xhrs.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhrs.send(data);
    console.log(data);
});