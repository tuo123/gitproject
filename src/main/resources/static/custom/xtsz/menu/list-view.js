"use strict";
$(function(){
	if(Auth.lacksPower('xtsz-cdgl&add')){
		$('#tree-cxt').find('[data-opr="add"]').hide();
	}
	if(Auth.lacksPower('xtsz-cdgl&edit')){
		$('#tree-cxt').find('[data-opr="edit"]').hide();
	}
	if(Auth.lacksPower('xtsz-cdgl&delete')){
		$('#tree-cxt').find('[data-opr="remove"]').hide();
	}
	
	var $menuTree =  $('#menu-tree');
	if(Auth.hasPower('xtsz-cdgl&see')){
		Msg.loading();
		$menuTree.tree({
			url: '/menu/findTreeBySys',
			method: 'get',	
			animate: true,
			onLoadSuccess: function(data){
				Msg.loadingClose();
			},
			onContextMenu: function(e,node){
				e.preventDefault();
				$(this).tree('select',node.target);
				$('#tree-cxt').menu('show',{
					left: e.pageX,
					top: e.pageY
				});
			}
		});
	}
	
	$('#tree-cxt').find('.cxt-item').on('click', function(){
		var opr = this.getAttribute('data-opr');
		var node = $menuTree.tree('getSelected');
		switch(opr) {
		case 'add':
			menuform.clear();
			menuform.bindForm('/menu/addEntity', function(res) {
				if(res.succ) {
					var m = menuform.formData();
					var data = res.data;
					Msg.success(res.msg, function(){
						$menuTree.tree('append', {
							parent: (node?node.target:null),
							data: [{
								id: data.guid, 
								text: m.menuname, 
								pid: node.id,
								ptext: node.text,
								iconCls: m.iconclass
							}]
						});
						menuform.clear();
					});
				}else {
					Msg.warning(res.msg);
				}
			});
			$('#parentguid').val(node.id);
			$('#parentguid-show').textbox('setValue',node.text);
			
			$('#dlg-edit-panel').dialog('open');
			
			break;
		case 'remove':
			Msg.confirm('是否执行此操作?', function(r){
				if(r) {					
					Http.post('/menu/delete', {guids: node.id}, function(res) {
						if(res.succ) {
							Msg.success(res.msg, function(){
								$menuTree.tree('remove', node.target);
								menuform.clear();
							});
						}else {
							Msg.warning(res.msg);
						}
					});
				}
			})
			break;
		case 'edit':
			menuform.clear();
			menuform.bindForm('/menu/editEntity',function(res) {
				if(res.succ) {
					Msg.success(res.msg, function(){
						menuform.clear();
					});
				} else {
					Msg.warning(res.msg);
				}
			});
			Http.get('/menu/findById?guid=' + node.id, function(res) {
				if(res.succ) {
					var pnode = $menuTree.tree('getParent',node.target);
					if(pnode) $('#parentguid-show').textbox('setValue', pnode.text );
					var menu = res.data.menu;
					$('#iconclass-show').textbox({iconWidth: 22 ,icons: [{ iconCls: menu.iconclass }]});
					$('#iconclass-show').textbox('setValue', menu.iconclass)
					var funcGuids = [];
					for(var i in menu.funcList) {
						funcGuids.push(menu.funcList[i].guid);
					}
					$('#func-select').combobox('setValues', funcGuids);
					menuform.load(menu);
					$('#dlg-edit-panel').dialog('open');
				} else {
					Msg.warning(res.msg);
				}
			});
			break;
		default:
			$('#menu-tree').tree(opr,node.target);
			break;
		}
	});
	var menuform = MyForm('#menu-form');
	menuform.onSubmit(function(){
		var vals = $('#func-select').combobox('getValues');
		var v = '';
		for(var i in vals) {
			v += vals[i] + '|';
		}
		$('#funcstr').val(v);
		return true;
	});
	
	$('#icon-list').find('div').on('click', function(){
		var icon = this.getAttribute('class');
		$('#iconclass').val(icon);
		$('#iconclass-show').textbox('setValue', icon);
		$('#iconclass-show').textbox({iconWidth: 22 ,icons: [{ iconCls: icon }]})
		$('#dlg-icons').dialog('close');
	});
	
});