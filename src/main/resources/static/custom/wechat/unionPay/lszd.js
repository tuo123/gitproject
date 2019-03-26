$(function() {

	var openid = $("#openid").val();
	
	$.showLoading("验证用户是否绑定微信！");
	
	if(openid){
		$.post("/wechat/yhgl/checkWxBd",{openid:openid},function(res){
			$.hideLoading();
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			if(res.succ){
				findLszd(res.data.wxyh.guid);
			}else {
				if(res.data.wxyh == "-1"){
					$.confirm("此微信还未绑定用户，请绑定后进行后续操作！",function(){
						//确认按钮
						window.location.href='/wechat/yhgl/yhbd?openid='+openid;
					})
				}
			}
			
		})
	}
	
	function findLszd(guid) {
		$.showLoading("正在获取历史账单记录……");
		$.post("/wechat/unionPay/findLszd",{wxyhGuid:guid},function(res){
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
//			console.log(res)
			
			if(res.succ){
				var payList = res.data.payList;
				var succDom = '<div class="weui-cells"><div class="weui-form-preview "><div class="weui-form-preview__hd" ><label class="weui-form-preview__label weui-cells_checkbox">'
					+'支付金额：</label><em class="weui-form-preview__value">{0}</em></div>'
					+'<div class="weui-form-preview__bd" styel="font-size:1.2em;">'
					
					+'<p><label class="weui-form-preview__label">交易状态：</label>'
					+'<span class="weui-form-preview__value">{1}</span></p>'
					
					+'<p><label class="weui-form-preview__label">付款渠道：</label>'
					+'<span class="weui-form-preview__value">{2}</span></p>'
					
					+'<p><label class="weui-form-preview__label">账单描述：</label>'
					+'<span class="weui-form-preview__value">{3}</span></p>'
					
					+'<p><label class="weui-form-preview__label">商户：</label>'
					+'<span class="weui-form-preview__value">{4}</span></p>'
					
					+'<p><label class="weui-form-preview__label">创建时间：</label>'
					+'<span class="weui-form-preview__value">{5}</span></p>'
					
					+'<p><label class="weui-form-preview__label">商户订单号：</label>'
					+'<span class="weui-form-preview__value">{6}</span></p>'
					
					
					
					
					+'</div></div></div>';
				
				var wgqDom = '<div class="weui-cells"><div class="weui-form-preview"><div class="weui-form-preview__hd" ><label class="weui-form-preview__label weui-cells_checkbox">'
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
				
				if(payList && payList.length > 0){
					$("#succ").empty();
					$("#dzf").empty();
					var wgqFlag = false;
					for ( var i in payList) {
						var pay = payList[i];
						//优惠前金额
						var originalAmount = pay.originalAmount/100+'元';
						//总金额
						var totalAmount = calc(pay.totalAmount,100,"divide")+'元';
						//实际付款金额
						var invoiceAmount = calc(pay.invoiceAmount||0,100,"divide")+'元';
						var requestTimestamp = JSTools.formatServerDate(pay.requestTimestamp,"yyyy-MM-dd HH:mm:ss");
						var merOrderId = pay.merOrderId;
						var cphm = pay.cphm;
						var status = pay.status;
						
						var company = pay.company;
						
						var zfgj = pay.zfgj;
						var orderDesc = pay.orderDesc;
						
						
						var date = new Date().getTime();
						if(pay.status == "WAIT_BUYER_PAY" || pay.status == "NEW_ORDER"){
							status = pay.status == "WAIT_BUYER_PAY" ? "待支付" : pay.status == "NEW_ORDER" ? "新订单" : "" ;
							var intDiff = (25*60)-(date-pay.requestTimestamp)/1000;
							wgqFlag = true;
							$("#dzf").append(JSTools.format(wgqDom,totalAmount||"",status||"",orderDesc||"",company||"",requestTimestamp||"",merOrderId||""))
							jxzf(pay.payUrl);
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
									location.reload();
								}
								if (minute <= 9) minute = '0' + minute;
								if (second <= 9) second = '0' + second;
			//					$('#day_show').html(day+"天");
			//					$('#hour_show').html('<s id="h"></s>'+hour+'时');
								$("#minute_show").html(minute+'分');
								$("#second_show").html(second+'秒');
								$("#dzf").show();
								$("#djs").show();
								$("#lszdDiv").show();
								$("#jxzf").show();
								
								intDiff--;
							}, 1000);
							
						}else{
							if(status == "TRADE_SUCCESS"){
								status =  "成功" ;
								
							}else if(status == "TRADE_REFUND"){
								status = "已退款";
							}else{
								status = "未知"
							}
							
							$("#succ").append(JSTools.format(succDom,invoiceAmount||"",status||"",zfgj||"",orderDesc||"",company||"",requestTimestamp||"",merOrderId||""));
							
						}
						
					}
					
					$("#succ").show();
					if(!wgqFlag){
						
						$("#lszdDiv").show();
					}
				}else{
					$.hideLoading();
					$.alert("未查询到您有支付成功的账单！！！",function(){
						window.location.href = '/wechat/yhgl/grzx?openid='+openid;
					})
				}
				$.hideLoading();
			}else{
				$.hideLoading();
				$.alert("未查询到您有支付成功的账单！！！",function(){
					window.location.href = '/wechat/yhgl/grzx?openid='+openid;
				})
			}
			
			
			
			
		})
	}
	
	function jxzf (url){
		$("#lszdDiv").on("click",'#jxzf',function(){
			if(url != "" ){
				$.showLoading("正在调起支付……")
				window.location.href = url;
			}
		})
		
	}
	
	$("#lszdDiv").on("click",'#kfp',function(){
		$.alert("自助电子发票开票功能开发中……");
		
//		window.location.href = "/wechat/bwkp/kplist?openid="+openid;
	})
	
	
	
})