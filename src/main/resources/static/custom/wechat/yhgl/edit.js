$(function() {
	
	var guid = $("#guid").val();
	$.showLoading("获取用户信息中……")
	if(guid){
		$.post("/wechat/yhgl/findWxyh",{guid:guid},function(res){
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			if(res.succ){
				var wxyh = res.data.wxyh;
				$("#name").val(wxyh.name);
				$("#cphm").val(wxyh.cphm);
				$("#dph").val(wxyh.dph);
				$("#openid").val(wxyh.openid);
				$.hideLoading();
				$("#form").show();
			}else {
				$.alert("未获取到用户绑定信息！")
			}
		})
	}
	
	$("#submit").click(function(){
		var name = $("#name").val();
		var cphm = $("#cphm").val();
		var txyzm = $("#txyzm").val();
		var dph = $("#dph").val();
		var guid = $("#guid").val();
		var params = {};
		
		if(name && cphm && txyzm && dph){
			if(dph.length == 6 ){
				
				params.name = name;
				params.cphm = cphm;
				params.txyzm = txyzm;
				params.dph = dph;
				params.guid = guid;
				$.showLoading("正在修改……")
				$.post('/wechat/yhgl/editWxYh',params,function(res){
					if (JSTools.isStr(res))
						res = $.parseJSON(res);
					if(res.succ){
						window.location.href = "/wechat/yhgl/grxx?openid="+$("#openid").val();
					}else{
						$.hideLoading();
						$.alert(res.msg)
					}
				})
			}else{
				$.alert("请输入您这个车牌号码所对应车辆的底盘号后6位！")
			}
		}else{
			$.alert('请输入完整信息!');
		}
		
		
	})
	
	
})