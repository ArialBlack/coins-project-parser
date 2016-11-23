var cheerio = require("cheerio"),
    rp = require('request-promise'),
    request = require("request"),
    ids = [],
    pocessedPages = 0,
    pages = [],
    lastPage = 1448;

for (i = 1; i <= lastPage; i++) {
    var url = "http://www.coinproject.com/search_common.php?combo_type=&btnsubmit=Search&page="+i;
    pages.push(url);
}

searchIds(pages[0]);

function searchIds(page) {
    var options = {
        uri: page,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            $links = $('a.link_top');

            $links.each(function() {
                var str = $(this).attr('href');

                if (str.includes('coin_detail.php?coin=')) {
                    var id = str.substr(str.indexOf("=") + 1);
                    ids.push(id);
                }
            });

            endSearchIds();

        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log(err);
        });
}

function endSearchIds() {
    console.log("ids: ", ids.length);
    pocessedPages++;
    console.log("Pocessed pages: ", pocessedPages);
    if (pocessedPages < lastPage) {
        searchIds(pages[pocessedPages]);
    } else {
        var data2send = {
            originalid: JSON.stringify(ids)
        };

        console.log(data2send);
        postData(data2send);
    }
}

function postData(arr) {
    request.post(
        'http://localhost:3000/coinsid',
        { json: arr },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            } else {
                console.log(error);
            }
        }
    );
}

