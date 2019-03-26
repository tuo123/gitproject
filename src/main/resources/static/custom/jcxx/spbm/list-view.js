"use strict";
$(function(){
	if(Auth.lacksPower('jcxx-spbm&add')){
		$('#tree-cxt').find('[data-opr="add"]').hide();
	}
	if(Auth.lacksPower('jcxx-spbm&edit')){
		$('#tree-cxt').find('[data-opr="edit"]').hide();
	}
	if(Auth.lacksPower('jcxx-spbm&delete')){
		$('#tree-cxt').find('[data-opr="remove"]').hide();
	}
	
	var $spbmTree =  $('#spbm-tree');
	if(Auth.hasPower('jcxx-spbm&see')){
		Msg.loading();
		$spbmTree.tree({
			url: '/spbm/findTree',
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
		var node = $spbmTree.tree('getSelected');
		switch(opr) {
		case 'add':
			spbmform.clear();
			spbmform.bindForm('/spbm/addEntity', function(res) {
				console.log(res);
				if(res.succ) {
					var m = spbmform.formData();
					var data = res.data;
					Msg.success(res.msg, function(){
						$spbmTree.tree('append', {
							parent: (node?node.target:null),
							data: [{
								id: data.guid, 
								text: m.mc, 
								pid: node.bm,
								bm:m.bm,
								spflbm:m.spflbm
							}]
						});
						spbmform.clear();
					});
				}else {
					Msg.warning(res.msg);
				}
			});
			$('#pid-show').textbox('setValue',node.bm);
			initCs();
			break;
		case 'remove':
			Msg.confirm('是否执行此操作?', function(r){
				if(r) {					
					Http.post('/spbm/delete', {guids: node.id}, function(res) {
						if(res.succ) {
							Msg.success(res.msg, function(){
								$spbmTree.tree('remove', node.target);
								spbmform.clear();
								initCs();
							});
						}else {
							Msg.warning(res.msg);
						}
					});
				}
			})
			break;
		case 'edit':
			spbmform.clear();
			spbmform.bindForm('/spbm/editEntity',function(res) {
				if(res.succ) {
					Msg.success(res.msg, function(){
						spbmform.clear();
					});
				} else {
					Msg.warning(res.msg);
				}
			});
			Http.get('/spbm/findById?guid=' + node.id, function(res) {
				if(res.succ) {
					var pnode = $spbmTree.tree('getParent',node.target);
					if(pnode) $('#parentguid-show').textbox('setValue', pnode.text );
					var spbm = res.data.spbm;
					spbmform.load(spbm);
					$('#ybm').val(spbm.bm);
					$('#ymc').val(spbm.mc);
					$('#yspflbm').val(spbm.spflbm);
				} else {
					Msg.warning(res.msg);
				}
			});
			break;
		default:
			$('#spbm-tree').tree(opr,node.target);
			break;
		}
	});
	var spbmform = MyForm('#spbm-form');
//	spbmform.onSubmit(function(){
//		return true;
//	});
	
	$('#hsbz').combobox({
		onChange : function(){
			var val = $('#hsbz').combobox('getValue');
			if(val == '1'){
				$('#sl').numberbox({required:true,readonly:false});
			}else{
				$('#sl').numberbox({required:false,readonly:true});
			}
		}
	})
	$('#syyhbz').combobox({
		onChange : function(){
			var val = $('#syyhbz').combobox('getValue');
			if(val == '1'){
				$('#yhzc').combobox({required:true,readonly:false});
			}else{
				$('#yhzc').combobox({required:false,readonly:true});
			}
		}
	})

	//初始参数
	function initCs(){
		$('#hsbz').combobox('select','0');
		$('#syyhbz').combobox('select','0');
		$('#dj').numberbox('setValue',0);
	}
	
	initCs();
});