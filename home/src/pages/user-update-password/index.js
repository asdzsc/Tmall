require('pages/common/nav')
require('pages/common/search')
require('pages/common/side')
require('pages/common/footer')
var _side = require ('pages/common/side')
require('./index.css')
var _user = require ('service/user')
var _util = require('util')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page = {
	init:function(){
		this.bindEvent();
		this.onload();
	},
	onload:function(){
		_side.render('user-update-password')
	},
	bindEvent:function(){
		var _this = this;
		//1.用户登录
		$('#btn-submit').on('click',function(){
			_this.submitUpdatePassword()
		})
		$('.side-content input').on('keyup',function(ev){
			if (ev.keyCode == 13) {
				_this.submitUpdatePassword()	
			}
		})
	},
	submitUpdatePassword:function(){
		//1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val())
		}
		//2.验证数据
		var validateResult = this.validate(formData)
		//3.发送请求
		console.log(validateResult)
		if (validateResult.status) {//验证通过
			formErr.hide()	
			_user.updatePassword(formData,function(){
				// _util.goHome()
				// console.log('reg ok')
				window.location.href = './result.html?type=user-update-password'
			},function(msg){
				formErr.show(msg)
			})
		}else {//验证失败
			formErr.show(validateResult.msg)	
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		//密码不能为空
		if (!_util.validate(formData.password,'require')) {
			result.msg = '密码不能为空'
			return result;
		}
		//密码格式不正确
		if (!_util.validate(formData.password,'password')) {
			result.msg = '密码格式不正确'
			return result;
		}
		//密码再次输入验证
		if (formData.password != formData.repassword) {
			result.msg = '两次密码不一致'
			return result;
		}
		result.status = true;
		return result;
	}
}
$(function(){
	page.init()
})