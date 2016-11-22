var request = require("request"),
    cheerio = require("cheerio"),
    ids = [];
    //url = "http://www.coinproject.com/coin_detail.php?coin=1525";

//http://www.coinproject.com/search_common.php?combo_type=&btnsubmit=Search&page=1 //1448
//

for (i = 1; i <= 2; i++) {
    url = "http://www.coinproject.com/search_common.php?combo_type=&btnsubmit=Search&page="+i;
    returnId(url);
}

console.log(ids.length);

function returnId(url) {
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                $links = $('a');

            $links.each(function( index ) {
                var str = $(this).attr('href');
                if (str.includes('coin_detail.php?coin=')) {
                    ids.push(str.substr(str.indexOf("=") + 1));
                   // console.log($urls);
                    console.log(ids);
                    getValues("http://www.coinproject.com/coin_detail.php?coin="+str.substr(str.indexOf("=") + 1));
                }
            });
        }
    });
}

function getValues(url) {
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                coinId, coinType, coinMetal, data2send ;

            $('tr').each(function( index ) {
                var $cell = $(this).find('td.body_cmall_tex').first();
                $cellText = $cell.text();

                 if ($cellText.includes('ID:')) {
                    coinId = $cell.next('td').next('td').text().trim();
                    console.log(coinId);
                 }

                 if ($cellText.includes('Type')) {
                 coinType = $cell.next('td').next('td').text().trim();
                 console.log(coinType);
                 }

                 if ($cellText.includes('Metal')) {
                 coinMetal = $cell.next('td').next('td').text().trim();
                 console.log(coinMetal);
                 }
            });

             if (coinType && coinType.length > 3) {
                data2send = { coinid: coinId, type: coinType, metal: coinMetal };
                postData(data2send );
             }

        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
}

///////////////////
function postData(arr) {
    request.post(
        'http://localhost:3000/coins',
        { json: arr },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}


