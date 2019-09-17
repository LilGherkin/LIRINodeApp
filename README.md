# LIRINodeApp

This is an app that takes in one of 3 commands along with a prompt and returns data from OMDB, Spotify, and BandInTown APIs. 

It also utilizes several Node.JS packages. [The Node Spotify API](https://www.npmjs.com/package/node-spotify-api), [FS](https://www.npmjs.com/search?q=fs), [AXIOS](https://www.npmjs.com/package/axios), and [Moment](https://www.npmjs.com/package/moment). 

You initialize the app through the command terminal by calling "node liri.js 'command' 'query'" into the terminal after installing the prereqresuite npm packages. You will need to have your own Spotify API key however if you want to utilize the spotify-this command. 

The three commands that can be utilized are: 
  * movie-this
  * spotify-this
  * concert-this
 
 ## movie-this
 Movie this takes in a movie title and then returns:
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

## spotify-this 
Spotify-this takes in a song title and then returns:
  * Title of the song.
  * Artist of the song.
  * Spotify's preview link
  * Name of the album where the song first appeared. 
  
## concert-this
Concert-this takes in a band's name, and returns:
  * Upcoming Concerts
    * Venue it's happening at.
    * Location of the venue.
    * Date/Time of the concert.

## Other Things Of Note
There is a catch for improper commands that returns a readout of whatever is currently in the random.txt file. It is currenlty set to run a search on the Spotify-This command for "I Want It That Way". If you type in a valid command but no actual query it defaults to Mr. Nobody for movie-this. and Ace of Bass' The Sign for spotify-this. If no result is returnd on concert it indicates that there is no upcoming perfromance, or the band you're looking for isn't within their system. 

## Screenshot
Below is a screenshot outlining the 3 basic calls, and the default case of nothing being entered in. 
![Image of LiriBot in action](https://github.com/LilGherkin/LIRINodeApp/blob/master/images/Capture.PNG?raw=true)
