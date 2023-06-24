const { sampleWeatherAPIJson } = require('./sampleWeatherAPI')
const {createWeatherAPIObject} = require('./Weather-API')

// // Object Definition
// Json = {
// 	current: {
// 		temp,
// 		wind,
// 		humidity
// 	},
// 	hourlyForecast:
// 	[ {
// 			day,
// 			hour,
// 			temp
// 		}]
// 	],
// }

describe('Verify Sample Json', () => {

	test('Weather Json is valid', () => {
		expect(sampleWeatherAPIJson.forecast.forecastday.length).toBe(3)
		expect(sampleWeatherAPIJson.forecast.forecastday[0].day).toHaveProperty('maxtemp_f')
		expect(sampleWeatherAPIJson.forecast.forecastday[1].astro.sunrise).toBe('05:27 AM')
	})

	test('Current Weather JSON is Valid', () => {
		expect(sampleWeatherAPIJson['current'].temp_f).toBe(89.1)
		expect(sampleWeatherAPIJson['current'].temp_f).toBe("Clouds")
	})
})

describe('Current Sample Json', () => {

	test('Weather Object has current weather ', () => {
		expect(createWeatherAPIObject(sampleWeatherAPIJson)).toHaveProperty('currentForecat')
		expect(createWeatherAPIObject(sampleWeatherAPIJson).currentForecast).toHaveProperty('temperature')
		expect(createWeatherAPIObject(sampleWeatherAPIJson).currentForecast.feelsLike).toBe(91.3)

	})

	test('Current Weather JSON is Valid', () => {
		expect(createWeatherAPIObject(sampleWeatherAPIJson)['hourlyForecast'][0].length).toBe(8)
		expect(createWeatherAPIObject(sampleWeatherAPIJson)['hourlyForecast']).toHaveProperty('humidity')
	})
})

