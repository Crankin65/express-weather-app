

// export default async function weatherCheck(city) {
//   fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}`, {mode: 'cors'})
//     .then(async function(response){
//
//      let format = await response.json();
//
//     // let weatherHash = {
//     //   Actual: format.current.temp_f,
//     //   FeelsLike: format.current.feelslike_f,
//     //   Weather: format.current.condition.text
//     // }
//     console.log(format);
//       // return weatherHash;
//     })
//     .catch(function(response){
//       console.log(response)
//       //console.log(response)
//     })
// };


export default async function weatherCheck(city) {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}`, {mode: 'cors'})
    .then(await function(response){
      response.json();
    })
    .then(await function(data) {
      console.log(data);
    })
    .catch(function(response){
      console.log(response)
    })
};


weatherCheck('houston');