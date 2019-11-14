require("dotenv").config();
require('fs');
var keys = require("./keys");
var Spotify = require('node-spotify-api'); //
var spotify = new Spotify(keys.spotify);
var Axios = require('axios'); //

//SPOTIFY-------------------------------------
var user_command = process.argv[2]; 
var user_input = process.argv[3]; 

switch (user_command) {
    case 'spotify_this': spotify_this();
        break;
    case 'movie_this': movie_this();
        break;
}

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
// * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.

function movie_this() {
    Axios.get("http://www.omdbapi.com/?i=tt3896198" + user_input + "&apikey=dbac59f0")
        .then(function (response) {
            console.log(response.data.Released);
        })
        .catch(function (error) {
            if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
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


