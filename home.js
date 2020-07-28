
    let userTitle = "";
    let gameTitleSlug = "";
    let bestDealId = "";
    let cheapestPrice = "";

    let cheapestPriceGameName = "";
    let clipId = "";
    let easterEgg = "";
    

	$('#goSearch').on('click', function(event){
        userTitle = ($('#userSearch').val());
        getGameDataRawgBySearch();
        $('#userSearch').val('');
    });

    //easter egg! If you click on the picture on the home page and then type "eggs", you will see the easter egg!

    $('#granny').on('click', function(event){
        easterEgg = "";
        $('#granny').attr('src', 'assets/dummyPhoto.jpg');
    });

    $('body').on('keydown', function(event){
        easterEgg = easterEgg + event.keyCode;
        if (easterEgg === "69717183"){
            $('#granny').attr('src', 'assets/easterEggs.jpg');
        } else {
            $('#granny').attr('src', 'assets/dummyPhoto.jpg');
        }
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
            $(`#gameRating${i}`).empty();
            

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
            getGameDataRawgByTitle();
            
            }
            
        });

    }
