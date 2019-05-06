require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _side = require ('pages/common/side')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var tpl = require('./index.tpl')
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || '',
	},
	init:function(){
		this.$elem = $('.order-box');
		this.loadOrderDetail();
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		var _this = this;
		_side.render('order-list')
	},
	bindEvent:function(){
		var _this = this;
		this.$elem.on('click','.btn-cancel',function(){
			if (_util.confirm('你确定删除该订单吗？')) {
				_order.cancelOrder(_this.params,function(order){
					_this.renderOrderDetail(order)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
	},
	loadOrderDetail:function(){
		var _this = this;
		if (this.params.orderNo) {
			_order.getOrder(this.params,function(order){
				_this.renderOrderDetail(order)
			},function(msg){
				_this.$elem.html('<p class="empty-msg">获取订单失败！！！</p>')
			})			
		}else {
			_this.$elem.html('<p class="empty-msg">订单号不存在！！！</p>')		
		}
	},
	renderOrderDetail:function(order){
		var _this = this;
		if (order) {
			console.log(order)
			//适配数据
			order.productList.forEach(function(product){
				product.image = product.images.split(',')[0]
			})
			order.createdTime = new Date(order.createdAt).toLocaleString()

			order.canPay = order.canCancel = order.status == '10'
			var html = _util.render(tpl,order)
			_this.$elem.html(html)
		}else {
			_this.$elem.html('<p class="empty-msg">订单不存在！！！</p>')		
		}		
	}
}
$(function(){
	page.init()
})