const {JSONCookie} = require("cookie-parser");


async function geoCheck(city) {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {mode: 'cors'})
  const cityDetails = await response.json();

  return cityDetails;
}

function createGeoHash(data) {
  let hash =
    { Latitude:data.results[0].latitude,
      Longitude:data.results[0].longitude
    }
  return hash;
}

async function weatherCheck(latitude,longitude){
    let date = new Date().toISOString().substring(0,10);
    let  url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${date}&end_date=${date}&timezone=GMT`
  console.log(`the latitude is ${latitude}`)
    console.log(`the url is ${url}`)
  
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${date}&end_date=${date}&timezone=GMT` , {mode: 'cors'})
        .then(async function(response) {
          console.log('first function then')
          let formattedData = await response.json();
          // console.log('successful to server')
          // console.log(`${format} function works`) ;
          return formattedData
        })
        .then(async function(format) {
          console.log('second function then')
            console.log(format)
            return JSON.stringify(format)
           // let weatherHash = {
           //      // today: format.daily.time[0],
           //      temperature_min: await format.daily.temperature_2m_min[0],
           //      temperature_max: await format.daily.temperature_2m_max[0],
           //      precipitation_sum: await format.daily.rain_sum[0],
           //      wind_speed: await format.daily.windspeed_10m_max[0]
           //  }
           //
           //  return weatherHash;
          })
        .catch(function(response) {
            console.log(response)
        })
}


async function getCoordinates() {
    let points = [];
    try {
        points = await geoCheck5('houston');
    } catch(err) {
        console.log("error");
        console.log(err);
    }

    return points;
}

// // geoCheck('houston').then((result) => {
// //   console.log(`The latitude of Houston is ${result.results[0].latitude}`)
// //
// // }).catch(console.error.bind(console))
//
// let demoHash = {
//   results: [
//     {
//       id: 4699066,
//       name: 'Houston',
//       latitude: 29.76328,
//       longitude: -95.36327,
//       elevation: 12,
//       feature_code: 'PPLA2',
//       country_code: 'US',
//       admin1_id: 4736286,
//       admin2_id: 4696376,
//       timezone: 'America/Chicago',
//       population: 2296224,
//       postcodes: [Array],
//       country_id: 6252001,
//       country: 'United States',
//       admin1: 'Texas',
//       admin2: 'Harris'
//     }
//   ],
//   generationtime_ms: 0.73599815
// }
//
// console.log(createGeoHash(demoHash))
//
// console.log(weatherCheck(createGeoHash(demoHash).Latitude,createGeoHash(demoHash).Longitude))

// const dummyObject = weatherCheck(29.76328,-95.36327)
//   .then((result) => {
//     console.log(result)
//     return result
//   }).catch(console.error.bind(console));


// weatherCheck(29.76328,-95.36327)


// weatherCheck("29.76328",'-95.36327')


//https://api.open-meteo.com/v1/forecast?latitude=29.76328&longitude=-95.36327&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=2023-06-08&end_date=2023-06-08&timezone=GMT
module.exports = weatherCheck