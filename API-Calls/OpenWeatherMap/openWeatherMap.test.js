const {sampleOpenWeatherMapJson} = require('./sampleOpenWatherMap')

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleOpenWeatherMapJson['list'].length).toBe(40)
		expect(sampleOpenWeatherMapJson.list[4]).toHaveProperty('main')
		expect(sampleOpenWeatherMapJson.list[18].main.temp_min).toBeGreaterThanOrEqual(30)
		expect(sampleOpenWeatherMapJson.list[1].weather[0].main).toBe('Clouds')	})
})