const {sampleOpenWeatherMapJson, sampleOpenWeatherMapCurrentJson} = require('../OpenWeatherMap/sampleOpenWeatherMap')
const {createOpenWeatherMapObject} = require('../OpenWeatherMap/OpenWeatherMap-API');


describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleOpenWeatherMapJson.list.length).toBe(40)
		expect(sampleOpenWeatherMapJson['list'][4]).toHaveProperty('main')
		expect(sampleOpenWeatherMapJson['list'][18].main.temp_min).toBeGreaterThanOrEqual(30)
		expect(sampleOpenWeatherMapJson['list'][1].weather[0].main).toBe('Clouds')
	})

	test('Current Weather JSON is Valid', () => {
		expect(sampleOpenWeatherMapCurrentJson.main).toHaveProperty("humidity")
		expect(sampleOpenWeatherMapCurrentJson.main.feels_like).toBe(308.88)
	})
}) 

describe('OpenWeatherMapObject', () => {
	test('Check properties of Forecast OpenWeatherMap',() => {
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['hourlyForecast'].length).toBe(40)
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['hourlyForecast'][5]).toHaveProperty('feelsLikeTemp')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['hourlyForecast'][24].month).toBe('06')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['hourlyForecast'][36]['feelsLikeTemp']).toBeGreaterThanOrEqual(50);

	})

	test('Check properties of Current OpenWeatherMap',() => {
		expect(Object.keys(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['currentForecast']).length).toBe(8)
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['currentForecast']).toHaveProperty('sunrise')
		expect(createOpenWeatherMapObject(sampleOpenWeatherMapJson,sampleOpenWeatherMapCurrentJson)['currentForecast']['minTemp']).toBeGreaterThanOrEqual(20);

	})
})
