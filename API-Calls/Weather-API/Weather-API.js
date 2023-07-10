const {sampleWeatherAPIJson} = require('./sampleWeatherAPI')
require("dotenv").config();

async function weatherAPICheck(latitude,longitude) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=3&aqi=yes&alerts=no`, {mode: 'cors'})
	const weatherResponse = await response.json();

	return weatherResponse

}

function createWeatherAPIObject (weatherJson) {
	let weatherAPIObject = {}

	weatherAPIObject = {
		currentForecast: createCurrentWeatherAPIJson(weatherJson),
		dailyForecast: createDailyWeatherAPIJson(weatherJson),
		hourlyForecast: createHourlyWeatherAPIJson(weatherJson)
	}

	return weatherAPIObject
}

function createCurrentWeatherAPIJson(weatherJson) {
	let currentForecast = {
		temperature: weatherJson.current.temp_f,
		weather: weatherJson.current.condition.text,
		windSpeed:  weatherJson.current.wind_mph,
		humidity: weatherJson.current.humidity,
		feelsLikeTemp: weatherJson.current.feelslike_f,
		latitude: weatherJson.location.lat,
		longitude: weatherJson.location.lon
	}
	return currentForecast
}

function createDailyWeatherAPIJson(weatherJson) {
	let dailyForecast = []

	for (let i = 0; i < weatherJson.forecast.forecastday.length; i++){
		let weatherInformation = {}
		let weatherJsonInformation = weatherJson.forecast

		weatherInformation = {
			date: weatherJsonInformation.forecastday[i].date,
			maxTemp: weatherJsonInformation.forecastday[i].day.maxtemp_f,
			minTemp: weatherJsonInformation.forecastday[i].day.mintemp_f,
			avgTemp: weatherJsonInformation.forecastday[i].day.avgtemp_f,
			totalPrecipitation: weatherJsonInformation.forecastday[i].day.totalprecip_in,
			humidity: weatherJsonInformation.forecastday[i].day.avghumidity,
			willItRain: (weatherJsonInformation.forecastday[i].day.daily_will_it_rain === 1 ),
			willItSnow: (weatherJsonInformation.forecastday[i].day.daily_will_it_snow === 1 ),
			chanceOfRain: weatherJsonInformation.forecastday[i].day.daily_chance_of_rain,
			chanceOfSnow: weatherJsonInformation.forecastday[i].day.daily_chance_of_snow,
			weather: weatherJsonInformation.forecastday[i].day.condition.text,
			sunrise: weatherJsonInformation.forecastday[i].astro.sunrise,
			sunset: weatherJsonInformation.forecastday[i].astro.sunset,
			moonPhase: weatherJsonInformation.forecastday[i].astro.moon_phase
		}

		dailyForecast.push(weatherInformation);
	}
	return dailyForecast
}

function createHourlyWeatherAPIJson(weatherJson) {
	let hourlyForecast = []

	function formatDateTime(date) {
		return date.split('').splice(0,16).join('')
	}

	for (let i = 0; i < 3; i++) {

		for (let j = 0; j < weatherJson.forecast.forecastday[i].hour.length; j++){
			let weatherInformation = {}
			let weatherJsonInformation = weatherJson.forecast.forecastday[i].hour[j]
			console.log(i,j)

			weatherInformation = {
				dateTime: formatDateTime(weatherJsonInformation.time),
				condition: weatherJsonInformation.condition.text,
				windSpeed: weatherJsonInformation.wind_mph,
				humidity: weatherJsonInformation.humidity,
				precipitationInches: weatherJsonInformation.precip_in,
				feelsLike: weatherJsonInformation.feelslike_f,
				chanceOfRain: weatherJsonInformation.chance_of_rain,
				chanceOfSnow: weatherJsonInformation.chance_of_snow
			}
			hourlyForecast.push(weatherInformation)

		}
	}
	return hourlyForecast

}
// weatherCheck('Houston');

module.exports = {
	weatherAPICheck: weatherAPICheck,
	createWeatherAPIObject:createWeatherAPIObject
}