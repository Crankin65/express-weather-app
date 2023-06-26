const { sampleWeatherAPIJson } = require('./sampleWeatherAPI')
const {createWeatherAPIObject} = require('./Weather-API')

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleWeatherAPIJson.forecast.forecastday.length).toBe(3)
		expect(sampleWeatherAPIJson.forecast.forecastday[0].day).toHaveProperty('maxtemp_f')
		expect(sampleWeatherAPIJson.forecast.forecastday[1].astro.sunrise).toBe('05:27 AM')
	})

	test('Current Weather JSON is Valid', () => {
		expect(sampleWeatherAPIJson['current'].temp_f).toBe(89.1)
		expect(sampleWeatherAPIJson.current).toHaveProperty("precip_in")
	})
})

describe('Verify exported data', () => {

	test('Current Weather Object has current weather ', () => {
		expect(createWeatherAPIObject(sampleWeatherAPIJson).currentForecast).toHaveProperty('temperature')
		expect(createWeatherAPIObject(sampleWeatherAPIJson).currentForecast.feelsLikeTemp).toBe(91.3)

	})

	test('Hourly Weather Object has information as expected', () => {
		expect(Object.keys(createWeatherAPIObject(sampleWeatherAPIJson)['hourlyForecast'][0]).length).toBe(13)
		expect(createWeatherAPIObject(sampleWeatherAPIJson).hourlyForecast.length).toBe(72)
		expect(createWeatherAPIObject(sampleWeatherAPIJson)['hourlyForecast'][43]).toHaveProperty('humidity')
	})

	test('Daily Weather Object has information as expected', () => {
		expect(Object.keys(createWeatherAPIObject(sampleWeatherAPIJson)['dailyForecast'][1]).length).toBe(14)
		expect(createWeatherAPIObject(sampleWeatherAPIJson).dailyForecast.length).toBe(3)
		expect(createWeatherAPIObject(sampleWeatherAPIJson).dailyForecast[2].minTemp).toBeGreaterThanOrEqual(50)
		expect(createWeatherAPIObject(sampleWeatherAPIJson).dailyForecast[0].willItRain).toBe(false)
	})
})

