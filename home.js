	let gameTitle = "";

	$('#search').on('click', function(event){
		gameTitle = ($('#gameTitle').val()).replace(/ /g, "-");
		console.log(gameTitle);
		$('#gameInfo').empty();
		getGameData();
	});

	function getGameData(){
		
		let queryURL = "https://api.rawg.io/api/games/" + gameTitle;
		let gameInfo = $('#gameInfo');

		$.ajax({
		url: queryURL,
		method: "GET"
		}).then(function(response) {
			console.log(response);
			let bgImage = response.background_image;
			let clip = response.clip.clip;
			let img = $('<img>');
			let video = $('<video>');
			let videoSource = $('<source>');
			img.attr('src', bgImage);
			videoSource.attr('src', clip);
			videoSource.attr('type', 'video/mp4');
			videoSource.attr('autoplay', 'true');
			video.append(videoSource);
			gameInfo.append(img);
			gameInfo.append(video);
		});
	}
