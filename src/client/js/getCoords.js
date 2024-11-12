const getCoords = async (cityName = '') => {   
    const geoResponse = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=sumedhsareen`); 

    // if previous response successful
    try {
        const geoResponseObj = await geoResponse.json();

        // coordinates received from geonames
        const cityData = geoResponseObj.geonames[0];
        const latitude = cityData.lat;
        const longitude = cityData.lng;
        const country = cityData.countryName;
        return({lat:latitude, lon:longitude, country:country})
    }
    catch(error) {
        console.log("Error", error);
    }
}

export {getCoords};