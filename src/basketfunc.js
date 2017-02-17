// basketfunc.js

function processGameData(data){
//Concatenoates all of the strings into the returned parsed string 
	let rep = "";
	const iDnDate = gameIDandDate(data);
	rep += iDnDate;
	const finalS = finalScoreStr(data);
	rep += '\n' + finalS;
	//console.log("\nREPORT\n" +  rep);
	const rebs = mostRebounds(data);
//	rep += '\n' + rebs;
	console.log("REBS :", rebs);
	return rep;	 
}

function gameIDandDate(data){
//Returns a string with the "header", game id and date 
	const str = "Game ID: " + data.g.gid + ", " + data.g.gdte + '\n=====';
	return str;
}

function finalScoreCalculate(data){
	const scoreHls = data.g.hls.pstsg.reduce((acc, val, index) => {
		return acc += ((data.g.hls.pstsg[index].tpm * 3) + (data.g.hls.pstsg[index].ftm) + ((data.g.hls.pstsg[index].fgm - data.g.hls.pstsg[index].tpm) * 2))  	
	}, 0);
	const scoreVls = data.g.vls.pstsg.reduce((acc, val, index) => {
		return acc += ((data.g.vls.pstsg[index].tpm * 3) + (data.g.vls.pstsg[index].ftm) + ((data.g.vls.pstsg[index].fgm - data.g.vls.pstsg[index].tpm) * 2))  	

	}, 0);
	return [scoreHls, scoreVls];
}

function finalScoreStr(data){
//Returns a string with the calculated final score for both teams from the passed in data
	const score = finalScoreCalculate(data); 
	let teamHls = data.g.hls.tc + " " +  data.g.hls.tn + " - " + score[0];
	let teamVls = data.g.vls.tc + " " +  data.g.vls.tn + " - " + score[1]; 
	const str = teamHls + '\n' + teamVls;
	return str;
}

function mostReboundsHls(data){
//Returns the value of the most rebounds hls
	let base = data.g.hls.pstsg[0].dreb + data.g.hls.pstsg[0].oreb;
	let name = data.g.hls.pstsg[0].fn + " " + data.g.hls.pstsg[0].ln;
	data.g.hls.pstsg.forEach(function(val){
		if (parseInt(val.dreb) + parseInt(val.oreb) > base){
			base = parseInt(val.dreb) + parseInt(val.oreb);
			name = val.fn + " " + val.ln;
		}
	});
	return [name, base];
}
function mostReboundsVls(data){
//Returns the value of the most rebounds vls
	let base = data.g.vls.pstsg[0].dreb + data.g.vls.pstsg[0].oreb;
	let name = data.g.vls.pstsg[0].fn + " " + data.g.vls.pstsg[0].ln;
	data.g.vls.pstsg.forEach(function(val){
		if (parseInt(val.dreb) + parseInt(val.oreb) > base){
			base = parseInt(val.dreb) + parseInt(val.oreb);
			name = val.fn + " " + val.ln;
		}
	});
	return [name, base];
}

function mostRebounds(data){
//Returns the str of the most rebounds
	const rebH = mostReboundsHls(data);
	const rebV = mostReboundsVls(data);
	let reb = [];
	if(rebH[1] > rebV[1]){
		reb.push(rebH[0]);
		reb.push(rebH[1]);
	}
	else{
		reb.push(rebV[0]);
		reb.push(rebV[1]);
	}
	const str = "* Most rebounds:" + reb[0] + " with " + reb[1];
	return str;
}

module.exports = {
	processGameData: processGameData
};
