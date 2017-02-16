//report.js

const fs = require('fs');
const basket = require('./basketfunc.js');

function readMyFile(){
	//Reads a JSON file and parses the data into a nested object of objects and arrays  
	fs.readFile('../tests/0021600681_gamedetail.json', 'utf8', (err, data) => {
		if(err){
			throw err;
		}
		//const str = JSON.stringify(data);
		const obj = JSON.parse(data);
//		console.log(obj);i
		basket.processGameData(obj);
	});
}

readMyFile();

