const {sampleAirQualityJson, sampleWeatherDataJson} = require('./sampleOpenMeteoWeather')
const data = sampleWeatherDataJson.sampleWeatherDataJson

async function weatherCheckOpenMeteo(latitude,longitude){
  let date = new Date().toISOString().substring(0,10);

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York` , {mode: 'cors'})

  // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${date}&end_date=${date}&timezone=GMT` , {mode: 'cors'})
  let formattedData = await response.json();

  return await formattedData;

}

function createOpenMeteoFiveDayObject(weatherJson, airQualityJson) {
  let openMeteoForecast = {
    'daily':{},
    'current':{},
    'hourly':[]
  }

  for (let i = 0; i < weatherJson.hourly.time.length; i+=1 ) {


    openMeteoForecast.hourly.push({
      timeHour: weatherJson.hourly.time[i],
      temperature: weatherJson.hourly.temperature_2m[i],
      humidity: weatherJson.hourly.relativehumidity_2m[i],
      feelsLikeTemp: weatherJson.hourly.apparent_temperature[i],
      precipitationProbability: weatherJson.hourly.precipitation_probability[i],
      precipitationAmount: weatherJson.hourly.precipitation[i],
      weatherCode: weatherJson.hourly.weathercode[i],
      pm10: airQualityJson.hourly.us_aqi_pm10[i],
      pm2_5: airQualityJson.hourly.us_aqi_pm2_5[i],
      carbonMonoxide: airQualityJson.hourly.us_aqi_co[i],
      nitrogenDioxide: airQualityJson.hourly.us_aqi_no2[i],
      sulphurDioxide: airQualityJson.hourly.us_aqi_so2[i],
      ozone: airQualityJson.hourly.us_aqi_o3[i],
      dust: airQualityJson.hourly.dust[i],
      alderPollen: airQualityJson.hourly.alder_pollen[i],
      birchPollen: airQualityJson.hourly.birch_pollen[i],
      grassPollen: airQualityJson.hourly.grass_pollen[i],
      mugwortPollen: airQualityJson.hourly.mugwort_pollen[i],
      olive_pollen: airQualityJson.hourly.olive_pollen[i],
      ragweed_pollen: airQualityJson.hourly.ragweed_pollen[i],
      usAQI: airQualityJson.hourly.us_aqi[i]
      }
    )

  }

  for (let i = 0; i < 7; i++) {
    let day = weatherJson.daily.time[i]

    let weatherCode = weatherJson.daily.weathercode[i]
    let maxTemp = weatherJson.daily.temperature_2m_max[i]
    let minTemp = weatherJson.daily.temperature_2m_min[i]
    let feelsLikeMaxTemp = weatherJson.daily.apparent_temperature_max[i]
    let feelsLikeMinTemp = weatherJson.daily.apparent_temperature_min[i]
    let sunriseTime = weatherJson.daily.sunrise[i]
    let sunsetTime = weatherJson.daily.sunset[i]
    let precipitationSum = weatherJson.daily.precipitation_sum[i]
    let rainSum = weatherJson.daily.rain_sum[i]
    let numberOfHoursOfPrecipitation = weatherJson.daily.precipitation_hours[i]

    openMeteoForecast.daily[day] = {
      weatherCode,
      maxTemp,
      minTemp,
      feelsLikeMaxTemp,
      feelsLikeMinTemp,
      sunriseTime,
      sunsetTime,
      precipitationSum,
      rainSum,
      numberOfHoursOfPrecipitation
    }

  }

  openMeteoForecast.current = {
    currentTemp: weatherJson.current_weather.temperature,
    weatherCode: weatherJson.current_weather.weathercode,
    windSpeed: weatherJson.current_weather.windspeed
  }

  return openMeteoForecast
}

// weatherCheck("29.76328",'-95.36327')

module.exports = {
  weatherCheckOpenMeteo: weatherCheckOpenMeteo,
  createOpenMeteoFiveDayObject: createOpenMeteoFiveDayObject
}