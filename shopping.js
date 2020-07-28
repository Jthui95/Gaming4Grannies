let queryStoresURL = "https://www.cheapshark.com/api/1.0/stores";
let storeURLArray = ['https://store.steampowered.com/','https://www.gamersgate.com/','https://www.greenmangaming.com/','https://www.amazon.com/','https://www.gamestop.com/','https://www.direct2drive.com/#!/pc','https://www.gog.com/','https://www.origin.com/usa/en-us/store','https://getgamez.net/','https://shinyloot.com/','https://www.humblebundle.com/store','https://www.desura.com/','https://store.ubi.com/us/','http://indiegamestand.com/','https://www.fanatical.com/en/','https://www.gamesrocket.com/','https://gamesrepublic.com/','http://www.silagames.com/defaultsite','http://playfield.io/','http://imperialgamesllc.com/','https://www.wingamestore.com/','https://funstock.co.uk/','https://www.gamebillet.com/','https://www.voidu.com/en/','https://www.epicgames.com/store/en-US/','https://www.razer.com/','https://us.gamesplanet.com/','https://www.gamesload.com/home_mixed.html','https://2game.com/en-us/','https://www.indiegala.com/','https://www.blizzard.com/en-us/games/'];

$.ajax({
    url: queryStoresURL,
    method: "GET"
}).then(function(stores){
    // console.log(stores);

    for (let i = 0; i < stores.length; i++){

        let storeLogo = `https://www.cheapshark.com${stores[i].images.banner}`;
        let imgTag = $('<img>');
        let storeCardDiv = $('<div>');
        let imgATag = $('<a>');

        imgATag.attr('href', storeURLArray[i]);
        imgATag.attr('target', '_blank');

        imgTag.attr('src', storeLogo);
        imgTag.attr('style', 'background-color: black');
        imgTag.attr('alt', stores[i].storeName);
        imgTag.attr('title', stores[i].storeName);

        storeCardDiv.attr('class', `card store${i}`);
        //storeCardDiv.attr('style', `border-color: black; border-style: solid; border-radius: 5px; margin-bottom: 10px;`);

        let storeOlTag = $('<ol>');
        let divBreak = ('<hr>');

        storeOlTag.attr('style', 'margin-left: 20px;');
        storeCardDiv.append(imgATag, storeOlTag);
        imgATag.append(imgTag);
       
        $('#dealsDiv').append(storeCardDiv);

        function getCheapSharkDeals(){

            let queryDealsURL = "https://www.cheapshark.com/api/1.0/deals?storeID=" + `${i+1}` + "&sortBy=Deal%20Rating&pageSize=5";

            $.ajax({
                url: queryDealsURL,
                method: "GET"
            }).then(function(deals){
                // console.log(deals);

                if (deals.length !== 0) {
                    for (let j = 0; j < deals.length; j++){
                        
                        let storeDealLiTag = $('<li>');
                        let salePricePTag = $('<p>');
                        let normalPricePTag = $('<p>');
                        
                        let normalPrice = deals[j].normalPrice;
                        let salePrice = deals[j].salePrice;

                        normalPricePTag.attr('style', 'text-decoration: line-through; float: left; margin-left:5px; margin-right:5px;');
                        storeDealLiTag.attr('style', 'float: left;');

                        storeDealLiTag.text(`${deals[j].title}:`);
                        normalPricePTag.text(`$${normalPrice}`);
                        salePricePTag.text(`$${salePrice}`);

                        storeOlTag.append(storeDealLiTag, normalPricePTag, salePricePTag);
                    }

                } else {
                        let storeDealLiTag = $('<p>');
                        storeDealLiTag.text("NO DEALS AT THIS TIME");
                        storeOlTag.append(storeDealLiTag);
                }

            });
        }

        getCheapSharkDeals();
        
    }

});