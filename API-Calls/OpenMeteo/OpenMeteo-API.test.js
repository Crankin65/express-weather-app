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
	let initialDateTime ="2023-06-20T00:00"

	test('Weather Object has expected properties', () => {
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly[0].timeHour).toBe(initialDateTime);
		expect(Object.keys(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).length).toBe(3);
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly.length).toBe(168);

		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly[65]).toHaveProperty('temperature');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly[102]['feelsLikeTemp']).toBeGreaterThanOrEqual(50);

	});

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
		// 7 weather + aqi, pm2.5, pm10, no2, co, o3, so2, alder, birch, grass, mugwort, olive, ragweed, dust
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][24]).toHaveProperty('feelsLike');
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][100]).toHaveProperty('us_aqi_pm10');
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'].length).toBe(168);
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)['hourlyForecast'][2]['us_aqi_co']).toBe(1);




	})


});


