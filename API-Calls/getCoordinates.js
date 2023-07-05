async function geoCheck(city) {
	const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {mode: 'cors'})
	const cityDetails = await response.json();

	return cityDetails;
}

function createGeoHash(data) {
	if (data.hasOwnProperty('results') ) {
		let hash =
			{
				latitude: data.results[0].latitude,
				longitude: data.results[0].longitude
			}
		return hash;
	} else {
		let hash = {
			latitude: null,
			longitude: null
		}
		return hash
	}

}

module.exports ={
	geoCheck, createGeoHash
}