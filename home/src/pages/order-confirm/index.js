require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var _shipping = require('service/shipping')
var _modal = require('./modal.js')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box');
		this.$productBox = $('.product-box');
		this.selectedShippingId = '';
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShipping();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		this.$shippingBox.on('get-shippings',function(ev,shippings){
			_this.renderShipping(shippings)
			console.log(shippings)
		})
		//1.弹出地址框
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show()
		})									
	},
	loadShipping:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			console.log(shippings)
			_this.renderShipping(shippings)
		},function(msg){
			_util.showErrorMsg(msg)
		})
	},
	renderShipping:function(shippings){
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.$shippingBox.html(html)
	},
	loadProductList:function(){
		var _this = this;
		_order.getOrderProductList(function(result){
			if(result.cartList.length>0){
				//处理图片
				result.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0]
				})
				var html = _util.render(productTpl,result);
				_this.$productBox.html(html)
			}else{
				_this.$productBox.html('<p class="empty-msg">还没有选择购物车中的数据!</p>')	
			}			
		},function(msg){
			_this.$productBox.html('<p class="empty-msg">加载购物信息失败！！！</p>')
		})
	}

}
$(function(){
	page.init();
})