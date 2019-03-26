$(function(){
	
	var guids = $("#guids").val();
	$.showLoading();
	$.post("/wechat/bwkp/findZdxx",{guids:guids},function(res){
		if (JSTools.isStr(res))
			res = $.parseJSON(res);
		console.log(res)
		var payList = res.data.payList;
		if(payList && payList.length > 0){
			var fptt = ""
			var fpje = 0.00;
			var fpnr = "";
			for ( var i in payList) {
				var pay = payList[i];
				
				if(fptt ==""){
					fptt = pay.cphm;
				}
			
				var wxdJson = $.parseJSON(pay.wxdJson);
				if(wxdJson && wxdJson.length > 0){
					for ( var i in wxdJson) {
						var wxd = wxdJson[i];
						var repairWO = wxd.repairWO;
						fpje = calc(fpje,wxd.yszk,"add");
						if(repairWO ){
							var jehz = repairWO.jehz;
							if(jehz && jehz.length > 0){
								
								for ( var j in jehz) {
									var hzxq = jehz[j]; 
									var lb = hzxq.lb;
									lb = lb == "1" ? "*劳务*维修费": lb == "2" ? "*交通运输设备*配件" : lb == "3" ? "" : "";
									var pDom = '<p>{0}</p>';
									if(lb != ""){
										
										$("#fpnr").append(JSTools.format(pDom,lb))
									}
								}
							}
						}
					}
				}
				
				$("#fptt").val(fptt);
				$("#fpje").val(fpje);
			}
			$("#kpxq").show();
			$.hideLoading();
		}
	});
	
	$("#qk").click(function(){
		$("#email").val("");
	})
	
	$("#submit").click(function(){
		var email = $("#email").val();
		var pattern = /^([a-z0-9A-Z_]+[\-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(\-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
		if(email){
			if(pattern.test(email)){
				$.showLoading("提交开票请求……");
				$.post("/wechat/bwkp/kp",{guids:guids,email:email},function(res){
					if (JSTools.isStr(res))
						res = $.parseJSON(res);
					
					$.hideLoading();
					if(res.succ){
						$.alert("开票成功，5分钟之内电子发票将会发送到您的邮箱。",function(){
							window.location.href = '/wechat/unionPay/lszd?openid='+$("#openid").val();
						})
					}else{
						$.alert(res.msg);
					}
				})
			}else{
				$.alert("您填写的邮箱不符合常用邮箱的规格，请换一个邮箱试试！")
			}
		}else{
			$.alert("请填写您的邮箱，我们将会把电子发票推送至您的邮箱！")
		}
	});
	
})

