require("dotenv").config();

async function openWeatherMapHourlyCheck(latitude,longitude) {
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

	// new Date((weatherJson.dt) * 1000)

	function localTime(date) {
		return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	}


	let currentForecast = {
		feelsLike: weatherJson.main.feels_like,
		minTemp: weatherJson.main.temp_min,
		maxTemp: weatherJson.main.temp_max,
		humidity: weatherJson.main.humidity,
		windSpeed: weatherJson.wind.speed,
		dateTime: new Date((weatherJson.dt) * 1000),
		sunrise: new Date( (weatherJson.sys.sunrise) * 1000),
		sunset: new Date ((weatherJson.sys.sunset) * 1000),
		latitude: weatherJson.coord.lat,
		longitude: weatherJson.coord.lon
	}

	return currentForecast
}
function kelvinToFaranheit (kelvinTemp){

	let fahrenheit = (kelvinTemp- 273.15) * (9/5) + 32
	return fahrenheit

}

// weatherCheck("29.76328","-95.36327")

module.exports = {
	openWeatherMapHourlyCheck: openWeatherMapHourlyCheck,
	openWeatherMapCurrentCheck: openWeatherMapCurrentCheck,
	createOpenWeatherMapObject: createOpenWeatherMapObject,
}