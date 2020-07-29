
    let userTitle = "";
    let gameTitleSlug = "";
    let bestDealId = "";
    let cheapestPrice = "";

    let cheapestPriceGameName = "";
    let clipId = "";
    let easterEgg = "";
    
    // the press of the search button calls the getGameDataRawgBySearch function

	$('#goSearch').on('click', function(event){
        userTitle = ($('#userSearch').val());
        getGameDataRawgBySearch();
        $('#userSearch').val('');
    });

    //easter egg! If you click on the picture on the home page and then type "eggs", you will see the easter egg!

    $('#granny').on('click', function(event){
        easterEgg = "";
        $('#granny').attr('src', 'assets/allWhite.jpg');
    });
    // keyCode for e=69, g=71, and s=83 so typings "eggs" yields a string of '69717183'. When that string is met, it sets the image to the easter eggs image.
    $('body').on('keydown', function(event){
        easterEgg = easterEgg + event.keyCode;
        if (easterEgg === "69717183"){
            $('#granny').attr('src', 'assets/easterEggs.jpg');
        } else {
            $('#granny').attr('src', 'assets/allWhite.jpg');
        }
    });

    // this overall function uses the RAWG api to get all necessary data for the home page
    function getGameDataRawgBySearch(){

        let queryCheapSharkURL = "https://api.rawg.io/api/games?search=" + userTitle + "&ordering=-added&page_size=5";

        $.ajax({
		url: queryCheapSharkURL,
		method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < 5; i++){

            //empties all of the divs so each button presses gives new data
            $(`#gamePhoto${i}`).empty();
            $(`#gameClip${i}`).empty();
            $(`#gameReview${i}`).empty();
            $(`#gameStores${i}`).empty();
            $(`#gameRating${i}`).empty();
            

            let gameTitle = response.results[i].name;
            let gamePhoto = response.results[i].background_image;
            let gameClip = response.results[i].clip;
            let gameReviews = response.results[i].ratings;
            let gameReleased = response.results[i].released;
            
            gameTitleSlug = response.results[i].slug;
            
            // sets the game name and release date 
            $(`#gameName${i}`).text(`${gameTitle} (Released: ${gameReleased})`);

            // set the image of the game
            let imgTag = $("<img>");
            imgTag.attr('src', gamePhoto);
            $(`#gamePhoto${i}`).append(imgTag);

            // sets the clip of the game (if there is one)
            if (gameClip !== null) {
                let videoTag = $("<video>");
                videoTag.attr('src', gameClip.clip);
                videoTag.attr('type', 'video/mp4');
                videoTag.attr('controls', true);
                $(`#gameClip${i}`).append(videoTag);
            } 

            $(`#gameReview${i}`).append($('<h3>').text('Reviews'));

            // sets the reviews of the game
            for (let j = 0; j < gameReviews.length; j++){
                let reviewLiTag = $('<li>');
                reviewLiTag.text(`${gameReviews[j].title}: ${gameReviews[j].percent}%`);
                $(`#gameReview${i}`).append(reviewLiTag);
            }

            let gameRating = "";
            let gameDescription = "";
            let gameStores = "";

            // have to create a new function and call it to uilize a different endpoint for different data
            function getGameDataRawgByTitle(){

                let queryCheapSharkURL = "https://api.rawg.io/api/games/" + gameTitleSlug;
                
                $.ajax({
                    url: queryCheapSharkURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);

                //sets the game rating of the game
                gameRating = response.esrb_rating;
                if (gameRating !== null) {
                    gameRating = gameRating.name;
                    $(`#gameRating${i}`).text(`Rating: ${gameRating}`);
                } else {
                    $(`#gameRating${i}`).text(`No Rating`);
                }

                $(`#gameStores${i}`).append($('<h3>').text('Stores'));

                //sets the stores and links for the game
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

                //set the description of the game
                gameDescription = response.description_raw;
                $(`#gameSynaps${i}`).text(gameDescription);
                
                });
            }      
            getGameDataRawgByTitle();
            
            }
            
        });

    }
