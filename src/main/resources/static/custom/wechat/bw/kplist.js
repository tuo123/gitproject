$(function() {
	
	var openid = $("#openid").val();
	$.showLoading("正在加载数据……");
	
	$.post("/wechat/bwkp/findWkp",{openid:openid},function(res){
		if (JSTools.isStr(res))
			res = $.parseJSON(res);
//		console.log(res)
		
		if(res.succ){
			var payList = res.data.payList;
//			console.log(payList)
			for ( var i in payList) {
					var pay = payList[i];
					var guid = pay.guid;
					var orderDesc = pay.orderDesc;
					var originalAmount = (pay.originalAmount)/100;
					var zfgj = pay.zfgj;
					var company = pay.company;
					var cphm = pay.cphm;
					var jdkhmc = pay.jdkhmc;
					var merOrderId = pay.merOrderId	;
					var requestTimestamp = JSTools.formatServerDate(pay.requestTimestamp,"yyyy-MM-dd HH:mm:ss");
					
					/*var dom = '<div class="weui-form-preview"><a href="javascript:void(0)" name="checkboxA" class="weui-form-preview__btn">'
						+'<div class="weui-form-preview__hd" ><label class="weui-form-preview__label weui-cells_checkbox">'
						+'<input type="checkbox" class="weui-check" name="checkbox" value="{0}" ><i class="weui-icon-checked"></i>金额</label>'
						+'<em class="weui-form-preview__value">{1}</em>'
						+'</div><div class="weui-form-preview__bd"><label class="weui-form-preview__label">订单号：</label>'
						+'<span class="weui-form-preview__value">{2}</span>'
						+'<label class="weui-form-preview__label">商品：</label>'
						+'<span class="weui-form-preview__value">{3}</span>'
						+'<label class="weui-form-preview__label">付款时间：</label>'
						+'<span class="weui-form-preview__value">{4}</span>'
						+'</div></a></div>';*/
					
					
					var dom = '<div class="weui-form-preview" style="margin: 15px 0 15px 0;">'
						+'<a href="javascript:void(0)" name="checkboxA" class="weui-form-preview__btn">'
						+'<div class="weui-form-preview__hd" >'
						
						+'<label class="weui-form-preview__label weui-cells_checkbox">'
						+'<input type="checkbox" class="weui-check" name="checkbox" value="{0}" >'
						+'<i class="weui-icon-checked"></i>支付金额</label>'
						+'<em class="weui-form-preview__value">{1}</em>'
						
						+'</div><div class="weui-form-preview__bd">'
						
						+'<label class="weui-form-preview__label">账单描述：</label>'
						+'<span class="weui-form-preview__value">{2}</span>'
						+'<label class="weui-form-preview__label">交易时间：</label>'
						+'<span class="weui-form-preview__value">{3}</span>'
						
					
						+'</div></a>'
						+'<input type="hidden" value="{4}"  name = "{5}" />'
						+'</div>';
					/*
						+'<div class="weui-form-preview__ft"><a class="weui-form-preview__btn weui-form-preview__btn_primary" name="{11}" href="javascript:">详情</a>'
						+'<input type="hidden" value="{12}"  name = "{13}" /></div></div>';*/
					
					
					
					$("#perview").append(JSTools.format(dom,originalAmount,originalAmount+"元",orderDesc,requestTimestamp,guid,"guid"));
				
			}
			$.hideLoading();
			$("#kplist").show();
			
		}else{
			$.alert("未获取到可开发票的账单数据",function(){
				window.location.href = "/wechat/unionPay/lszd?openid="+openid;
			})
		}
	})
	
	
	$("#qx").click(function() {
		if($(this).prop("checked")){
			//全选
			$("[name='checkbox']").prop("checked",true);
		}else  {
			//取消全选
			$("[name='checkbox']").prop("checked",false);
		}
		
	})
	
	//点击面板选中
	$('#perview').on('click',"[name='checkboxA']",function(){
		$(this).find("[name='checkbox']").each(function(){
			if(!$(this).prop("checked")){
				$(this).prop("checked",true);
			}else  {
				$(this).prop("checked",false);
			}
		});
		var checks = 0;
		var checkeds = 0;
		$("#perview").find("[name='checkbox']").each(function(){
			checks++
			if($(this).prop("checked")){
				checkeds++
			}
		});
		
		if(checks == checkeds){
			$("#qx").prop("checked",true);
		}else{
			$("#qx").prop("checked",false);
		}
	})
	
	//下一步
	$("#next").click(function(){
		var guids ="";
		$("#perview").find(".weui-form-preview").each(function() {
			if($(this).find("[name='checkbox']").prop("checked")){
				guids += $(this).find("[name='guid']").val() + ",";
			}
		})
		if(guids != ""){
			window.location.href = "/wechat/bwkp/kdzfp?guids="+guids+"&openid="+openid;
		}else{
			$.alert("你还未选择需要开发票的账单！")
		}
	});
	
	
})