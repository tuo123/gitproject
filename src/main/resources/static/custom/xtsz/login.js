"use strict";

if(window.location != window.top.location) {
	window.top.location.href = window.location.href;
}

$(function(){
	
	var isWarn = false;
	
	var loginform = MyForm('#login-form');
	loginform.onSubmit(function(){
		var username = $('#username-form').textbox('getValue');
		var password = $('#password-form').passwordbox('getValue');
		if(username && password){
			Msg.loading('正在登陆...');
			$.post('/home/loginValidate',{username:username,password:JSTools.encode64(password)},function(res){
				Msg.loadingClose();
				if(JSTools.isStr(res))
					res = $.parseJSON(res);
				if(res.succ) {
					window.top.location.href = res.data.homeUrl;
				}else {
					$('#password-form').passwordbox('setValue', '');
					isWarn = true;
					Msg.warning(res.msg);
				}
			});
		}
		return false;
	});
	
	
//	var loginform = MyForm('#login-form');
//	loginform.bindForm('/home/loginValidate', function(res){
//		if(res.succ) {
//			window.top.location.href = res.data.homeUrl;
//		}else {
//			$('#password-form').passwordbox('setValue', '');
//			isWarn = true;
//			Msg.warning(res.msg);
//		}
//	});
	$(document.body).on('keydown', function(event){
		if(event.keyCode === 13) {
			if(isWarn) {
				$('.messager-body').window('close');
			}
			loginform.$form.form('submit');
		} 
	});
	
});