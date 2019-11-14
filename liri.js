require("dotenv").config();
require('fs');
var keys = require("./keys"); //this is loaded
var Spotify = require('node-spotify-api'); //
var spotify = new Spotify(keys.spotify);
var Axios = require('axios'); //

var user_command = process.argv[2];
var user_input = process.argv[3];

switch (user_command) {
    case 'spotify-this': spotify_this();
        break;
    case 'movie-this': movie_this();
        break;
}

//SPOTIFY-------------------------------------
function spotify_this() {
    spotify.search({ type: 'track', query: user_input, limit: 1 },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[0].artists[0]);// all
            console.log(data.tracks.items[0].artists[0].name);//Band Name
            console.log(data.tracks.items[0].name);//Song name
            console.log(data.tracks.items[0].album.name);//Album name
        });
};

// //AXIOS for OMDb -------------------------------------
function movie_this() {
    Axios.get("http://www.omdbapi.com/?t=" + user_input + "&apikey=dbac59f0")
        .then(function (response) {
            console.log(response.data.Title);//   * Title of the movie.
            console.log(response.data.Year);//   * Year the movie came out.
            console.log(response.data.imdbRating);//   * IMDB Rating of the movie.
            console.log(response.data.Ratings[1].Value);//   * Rotten Tomatoes Rating of the movie.
            console.log(response.data.Country);//   * Country where the movie was produced.
            console.log(response.data.Language);//   * Language of the movie.
            console.log(response.data.Plot);//   * Plot of the movie.
            console.log(response.data.Actors);//   * Actors in the movie.
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


// //BANDS IN TOWN ------------------------------

// var bandsintown = require('bandsintown')(APP_ID);

// bandsintown
//   .getArtistEventList('')
//   .then(function(events) {
//     // return array of events
//   });


