const express = require('express');
const router = express.Router();
const weatherCheck = require("../API-Calls/OpenMeteo/OpenMeteo-API");


// Controllers
const weatherController = require('../controllers/weatherController')
const asyncHandler = require("express-async-handler");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/openmeteo/:latitude/:longitude', weatherController.openMeteo);
router.get('/openweather/:latitude/:longitude', weatherController.openWeather);
router.get('/weatherAPI/:city', weatherController.weatherAPI);
router.get('/get/:city', weatherController.coordinates)






module.exports = router;
