const Router = require('express').Router;
const OrderModel = require('../models/order.js');

const router = Router();

router.get('/info',(req,res)=>{
	//todo.... 更具订单号获取订单信息,然后调用支付宝接口获取支付二维码
	res.json({
		code:0,
		data:{
			orderNo:req.query.orderNo,
			//该地址应该从支付宝接口获取
			qrUrl:"https://s2.ax1x.com/2019/05/06/EDptmV.jpg",

		}
	})

})

router.get('/status',(req,res)=>{
	let orderNo =  req.query.orderNo;
	OrderModel.findOne({orderNo:orderNo},'status')
	.then(order=>{
		res.json({
			code:0,
			data:order.status == 30
		})
	})
})
module.exports = router;