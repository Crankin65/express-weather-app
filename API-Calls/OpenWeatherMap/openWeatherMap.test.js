const {sampleOpenWeatherMapJson, sampleOpenWeatherMapCurrentJson} = require('./sampleOpenWeatherMap')
const {createOpenWeatherMapObject} = require('../OpenWeatherMap/OpenWeatherMap-API');

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleOpenWeatherMapJson['list'].length).toBe(40)
		expect(sampleOpenWeatherMapJson.list[4]).toHaveProperty('main')
		expect(sampleOpenWeatherMapJson.list[18].main.temp_min).toBeGreaterThanOrEqual(30)
		expect(sampleOpenWeatherMapJson.list[1].weather[0].main).toBe('Clouds')
	})

	test('Current Weather JSON is Valid', () => {
		expect(sampleOpenWeatherMapCurrentJson.weather.main).toBe("Clouds")
		expect(sampleOpenWeatherMapCurrentJson.main.feels_like).toBe(308.88)
	})
}) 

describe('OpenWeatherMapObject', () => {
	test('Check properties of Forecast OpenWeatherMap',() => {
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['hourlyForecast'].length).toBe(40)

		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['hourlyForecast'][5]).toHaveProperty('feelsLike')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['hourlyForecast'][24].month).toBe('June')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['hourlyForecast'][36]['feelsLike']).toBeGreaterThanOrEqual(50);

	})

	test('Check properties of Current OpenWeatherMap',() => {
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['currentForecast'].length).toBe(40)

		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['currentForecast']).toHaveProperty('sunrise')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson)['currentForecast']['mintemp']).toBeGreaterThanOrEqual(20);

	})
})
// json.list[0].date = datetime
// json.list[0].weather = datetime