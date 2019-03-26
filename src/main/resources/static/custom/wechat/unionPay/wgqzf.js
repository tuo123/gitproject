$(function(){
	
	var payGuid = $("#payGuid").val();
	var openid = $("#openid").val();
	if(payGuid && openid ){
		var url = "";
		$.showLoading("正在获取待支付订单信息……")
		//查询未支付信息
		$.post("/wechat/unionPay/getWgqzfData",{openid:openid,payGuid:payGuid},function(res){
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			console.log(res)
			$.hideLoading();
			if(res.succ){
				var pay = res.data.pay;
				var jsds = JSON.parse(pay.wxdJson);
				if(jsds && jsds.length>0){
					//上次订单发起时间
					var scddDate = JSTools.formatServerDate(pay.requestTimestamp,"yyyy-MM-dd HH:mm:ss");
					url = pay.payUrl;
					var merOrderId = pay.merOrderId;
					//进入这里的一定是待支付
					var status = "待支付";
					var orderDesc = pay.orderDesc;
					var company = pay.company;
					var totalAmount = calc(pay.totalAmount||0,100,"divide");
					var dom = '<div class="weui-cells"><div class="weui-form-preview"><div class="weui-form-preview__hd" ><label class="weui-form-preview__label weui-cells_checkbox">'
						+'待付账款：</label><em class="weui-form-preview__value">{0}</em></div>'
						+'<div class="weui-form-preview__bd" styel="font-size:1.2em;">'
						+'<p><label class="weui-form-preview__label">支付状态：</label>'
						+'<span class="weui-form-preview__value">{1}</span></p>'
						+'<p><label class="weui-form-preview__label">账单描述：</label>'
						+'<span class="weui-form-preview__value">{2}</span></p>'
						+'<p><label class="weui-form-preview__label">商户全称：</label>'
						+'<span class="weui-form-preview__value">{3}</span></p>'
						+'<p><label class="weui-form-preview__label">创建时间：</label>'
						+'<span class="weui-form-preview__value">{4}</span></p>'
						+'<p><label class="weui-form-preview__label">商户订单号：</label>'
						+'<span class="weui-form-preview__value">{5}</span></p>'
						+'</div></div></div>';
					
					$("#perview").html(JSTools.format(dom,totalAmount+"元",status,orderDesc,company,scddDate,merOrderId))
					var date = new Date().getTime();
					var intDiff = (25*60)-(date-pay.requestTimestamp)/1000;
					
					
//				function timer(intDiff){
					window.setInterval(function(){
						var day=0,
						hour=0,
						minute=0,
						second=0;//时间默认值		
						if(intDiff > 0){
							day = Math.floor(intDiff / (60 * 60 * 24));
							hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
							minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
							second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
						}else{
							window.location.href = '/wechat/unionPay/jfzd?openid='+openid;
						}
						if (minute <= 9) minute = '0' + minute;
						if (second <= 9) second = '0' + second;
						//					$('#day_show').html(day+"天");
						//					$('#hour_show').html('<s id="h"></s>'+hour+'时');
						$('#minute_show').html('<s></s>'+minute+'分');
						$('#second_show').html('<s></s>'+second+'秒');
						$("#wgqDiv").show();
						intDiff--;
						
						
					}, 1000);
//				} 
					
					
					
				}
				
				
			}else{
				$.alert("获取待支付订单信息失败，请重试！",function(){
					window.location.href='/wechat/unionPay/jfzd?openid='+openid;
				});
			}
		})
		
	}else{
		$.alert("未获取到待支付订单信息，请退出重进！")
	}
	
	
	
	
	//继续支付
	$("#jxzf").click(function(){
		if(url != "" ){
			$.showLoading("正在调起支付……");
			window.location.href = url;
		}
	});
	
	$("#qxdd").click(function(){
		$.confirm("请确定要将该订单取消吗？",function(){
			$.showLoading("正在取消订单……")
			$.post("/wechat/unionPay/close",{openid:openid,payGuid:payGuid},function(res){
				if (JSTools.isStr(res))
					res = $.parseJSON(res);
				$.hideLoading();
				if(res.succ){
					$.showLoading("取消成功……")
					window.location.href='/wechat/unionPay/jfzd?openid='+openid;
				}else {
					$.alert("取消订单失败！"+res.msg||"",function(){
						window.location.href='/wechat/unionPay/wgqzf?openid='+openid+'&payGuid='+payGuid;
					})
				}
			})
		})
	})
	
	
	
})