
    let userTitle = "";
    let gameTitleSlug = "";
    let bestDealId = "";
    let cheapestPrice = "";

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
            
            let gameTitle = response.results[i].name;
            let gamePhoto = response.results[i].background_image;
            let gameClip = response.results[i].clip;
            let gameReviews = response.results[i].ratings;
            let gameStores = response.results[i].stores;
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

            let gameReviewsHeading = $('<h3>');
            gameReviewsHeading.text('Reviews');
            $(`#gameReview${i}`).append(gameReviewsHeading);

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

                gameDescription = response.description_raw;
                $(`#gameSynaps${i}`).text(gameDescription);
                
                });
            }

            getGameDataRawgByTitle();
            
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
        //     $.ajax({
        //         url: queryCheapestURL,
        //         method: "GET"
        //     }).then(function(response) {
                
        //     });
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
