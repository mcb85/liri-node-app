require("dotenv").config();
var inquirer = require("inquirer");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");


//Prompt user to indicate an action
//function userPrompt() {

inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "actions"
        },
    ])
    .then(function (inquirerResponse) {
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
                    console.log(artist);
                    function getArtist() {
                        axios.get(url)

                            .then(function (response) {
                                var header = "Upcoming Concerts for " + artist + ":";
                                console.log(header);
                                fs.appendFile("log.txt", header, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Content Added!")
                                    }
                                });
                                for (i = 0; i < response.data.length; i++) {
                                    var artistData = response.data[i].venue.city + " at " + response.data[i].venue.name + " " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n";
                                    console.log(artistData);
                                    /*fs.appendFile("log.txt", artist, function (err){
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Content Added!")
                                        }
                                    });*/
                                    fs.appendFile("log.txt", artistData, function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Content Added!")
                                        }
                                    });
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
                            console.log("Artist Name: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n");

                        })
                    } else {
                        spotify.search({ type: 'track', query: query, limit: 10 }, function (err, data) {
                            console.log(query);
                            if (err) {
                                return console.log('Error occurred: ' + err);
                            }
                            for (i = 0; i < data.tracks.items.length; i++) {
                                var spotifyText = "Artist Name: " + data.tracks.items[i].artists[0].name + "\nSong Name: " + data.tracks.items[i].name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\nAlbum Name: " + data.tracks.items[i].album.name + "\n" + "\n";
                                console.log(spotifyText);
                                fs.appendFile("log.txt", spotifyText, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Content Added!")
                                    }
                                });
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
                                var text = "Title: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry of Production: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors;
                                console.log(text);
                                fs.appendFile("log.txt", text, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Content Added!")
                                    }
                                });
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
                });


        }
        if (inquirerResponse.actions == "do-what-it-says") {
            console.log("do what it says");
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(data);
                var dataArr = data.split(",");
                console.log(dataArr);
                spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
                    console.log("Artist Name: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n");
                });
            })
        }
    });


