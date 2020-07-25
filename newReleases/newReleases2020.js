
      // let releases2020 = "";
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
  for(let i = 0; i< 10; i++){
  let title = data.results[i].name;
  console.log(title);
  let release = data.results[i].released;
  console.log(release);
  let bgImage = data.results[i].background_image;
  console.log(bgImage);
  let clip = data.results[i].clip;
  console.log(clip);
  let where2buy = data.results[i].stores;
  console.log(where2buy);
  let genres = data.results[i].genres;
  console.log(genres);
  let ratings = data.results[i].ratings;
  console.log(ratings);
  let gameTitleSlug = data.results[i].slug;
  console.log(gameTitleSlug);
  
  

  
// creates tags  
let body = $("body");
let img = $("<img>");
let pTag = $("<p>");
let basicGameInfo = $("<h2>");


// displays title and game release date
  if (title !== null) {
    basicGameInfo.text(`${title} Release Date: (${release})`);
      img.attr("src", bgImage);
     body.append(basicGameInfo);
     basicGameInfo.append(img);
  } 
// shows video clip
  if(clip !== null){
      let video = $("<video>");
      video.attr("src", clip.clip);
      video.attr("type", "video/mp4");
      video.attr("controls",true);
      body.append(video);
  }
  // shows generes 
  let genreHTag = $("<h2>");
genreHTag.text("Genres");
for(let k = 0; k < genres.length; k++){
    let genreList = $('<li>');
    genreList.text(`Genres: ${genres[k].name}`);
    body.append(genreHTag);
    genreHTag.append(genreList);
}
// shows rating
let ratingTag = $("<h2>")
ratingTag.text("Rating")
for(let r = 0; r < ratings.length; r++){
    let gameRatings = $('<li>');
    gameRatings.text(`Ratings: ${ratings[r].title} Score: ${ratings[r].percent} `);
    body.append(ratingTag);
    ratingTag.append(gameRatings);
}
let storeTag = $("<h2>")
storeTag.text("Where You Can Purchase This Game:")
let storeList = $('<li>');
for(let s = 0; s < where2buy.length; s++){
    
    storeList.text(`${where2buy[s].store.name}`);
    body.append(storeTag);
    storeTag.append(storeList);
}
// storeList.on('click', function(event){
//     storeList.attr("href", where2buy[s].store.name );
// }

  }

})

}