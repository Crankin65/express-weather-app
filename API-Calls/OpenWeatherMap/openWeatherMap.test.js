const {sampleOpenWeatherMapJson} = require('./sampleOpenWeatherMap')
const {createOpenWeatherMapObject} = require('../OpenWeatherMap/OpenWeatherMap-API');

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleOpenWeatherMapJson['list'].length).toBe(40)
		expect(sampleOpenWeatherMapJson.list[4]).toHaveProperty('main')
		expect(sampleOpenWeatherMapJson.list[18].main.temp_min).toBeGreaterThanOrEqual(30)
		expect(sampleOpenWeatherMapJson.list[1].weather[0].main).toBe('Clouds')	})
})

describe('OpenWeatherMapObject', () => {
	test('Check properties of OpenWeatherMap',() => {
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson).hourly[0]).toHaveProperty('month')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson).hourly[32].year).toBe('2023')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson).hourly[24]).toHaveProperty('humidity')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson).hourly[7].temperature).toBeGreaterThanOrEqual(50);

	})
})
// json.list[0].date = datetime
// json.list[0].weather = datetime