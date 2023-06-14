async function geoCheck(city) {
	const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`, {mode: 'cors'})
	const cityDetails = await response.json();

	return cityDetails;
}

function createGeoHash(data) {
	let hash =
		{ Latitude:data.results[0].latitude,
			Longitude:data.results[0].longitude
		}
	return hash;
}

module.exports ={
	geoCheck, createGeoHash
}