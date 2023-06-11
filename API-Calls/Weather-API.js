require("dotenv").config();

async function weatherCheck(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`, {mode: 'cors'})
	let weatherData = await response.json();
	let maxTemp = await weatherData.forecast.forecastday[0].day.maxtemp_f
	let minTemp = await weatherData.forecast.forecastday[0].day.mintemp_f
	let avgTemp = await weatherData.forecast.forecastday[0].day.avgtemp_f
	let condition = await weatherData.forecast.forecastday[0].day.condition.text
	// console.log(await weatherData.forecast.forecastday[0].day)
	// console.log(await `The high in houston today is ${maxTemp}`)
	console.log(await `The high in ${city} is ${maxTemp}, the low is ${minTemp}, the average is 
	${avgTemp} and the current weather is ${condition}`);

}

weatherCheck('Houston');
