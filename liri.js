require("dotenv").config(); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
var fs = require('fs'); // require is a core node.js method to include the File System module (). fs is a module to handle the file system. 
var keys = require("./keys"); // ./ is a relative module identifier looked for in the current directory. 
// The resultant pathname is is interpreted relative to the location of the file being executed.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Axios = require('axios');

// var Bandsintown = require('bandsintown');
// var bandsintown = new Bandsintown(keys.bandsintown);

var user_command = process.argv[2];
var user_input = process.argv.slice(3).join(" ");


switch (user_command) {
    case 'spotify': spotify_this();
        break;
    case 'movie': movie_this();
        break;
    case 'concert': concert_this();
        break;
    case 'do': do_what_it_says();
        break;
    default: "Write spotify_this, movie_this, concert_this or do_what_it_says"
};


//SPOTIFY
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

            var spotify_append = "Appending song from SPOTIFY: " + "\""  + data.tracks.items[0].name + "\"" + "\r\n";

            fs.appendFile('log.txt', spotify_append, function (err) {
                if (err) throw err;
            });
        });
};

//OMDB
function movie_this() {
    Axios
        .get("http://www.omdbapi.com/?t=" + user_input + "&apikey=dbac59f0")
        .then(function (response) {
            console.log(response.data.Title);//   * Title of the movie.
            console.log(response.data.Year);//   * Year the movie came out.
            console.log(response.data.imdbRating);//   * IMDB Rating of the movie.
            // console.log(response.data.Ratings[1].Value);//   * Rotten Tomatoes Rating of the movie.
            console.log(response.data.Country);//   * Country where the movie was produced.
            console.log(response.data.Language);//   * Language of the movie.
            console.log(response.data.Plot);//   * Plot of the movie.
            console.log(response.data.Actors);//   * Actors in the movie.

            var movie_append = "Appending Movie from OMDb: " + response.data.Title + "\r\n";

            fs.appendFile('log.txt', movie_append, function (err) {
                if (err) throw err;
            });
        });
};

//BANDS IN TOWN 
function concert_this() {
    Axios.get("https://rest.bandsintown.com/artists/" + user_input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Name of the artist: " + response.data[0].artist.name);
            console.log("Name of the venue: " + response.data[0].venue.name);
            console.log("Location of the venue: " + response.data[0].venue.city);
            console.log("Coutry of the venue: " + response.data[0].venue.country);
            // console.log("Date of the event: " + moment(response.data[0].datetime).format("L"));

            var concert_append = "Appending Artist's name from BANDSINTOWN: " + response.data[0].artist.name + "\r\n";

            fs.appendFile('log.txt', concert_append, function (err) {
                if (err) throw err;
                // console.log(response);
            });
        });
};

//DO WHAT IT SAYS
function do_what_it_says() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
           return console.log(error);
        } else {
            console.log(data);
        };   
    });  
};


