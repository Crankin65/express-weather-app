const { body, validationResult } = require('express-validator')
const { weatherCheckOpenMeteo } = require("../API-Calls/OpenMeteo/OpenMeteo-API");
const { airQualityCheckOpenMeteo } = require('../API-Calls/OpenMeteo/OpenMeteo-Air-Quality-API');
const { OpenWeatherMapWeatherCheck } = require('../API-Calls/OpenWeatherMap/OpenWeatherMap-API');
const { weatherAPICheck } = require('../API-Calls/Weather-API/Weather-API')
const { geoCheck, createGeoHash } = require('../API-Calls/getCoordinates')


const asyncHandler = require('express-async-handler')

exports.openMeteo = async(req,res) => {
		const coordinates = {
			latitude: req.params['latitude'],
			longitude: req.params['longitude']
		}

	const cityWeather = await weatherCheckOpenMeteo(`${coordinates.latitude}`,`${coordinates.longitude}`)
	const cityAirQuality = await airQualityCheckOpenMeteo(`${coordinates.latitude}`,`${coordinates.longitude}`);

	await res.json({weather:cityWeather, airQuality: cityAirQuality})

};

exports.openWeather = async(req,res) => {
	const coordinates = {
		latitude: req.params['latitude'],
		longitude: req.params['longitude']
	}

	const weather = await OpenWeatherMapWeatherCheck(`${coordinates.latitude}`,`${coordinates.longitude}`)

	await res.json({weather:weather})

};

exports.weatherAPI = async (req,res) => {
	const city = req.params['city'];

	const weather = await weatherAPICheck(city);

	await res.json({weather:weather})

}

exports.coordinates = async (req,res) => {
	const city = req.params['city'];
	const cityDetails = await geoCheck(city);
	const coordinatesHash = await createGeoHash(cityDetails)

	await res.json({coordinates:coordinatesHash})
}