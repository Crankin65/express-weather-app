const express = require('express');
const router = express.Router();
const weatherCheck = require("../API-Calls/OpenMeteo-API");


// Controllers
const weatherController = require('../controllers/weatherController')
const asyncHandler = require("express-async-handler");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/openmeteo', weatherController.openMeteo);
router.get("/opemeeteo2", (req, res) => {
	res.json({something: "About this wiki"});
});
router.get('/openmeteo3', (req, res) => {
	// (async() => {
	// 	let dummyObject = await openmeteo.weatherCheck("29.76328", "-95.36327")
	// 	res.send({OMWeather: dummyObject})
	// })();

	// res.send({weather: openmeteo.weatherCheck('29.76328','-95.36327'),test:"something"})
});

router.get('/openmeteo4', asyncHandler( async (req,res) => {
	const houstonWeather = await weatherCheck("29.76328", '-95.36327')
	res.send( { weather:houstonWeather } )
}))

router.get('/openmeteo5', asyncHandler( async (req, res) => {
	await fetch('https://api.open-meteo.com/v1/forecast?latitude=29.76328&longitude=-95.36327&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=2023-06-08&end_date=2023-06-08&timezone=GMT', {mode: 'cors'})
		.then(async function(response) {
			console.log('fetch response')
			console.log(response.json())
			res.send( {weather: response})
		}
	) .catch ((err) => {
		console.log(err)
	})

}))



module.exports = router;
