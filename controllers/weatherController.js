const { body, validationResult } = require('express-validator')
const weatherCheck = require("../API-Calls/OpenMeteo-API");


const asyncHandler = require('express-async-handler')




exports.openMeteo = asyncHandler(async(req,res) => {


	try {
		await Promise.all(
			return await weatherCheck("29.76328", '-95.36327')

	)
	}



	// new Promise((resolve, reject) => {
	// 	weatherCheck("29.76328", '-95.36327')
	// 		.then(response => {
	// 			resolve(res.json({OMWeather: typeof response}))
	// 		})
	// 		.catch(error => {
	// 			let errorMessage = error.response.statusText;
	// 			console.log(errorMessage);
	// 			reject(error);
	// 		})
	// })

	//-----

	// const weather =  () => {
	// 	try {
	// 		let check = await weatherCheck("29.76328", '-95.36327')
	// 	} catch (error) {
	// 		console.log('There was an error:', error);
	// 	}
	// };
	//
	// await console.log(`why don't you work? ${weather()}`)



	//-------------

	// weatherCheck("29.76328", '-95.36327')
	// 	.then(async function(result) {
	// 		// console.log(result)
	// 		console.log('controller first then')
	// 		let weatherObject = await result
	// 		return weatherObject
	// 	})
	// 	.then((result) => {
	// 		console.log('controller second then')
	// 		console.log(`the result is ${result}`)
	// 		res.send({
	// 			OMWeather: result
	// 		})
	// 	})
	// 	.catch(console.error.bind(console))

//-------------

	// res.send({
	// 	OMWeather: dummyObject
	// })
//------------
		// res.status(200).send({
		// 	check: "check check",
		// 	OMWeather: await openmeteo.weatherCheck(29.76328,-95.36327)
		// 		.then((result) => {
		// 			if ( result) {
		// 				console.log('result exists')
		// 			} else {
		// 				console.log('result doesn"t exist' )
		// 			}
		// 		}).catch(console.error.bind(console)),
		// 	something: "something check"
		// });

//------------

	// await openmeteo.weatherCheck(29.76328,-95.36327)
	// 	.then((result) => {
	// 		console.log(result)
	// 		res.send({
	// 			Weather: JSON.parse(result)
	// 		})
	// 	}).catch(console.error.bind(console))

	//------------

	// await (async () => {
	// 	let dummyObject = await openmeteo.weatherCheck('29.76328', '-95.36327')
	// 	res.send({OMWeather: dummyObject})
	// })();

});
