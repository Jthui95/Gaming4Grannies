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

// links the loops to parts on the document 
$(`#gameName${i}`).empty();
$(`#gamePhoto${i}`).empty();
$(`#gameClip${i}`).empty();
$(`#gameRating${i}`).empty();
$(`#gameGenre${i}`).empty();
$(`#gameBuy${i}`).empty();



// displays title and game release date
$(`#gameName${i}`).text(`${title} Release Date: (${release})`);

let img = $("<img>");
img.attr("src", bgImage);
$(`#gamePhoto${i}`).append(img);

// shows video clip
if(clip !== null){
let video = $("<video>");
video.attr("src", clip.clip);
video.attr("type", "video/mp4");
video.attr("controls",true);
$(`#gameClip${i}`).append(video);
}

// shows generes 
$(`#gameGenre${i}`).append($('<h3>').text('Genre'));
for(let k = 0; k < genres.length; k++){
let genreList = $('<li>');
genreList.text(`Genres: ${genres[k].name}`);
$(`#gameGenre${i}`).append(genreList);
}

// shows rating
$(`#gameRating${i}`).append($('<h3>').text('Ratings'));
for(let r = 0; r < ratings.length; r++){
let gameRatings = $('<li>');
gameRatings.text(`Ratings: ${ratings[r].title} Score: ${ratings[r].percent} `);
$(`#gameRating${i}`).append(gameRatings);
}

// where to buy it 
$(`#gameBuy${i}`).append($('<h3>').text('Where2Buy'));
for(let s = 0; s < where2buy.length; s++){
let where2Buy = $("<li>");
where2Buy.text(`${where2buy[s].store.name}`);
$(`#gameBuy${i}`).append(where2Buy);
}
// storeList.on('click', function(event){
//     storeList.attr("href", where2buy[s].store.name );
// }

}

})

}