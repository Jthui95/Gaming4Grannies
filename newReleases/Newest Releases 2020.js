
      let gameTitle = "Pokemon";
      let queryURL = "https://api.rawg.io/api/games/{game title}" + gameTitle;
      $.ajax({
        url:queryURL,
        method:"GET"
      })
      .then(function(response) {
        console.log(response);
      });
      

