require ('./index.css')
require ('pages/common/footer')
require ('pages/common/logo')
var _util = require ('util')

$(function(){
	var type = _util.getParamFromUrl('type') || 'default';
	$('.'+type).show()
})