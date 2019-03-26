"use strict";
$(function(){
	if(Auth.lacksPower('jcxx-zdgl&add')) {
		$('.toolbar-btn[data-opr="add"]').remove();
	}
	if(Auth.lacksPower('jcxx-zdgl&edit')) {
		$('.toolbar-btn[data-opr="edit"]').remove();
	}
	if(Auth.lacksPower('jcxx-zdgl&delete')) {
		$('.toolbar-btn[data-opr="delete"]').remove();
	}
	
	$('.toolbar-btn').on('click', function(){
		var opr = this.getAttribute('data-opr');
		switch(opr){
		case 'add':
			myform.bindForm('/dic/addEntity', succ);
			myform.clear();
			$('#dic-win').window('open');
			break;
		case 'edit':
			var entities = $('#data-grid').treegrid('getSelections');
			if(entities.length > 0){
				var entity = entities[0];
				myform.clear();
				myform.load(entity);
				myform.bindForm('/dic/editEntity', succ);
				$('#dic-win').window('open');
			}
			break;
		case 'reload':
		case 'search':
			reloadGrid();
			break;
		case 'delete':
			var entities = $('#data-grid').treegrid('getSelections');
			if(entities.length > 0) {
				var guidArr = [];
				for(var i in entities){
					guidArr.push(entities[i]['guid']);
				}
				Msg.confirm(function(r){
					if(r){
						Http.post('/dic/delete', {guids: guidArr.join('|').toString() }, function(res){
							if(res.succ) {
								Msg.success(res.msg, function(){
									reloadGrid();
								});
							} else {
								Msg.warning(res.msg);
							}
						});
					}
				});
			} else {
				Msg.warning(Msg.UNSELECTED);
			}
			break;
		}
	});
	
	function reloadGrid() {
		$('#data-grid').treegrid('reload',{
			params: {
				dicname: '%' + $('#dicname-toolbar').textbox('getValue') + '%',
				dickey: '%' +  $('#dickey-toolbar').textbox('getValue') + '%',
				onlyParent: '1'
			}
		});
	}
	
	var myform = MyForm('#dic-form');
	function succ(res) {
		if(res.succ) {
			Msg.success('操作成功！',function(){
				myform.clear();
				$('#dic-win').window('close');
				reloadGrid();
			});
		} else {
			Msg.error('操作失败！');
		}
	}
	
	myform.bindForm('/dic/addEntity', succ);
	$('#data-grid').treegrid({
	    url:'/dic/findDataGrid',
	    idField:'guid',
	    treeField:'dickey',
	    toolbar: '#grid-btn-group',
	    pagination : true,
		pageSize : 5,
		pageNumber : 1,
		pageList: [5, 10, 20, 50, 100],
	    queryParams: {
	    	params: {
	    		onlyParent: '1'
	    	}
	    },
	    columns:[[
	    	{checkbox: true,field: 'grid',width: '50px'},
			{title:'字典键',field:'dickey',width: '100px'},
			{title:'字典值',field:'dicval',width: '100px'},
			{title:'字典名称',field:'dicname',width: '150px'},
	    ]]
	});
})