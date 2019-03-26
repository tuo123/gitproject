"use strict";
$(function(){
	
	var toolbars = {
		toolBtnGroup: {
			
		},
		toolInputGroup: {
			rolename: {
				type:'text',
				label: '角色名称',
				mhcx: true
			},
			rolealias: {
				type: 'text',
				label: '角色代码'
			}
		}
	};
	if(Auth.hasPower('xtsz-jsgl&add')) {
		toolbars.toolBtnGroup.add = function(){
			roleform.clear();
			roleform.bindForm('/role/addEntity',formcallback);
			loadTree();
			$('#role-win').window('open');
		}
	}
	
	if(Auth.hasPower('xtsz-jsgl&edit')) {
		toolbars.toolBtnGroup.edit = function(){
			grid.getSelected(function(entities) {
				var entity = entities[0];
				roleform.clear();
				roleform.load(entity);
				loadTree(entity.guid);
				roleform.bindForm('/role/editEntity',formcallback);
				$('#role-win').window('open');
			});
		}
	}
	if(Auth.hasPower('xtsz-jsgl&delete')) {
		toolbars.toolBtnGroup.remove = '/role/delete';
	}
	
	var grid = Grid('#data-grid')
	.setUrl('/role/findDataGrid')
	.setCols([[{
		field: 'rolename',
		title: '角色名称'
	},{
		field: 'rolealias',
		title: '角色编码'
	},{
		field: 'isenabled',
		title: '是否启用',
		formatter: function(val,row) {
			return val == '1' ? '是' : '否';
		}
	}]])
	.setOptions({
		title: '角色列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {
			
		}
	})
	.toolbars(toolbars)
	.init();
	
	var roleform = MyForm('#role-form');
	roleform.onSubmit(function(){
		var nodes = $('#powername-tree').tree('getChecked', ['checked','indeterminate']);
		if(nodes.length > 0) {			
			var menuguids = ''
				,powernames = '';
			for(var i in nodes) {
				var node = nodes[i];
				var data = node.data;
				if(data.isMenu) {
					menuguids += node.id + '|';
				}
				powernames += data.powername + '|';
			}
			$('#menuguids').val(menuguids);
			$('#powernames').val(powernames);
			return true;
		}else {
			Msg.warning('未选择权限!');
			return false;
		} 
	});
	
	function formcallback(res) {
		if(res.succ) {
			Msg.success(res.msg, 2000, function(){
				$('#role-win').window('close');
				grid.reload();
			});
		}else {
			Msg.warning(res.msg);
		}
	}
	
	function loadTree(rguid) {
		$('#powername-tree').tree({
			url : '/menu/findMenuPowerTree?roleguid=' + rguid || '' ,
			method : 'get',
			animate : true,
			checkbox: true,
			onLoadSuccess: function(data){
				Msg.loadingClose();
			}
		});
	}
	
});