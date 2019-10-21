require("dotenv").config()
var keys = require("./keys.js");
var axios = require("axios");
// require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);
//console.log(spotify);

// var OMDB url
var movieName = process.argv[2];
var omdbUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

// this command is for returning information from the OMDB database
// the movie information is here
axios.get(omdbUrl).then( // If the request with axios is successful
    function(response) {
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