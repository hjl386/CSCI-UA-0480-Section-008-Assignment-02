// hoffy.js

function prod(num1, ...numN){
//Returns the product of the arguments as a type Number, if there are no arugements the returns undefined, if there is a single argument then it retruns that argument 
	let nums = [];
	nums.push(num1);	
	nums.push(...numN);
//	console.log("array " + nums);
	if(nums.length === 0){
		return undefined;
	} else if(nums.length === 1){
		return nums[0];
	} else {
		const product = nums.reduce(function(acc, n){
				return acc * n;		
				}, 1);
//		console.log(product);	
		return product;
	}
}

function any(arr, fn){
//Returns true or false depending on whether or not any of the elements in the Array pass the test(fn).  Returns true as long as one test passes
	const arrNew = arr.filter(fn);
	if (arrNew.length > 0){return true;}
	else {return false;}
}

function maybe(fn){
//Takes in a function, calls it, and then returns its value unless it was passed in undefined or null parameters in which case it returns undefined
	return function(...args){
		let arr = [...args];
		console.log(arr);
		console.log(...args);
		arr.filter(function(a){
			if (a !== undefined || a !== null){
				return a;
			}
		});
		console.log(arr);
		if (arr.length !== [...args].length){
			return undefined;
		} else{
			fn(...args);
		} 	
	}
}

module.exports = {
	prod: prod,
	any: any,
	maybe: maybe
}

