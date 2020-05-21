function show() {
    // 清除表格內容
    $(`table tr`).not("tr.title").remove();

    // 顯示資料庫內容
    let xhr = new XMLHttpRequest;
    xhr.onload = function() {
        if (xhr.status == 200) {

            let orderRows = JSON.parse(xhr.responseText);
            let orderLength = orderRows.length;
            console.log(orderRows);

            for (let i = 0; i < orderLength; i++) {

                if (orderRows[i].orderState == 0) {
                    routeState = "取消";
                } else {
                    routeState = "正常航行";
                }
                $('table').append(`<tr><td>${orderRows[i].orderNo}</td><td>${orderRows[i].orderName}</td><td>${orderRows[i].routePort}</td><td>${orderRows[i].routeDate}</td><td>${orderRows[i].orderPeople} 人</td><td>${orderRows[i].orderTotal} 元</td><td>${routeState}</td><td><button type="submit" class="btn btn-success detail" id="${orderRows[i].orderNo}">查看明細</button></td></tr>`);

            }

            detail();


        } else {
            alert(xhr.status);
        }
    };

    // windows
    xhr.open('GET',  './php/backend_OrderMaster_show.php',  true);
    // Mac
    // xhr.open('GET', 'http://localhost:8080/backend_OrderMaster_show.php', true);
    xhr.send(null);

};


// 查看訂單明細

function detail() {

    $('.detail').click(function() {
        localStorage['orderNo'] = $(this).attr("id");
        location.href = "backend_OrderMaster_Detail.html";
    });


};