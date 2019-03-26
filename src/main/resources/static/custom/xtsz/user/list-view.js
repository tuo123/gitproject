"use strict";
$(function(){
	var toolbars = {
		toolBtnGroup: {
			btns: function(btn){
				if(Auth.hasPower('xtsz-user&add')) {
					btn.addBtn('增加', 'icon-save', function(){
						showRoles(function(roles){
							$('#pwd-group').show();
							userform.clear();
							$('#username-hide').val('');
							$("#username-form").textbox({required: true});
							$('#username-info').hide();
							$("#username-form").next().show();
							
							userform.bindForm('/user/addEntity',succ);
							$('#user-dlg').dialog('open');
						});
					});
				}
				if(Auth.hasPower('xtsz-user&edit')) {
					btn.addBtn('编辑', 'icon-edit', function(){
						grid.getSelected(function(entities) {
							var entity = entities[0];
							showRoles(function(){
								$('#pwd-group').hide();
								
								userform.clear();
								userform.load(entity);
								userform.bindForm('/user/editEntity',succ);
								$('#username-hide').val(entity.username);
								
								$("#username-form").textbox({required: false});
								$("#username-form").next().hide();
								$('#username-info').text(entity.username);
								$('#username-info').show();
								$('#username-form').textbox('setValue',null);
								
								$('#orgcode').combotree('setValue', entity.orgcode);
								
								var roles = entity.roles;
								$('#roles-area').find('input:checkbox').each(function(i,dom){
									for(var j in roles) {
										var role = roles[j];
										if(role.guid == dom.value) {
											$(dom).iCheck('check');
											break;
										}
									}
								});
								$('#user-dlg').dialog('open');
							});
						});
					});
				}
			}
		},
		toolInputGroup: {
			username: {
				type:'text',
				label: '登录名',
				mhcx: true
			},
			realname: {
				type: 'text',
				label: '真实姓名'
			}
		}
	};
	
	if(Auth.hasPower('xtsz-user&delete')) {
		toolbars.toolBtnGroup.remove = '/user/delete';
	}
	
	var grid = Grid('#data-grid')
	.setUrl('/user/findDataGrid')
	.setCols([[{
		field: 'username',
		title: '用户名',
		width: '150px'
	},{
		field: 'realname',
		title: '姓名',
		width: '250px'
	},{
		field: 'isenabled',
		title: '是否启用',
		formatter: function(val,row) {
			return val == '1' ? '是' : '否';
		}
	},{
		field: 'orgname',
		title: '所属单位'
	},{
		field: 'rolesStr',
		title: '拥有角色'
	}]])
	.setOptions({
		title: '用户列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {
			
		}
	})
	.toolbars(toolbars)
	.init();
	
	var userform = MyForm('#user-form');
	userform.onSubmit(function(){
		var roleguids = '';
		$('#roles-area').find('input:checkbox:checked').each(function(i,dom){
			roleguids +=  dom.value + '|';
		});
		if(JSTools.isEmpty(roleguids)) {
			Msg.warning('未选择用户角色！');
			return false;
		}
		$('#roleguids').val(roleguids);
		var username = $('#username-form').textbox('getValue');
		if(username) $('#username-hide').val(username);
		return true;
	});
	userform.bindBtn('.form-clear-custom','click',function(e){
		e.stopPropagation();
		userform.clear();
		$('#roles-area').find('input:checkbox:checked').iCheck('uncheck');
	});
	
	function succ(res){
		if(res.succ) {
			Msg.success(res.msg,function(){
				grid.reload();
				$('#user-dlg').dialog('close');				
			});
		}else {
			Msg.warning(res.msg);
		}
	}
	
	function showRoles(fn) {
		var $roleArea = $('#roles-area');
		var domstr =  $roleArea.html();
		if(JSTools.isEmpty(domstr)) {
			Http.get('/role/findAll', function(res) {
				if(res.succ) {
					var data = res.data;
					console.log(res)
					var roles = data.roles;
					for(var i in roles) {
						var role = roles[i];
						var ckid = 'minimal-checkbox-' + role.guid;
						var fsetid = 'fieldset-' + role.systype;
						var $ck = $('<label for="'+ckid+'"> <input type="checkbox" class="" id="'+ckid+'" value="'+role.guid+'" /> '+role.rolename+' </label>');
						if($roleArea.find('#'+fsetid).length == 0) {
							var $fs = $('<fieldset id="'+fsetid+'" class="skin-section scheduler-border"><legend class="scheduler-border">请选择角色</legend></fieldset>').append($ck);
							$roleArea.append($fs);
						} else {
							$roleArea.find('#'+fsetid).append($ck);
						}
					}
					$('.skin-section input:checkbox').iCheck({ 
						  labelHover : false, 
						  cursor : true, 
						  checkboxClass : 'icheckbox_flat-blue', 
						  radioClass : 'iradio_flat-blue', 
						  increaseArea : '10%' 
					});
					if(fn) fn(data.roles);
				}
			});
		} else {
			$roleArea.find('input:checkbox').iCheck('uncheck');
			console.log('uncheck');
			if(fn) fn(null);
		}
	}
	
});