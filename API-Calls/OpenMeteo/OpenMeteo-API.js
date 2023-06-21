const sampleWeatherDataJson = require('./sampleOpenMeteoWeather')
const data = sampleWeatherDataJson.sampleWeatherDataJson

async function weatherCheckOpenMeteo(latitude,longitude){
  let date = new Date().toISOString().substring(0,10);

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York` , {mode: 'cors'})

  // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${date}&end_date=${date}&timezone=GMT` , {mode: 'cors'})
  let formattedData = await response.json();

  return await formattedData;

}

function createOpenMeteoFiveDayObject(json) {
  let openMeteoForecast = {}

  for (let i = 0; i < json.hourly.time.length; i+=1 ) {
    let timeHour = json.hourly.time[i]
    // openMeteoForecast = {timeHour}

    let temperature = json.hourly.temperature_2m[i]
    let humidity = json.hourly.relativehumidity_2m[i]
    let feelsLikeTemp = json.hourly.apparent_temperature[i]
    let precipitationProbability = json.hourly.precipitation_probability[i]
    let precipitationAmount = json.hourly.precipitation[i]
    let weatherCode = json.hourly.weathercode[i]

    openMeteoForecast[timeHour] = {
      temperature,
      humidity,
      feelsLikeTemp,
      precipitationProbability,
      precipitationAmount,
      weatherCode
    }
  }

  return openMeteoForecast
}

// console.log(sampleWeatherDataJson.sampleWeatherDataJson.hourly.time.length)
// console.log(Object.keys(openMeteoFiveDayObject(sampleWeatherDataJson)).length)

// weatherCheck("29.76328",'-95.36327')

module.exports = {
  weatherCheckOpenMeteo: weatherCheckOpenMeteo,
  createOpenMeteoFiveDayObject: createOpenMeteoFiveDayObject
}