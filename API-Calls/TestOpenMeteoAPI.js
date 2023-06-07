function geoCheck(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {mode: 'cors'})
        .then(function(response){

                let format =  response.json();

                let geoHash = {
                    Latitude: format.results[0].latitude,
                    Longitude: format.results[0].longitude
                }

                return geoHash;
            }
        )
        .catch(function(response){
            console.log(response)
            //console.log(response)
        })
}

//geoCheck('houston'); works if console log is in the function


async function geoCheck2(city){
   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    try {
        const result = await fetch(url);
        const json = await result.json();
        json;
    } catch (error) {
        console.log(error)
    }
}

async function weatherCheck2(json){
    let data = await json;
    console.log(data);
    try {
        let coordinates = {
            Latitude: data.results[0].Latitude,
            Longitude: data.results[0].Longitude
    }
} catch(error) {
        console.log(error, "this error")
    }
}

console.log(weatherCheck2(geoCheck2('houston')));