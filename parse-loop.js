var request = require("request"),
    cheerio = require("cheerio");

for (i = 1; i <= 50; i++) { //1488
    url = "http://www.coinproject.com/search_common.php?combo_type=&btnsubmit=Search&page="+i;
    returnId(url);
}

function returnId(url) {
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                $links = $('a.link_top');

            $links.each(function( index ) {
                var str = $(this).attr('href');

                if (str.includes('coin_detail.php?coin=')) {
                    var ids = str.substr(str.indexOf("=") + 1);
                    getValues("http://www.coinproject.com/coin_detail.php?coin="+ids, ids);
                }
            });
        } else {
            console.log(error);
        }
    });
}

function getValues(url, ids) {
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                originalId = ids,
                coinId,
                coinType,
                coinRegion,
                coinCity,
                coinIssuer,
                coinDate_ruled,
                coinMetal,
                coinDenomination,
                coinStruck_cast,
                coinDate_struck,
                coinDiameter,
                coinWeight,
                coinObverse_legend,
                coinObverse_description,
                coinReverse_description,
                coinMint,
                coinPrimary_reference,
                coinReference2,
                coinGrade,
                coinDie_axis,
                coinNotes,
                $imgUrl = [],
                data2send;

            $('img').each(function( index ) {
                var $imgPath = $(this).parent('a').attr("href");

                if($imgPath && $imgPath.includes('siteimages')) {
                    $imgUrl.push($imgPath);
                }
            });

            $('tr').each(function( index ) {
                var $cell = $(this).find('td.body_cmall_tex').first(),
                    $cellText = $cell.text();

                if ($cellText.includes('ID:')) {coinId = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Type')) {coinType = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Region')) {coinRegion = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('City')) {coinCity = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Issuer')) {coinIssuer = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Date Ruled')) {coinDate_ruled = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Metal')) {coinMetal = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Denomination')) {coinDenomination = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Struck / Cast')) {coinStruck_cast = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Date Struck')) {coinDate_struck = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Diameter')) {coinDiameter = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Weight')) {coinWeight = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Obverse Legend')) {coinObverse_legend = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Obverse Description')) {coinObverse_description = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Reverse Description')) {coinReverse_description = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Mint')) {coinMint = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Primary Reference')) {coinPrimary_reference = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Reference2')) {coinReference2 = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Grade')) {coinGrade = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Die Axis')) {coinDie_axis = $cell.next('td').next('td').text().trim();}
                if ($cellText.includes('Notes')) {coinNotes = $cell.next('td').next('td').text().trim();}
            });

             if (coinType && coinType.length > 2) {
                data2send = {
                    originalid: originalId,
                    coinid: coinId,
                    type: coinType,
                    region: coinRegion,
                    city: coinCity,
                    issuer: coinIssuer,
                    date_ruled: coinDate_ruled,
                    metal: coinMetal,
                    denomination: coinDenomination,
                    struck_cast: coinStruck_cast,
                    date_struck: coinDate_struck,
                    diameter: coinDiameter,
                    weight: coinWeight,
                    obverse_legend: coinObverse_legend,
                    obverse_description: coinObverse_description,
                    reverse_description: coinReverse_description,
                    mint: coinMint,
                    primary_reference: coinPrimary_reference,
                    reference2: coinReference2,
                    grade: coinGrade,
                    die_axis: coinDie_axis,
                    notes: coinNotes,
                    photo: JSON.stringify($imgUrl)
                };

                //console.log(data2send);
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
            } else {
                console.log(error);
            }
        }
    );
}


