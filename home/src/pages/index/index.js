import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var keywordsTpl = require('./keywords.tpl')
var swiper = require('./swiper.tpl')
var floorTpl = require('./floor.tpl')
var page = {
	keywords:[
		{item:[{name:'女装'},{name:'内衣'}]},
		{item:[{name:'男装'},{name:'运动户外'}]},
		{item:[{name:'女鞋'},{name:'男鞋'},{name:'箱包'}]},
		{item:[{name:'美妆'},{name:'个人护理'}]},
		{item:[{name:'腕表'},{name:'眼镜'},{name:'珠宝饰品'}]},
		{item:[{name:'手机'},{name:'数码'},{name:'电脑办公'}]},
		{item:[{name:'零食'},{name:'茶酒'},{name:'进口食品'}]},
		{item:[{name:'大家电'},{name:'生活电器'}]},
		{item:[{name:'汽车'},{name:'配件'},{name:'用品'}]},
		{item:[{name:'家纺'},{name:'家饰'},{name:'鲜花'}]},
	],
	swiper:[
		{image:require('images/carousel/carousel-01.jpg'),categoryId:'111'},
		{image:require('images/carousel/carousel-02.jpg'),categoryId:'222'},
		{image:require('images/carousel/carousel-03.jpg'),categoryId:'333'},
	],
	floor:[
		{
			title:'F1智能数码',
			item:[
					{image:require('images/floor/floor01-01.jpg'),text:'智能穿戴',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor01-02.jpg'),text:'智能出行',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor01-03.jpg'),text:'智能家居',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor01-04.jpg'),text:'智能机器人',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor01-05.jpg'),text:'智能航拍',categoryId:'5b84b36c50f099037f316c64'},
				]
		},
		{
			title:'F2热门手机',
			item:[
					{image:require('images/floor/floor02-01.png'),text:'手机出游季',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor02-02.png'),text:'手机新品专题',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor02-05.gif'),text:'正品好货',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor02-03.png'),text:'运营商狂欢',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor02-04.png'),text:'以旧换新',categoryId:'5b84b36c50f099037f316c64'},
				]
		},
		{
			title:'F3家用电器',
			item:[
					{image:require('images/floor/floor03-01.jpg'),text:'冰柜',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor03-02.jpg'),text:'洗衣机',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor03-03.jpg'),text:'空调',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor03-04.jpg'),text:'厨房卫浴',categoryId:'5b84b36c50f099037f316c64'},
					{image:require('images/floor/floor03-05.jpg'),text:'电视家影',categoryId:'5b84b36c50f099037f316c64'},
				]
		}
	],
	init:function(){
		this.loadKeywords();
		this.loadSwiper();
		this.loadFloor();
	},
	loadKeywords:function(){
		var html = _util.render(keywordsTpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	},
	loadSwiper:function(){
		var html = _util.render(swiper,{
			swiper:this.swiper
		});
		$('.swiper-container').html(html)
		var mySwiper = new Swiper ('.swiper-container', {
			loop: true, // 循环模式选项
			autoplay:{
				delay:5000
			},
			// 如果需要分页器
			pagination: {
			  el: '.swiper-pagination',
			  clickable:true
			},
			// 如果需要前进后退按钮
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
		})
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html)
	},
}
$(function(){
	page.init()
})