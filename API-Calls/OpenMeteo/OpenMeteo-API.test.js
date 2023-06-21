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
	let randomDateTime = "2023-06-26T06:00"

	test('Weather Object has expected properties', () => {
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson).hourly[0].timeHour).toBe(initialDateTime);
		expect(Object.keys(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).length).toBe(3);
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly.length).toBe(168);

		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly[65]).toHaveProperty('temperature');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).hourly[102]['feelsLikeTemp']).toBeGreaterThanOrEqual(50);

	});

	test('Weather Object has current weather', () => {
		// console.log('--------')
		// console.log(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson).current)
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).toHaveProperty('current');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['current']).toHaveProperty('currentTemp');
		expect(parseInt((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['current']['weatherCode'])).toBeGreaterThanOrEqual(0);

	});

	test('Weather Object has weekly weather', () => {
		expect(createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson)).toHaveProperty('daily');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['daily']).toHaveProperty('2023-06-20');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['daily']['2023-06-20']).toHaveProperty('maxTemp');
		expect((createOpenMeteoFiveDayObject(sampleWeatherDataJson, sampleAirQualityJson))['daily']['2023-06-24']).toHaveProperty('sunriseTime');
	});


});


