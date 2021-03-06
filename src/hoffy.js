// hoffy.js

const fs = require('fs');		//Imports the fs module for file reading

function prod(num1, ...numN){
//Returns the product of the arguments as a type Number, if there are no arugements the returns undefined, if there is a single argument then it retruns that argument 
	const nums = [];
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
		const arr = [...args];
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
	};
}

function constrainDecorator(fn, min, max){
	//Returns the value of the function unless the value is less than the min in which case it returns the min or the value is greater than the max and it returns the max value
	return function(number){
		return min === undefined && max === undefined ? Number(number) : number >= min && number <= max ? Number(number) : number < min ? min : max;
	};
}

function limitCallsDecorator(fn, n){
//Returns a function that does the same thing as the passed in function fn but can only be called n times.  After the nth call it does not return the original function, fn will not be called, and the return value will always be undefined.
	let counter = 0; 
	return function(...args){
		if(counter < n) {
			counter++;
			return fn(...args);			
		} else if(counter > n){
			return undefined;
		}
	};	
}

function mapWith(fn){
//Returns a function that takes one parameter, an array, performs the function for every value in the array returning a new array
	return function(arr){
		const arrNew = arr.map(fn);
		return arrNew;
	};
}

function simpleINIParse(s){
//Returns an object with the key-value pairs based on the passed in INI file ("foo=hi\nbar=hh\nbaz=gg', = separates the values and \n separates the pairs, if there is = then skip, if there is missing info foo= or =foo then assume ''). 
	let object = {};
	s = s.trim();
	const str = s.split('\n');
	const a = str.map(ele => {
		return ele.split('=');		
	});
	object = a.reduce((acc, curVal) => {
	if(curVal.length === 2){
			object[curVal[0]] = curVal[1];
			return object; 
		}
	}, 0);
	return object;
}

function readFileWith(fn){
//Takes a parsing function as a parameter and will return a new function that will take a fileName and a callback function as arguments, this function will parse the data.	
	return function(fileName, callBack){
		fs.readFile(fileName, 'utf8', (err, data) => {
			if(err){
				callBack(err, data);
				throw err;
			}
			const obj = fn(data);
			callBack(err, obj);	
		});
	};
}

module.exports = {
	prod: prod,
	any: any,
	maybe: maybe,
	constrainDecorator: constrainDecorator,
	limitCallsDecorator: limitCallsDecorator,
	mapWith: mapWith,
	simpleINIParse: simpleINIParse,
	readFileWith: readFileWith
};
