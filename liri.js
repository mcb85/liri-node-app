require("dotenv").config();
var inquirer = require("inquirer");


var keys = require("./keys.js");
/*var spotify = new Spotify(keys.spotify);*/

var axios = require("axios");

var action = process.argv[2];
userInput = process.argv[3];






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
                console.log("Enter artist/band name");

            }
            if (inquirerResponse.actions == "spotify-this-song") {
                console.log("Enter song name")
            }
            if (inquirerResponse.actions == "movie-this") {
                inquirer
                .prompt([
                {
                   type:"input", 
                   message:"Enter movie name",
                   name: "movie name"
                }
                ]).then(function(inquirerResponse){
                    console.log(inquirerResponse);
                    console.log("movie-this" + inquirerResponse["movie name"]);
            })

            if (inquirerResponse == "do-what-it-says") {
                var fs = require("fs");
                fs.readFile("random.txt", "utf8", function(error,data) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log(data);
                    var dataArr =data.split(",");
                    console.log(dataArr);
                });
            }
        } else {
            console.log("Goodbye");
        }
        }

    })
