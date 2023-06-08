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

router.get('/openmeteo/:latitude/:longitude', weatherController.openMeteo);




module.exports = router;
