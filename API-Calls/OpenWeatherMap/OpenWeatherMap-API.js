require("dotenv").config();

async function openWeatherCheck(latitude,longitude) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	const forecastResponse = await response.json();

	// const maxTemp = await weatherResponse.main.temp_max
	// const minTemp = await weatherResponse.main.temp_min
	//
	//
	// const weatherData = {
	// 	maxTemp: maxTemp,
	// 	minTemp: minTemp,
	// 	avgTemp: await ((maxTemp + minTemp) / 2 ),
	// 	condition: await weatherResponse.weather[0].description
	// }

	return forecastResponse

}

async function openWeatherMapCurrentCheck(latitude, longitude) {
	const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	const weatherResponse = await response.json();

	return weatherResponse;
}

function createOpenWeatherMapObject(weatherJson) {
	let openWeatherMapObject = {
		hourly: []
	}
// json.hourly[0].weatherInformation.year.
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

		openWeatherMapObject.hourly.push(weatherInformation);

	}

	return openWeatherMapObject
}

// weatherCheck("29.76328","-95.36327")

module.exports = {
	OpenWeatherMapWeatherCheck: openWeatherCheck,
	createOpenWeatherMapObject: createOpenWeatherMapObject
}