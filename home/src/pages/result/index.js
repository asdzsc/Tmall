require ('./index.css')
require ('pages/common/footer')
require ('pages/common/logo')
var _util = require ('util')

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';
	if (type == 'payment') {
		var orderNo = _util.getParamFromUrl('orderNo')
		var $elem = $(".btn-order-detail")
		var href = $elem.attr('href') + orderNo;
		$elem.attr('href',href)
	}
	$('.'+type).show()
})