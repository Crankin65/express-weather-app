const { body, validationResult } = require('express-validator')
const { weatherCheckOpenMeteo, createOpenMeteoFiveDayObject } = require("../API-Calls/OpenMeteo/OpenMeteo-API");
const { airQualityCheckOpenMeteo } = require('../API-Calls/OpenMeteo/OpenMeteo-Air-Quality-API');
const { openWeatherMapHourlyCheck, openWeatherMapCurrentCheck,createOpenWeatherMapObject } = require('../API-Calls/OpenWeatherMap/OpenWeatherMap-API');
const { weatherAPICheck, createWeatherAPIObject } = require('../API-Calls/Weather-API/Weather-API')
const { geoCheck, createGeoHash } = require('../API-Calls/getCoordinates')


const asyncHandler = require('express-async-handler')



exports.openMeteo = async(req,res) => {
		const coordinates = {
			latitude: req.params['latitude'],
			longitude: req.params['longitude']
		}

	const cityWeather = await weatherCheckOpenMeteo(`${coordinates.latitude}`,`${coordinates.longitude}`)
	const cityAirQuality = await airQualityCheckOpenMeteo(`${coordinates.latitude}`,`${coordinates.longitude}`);
	const openMeteoForecastObject = await createOpenMeteoFiveDayObject(cityWeather, cityAirQuality)

	await res.json({
		weeklyForecast: openMeteoForecastObject.weeklyForecast,
		currentForecast: openMeteoForecastObject.currentForecast,
		hourlyForecast: openMeteoForecastObject.hourlyForecast
	})

	// console.log(await res.json({
	// 	weeklyForecast: openMeteoForecastObject.weeklyForecast,
	// 	currentForecast: openMeteoForecastObject.currentForecast,
	// 	hourlyForecast: openMeteoForecastObject.hourlyForecast
	// }))

};

exports.openWeather = async(req,res) => {
	const coordinates = {
		latitude: req.params['latitude'],
		longitude: req.params['longitude']
	}

	const hourlyWeatherRaw = await openWeatherMapHourlyCheck(`${coordinates.latitude}`,`${coordinates.longitude}`)
	const currentWeatherRaw = await openWeatherMapCurrentCheck(`${coordinates.latitude}`,`${coordinates.longitude}`)

	const weatherObject = await createOpenWeatherMapObject(hourlyWeatherRaw, currentWeatherRaw)

	await res.json({
		hourlyWeather: weatherObject.hourlyForecast,
		currentWeather: weatherObject.currentForecast
	})

};

exports.weatherAPI = async (req,res) => {
	const city = req.params['city'];
	const weather = await weatherAPICheck(city);
	const weatherObject = await createWeatherAPIObject(weather)

	await res.json({
		currentForecast: weatherObject.currentForecast,
		dailyForecast: weatherObject.dailyForecast,
		hourlyForecast: weatherObject.hourlyForecast
	})

}

exports.coordinates = async (req,res) => {
	const city = req.params['city'];
	const cityDetails = await geoCheck(city);
	const coordinatesHash = await createGeoHash(cityDetails)

	await res.json({coordinates:coordinatesHash})
}

exports.getAllWeather = async (req,res) => {
	const city = req.params['city'];
	const cityDetails = await geoCheck(city);
	const coordinatesHash = await createGeoHash(cityDetails)

	//Open Meteo
	const openMeteoWeatherRaw = await weatherCheckOpenMeteo(`${coordinatesHash.latitude}`,`${coordinatesHash.longitude}`)
	console.log('----')
	console.log( await coordinatesHash.latitude)
	console.log( await coordinatesHash.longitude)
	const openMeteoAirQualityRaw = await airQualityCheckOpenMeteo(`${coordinatesHash.latitude}`,`${coordinatesHash.longitude}`);
	const openMeteoForecastObject = await createOpenMeteoFiveDayObject(openMeteoWeatherRaw, openMeteoAirQualityRaw)

	console.log( await openMeteoWeatherRaw)
	//Open Weather Map
	const hourlyOpenWeatherMapRaw = await openWeatherMapHourlyCheck(`${coordinatesHash.latitude}`,`${coordinatesHash.longitude}`)
	const currentOpenWeatherMapRaw = await openWeatherMapCurrentCheck(`${coordinatesHash.latitude}`,`${coordinatesHash.longitude}`)
	const openWeatherMapObject = await createOpenWeatherMapObject(hourlyOpenWeatherMapRaw, currentOpenWeatherMapRaw)

	//Weather API
	const weatherAPIWeatherRaw = await weatherAPICheck(city);
	const weatherAPIObject = await createWeatherAPIObject(weatherAPIWeatherRaw)

	await res.json({
		openMeteoForecast:{
				weeklyForecast: openMeteoForecastObject.weeklyForecast,
				currentForecast: openMeteoForecastObject.currentForecast,
				hourlyForecast: openMeteoForecastObject.hourlyForecast
			},
		openWeatherMapForcast: {
			hourlyWeather: openWeatherMapObject.hourlyForecast,
			currentWeather: openWeatherMapObject.currentForecast
		},
		weatherAPIForecast: {
			currentForecast: weatherAPIObject.currentForecast,
			dailyForecast: weatherAPIObject.dailyForecast,
			hourlyForecast: weatherAPIObject.hourlyForecast
		}})
}