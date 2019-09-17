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
//API Request URL for OMDB. 
var OMDBQuery = "http://www.omdbapi.com/?t=" + Query + "&y=&plot=short&apikey=trilogy";
//API Request URL for BandsInTown.
var BandTownQuery = "https://rest.bandsintown.com/artists/" + Query + "/events?app_id=codingbootcamp"

//Debugging
console.log(Request);
console.log(Query);

//Function that handles a concer-this command.
function ConcertThis(Query) {
    axios.get(BandTownQuery).then(
        function(response) {
            if (response.data.length === 0) {
                console.log("This band has nothing scheduled.");
            } else if (response.data === '\n{warn=Not found}\n') {
                console.log("This is either an invalid artist, or an unpopular band");
            } else {
                for (var i = 0; i < response.data.length; i++) {

                    var Venue;
                    var ConcertDateTime = moment(response.data[i].datetime).format("M/DD/YY, h:mma");

                    if (response.data[i].venue.region === "") {
                        Venue = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n";
                    } else {
                        Venue = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\n";
                    }

                    console.log("\nUpcoming Concert #" + (i + 1) + "\nVenue: " + response.data[i].venue.name + "\n" + Venue + "Concert Date/Time: " + ConcertDateTime); 
                }
            }
        }
    )
};

function SpotifyThisSong(Query) {
    spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};

//Function that grabs movie data from OMDB when initiated with "movie-this" for process.argv[2]. 
function MovieThis(Query) {
    axios.get(OMDBQuery).then(
        //If it worked, do the following. 
        function(response) {
            console.log(response.data.Title + "\n" + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\n" + response.data.Plot + "\n" + response.data.Actors);
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
    ConcertThis(Query);
}
else if (Request === "spotify-this") {
    SpotifyThisSong(Query);
}
else if (Request === "movie-this") {
    MovieThis(Query);
}
else {
    DoWhatItSays();
}