const app = require('express')();
// const router = express.Router();
// const app = express();
const weatherCheck = require("../API-Calls/OpenMeteo/OpenMeteo-API");


// Controllers
const weatherController = require('../controllers/weatherController')
const asyncHandler = require("express-async-handler");

app.get('/test', weatherController.test)

app.get('/openmeteo/:latitude/:longitude', weatherController.openMeteo);
app.get('/openweather/:latitude/:longitude', weatherController.openWeather);
app.get('/weatherAPI/:city', weatherController.weatherAPI);
app.get('/get/:city', weatherController.coordinates)
app.get('/get/weather/:city', weatherController.getAllWeather)


// router.get('/openmeteo/:latitude/:longitude', weatherController.openMeteo);
// router.get('/openweather/:latitude/:longitude', weatherController.openWeather);
// router.get('/weatherAPI/:city', weatherController.weatherAPI);
// router.get('/get/:city', weatherController.coordinates)
// router.get('/get/weather/:city', weatherController.getAllWeather)



// module.exports = router;
module.exports = app;

