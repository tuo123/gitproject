$(function() {
	/*$("#hqyzm").click(function() {
		var lxdh = $("#lxdh").val();
		var txyzm = $("#txyzm").val();
		var params={};
		if(checkPhoneNum(lxdh)){
			$.alert(checkPhoneNum(lxdh));
		}else if (txyzm == "") {
			$.alert("请输入图形验证码！")
		}
		else{
			var url = "/wechat/yhgl/getDxyzm";
			params.lxdh = lxdh;
			params.txyzm = txyzm;
			params.token = $('#token').val();
			console.log(params)
			$.showLoading("正在发送手机验证码，请稍候。");
			$.post(url,params,function(res){
				if (JSTools.isStr(res))
					res = $.parseJSON(res);
				$.hideLoading();
				$('#token').val(res.data.dxyzmToken);
				if(res.succ){
					$("#dxyzmKey").val(res.data.dxyzmKey);
					hqsjyzmdjs();
				}else{
					$.alert(res.msg)
				}
			})
			
		}
	})*/
	
	$("#submit").click(function() {
		var name = $("#name").val();
		var cphm = $("#cphm").val();
		var txyzm = $("#txyzm").val();
		var dph = $("#dph").val();
//		var lxdh = $("#lxdh").val();
//		var dxyzm = $("#dxyzm").val();
//		var dxyzmKey = $("#dxyzmKey").val();
		var openid = $("#openid").val();
		var params = {};
		if(openid){
			if(name && cphm && txyzm && dph){
				if(dph.length == 6 ){
					params.name = name;
					params.cphm = cphm;
					params.txyzm = txyzm;
					params.openid = openid;
					params.dph = dph;
					var url = '/wechat/yhgl/yhAdd';
					$.showLoading("正在提交用户数据，请稍候……")
					
					$.post(url,params,function(res){
						if (JSTools.isStr(res))
							res = $.parseJSON(res);
						$.hideLoading();
						if(res.succ){
							window.location.href = '/wechat/yhgl/grzx?openid='+openid;
						}else{
							$.alert(res.msg)
						}
					})
				}else{
					$.alert("请输入您这个车牌号码所对应车辆的底盘号后6位！")
				}
			
				
			}else{
				$.alert('请输入完整信息!');
			}
		}else {
			$.alert("未获取到微信信息，请后退重新进入页面！");
		}
		
	})
	
	
	
	
	//手机正则验证
	function checkPhoneNum(val){
		if(val.length == 11){
			var myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
            if (!myreg.test(val)) {
                return "请输入正确格式的手机号码！";
            } else {
                return false;
            }
		}else{
			return "请填写11位数的手机号码！";
		}
	}
	
	function hqsjyzmdjs() {
	     //定时器
	     var startTime = 60;
	     var newTimer = setInterval(function (){
	         startTime --;
	         if(startTime < 0){
	        	 $("#hqyzm").show();
				$("#hqsjyzmdjs").hide();
	             clearInterval(newTimer); //停止定时器
	         }else{
	        	 $("#hqsjyzmdjs").html(startTime+'秒后重发');
	        	 $("#hqyzm").hide();
	     		 $("#hqsjyzmdjs").show();
	         }
	     },1000);
	}
	
})