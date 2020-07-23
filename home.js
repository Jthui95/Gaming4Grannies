let userTitle = "";
    let rawgTitle = "";

	$('#goSearch').on('click', function(event){
		userTitle = ($('#userSearch').val());
		$('#gameInfo').empty();
		getGameDataCheapShark();
    });
    
    function getGameDataCheapShark(){

        let queryCheapSharkURL = "https://www.cheapshark.com/api/1.0/games?title=" + userTitle + "&sortBy=release";

        $.ajax({
		url: queryCheapSharkURL,
		method: "GET"
        }).then(function(response){
            console.log(response);
            for (let i = 0; i < response.length; i++){
            let cheapSharkTitle = response[i].external;
            rawgTitle = cheapSharkTitle.replace(/ /g, "-").replace(":","");
            console.log(rawgTitle);
            getGameDataRawg();
            }
            
        });
    }

	function getGameDataRawg(){
		
		let queryRawgURL = "https://api.rawg.io/api/games/" + rawgTitle;
		let gameInfo = $('#gameInfo');

		$.ajax({
		url: queryRawgURL,
		method: "GET"
		}).then(function(response) {
            console.log(response);
            
			let bgImage = response.background_image;
            let clip = response.clip;
            let rating = response.esrb_rating;
            let title = response.name;
            let description = response.description_raw;
            let genresArray = response.genres;
            let reviewsArray = response.ratings;
            let storesArray = response.stores;
            let releaseDate = response.released;
            let gameDataDiv = $('<div>');
            let h1TagTitle = $('<h1>');
            let pTagDescription = $('<p>');
            let ulTagGenres = $('<ul>');
            let ulTagReviews = $('<ul>');
            let ulTagStores = $('<ul>');
            let img = $('<img>');

            if (releaseDate !== null) {
                h1TagTitle.text(`${title} (released: ${releaseDate})`);
            } else {
                h1TagTitle.text(title);
            }
            pTagDescription.text(description);
            ulTagGenres.text("Genres:");
            img.attr('src', bgImage);
            img.attr('style', 'width: 700px; height: 400px;');
            
            gameDataDiv.append(h1TagTitle);

            if (rating !== null) { 
                let pTagRating = $('<p>');
                pTagRating.text(rating.name);
                gameDataDiv.append(`Rating: ${rating.name}`);
            }

            gameDataDiv.append(pTagDescription);

            for (let i = 0; i < genresArray.length; i++){
                let liTagGenres = $('<li>');
                liTagGenres.text(genresArray[i].name);
                ulTagGenres.append(liTagGenres);
            }

            gameDataDiv.append(ulTagGenres);
            gameDataDiv.append(img);
            
            
            if (clip !== null) {
                let video = $('<video>');
                video.attr('src', clip.clip);
                video.attr('type', 'video/mp4');
                video.attr('controls', true);
                video.attr('style', 'width: 700px; height: 400px;');
                gameDataDiv.append(video);
            } 

            for (let i = 0; i < reviewsArray.length; i++){
                let liTagReviews = $('<li>');
                liTagReviews.text(`${reviewsArray[i].title}: ${reviewsArray[i].percent}%`);
                ulTagReviews.append(liTagReviews);
            }

            for (let i = 0; i < storesArray.length; i++){
                let liTagStores = $('<li>');
                let aTagStoreUrl = $('<a>');
                aTagStoreUrl.attr('href', storesArray[i].url);
                aTagStoreUrl.attr('target', '_blank');
                aTagStoreUrl.text(storesArray[i].url);
                liTagStores.text(`${storesArray[i].store.name}:`);
                ulTagStores.append(liTagStores);
                ulTagStores.append(aTagStoreUrl);
            }


            gameDataDiv.append(ulTagReviews);
            gameDataDiv.append(ulTagStores);
            gameInfo.prepend(gameDataDiv);
			
		});
    }
