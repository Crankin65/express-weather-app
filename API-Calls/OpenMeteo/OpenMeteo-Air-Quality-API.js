async function airQualityCheckOpenMeteo(latitude,longitude){
	let date = new Date().toISOString().substring(0,10);

	const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen,us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_no2,us_aqi_co,us_aqi_o3,us_aqi_so2&timezone=America%2FNew_York` , {mode: 'cors'})

	// const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&daily=temperature_2m_min&daily=precipitation_sum&daily=rain_sum&daily=windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=kmh&precipitation_unit=mm&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${date}&end_date=${date}&timezone=GMT` , {mode: 'cors'})
	let formattedData = await response.json();

	return await formattedData;

}
//Brooklyn ("40.65", -73.95
// weatherCheck("29.76328",'-95.36327')

module.exports = {
	airQualityCheckOpenMeteo: airQualityCheckOpenMeteo
}