//Makes the Spotify key thing work.
require("dotenv").config();
var keys = require("./keys.js");
//Need user to have the following installed so things work as intended.
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//Takes in the first thing they type as the aciton they want to perform with LIRI.
var Request = process.argv[2];
//Takes in the second thing they type as the thing they want to search for. 
var Query = process.argv.splice(3, process.argv.length-1);
//Request for OMDB. 
var OMDBQuery = "http://www.omdbapi.com/?t=" + Query + "&y=&plot=short&apikey=trilogy";

console.log(Request);
console.log(Query);

function ConcertThis() {

};

function SpotifyThisSong() {

};

function MovieThis(Title) {
    axios.get(OMDBQuery).then(
        //If it worked, do the following. 
        function(response) {
            console.log(response.data.Title + "\n" + response.data.Year + "\n" + response.data.Ratings[1]);
        })
        //If it broke, do the following
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
};

function DoWhatItSays() {
};

if (Request === "concert-this") {
    ConcertThis();
}
else if (Request === "spotify-this") {
    SpotifyThisSong();
}
else if (Request === "movie-this") {
    MovieThis(Query);
}
else {
    DoWhatItSays();
}