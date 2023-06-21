const OpenMeteoWeatherAPI = require('./OpenMeteo-API');
const sampleJsonObject = require('./sampleOpenMeteoWeather')
const sampleAirQualityJson = sampleJsonObject.sampleWeatherQualityJson
const sampleWeatherJson = sampleJsonObject.sampleWeatherDataJson

/*
0+3+3
openMeteo = {
	time (2023-06-20T000: {
	temperature_2m[i]
	relativehumidity_2m[i]
	apparent_temperature[i]
	precipitation_probability[i]
	precipitation[i]
	rain[i]
	weawthercode[i]
	}
	time (2023-06-20T000: {
	}
	daily {
	time: [0] {
	weathercode[i]
	temperature_2m_max[i]
	temperature_2m_min[i]
	apparent_temperature_max"
	apparent_temperature_min"
	sunrise[i]
	sunset[i]
	precipitation_sum[i]
	precipitation_hours[i]

 */

console.log(sampleWeatherJson)

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleWeatherJson).toHaveProperty('latitude')
		expect(sampleWeatherJson).toHaveProperty('hourly')
		expect(sampleWeatherJson.hourly).toHaveProperty('time')
		expect(sampleWeatherJson.hourly).toHaveProperty('temperature_2m')
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
		expect(OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson)).toHaveProperty(initialDateTime);
		expect(Object.keys(OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson)).length).toBe(168);
		expect((OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson))[randomDateTime]).toHaveProperty('temperature');
		expect((OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson))[randomDateTime][feelsLikeTemp]).toBeGreaterThanOrEqual(50);

	});

	test('Weather Object has current weather', () => {
		expect(OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson)).toHaveProperty('current_weather');
		expect(OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson)).toHaveProperty('current_weather');

	});

	test('Weather Object has weekly weather', () => {
		expect(OpenMeteoWeatherAPI.createOpenMeteoFiveDayObject(sampleWeatherJson)).toHaveProperty('daily');
	});


});


