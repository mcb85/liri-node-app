# liri-node-app

This app provides the user access to the Bands-in-Town, Spotify, and OMDB databases all in one interface, rather than three. User is able to search concerts, movies, and songs within the same app. This interface prompts the user by providing choices for what they would like to search (i.e. "concert-this, "spotify-this song", "movie this", and "do-what-it-says"). Based on the user's choice, they will be prompted to enter additional information. For example, if user entered "concert-this", they will be prompted to enter an artist/band name. The user will then receive information on the cities, venues, and dates of upcoming concerts for the artist/band they input. Any information retrieved by the user is then logged in a text file for their reference. The data is also logged to the console.



## Technologies Used
This app incorporates the axios npm package to make API calls to the Bands-in-Town and OMDB databases. In order to make calls to Spotify, the node-spotify-api npm package is utilized. The built-in fs package is utilized in order to read text files and log api response data to a text file. The inquirer npm package is utilized for prompting user and storing their responses. The moment package is utilized in order to format concert dates. 

### Initial Prompt
![Image of initial prompt](https://github.com/mcb85/liri-node-app/blob/master/initial-prompt.jpg)

### Concert This

![Image of concert-this](https://github.com/mcb85/liri-node-app/blob/master/concert-this.JPG)

### Spotify This

![Image of spotify-this](https://github.com/mcb85/liri-node-app/blob/master/spotify1.JPG)

### Movie This

![Image of movie-this](https://github.com/mcb85/liri-node-app/blob/master/movie-this.JPG)

### Do What it Says

![Image of do-what-it-says](https://github.com/mcb85/liri-node-app/blob/master/do-what-it-says.jpg)

### Data Logged to Text File

![Image of data to text file](https://github.com/mcb85/liri-node-app/blob/master/spotify-logtxt.JPG)

