const getWeatherForecast = async function (lat, lon, timeDiff, city) {

    // post request options
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin', // since sending to the local server first
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({lat:lat, lon:lon, timeDifference:timeDiff, city: city}) // matching the content-type header (converting to json before sending)
    }

    // send data to server for it to forward to the weatherbitAPI
    const sendGeoData = await fetch('http://localhost:8083/latlong', requestOptions)

    try {
        const response = await sendGeoData.json();
        console.log(response);
        return response; // return weather detail information
        
    }
    catch(error) {
        console.log("error", error);    
    }
}

export {getWeatherForecast};