require("dotenv").config();


async function openWeatherCheck(latitude,longitude) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	const weatherResponse = await response.json();

	const maxTemp = await weatherResponse.main.temp_max
	const minTemp = await weatherResponse.main.temp_min


	const weatherData = {
		maxTemp: maxTemp,
		minTemp: minTemp,
		avgTemp: await ((maxTemp + minTemp) / 2 ),
		condition: await weatherResponse.weather[0].description
	}

	return weatherData

	// console.log (await weatherData);
	// console.log(await `The high is ${weatherData.maxTemp}, the low is ${weatherData.minTemp}, the average is ${weatherData.avgTemp} and the current weather is ${weatherData.condition}`)
}

weatherCheck("29.76328","-95.36327")

module.exports = {
	OpenWeatherMapWeatherCheck: openWeatherCheck
}