const { body, validationResult } = require('express-validator')
const { weatherCheck2 } = require("../API-Calls/OpenMeteo-API");

const asyncHandler = require('express-async-handler')


exports.openMeteo = async(req,res) => {
		const coordinates = {
			latitude: req.params['latitude'],
			longitude: req.params['longitude']
		}

	const cityWeather = await weatherCheck2(`${coordinates.latitude}`,`${coordinates.longitude}`)

	await res.json({weather:cityWeather})

};
