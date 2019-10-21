require("dotenv").config() // dotenv hides the keys
var keys = require("./keys.js"); //SPOTIFY info is in this file
var axios = require("axios"); // axios required
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var whatUserWantsReturned = process.argv[2];
var moment = require("moment");

// var whatUserWantsReturned is used in the 2nd argument (ie. movie-this, concert-this) and determines what API to call from
// if not a command, like moviethis or concert this, switch statement defaults to 'not a valid command'
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
                console.log(response.data.Ratings[0]); // IMDB Score
                console.log(response.data.Ratings[1]); // RT Score
                console.log("Country: " + response.data.Country);
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
        var theUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";

        // this command is for returning information from the bandsintown database
        // the concert information is here
        axios.get(theUrl).then( // If the request with axios is successful
            function (response) {
                var dateTime = moment(response.data[0].datetime).format("MM/DD/YYYY"); // This variable is only used so I can format it with moment js
                console.log("Event Date: " + dateTime); // this returned undefined when I tried Travis Scott but worked for Weezer
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
    case "spotify-this-song": // makes use of spotify api to return track info
        {
            // the search in spotify uses the command line argument argv[3]
            spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
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
    case "do-what-it-says":
        {
            // // fs is a core Node package for reading and writing files
            var fs = require("fs");
            // // This block of code will read from the "random.txt" file.
            fs.readFile("random.txt", "utf8", function (error, textFileData) {

                //     // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // make an array out of the txt file
                var output = textFileData.split(",");

                // spotify the song
                spotify.search({ type: 'track', query: output[1] }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    console.log(data.tracks.items[0].artists[0].name); // Log the artist
                    console.log(data.tracks.items[0].name); // log song name
                    console.log(data.tracks.items[0].preview_url); // log preview link (when theres not a preview available it just returns null)
                    console.log(data.tracks.items[0].album.name);// log album title
                });
            });
        }
        break;
    default:
        console.log("Not a valid command! Try movie-this, spotify-this-song or concert-this");
}