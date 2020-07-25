
    let userTitle = "";
    let gameTitleSlug = "";
    let bestDealId = "";
    let cheapestPrice = "";

    let cheapestPriceGameName = "";
    let clipId = "";
    

	$('#goSearch').on('click', function(event){
        userTitle = ($('#userSearch').val());
        getGameDataRawgBySearch();
    });
    
    function getGameDataRawgBySearch(){

        let queryCheapSharkURL = "https://api.rawg.io/api/games?search=" + userTitle + "&ordering=-added&page_size=5";

        $.ajax({
		url: queryCheapSharkURL,
		method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < 5; i++){
            $(`#gamePhoto${i}`).empty();
            $(`#gameClip${i}`).empty();
            $(`#gameReview${i}`).empty();
            $(`#gameStores${i}`).empty();
            

            let gameTitle = response.results[i].name;
            let gamePhoto = response.results[i].background_image;
            let gameClip = response.results[i].clip;
            let gameReviews = response.results[i].ratings;
            let gameReleased = response.results[i].released;
            
            gameTitleSlug = response.results[i].slug;
            
            $(`#gameName${i}`).text(`${gameTitle} (Released: ${gameReleased})`);

            let imgTag = $("<img>");
            imgTag.attr('src', gamePhoto);
            $(`#gamePhoto${i}`).append(imgTag);

            
            if (gameClip !== null) {
                let videoTag = $("<video>");
                videoTag.attr('src', gameClip.clip);
                videoTag.attr('type', 'video/mp4');
                videoTag.attr('controls', true);
                $(`#gameClip${i}`).append(videoTag);
            } 

            $(`#gameReview${i}`).append($('<h3>').text('Reviews'));

            for (let j = 0; j < gameReviews.length; j++){
                let reviewLiTag = $('<li>');
                reviewLiTag.text(`${gameReviews[j].title}: ${gameReviews[j].percent}%`);
                $(`#gameReview${i}`).append(reviewLiTag);
            }

            // for (let k = 0; k < gameStores.length; k++){
            //     let storesLiTag = $('<li>');
            //     storesLiTag.text(`${gameStores[k].title}: ${gameReviews[k].percent}%`);
            //     $(`#gameStores${i}`).append(reviewLiTag);
            // }
            let gameRating = "";
            let gameDescription = "";
            let gameStores = "";

            function getGameDataRawgByTitle(){

                let queryCheapSharkURL = "https://api.rawg.io/api/games/" + gameTitleSlug;

                $.ajax({
                    url: queryCheapSharkURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);

                gameRating = response.esrb_rating;
                if (gameRating !== null) {
                    gameRating = gameRating.name;
                    $(`#gameRating${i}`).text(`Rating: ${gameRating}`);
                } else {
                    $(`#gameRating${i}`).text(`No Rating`);
                }

                $(`#gameStores${i}`).append($('<h3>').text('Stores'));

                gameStores = response.stores;
                for (let k = 0; k < response.stores.length; k++){
                  let storeDiv = $('<div>');
                  let storesLiTag = $('<li>');
                  let storeATag = $('<a>');
                  storeATag.attr('href', gameStores[k].url);
                  storesLiTag.attr('style', 'list-style-type:square');
                  storeATag.attr('target', '_blank');
                  storeATag.text(`${gameStores[k].url}`);
                  storesLiTag.text(gameStores[k].store.name);
                  storeDiv.append(storesLiTag);
                  storeDiv.append(storeATag);
                  $(`#gameStores${i}`).append(storeDiv); 
                }

                

                gameDescription = response.description_raw;
                $(`#gameSynaps${i}`).text(gameDescription);
                
                });
            }

            // function getCheapestDeal(){
            //     let queryCheapestURL = "https://www.cheapshark.com/api/1.0/games?title=" + gameTitle;
            //     $.ajax({
            //         url: queryCheapestURL,
            //         method: "GET"
            //     }).then(function(response) {
            //         console.log(response);
            //         let cheapestDealId = response[0].cheapestDealID;
            //         console.log(cheapestDealId);
            //     });
            // }
            
            getGameDataRawgByTitle();
            //getCheapestDeal();
            
            }
            
        });

    }



	// function getGameDataRawg(){
		
	// 	let queryRawgURL = "https://api.rawg.io/api/games/" + rawgTitle;
	// 	let gameInfo = $('#gameInfo');

	// 	$.ajax({
	// 	url: queryRawgURL,
	// 	method: "GET",
	// 	}).then(function(response) {
    //         console.log(response);
	// 	});
    // }



    // function getCheapestDeal(){
    //     let queryCheapestURL = "https://www.cheapshark.com/api/1.0/deals?id=" + bestDealId;

    //         $.ajax({
    //         url: queryCheapestURL,
    //         method: "GET"
    //         }).then(function(response) {
    //         console.log(response.cheapestPrice.price);
    //         cheapestPrice = response.cheapestPrice.price;
    //         });
    // }