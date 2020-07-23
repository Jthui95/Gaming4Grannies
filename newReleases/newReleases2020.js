
      let releases2020 = "";
      anticipatedReleases();

      
      
      function anticipatedReleases(){
      let anticipatedReleases = "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added";
      
       
      $.ajax({
        url: anticipatedReleases,
        method: "GET"
      })
      .then(function(data){
        console.log(data);
        // gathering all the information
        let gameTitle = data.results;
        console.log(gameTitle);
        for(let i = 0; i< data.results.length; i++){
        let title = data.results[0].name;
        console.log(title);
        let release = data.results[0].released;
        console.log(release);
        let bgImage = data.results[0].background_image;
        console.log(bgImage);
        let clip = data.results[0].clip;
        console.log(clip);
        let where2buy = data.results[0].stores;
        console.log(where2buy);
        let genres = data.results[0].genres;
        console.log(genres);
        let ratings = data.results[0].ratings;
        console.log(ratings);
        
        //appending to stuff
        // let div = document.getElementById("div");
        // let img = document.getElementById('image');
        // let header = document.getElementById('header');
        // let paragraph = document.getElementById("p");
        

        if (title !==null) {
          div.innerHTML = `Title: ${title} Release Date: ${release}`;
        
        }else{
           div.innerHTML = `Title: ${title}`;
           
        }
        img.setAttribute("src" , bgImage);
        // img.append(title);
        }
        // if( rating !== null){
        //   let rating = document.getElementById("ul");
        //   rating.
        // }
      })
      
    }
    