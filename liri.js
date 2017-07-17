// write the code you need to grab the data from keys.js here:
//global variable to link to 'keys.js' via 'require'
var keys = require("./keys.js");

var fs = require("fs");

var Twitter = require("twitter");

var Spotify = require('node-spotify-api');

var request = require('request');



// Creating a conditional to sort through chosen arguments
switch(process.argv[2]) {
  // Initial parameter: Twitter (test)
  case 'my-tweets':
    // define variables initially to use below (not sure if correct)
    var client = new Twitter(keys.twitterKeys);
    var twitterScreenName = "@notHomerJSimpso";
    var twitterCount = "20";
    var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name+"
    + twitterScreenName + "&count=" + twitterCount;

    var params = {screen_name: 'Guy Incognito'};
    // Make API call using specific syntax (?)
    client.get('statuses/user_timeline',
    function(error, tweets, response) {
      if (error) {
         console.log('error');
        } else {
         console.log(tweets);
         console.log(response);
        }
    }
  );
    break;
  // Spotify parameter
  case 'spotify-this-song':
  // declare variable 'spotify' to use 'search' method
  var spotify = new Spotify({
    id: keys.spotifyKeys.consumer_key,
    secret: keys.spotifyKeys.consumer_secret
  });



  var song = "";

  function trackName() {
    for (var i = 3; i < process.argv.length; i++) {
       song += process.argv[i] + "&20";
    }
    return song;
  };

  trackName();

  var queryURL = "https://api.spotify.com/v1/search" + "?type=track" + "q=" + song;

  // use search method on spotify object using correct syntax
  spotify
    .search({ type: 'track', query: 'All Fruit Is Ripe', function(err, data) {
      if (err) {
        // This is where Ace of Base could go
        return console.log('Error Occurred: ' + err)
      }

      console.log(data);
    }
  });
  //  .then(function(response) {
  //    console.log(response);
  //  })
  //  .catch(function(err) {
  //    console.log(error);
  //  });
    break;
  // OMDB parameter
  case 'movie-this':
  if (process.argv[4] === undefined) {
    var movieName = process.argv[3];
  } else if (process.argv[4] !== undefined && process.argv[5] === undefined) {
    var movieName = process.argv[3] + "%20" + process.argv[4];
  } else {
    var movieName = "mr" + "%20" + "nobody";
  }
  // For movies with titles of more than two words,  a function might work well
  var APIKey = '409cece';

  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  console.log(url);

  request(url, function(error, response, body) {
    var movieData = body;
    if (error) {
      console.log('error:', error);
    } else {
    console.log('Title: ' + JSON.parse(movieData).Title);
    console.log('Year: ' + JSON.parse(movieData).Year);
    console.log('IMDB Rating: ' + JSON.parse(movieData).Ratings[0].Value);
    console.log('Rotten Tomatoes: ' + JSON.parse(movieData).Ratings[1].Value);
    console.log('Country: ' + JSON.parse(movieData).Country);
    console.log('Language: ' + JSON.parse(movieData).Language);
    console.log('Plot: ' + JSON.parse(movieData).Plot);
    console.log('Actors: ' + JSON.parse(movieData).Actors);
    }

   })

   break;
  // Come back to the below case once Twitter, Spotify cases are solved
  case 'do-what-it-says':

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    } else {
    console.log(data);
    var textData = data;
    }

  });

  break;

  // define default procedure
  default:

    var output = 'Not sure what you meant. Try changing the argument.'

}

// console.log(output);
