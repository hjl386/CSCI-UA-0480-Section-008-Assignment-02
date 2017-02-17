//report.js

//const fs = require('fs');
const basket = require('./basketfunc.js');
const req = require('request');

function readMyFile(url){
	//Reads a JSON file and parses the data into a nested object of objects and arrays  
/*	fs.readFile('../tests/0021600681_gamedetail.json', 'utf8', (err, data) => {
		if(err){
			throw err;
		}
		//const str = JSON.stringify(data);
		const obj = JSON.parse(data);
		console.log(obj);
		const str = basket.processGameData(obj);
		console.log("\n\nSTR :", str);
	});
*/
	req('http://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/0021600680_gamedetail.json', function(error, response, body){
		if(error){
			console.log(error);	
		}
	//	console.log(body);
		const str = JSON.parse(body);
	//	console.log(str);
		const a = basket.processGameData(str);
		console.log(a);
/*
		while(str.g.hasOwnProperty('nextgid')){
			let url = 'http://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/ '+str.g.nextgid + '_gamedetail.json';
			req(url, function(error, response, body){
				if(error){ console.log(error); }
				const s = JSON.parse(body);
				const b = basket.processGameData(s);
				console.log(b);
				let url = 'http://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/ '+ s.g.nextgid + '_gamedetail.json';	
				console.log(s.g.nextgid);
			});
			//console.log(url);
		}	
*/
	});
}

readMyFile();

