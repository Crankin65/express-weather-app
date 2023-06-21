const OpenMeteoWeatherAPI = require('./OpenMeteo-API');
const sampleJsonObject = require('./sampleOpenMeteoWeather')
const sampleJson = sampleJsonObject.sampleJson

// it('works', () => {
// 	expect(1).toBe(2)
// });


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


it('', () => {
	expect(sampleJson).toHaveProperty("timezone")
});

// console.log(sampleJson.sampleJson)
