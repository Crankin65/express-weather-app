require("dotenv").config();

async function weatherAPICheck(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`, {mode: 'cors'})
	const weatherResponse = await response.json();
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

weatherCheck('Houston');

module.exports = {
	weatherAPICheck: weatherAPICheck
}