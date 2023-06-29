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

  let openMeteoForecastObject = {
    'weeklyForecast': createWeeklyOpenMeteoObject(weatherJson),
    'currentForecast': createCurrentOpenMeteoObject(weatherJson),
    'hourlyForecast': createHourlyOpenMeteoObject(weatherJson,airQualityJson)
  }
  return openMeteoForecastObject
}

function createHourlyOpenMeteoObject(weatherJson, airQualityJson) {
  let hourlyWeather = []
  let hourlyAQI = []


  for (let i = 0; i < weatherJson.hourly.time.length; i+=1 ) {
    let weatherCode = weatherJson.hourly.weathercode[i];

    hourlyWeather.push({
      timeHour: weatherJson.hourly.time[i],
      temperature: weatherJson.hourly.temperature_2m[i],
      humidity: weatherJson.hourly.relativehumidity_2m[i],
      feelsLike: weatherJson.hourly.apparent_temperature[i],
      precipitationProbability: weatherJson.hourly.precipitation_probability[i],
      precipitationAmount: weatherJson.hourly.precipitation[i],
      weather: formatWeatherCode(weatherCode)})

    hourlyAQI.push({
      timeHour: weatherJson.hourly.time[i],
      usAqiPm10: airQualityJson.hourly.us_aqi_pm10[i],
      usAqiPm2_5: airQualityJson.hourly.us_aqi_pm2_5[i],
      usAqiCo: airQualityJson.hourly.us_aqi_co[i],
      usAqiNo2: airQualityJson.hourly.us_aqi_no2[i],
      usAqiSo2: airQualityJson.hourly.us_aqi_so2[i],
      usAqiO3: airQualityJson.hourly.us_aqi_o3[i],
      usAqiDust: airQualityJson.hourly.dust[i],
      // alderPollen: airQualityJson.hourly.alder_pollen[i],
      // birchPollen: airQualityJson.hourly.birch_pollen[i],
      // grassPollen: airQualityJson.hourly.grass_pollen[i],
      // mugwortPollen: airQualityJson.hourly.mugwort_pollen[i],
      // olive_pollen: airQualityJson.hourly.olive_pollen[i],
      // ragweed_pollen: airQualityJson.hourly.ragweed_pollen[i],
      usAqi: airQualityJson.hourly.us_aqi[i]
    })
  }

  let hourlyForecast = {}
  hourlyForecast = {
    hourlyWeather: hourlyWeather,
    hourlyAQI: hourlyAQI
  }

  return hourlyForecast
}
function createWeeklyOpenMeteoObject(weatherJson){
  let weeklyForecast = []
  for (let i = 0; i < 7; i++) {

    weeklyForecast.push ({
      weatherCode: formatWeatherCode(weatherJson.daily.weathercode[i]),
      maxTemp: weatherJson.daily.temperature_2m_max[i],
      minTemp: weatherJson.daily.temperature_2m_max[i],
      feelsLikeMaxTemp: weatherJson.daily.apparent_temperature_max[i],
      feelsLikeMinTemp: weatherJson.daily.apparent_temperature_min[i],
      sunriseTime: weatherJson.daily.sunrise[i],
      sunsetTime: weatherJson.daily.sunset[i],
      precipitationSum: weatherJson.daily.precipitation_sum[i],
      rainSum: weatherJson.daily.rain_sum[i],
      numberOfHoursOfPrecipitation: weatherJson.daily.precipitation_hours[i]
    })
  }

  return weeklyForecast
}
function createCurrentOpenMeteoObject(weatherJson){
  let weatherCode = weatherJson.current_weather.weathercode

  let currentForecast = {
    currentTemp: weatherJson.current_weather.temperature,
    weather: formatWeatherCode(weatherCode),
    windSpeed: weatherJson.current_weather.windspeed,
    latitude: weatherJson.latitude,
    longitude: weatherJson.longitude
  }

  return currentForecast
}

function createFormattedDate(date) {
  let dateArray = date.split('');

  let dateObject = {
    year: dateArray.slice(0,4).join(''),
    month: dateArray.slice(6,8).join(''),
    day: dateArray.slice(10,12).join(''),
    hour: dateArray.slice(14,16).join('')
  }
  return dateObject
}
// weatherCheck("29.76328",'-95.36327')

function formatWeatherCode(weatherCode){
  let weather;

  switch(weatherCode) {
    case 0:
      weather = "Clear Sky";
      break;
    case 1:
      weather = "Mainly Clear"
      break;
    case 2:
      weather = "Partly Cloudy"
      break;
    case 3:
      weather = "Overcast"
      break;
    case 45:
    case 48:
      weather = "Fog"
      break;
    case 51:
      weather = "Light Drizzle"
      break;
    case 53:
      weather = "Moderate Drizzle"
      break;
    case 55:
      weather = "Dense Drizzle"
      break;
    case 56:
      weather = "Freezing Drizzle"
      break;
    case 57:
      weather = "Dense Freezing Drizzle"
      break;
    case 61:
      weather = "Slight Rain"
      break;
    case 63:
      weather = "Moderate Rain"
      break;
    case 65:
      weather = "Heavy Rain"
      break;
    case 66:
      weather = "Light Freezing Rain"
      break;

    case 67:
      weather = "Heavy Freezing Rain"
      break;

    case 71:
      weather = "Slight Snow Fall"
      break;

    case 73:
      weather = "Moderate Snow Fall"
      break;

    case 75:
      weather = "Heavy Snow Fall"
      break;

    case 77:
      weather = "Snow Grains"
      break;

    case 80:
      weather = "Slight Rain Showers"
      break;

    case 81:
      weather = "Moderate Rain"
      break;

    case 82:
      weather = "Violent Rain"
      break;

    case 85:
      weather = "Slight Snow Showers"
      break;

    case 86:
      weather = "Heavy Snow Showers"
      break;

    case 95:
      weather = "Thunderstorm"
      break;

    case 96:
      weather = "Thunderstorm with slight hail"
      break;

    case 99:
      weather = "Thunderstorm with heavy hail"
      break;

  }

  return weather
}

module.exports = {
  weatherCheckOpenMeteo: weatherCheckOpenMeteo,
  createOpenMeteoFiveDayObject: createOpenMeteoFiveDayObject,
  createFormattedDate: createFormattedDate
}