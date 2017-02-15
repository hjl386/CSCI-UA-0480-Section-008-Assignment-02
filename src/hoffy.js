// hoffy.js

function prod(num1, ...numN){
//Returns the product of the arguments as a type Number, if there are no arugements the returns undefined, if there is a single argument then it retruns that argument 
	let nums = [];
	nums.push(num1);	
	nums.push(...numN);
	if(nums.length === 0){
		return undefined;
	} else if(nums.length === 1){
		return nums[0];
	} else {
		const product = nums.reduce(function(acc, n){
				return acc * n;		
				}, 1);	
		return product;
	}
}

function any(arr, fn){
//Returns true or false depending on whether or not any of the elements in the Array pass the test(fn).  Returns true as long as one test passes
	const arrNew = arr.filter(fn);
	return arrNew.length > 0 ? true : false;
}

function maybe(fn){
//Takes in a function, calls it, and then returns its value unless it was passed in undefined or null parameters in which case it returns undefined
	return function(...args){
		let arr = [...args];
		arr.filter(function(a, index){
			if (a === undefined || a === null){
				arr.splice(index, 1);
			} else {
				return a;
			}	
		});
		if (arr.length !== [...args].length){
			return undefined;
		} else{
			return fn(...args);
		} 	
	}
}

function constrainDecorator(fn, min, max){

}

module.exports = {
	prod: prod,
	any: any,
	maybe: maybe,
	constrainDecorator: constrainDecorator
}

