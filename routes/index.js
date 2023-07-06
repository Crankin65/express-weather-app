const express = require('express');
const router = express.Router();
const weatherCheck = require("../API-Calls/OpenMeteo/OpenMeteo-API");


// Controllers
const weatherController = require('../controllers/weatherController')
const asyncHandler = require("express-async-handler");


router.get('/openmeteo/:latitude/:longitude', weatherController.openMeteo);
router.get('/openweather/:latitude/:longitude', weatherController.openWeather);
router.get('/weatherAPI/:city', weatherController.weatherAPI);
router.get('/get/:city', weatherController.coordinates)
router.get('/get/weather/:city', weatherController.getAllWeather)




module.exports = router;
