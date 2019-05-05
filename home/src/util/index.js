var Hogan = require('hogan.js')
var _util = {
	request:function(options){
		var _this = this
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || 'json',
			data:options.data || '',
			success:function(result){
				//1.成功
				if (result.code == 0) {
					options.success && options.success(result.data)
				}
				//2.失败
				else if (result.code == 1) {
					options.error && options.error(result.message)
				}
				//3.没有权限
				else if (result.code == 10) {
					//跳转登录页面
					_this.goLogin()
				}
			},
			error:function(err){
				options.error && options.error(err.statusText)
				/*
				if(options.error){
					options.error(err.statusText)
				}
				*/
			}
		})
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	confirm:function(msg){	
		return window.confirm(msg)
	},
	goLogin:function(){
		window.location.href = './user-login.html/?redirect='+window.location.href
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamFromUrl:function(key){
		//?type=register
		//?name=tom&&type=register
		//?name=tom&&type=register&&id=123
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg)
		return result ? decodeURIComponent(result[2]) : null;
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var output = template.render(data);	
		return output;
	},
	validate:function(value,type){
		var value = $.trim(value)
		//非空验证
		if (type == 'require') {
			return !!value;
		}
		//用户名格式不正确
		if (type == 'username') {
			return /^[a-zA-Z0-9_]{3,6}/.test(value)
		}
		//密码格式验证
		if (type == 'password') {
			return /^[a-zA-Z0-9_]{3,6}/.test(value)
		}
		//手机格式验证
		if (type == 'phone') {
			return /^1[3856]\d{9}/.test(value)
		}
		//邮箱格式验证
		if (type == 'email') {
			return /^\w+@\w+\.\w{2,6}$/.test(value)
		}

	}
}
module.exports = _util;