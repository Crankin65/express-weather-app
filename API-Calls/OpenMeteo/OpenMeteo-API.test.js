const {createOpenMeteoFiveDayObject} = require('./OpenMeteo-API')
const {sampleAirQualityJson, sampleWeatherDataJson} = require('./sampleOpenMeteoWeather')

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleWeatherDataJson).toHaveProperty('latitude')
		expect(sampleWeatherDataJson).toHaveProperty('hourly')
		expect(sampleWeatherDataJson.hourly).toHaveProperty('time')
		expect(sampleWeatherDataJson.hourly).toHaveProperty('temperature_2m')
	})

	test('Air Quality is valid', () => {
		expect(sampleAirQualityJson).toHaveProperty('latitude')
		expect(sampleAirQualityJson).toHaveProperty('hourly')
		expect(sampleAirQualityJson.hourly).toHaveProperty('time')
		expect(sampleAirQualityJson.hourly).toHaveProperty('pm10')
	})
})

describe('OpenMeteoForecastObject', () => {

	test('Weather Object has current weather', () => {
		// console.log('--------')
		// console.log(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson).current)
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).toHaveProperty('currentForecast');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['currentForecast']).toHaveProperty('currentTemp');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['currentForecast']['weather'])).toBe('Overcast');

	});

	test('Weather Object has weekly weather', () => {
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).toHaveProperty('weeklyForecast');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['weeklyForecast'][0]).toHaveProperty('maxTemp');
		expect(Object.keys((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['weeklyForecast'][6]).length).toBe(10);
	});

	test('Weather Object has hourly weather', () => {
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).toHaveProperty('hourlyForecast');
		expect(Object.keys(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][0]).length).toBe(21);
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][24]).toHaveProperty('feelsLike');
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][100]).toHaveProperty('us_aqi_pm10');
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'].length).toBe(168);
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][2]['us_aqi_co']).toBe(1);




	})

});


