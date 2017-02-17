// basketfunc.js

function gameIDandDate(data){
//Returns a string with the "header", game id and date 
	const str = "Game ID: " + data.g.gid + ", " + data.g.gdte + '\n=====';
	return str;
}

function finalScoreCalculate(data){
	const scoreHls = data.g.hls.pstsg.reduce((acc, val, index) => {
		return acc += ((data.g.hls.pstsg[index].tpm * 3) + (data.g.hls.pstsg[index].ftm) + ((data.g.hls.pstsg[index].fgm - data.g.hls.pstsg[index].tpm) * 2));	
	}, 0);
	const scoreVls = data.g.vls.pstsg.reduce((acc, val, index) => {
		return acc += ((data.g.vls.pstsg[index].tpm * 3) + (data.g.vls.pstsg[index].ftm) + ((data.g.vls.pstsg[index].fgm - data.g.vls.pstsg[index].tpm) * 2)); 	

	}, 0);
	return [scoreHls, scoreVls];
}

function finalScoreStr(data){
//Returns a string with the calculated final score for both teams from the passed in data
	const score = finalScoreCalculate(data); 
	const teamHls = data.g.hls.tc + " " + data.g.hls.tn + " - " + score[0];
	const teamVls = data.g.vls.tc + " " + data.g.vls.tn + " - " + score[1]; 
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
	const reb = [];
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

function threePointCal(data){ //Should have mapped this instead of filter it 
//Calculates the threepoint
	const tpHls = data.g.hls.pstsg.filter(function(ele){
		return ele.tpa >= 5;
	});
	let base = parseInt(tpHls[0].tpm)/parseInt(tpHls[0].tpa); 
	let name = tpHls[0].fn + " " + tpHls[0].ln;
	const ratio = [];
	tpHls.forEach(function(val){
		if(parseInt(val.tpm)/parseInt(val.tpa) > base){
			base = val.tpm/val.tpa;
			name = val.fn + " " + val.ln;
			ratio.push(val.tpm);
			ratio.push(val.tpa);
		}
	});
	const tpVls = data.g.vls.pstsg.filter(function(ele){
		return ele.tpa >= 5;
	});
	let baseV = parseInt(tpVls[0].tpm)/parseInt(tpVls[0].tpa); 
	let nameV = tpVls[0].fn + " " + tpVls[0].ln;
	const ratioV = [];
	tpVls.forEach(function(val){
		if(parseInt(val.tpm)/parseInt(val.tpa) > base){
			baseV = val.tpm/val.tpa;
			nameV = val.fn + " " + val.ln;
			ratioV.push(val.tpm);
			ratioV.push(val.tpa);
		}
	});
	return [name, base, nameV, baseV, ratio, ratioV];
}

function threePoint(data){
//Returns the str of the threepoint data
	const arr = threePointCal(data);
	let base = 0;
	let name = "";
	let ratio = [];
	if(arr[1] > arr[3]){
		base = arr[1];
		name = arr[0];
		ratio = arr[4];
	} else{
		base = arr[3];
		name = arr[2];
		ratio = arr[5];
	}
	const str = "* Player with highest 3 point percentage that took at least 5 shots: " + name + " at %" + base*100 + " (" + ratio[0] + "/" + ratio[1] + ")";
	return str;
}

function block(data){
//Returns the str of block
	const bH = data.g.hls.pstsg.filter(function(ele){
		return ele.blk >= 1;
	});
	const bV = data.g.vls.pstsg.filter(function(ele){
		return ele.blk >= 1;
	});
	const len = bH.length + bV.length;
	const str = "* There were " + len + " players that had at least one block";
	return str;
}

function turnAssists(data){
//Returns the array of data with more turnovers than assists
	const taH = data.g.hls.pstsg.filter(function(ele){
		return ele.tov > ele.ast;
	});
	const taV = data.g.vls.pstsg.filter(function(ele){
		return ele.tov > ele.ast;
	});
	return [taH, taV];
}


function processGameData(data){
//Concatenoates all of the strings into the returned parsed string 
	let rep = "";
	const iDnDate = gameIDandDate(data);
	rep += iDnDate;
	const finalS = finalScoreStr(data);
	rep += '\n' + finalS;
	const rebs = mostRebounds(data);
	rep += '\n' + rebs;
	const tp = threePoint(data);
	rep += '\n' + tp;
	const blk = block(data);
	rep += '\n' + blk;
	rep += "\n* Players with more turnovers than assists:\n\t" + data.g.hls.tc + " - " + data.g.hls.tn + '\n'; 	
	const t = turnAssists(data);
	t[0].forEach(function(val){
		rep += ("\t* " + val.fn + " " + val.ln + " has an assist to turnover ratio of " + val.ast + ":" + val.tov + '\n'); 
	});
	rep += "\n* Players with more turnovers than assists:\n\t" + data.g.vls.tc + " - " + data.g.vls.tn + '\n'; 		
	t[1].forEach(function(val){
		rep += ("\t* " + val.fn + " " + val.ln + " has an assist to turnover ratio of " + val.ast + ":" + val.tov + '\n'); 
	});
	return rep;	 
}

module.exports = {
	processGameData: processGameData
};
