require("dotenv").config();
require('fs');

var keys = require("./keys.js");
var axios = require("axios");

//AXIOS for OMDb -------------------------------------
axios
  .get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy")
  .then(function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
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


//SPOTIFY-------------------------------------
var spotify = new Spotify(keys.spotify);

spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

//BANDS IN TOWN ------------------------------

var bandsintown = require('bandsintown')(APP_ID);
 
bandsintown
  .getArtistEventList('')
  .then(function(events) {
    // return array of events
  });


