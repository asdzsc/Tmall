var _util = require('util')

var _product = {
	getProductList:function(data,success,error){
		_util.request({
			url:'/product/home/list',
			success:success,
			data:data,
			error:error,	
		})
	},
	getProductDetail:function(data,success,error){
		_util.request({
			url:'/product/home/detail',
			success:success,
			data:data,
			error:error,	
		})
	},
}

module.exports = _product