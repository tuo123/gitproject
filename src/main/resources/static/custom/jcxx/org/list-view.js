"use strict";
$(function(){
	var toolbars = {
			toolBtnGroup: {
			},
			toolInputGroup: {
				dwmc: {
					type:'text',
					label: '单位名称',
					mhcx: true
				},
				nsrbh: {
					type: 'text',
					label: '纳税人编号',
					mhcx: true
				}
			}
		};
		if(Auth.hasPower('jcxx-org&add')){
			toolbars.toolBtnGroup.add = function(){
				myform.bindForm('/org/addEntity', succ);
				myform.clear();
				$('#org-dlg').dialog('open');
			}
		}
		if(Auth.hasPower('jcxx-org&edit')){
			toolbars.toolBtnGroup.edit = function(){
				grid.getSelected(function(entities) {
					myform.clear();
					myform.load(entities[0]);
					myform.bindForm('/org/editEntity', succ);
					$('#org-dlg').dialog('open');
				});	
			}
		}
		if(Auth.hasPower('jcxx-org&delete')){
			toolbars.toolBtnGroup.remove = '/org/delete';
		}
		
		var grid = Grid('#data-grid')
		.setUrl('/org/findDataGrid')
		.setCols([[{
			field: 'dwmc',
			title: '单位名称'
		},{
			field: 'nsrbh',
			title: '纳税人编号'
		},{
			field: 'dz',
			title: '地址'
		},{
			field: 'khh',
			title: '开户行'
		},{
			field: 'dh',
			title: '电话'
		},{
			field: 'zh',
			title: '账号'
		},{
			field: 'skr',
			title: '收款人'
		},{
			field: 'fhr',
			title: '复核人'
		},{
			field: 'fxjdskyh',
			title: '反写金蝶收款银行'
		}]])
		//.loadNow(false) //设置不立刻加载数据
		.setOptions({
			title: '单位列表',
			iconCls: 'icon-save',
			onDblClickRow : function(index, row) {
			}
		})
		.toolbars(toolbars)
		.init();
		
		var myform = MyForm('#org-form');
		function succ(res) {
			grid.reload();
			if(res.succ) {
				$('#org-dlg').dialog('close');
				Msg.success('操作成功！');
			} else {
				Msg.error('操作失败！');
			}
		}
		myform.bindForm('/org/addEntity', succ);
})