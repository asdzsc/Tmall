require('pages/common/nav')
require('pages/common/search')
require('pages/common/side')
require('pages/common/footer')
var _side = require ('pages/common/side')
require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')
var _user = require('service/user')
var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(user){
			var html = _util.render(tpl,{
				user:user
			})
			$('.side-content').html(html)
		})
	}
}
$(function(){
	page.init()
})