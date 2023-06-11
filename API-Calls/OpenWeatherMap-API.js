require("dotenv").config();


async function weatherCheck(latitude,longitude) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`);
	let weatherData = await response.json();
	let maxTemp = await weatherData.main.temp_max
	let minTemp = await weatherData.main.temp_min
	let avgTemp = await ((maxTemp + minTemp) / 2 )
	let condition = await weatherData.weather[0].description

	// console.log (await weatherData);
	console.log(await `The high is ${maxTemp}, the low is ${minTemp}, the average is ${avgTemp} and the current weather is ${condition}`)
}

weatherCheck("29.76328","-95.36327")