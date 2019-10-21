require("dotenv").config() // dotenv hides the keys
var keys = require("./keys.js"); //SPOTIFY info is in this file
var axios = require("axios"); // axios required
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
console.log(spotify);

// var whatUserWantsReturned is used in the 2nd argument (ie. movie-this, concert-this)
// and determines what API to call from
// if not a command, like moviethis or concert this, switch statement defaults to 'not a valid command'
var whatUserWantsReturned = process.argv[2];

switch (whatUserWantsReturned) {
    case "movie-this":
        // OMDB url
        // process.argv[3] is the name of the movie that was entered in the command line;
        var theUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&apikey=trilogy";

        // this command is for returning information from the OMDB database
        // the movie information is here
        axios.get(theUrl).then( // If the request with axios is successful
            function (response) {
                // Title,Year, IMDB Rating, Rotten Tomatoes Rating, Country, Language, Plot,  Actors 
                console.log("Movie title: " + response.data.Title);
                console.log("Release year: " + response.data.Year);
                console.log(response.data.Ratings[0]);
                console.log(response.data.Ratings[1]);
                console.log(response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function (error) {
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
        break;
    // In this case, return back concert data from BandsInTown!
    case "concert-this":
        var theUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] +"/events?app_id=codingbootcamp";

        // this command is for returning information from the bandsintown database
        // the concert information is here
        axios.get(theUrl).then( // If the request with axios is successful
            function (response) {
                console.log("Event Date" + response.data[0].datetime)
                console.log("Venue: " + response.data[0].venue.name);
                 console.log("Location: " + response.data[0].venue.city)
            })
            .catch(function (error) {
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
        break;
        case "spotify-this-song":
        {
            // the search in spotify uses the command line argument argv[3]
            spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              console.log(data.tracks.items[0].artists[0].name); // Log the artist
              console.log(data.tracks.items[0].name); // log song name
              console.log(data.tracks.items[0].preview_url); // log preview link (when theres not a preview available it just returns null)
              console.log(data.tracks.items[0].album.name);// log album title
              });
        }
        break;
    default:
    console.log("Not a valid command! Try movie-this, spotify-this-song or concert-this");
}