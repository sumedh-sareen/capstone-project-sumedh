// main Application script
// events are handled here
// the specific functions that perform the task are handled in separate js function files called by the Client library

// global variables
let coords = {}; // extract coordinates from geoNames


//get date provided by the user
const dateElement = document.getElementById('date-input');

dateElement.addEventListener("focusout", function() { // get date when input done 
    console.log(dateElement.value);
    
})

//get city 
const cityElement = document.getElementById('city');
cityElement.addEventListener("focusout", function() { // get date when input done 
    console.log(cityElement.value);
    
})


// handle click - generate trip details
const generateButton = document.getElementById('generate-trip');

generateButton.addEventListener('click', async function () {
    const dataFromGeoNames =  await Client.getCoords(cityElement.value); // get coordinates of city from geoNames

    
    coords.lat = dataFromGeoNames.lat;
    coords.lon = dataFromGeoNames.lon;
    const city = cityElement.value;
    console.log("We have the lat and long in App.js as ", coords.lat, coords.lon);

    // getting the date difference from the current date
    let timeDiff = new Date(dateElement.value) - new Date();
    timeDiff = Math.round(timeDiff/(1000 * 60 * 60 * 24)); // approx days in the future 

    // get weather details from weatherbit
   const weatherDetails = await Client.getWeatherForecast(coords.lat, coords.lon, timeDiff, city);
   console.log("All the information from the server (weatherbit _ pixabay)" + weatherDetails);
   
   // display trip details
    const contentSpace = document.getElementById('content');
    contentSpace.innerHTML = `Your trip to <em>${cityElement.value}</em> is in ${timeDiff} days!`
    const picSpace = document.getElementById('pic');

    //display weather info based on how far into the future the trip is
    const weatherSpace =  document.getElementById('weather');
    if(timeDiff<7) {
        const iconCode = weatherDetails.weatherData.data[0].weather.icon;  // get weather icon
        const iconURL = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
        weatherSpace.innerHTML = `Temperature: ${weatherDetails.weatherData.data[0].temp}
                                    ${weatherDetails.weatherData.data[0].weather.description}
                                    <img src=${iconURL} width='40px'/>`
       
    } else {
        const iconCode = weatherDetails.weatherData.data[15].weather.icon; // get weather icon
        const iconURL = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
        weatherSpace.innerHTML = `Min Temperature: ${weatherDetails.weatherData.data[15].min_temp}
                                 Max Temperature: ${weatherDetails.weatherData.data[15].max_temp}
                                ${weatherDetails.weatherData.data[15].weather.description}
                                <img src=${iconURL} width='40px'/>`;
       
    }

    // display image of the location
    picSpace.innerHTML = `<img src = ${weatherDetails.picData.picURL} alt=${weatherDetails.picData.alt} width="50%"/>`;
      
})





