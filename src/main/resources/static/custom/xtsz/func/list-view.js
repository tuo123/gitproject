"use strict";
$(function(){
	var toolbars = {
		toolBtnGroup: {
		},
		toolInputGroup: {
			funcname: {
				type:'text',
				label: '功能名称',
				mhcx: true
			},
			funccode: {
				type: 'text',
				label: '功能代码'
			}
		}
	};
	if(Auth.hasPower('xtsz-gngl&add')){
		toolbars.toolBtnGroup.add = function(){
			myform.bindForm('/func/addEntity', succ);
			myform.clear();
			$('#func-win').window('open');
		}
	}
	if(Auth.hasPower('xtsz-gngl&edit')){
		toolbars.toolBtnGroup.edit = function(){
			grid.getSelected(function(entities) {
				myform.clear();
				myform.load(entities[0]);
				myform.bindForm('/func/editEntity', succ);
				$('#func-win').window('open');
			});	
		}
	}
	if(Auth.hasPower('xtsz-gngl&delete')){
		toolbars.toolBtnGroup.remove = '/func/delete';
	}
	
	var grid = Grid('#data-grid')
	.setUrl('/func/findDataGrid')
	.setCols([[{
		field: 'funcname',
		title: '功能名称'
	},{
		field: 'funccode',
		title: '功能编码'
	}]])
	//.loadNow(false) //设置不立刻加载数据
	.setOptions({
		title: '功能列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {

		}
	})
	.toolbars(toolbars)
	.init();
	
	var myform = MyForm('#func-form');
	function succ(res) {
		grid.reload();
		if(res.succ) {
			Msg.success('操作成功！');
		} else {
			Msg.error('操作失败！');
		}
	}
	myform.bindForm('/func/addEntity', succ);
	
});