// Require Express to run server and routes
const express = require('express');

// enable environment variables below
const dotenv = require('dotenv');
dotenv.config();

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
const port = 8083; 
const server = app.listen(port, listening); 

// listening function
function listening() {
    console.log(`Server running on localhost ${port}`);

}

// global variables
const weatherbitBaseUrl16 = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbitBaseUrlCurrent = 'https://api.weatherbit.io/v2.0/current?';

const weatherbitAPIKey = process.env.WEATHERBIT_API_KEY;
const pixabayAPIKey = process.env.PIXABAY_API_KEY;
const pixabayBaseUrl = `https://pixabay.com/api/?key=${pixabayAPIKey}`;
let weatherData = {};
let picData = {};

// helper functions
const getFromWeatherbit = async (url = '') => {
    const getReq = await fetch(url);
  
    try {
        const getResponse = await getReq.json();
        console.log(getResponse);
        weatherData = await getResponse;
        
        
    }
    catch(error) {
        console.log("Error", error);
        
    }
}

const getFromPixabay = async (url = '') => {

    console.log(url); // only for testing
    
    const getReq = await fetch(url);
  
    try {
        const getResponse = await getReq.json();
        picData.picURL =  getResponse.hits[0].webformatURL;
        picData.alt = getResponse.hits[0].tags; // for alt text
        
        
    }
    catch(error) {
        console.log("Error", error);
        
    }
}

// handle post request from the frontend
app.post('/latlong', function(request, response) {
    console.log("User sent lat and longitude ", request.body);

    // variables extracted from the post request
    const lat = request.body.lat;
    const lon = request.body.lon;
    const timeDifference = request.body.timeDifference;
    const city = request.body.city;

    timeDifference>7? // API call based on the time difference between the trip and the current date
        getFromWeatherbit(weatherbitBaseUrl16 + '&lat=' + lat + '&lon=' + lon + '&key=' + weatherbitAPIKey) // if trip in more than 7 days
    : 
        getFromWeatherbit(weatherbitBaseUrlCurrent + '&lat=' + lat + '&lon=' + lon + '&key=' + weatherbitAPIKey); // if trip in less than 7 days
    
    // get relevant picture for the selected city
    getFromPixabay(pixabayBaseUrl + '&q=' + city + '&image_type=photo')
     
    // send weather and picture data information to the frontend
    response.send({weatherData, picData});
    
})

module.exports = {getFromWeatherbit, getFromPixabay}; // commonjs way of exporting