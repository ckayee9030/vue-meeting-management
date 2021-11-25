"use strict";
module.exports = function (value) {
	var res = '';
	var l = value/11;
	while(l>0)
	{
		res += Math.random().toString(32).substring(2, 15);
    	l--;
	}
	return (res.substr(0,value));
};