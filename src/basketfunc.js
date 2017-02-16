// basketfunc.js

/*
const path = require('path');
const report = require(path.resolve(__dirname, './report.js'));
*/

//const report = require('./report.js');

function processGameData(data){
	let report = "";
	report += ("Game ID: "+data.g.gid+", "+data.g.gdte);
	console.log(report);	
	return report;	
}

processGameData();

module.exports = {
	processGameData: processGameData
};
