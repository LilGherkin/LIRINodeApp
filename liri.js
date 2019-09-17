//Makes the Spotify key thing work.
require("dotenv").config();
var keys = require("./keys.js");
//Need user to have the following installed so things work as intended.
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

//Takes in the first thing they type as the aciton they want to perform with LIRI.
var Request = process.argv[2];
//Takes in the second thing they type as the thing they want to search for. 
var Query = process.argv.splice(3, process.argv.length-1);
//API Request URL for OMDB. 
var OMDBQuery = "http://www.omdbapi.com/?t=" + Query + "&y=&plot=short&apikey=trilogy";
//API Request URL for BandsInTown.
var BandTownQuery = "https://rest.bandsintown.com/artists/" + Query + "/events?app_id=codingbootcamp"



//Function that handles a concert-this command.
    function ConcertThis(Query) {
    axios.get(BandTownQuery).then(
        function(response) {
            //Condition to check if the band exists, but nothing is scheduled.
            if (response.data.length === 0) {
                console.log("This band has nothing scheduled.");
            //Condition to check if it's an invalid band.
            } else if (response.data === "\n{warn=Not found}\n") {
                console.log("This is either an invalid artist, or an unpopular band");
            //Are they a real band and have stuff upcoming?
            } else {
                //Runs through the object returned to us and will print out all the information.
                for (var i = 0; i < response.data.length; i++) {
                    //Initialize the venue variable
                    var Venue;
                    //Set Concert Date & Time so we can apply it later with proper time formatting. 
                    var ConcertDateTime = moment(response.data[i].datetime).format("M/DD/YY, h:mma");
                    //Does the venue not have a region? If so, perform the following. 
                    if (response.data[i].venue.region === "") {
                        Venue = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n";
                    //Region associated with it, then print out the region as oppossed to the country. 
                    } else {
                        Venue = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\n";
                    }
                    console.log("\nUpcoming Concert #" + (i + 1) + "\nVenue: " + response.data[i].venue.name + "\n" + Venue + "Concert Date/Time: " + ConcertDateTime); 
                }
            }
        }
    )
};

function SpotifyThisSong() {
    //Default to Ace Of Bass if they don't search for anything. 
    if (Query == ""){
        //This grabs the 4th item in the search for The Sign because that's the one by Ace of Bass. Could be improved to a for loop to correct for when it's no longer the 5th item in the list. 
        spotify.search({ type: 'track', query: 'the sign', limit: 5 }, function(err, data) {
           //Part of the default search. I figured I'd leave it in here so it can tell the user that Spotify is down even though it links to only one song that should be there. 
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log("Artist: " + data.tracks.items[4].album.artists[0].name + "\nSong Title: " + data.tracks.items[4].name + "\nPreview Link: " + data.tracks.items[4].preview_url + "\nAlbum: " + data.tracks.items[4].album.name); 
            }
        });
    } else {
        spotify.search({ type: 'track', query: Query, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name + "\nSong Title: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name); 
            }
        });
    }
}

//Function that grabs movie data from OMDB when initiated with "movie-this" for process.argv[2]. 
function MovieThis(Query) {
    //I dont' know the technicality of it all but it needs to be == to check for no entry instead of ===. 
    if (Query == ""){
        //If it was blank, return them the results of Mr. Nobody. 
        axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
            //If it worked, do the following. 
            function(response) {
                console.log("You didn't put anything in. Here's all we have about Mr. Nobody instead.")
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
    } else {
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
            }
};
//If you don't type a a valid command, this reads whatever is on random.txt and performs it. 
function DoWhatItSays() {
    fs.readFile("random.txt", "utf8", (err, data)=>{
        if (err) {
            console.log(err.message);
        } else {
            console.log("You didn't input a valid command, so we're giving you song information based on our random.txt file. It's currently set for the Back Street Boys 'I want it that way'.");
            var SplitRandom = data.split(",")
                if (SplitRandom[0] === "concert-this") {
                    Query = SplitRandom[1];
                    ConcertThis();
                }
                else if (SplitRandom[0] === "spotify-this") {
                    Query = SplitRandom[1];
                    SpotifyThisSong();
                }
                else if (SplitRandom[0] === "movie-this") {
                    Query = SplitRandom[1];
                    MovieThis();
                } else {
                    console.log("Forget what I said up there, whatever you entered in broke it completely. I don't know what to tell you.")
                }
        }
    });
}

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
