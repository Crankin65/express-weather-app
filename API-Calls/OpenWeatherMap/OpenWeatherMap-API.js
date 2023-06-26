require("dotenv").config();

async function openWeatherCheck(latitude,longitude) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	const forecastResponse = await response.json();

	return forecastResponse

}

async function openWeatherMapCurrentCheck(latitude, longitude) {
	const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	const weatherResponse = await response.json();

	return weatherResponse;
}

function createOpenWeatherMapObject(weatherJson,currentWeatherJson) {
	let openWeatherMapObject = {
		hourlyForecast: createHourlyOpenWeatherMap(weatherJson),
		currentForecast: createCurrentOpenWeatherMap(currentWeatherJson)
	}

	return openWeatherMapObject
}

function createHourlyOpenWeatherMap (weatherJson) {
	let hourlyForecast = []

	for (let i=0; i < weatherJson.list.length; i++) {
		let weatherInformation = {}

		let dateTime = weatherJson.list[i].dt_txt
		let weatherDetails =  weatherJson.list[i].main

		weatherInformation = {
			year: dateTime.slice(0,4),
			month: dateTime.slice(5,7),
			day: dateTime.slice(8,10),
			hour: dateTime.slice(11,13),
			temperature: weatherDetails.temp,
			feelsLikeTemp: weatherDetails.feels_like,
			minTemp: weatherDetails.temp_min,
			maxTemp: weatherDetails.temp_max,
			humidity: weatherDetails.humidity,
			weatherActivity: weatherJson.list[i].weather.main,
			weatherDescription: weatherJson.list[i].weather.description
		}

		hourlyForecast.push(weatherInformation);
	}

	return hourlyForecast
}

function createCurrentOpenWeatherMap (weatherJson) {

	let currentForecast = {
		feels_like: kelvinToFaranheit(weatherJson.main.feels_like),
		minTemp: kelvinToFaranheit(weatherJson.main.temp_min),
		maxTemp: kelvinToFaranheit(weatherJson.main.temp_max),
		humidity: weatherJson.main.humidity,
		windSpeed: weatherJson.wind.speed
	}

	return currentForecast
}

function kelvinToFaranheit (kelvinTemp){

	let fahrenheit = (kelvinTemp- 273.15) * (9/5) + 32
	return fahrenheit

}

// weatherCheck("29.76328","-95.36327")

module.exports = {
	OpenWeatherMapWeatherCheck: openWeatherCheck,
	createOpenWeatherMapObject: createOpenWeatherMapObject
}