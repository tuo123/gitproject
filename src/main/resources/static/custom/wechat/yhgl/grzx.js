$(function() {
	var openid = $("#openid").val();
//	$.showLoading();
//	$.showLoading("验证用户是否绑定微信！")
	
	//个人信息
	$("#grxx").click(function() {
		window.location.href = '/wechat/yhgl/grxx?openid='+openid;
	})
	//历史账单
	$("#lszd").click(function() {
		window.location.href = '/wechat/unionPay/lszd?openid='+openid;
		
	})
	
	
})