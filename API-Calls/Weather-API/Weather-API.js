const {sampleWeatherAPIJson} = require('./sampleWeatherAPI')
require("dotenv").config();

async function weatherAPICheck(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`, {mode: 'cors'})
	const weatherResponse = await response.json();
	console.log('error here during weather api')
	console.log(await weatherResponse);
	const weatherData = {
		maxTemp: await weatherResponse.forecast.forecastday[0].day.maxtemp_f,
		minTemp: await weatherResponse.forecast.forecastday[0].day.mintemp_f,
		avgTemp: await weatherResponse.forecast.forecastday[0].day.avgtemp_f,
		condition: await weatherResponse.forecast.forecastday[0].day.condition.text

	}

	return weatherData;
	// console.log(await `The high in ${city} is ${weatherData.maxTemp}, the low is ${weatherData.minTemp}, the average is
	// ${weatherData.avgTemp} and the current weather is ${weatherData.condition}`);

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
		feelsLikeTemp: weatherJson.current.feelslike_f
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

	for (let i = 0; i < 3; i ++) {

		for (let j = 0; j < weatherJson.forecast.forecastday[i].hour.length; j++){
			let weatherInformation = {}
			let weatherJsonInformation = weatherJson.forecast.forecastday[i].hour[j]

			weatherInformation = {
				year: weatherJsonInformation.time.slice(0,4),
				month: weatherJsonInformation.time.slice(5,7),
				day: weatherJsonInformation.time.slice(8,10),
				hour: weatherJsonInformation.time.slice(11,13),
				condition: weatherJsonInformation.condition.text,
				windSpeed: weatherJsonInformation.wind_mph,
				humidity: weatherJsonInformation.humidity,
				precipitationInches: weatherJsonInformation.precip_in,
				feelsLike: weatherJsonInformation.feelslike_f,
				willItRain: weatherJsonInformation.will_it_rain === 1,
				willItSnow: weatherJsonInformation.will_it_snow === 1,
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