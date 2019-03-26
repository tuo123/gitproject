$(function() {
	var openid = $("#openid").val();
	$.showLoading("验证用户是否绑定微信！");
	
	if(openid){
		$.post("/wechat/yhgl/checkWxBd",{openid:openid},function(res){
			$.hideLoading();
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			if(res.succ){
				var wxyh = res.data.wxyh;
				$("#name").html(wxyh.name);
				$("#cphm").html(wxyh.cphm);
				$("#dph").html(wxyh.dph);
				$("#grxx").show();
				var guid = wxyh.guid;
				edit(guid);
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

	function edit(guid){
		
		$("#edit").on('click',function(){
			$.confirm("确认要修改你的个人信息吗？",function(){
				window.location.href = "/wechat/yhgl/editView?guid="+guid;
			})
			
		})
		
		$("#edit_jcbd").on("click",function(){
			$.confirm("请确认要解绑！",function(){
				$.showLoading("正在解绑中……")
				$.post("/wechat/yhgl/wxyhJcbd",{guid:guid},function(res){
					if(JSTools.isStr(res)){
						res = $.parseJSON(res);
					}
					$.hideLoading();
					if(res.succ){
						$.alert("已为你进行解绑，你可以换个微信号绑定你的车辆信息！",function(){
							location.reload();
						})
					}else {
						$.alert("未能解绑",function(){
							location.reload();
						})
					}
				})
			})
		})
		
	}
	
	
})