require("dotenv").config();
var inquirer = require("inquirer");
var moment = require('moment');



var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");


//Prompt user to indicate an action
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "actions"
        },
        {
            type: "confirm",
            message: "Are you sure?",
            name: "confirm",
            default: true
        }
    ])
    .then(function (inquirerResponse) {
        if (inquirerResponse.confirm) {
            if (inquirerResponse.actions == "concert-this") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter artist/band name",
                            name: "artist"
                        }
                    ]).then(function (inquirerResponse) {
                        var artist = inquirerResponse.artist;
                        var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                        console.log(url);
                        getArtist();
                        function getArtist() {
                            console.log(artist);
                            axios.get(url)
                                .then(function (response) {
                                    for (i = 0; i < response.data.length; i++) {
                                        console.log(response.data[i].venue.city + " at " + response.data[i].venue.name + " " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                                    }

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
                        }
                    })
            }
            if (inquirerResponse.actions == "spotify-this-song") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter song name",
                            name: "song"
                        }
                    ]).then(function (inquirerResponse) {
                        query = inquirerResponse.song;
                        if (!query) {
                            spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
                                //for (i = 0; i < data.tracks.items.length; i++) {
                                console.log("Artist Name: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n");
                                //}   
                            })
                        } else {
                            spotify.search({ type: 'track', query: query, limit: 10 }, function (err, data) {
                                console.log(query);
                                if (err) {
                                    return console.log('Error occurred: ' + err);
                                }
                                for (i = 0; i < data.tracks.items.length; i++) {
                                    console.log("Artist Name: " + data.tracks.items[i].artists[0].name + "\nSong Name: " + data.tracks.items[i].name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\nAlbum Name: " + data.tracks.items[i].album.name + "\n");
                                }

                            })
                        }
                    })
            }
            if (inquirerResponse.actions == "movie-this") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter movie name",
                            name: "movie"
                        }
                    ]).then(function (inquirerResponse) {
                        var movieName = inquirerResponse.movie;
                        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                        console.log(queryUrl);
                        if (!movieName) {
                            queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
                            getMovie();
                        } else {
                            getMovie();
                        }

                        function getMovie() {
                            axios.get(queryUrl)
                                .then(function (response) {
                                    console.log("Title: " + response.data.Title);
                                    console.log("Release Year: " + response.data.Year);
                                    console.log("IMDB Rating: " + response.data.imdbRating);
                                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                                    console.log("Country of Production: " + response.data.Country);
                                    console.log("Language: " + response.data.Language);
                                    console.log("Plot: " + response.data.Plot);
                                    console.log("Actors: " + response.data.Actors);
                                })//need function for if user does not enter movie name
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

                        }

                    })

                if (inquirerResponse === "do-what-it-says") {
                    readText();
                    console.log(data);
                    function readText() {
                        fs.readFile("random.txt", "utf8", function (error, data) {
                            if (error) {
                                return console.log(error);
                            }
                            var dataArr = data.split(",");
                            console.log(dataArr);
                        });
                    };
                }
            }
        } else {
            console.log("Goodbye");
        }

    })


