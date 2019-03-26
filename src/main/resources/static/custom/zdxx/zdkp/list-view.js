"use strict";
$(function(){
	var toolbars = {
		toolBtnGroup: {
		},
		toolInputGroup: {
			'xdsjs,xdsjz': {
				label: '下单时间',
				type: 'date',
				between: true,
				style : {
					'width' : '110px'
				}
			},
			cphm: {
				type:'text',
				label: '车牌号码',
				mhcx: true
			},
			jdkhmc: {
				type:'text',
				label: '客户名称',
				mhcx: true
			},
			merOrderId: {
				type:'text',
				label: '订单号',
				mhcx:true
			},
			xdfs : {
				label: '下单方式',
				type : 'select',
				val: [{
					key: '1',
					val: '公众号自助缴费'
				},{
					key: '2',
					val: '二维码支付'
				},{
					key: '3',
					val: 'pos机支付'
				}],
				style : {
					'width' : '110px'
				},
				options:{
					valueField: 'key',
					textField: 'val'
				}
			}
		}
	};
	toolbars.toolBtnGroup.btns = function(btn){
		if(Auth.hasPower('zdxx-zdkp&kjdzfp')){
			btn.addBtn('开具电子发票', 'icon-email_go', function(){
				grid.getSelected(function(entities) {
					$('#fpnrDiv').html('');
					var entity = entities[0];
					$('#fftp-form').textbox('setValue',entity.cphm);
					var wxds = entity.wxdJson;
					if(JSTools.isStr(wxds)){
						wxds = $.parseJSON(wxds);
					}
					var fpje = 0.00;
					for(var i in entities){
						fpje += (entities[i].totalAmount/100);
					}
					$('#fpje-form').textbox('setValue',fpje);
					for(var i in wxds){
						var repairWO = wxds[i].repairWO;
						if(repairWO.wxxms || repairWO.fjxms){
							$('#fpnrDiv').append('<span>*劳务*维修费</span>');
						}
						if(repairWO.pjs){
							$('#fpnrDiv').append('<span>*交通运输设备*配件</span>');
						}
					}
					$('#fftp').textbox('setValue',entity.cphm);
					$('#dzfp-win').window('open');
				})
			},'kjdzfp');
		}
		if(Auth.hasPower('zdxx-zdkp&kjptfp')){
			btn.addBtn('开具普通发票', 'icon-note', function(){
				grid.getSelected(function(entities) {
					
				})
			},'kjptfp');
		}
		if(Auth.hasPower('zdxx-zdkp&kjzp')){
			btn.addBtn('开具专票', 'icon-asterisk_orange', function(){
				grid.getSelected(function(entities) {
					
				})
			},'kjzp');
		}
	}
	
	var grid = Grid('#data-grid')
	.setUrl('/zdkp/findDataGrid')
	.setCols([[{
		field: 'merOrderId',
		title: '订单号'
	},{
		field: 'showAmount',
		title: '订单支付总金额'
	},{
		field: 'zfgj',
		title: '支付工具'
	},{
		field: 'xdr',
		title: '下单人'
	},{
		field: 'xdfs',
		title: '下单方式',
		formatter: function(val,row){
			var res = '';
			if(val){
				res = (val == '1' ? '微信号自助缴费': val == '2' ? '二维码' : val == '3' ? 'pos机':'')
			}
			return res;
		}
	},{
		field: 'jdkhmc',
		title: '客户名称'
	},{
		field: 'cphm',
		title: '车牌号码'
	},{
		field: 'company',
		title: '公司'
	},{
		field: 'kpStatus',
		title: '开票状态',
		formatter : function(val,row){
			if(val){
				if('0' == val){
					return "未开票";
				}else if('1' == val){
					return "已开具电子发票";
				}else if('2' == val){
					return "已开具普通纸质发票";
				}else if('3' == val){
					return "已开具专票";
				}else if('12' == val){
					return "已开具电子发票和普通纸质发票";
				}else if('13' == val){
					return "已开具电子发票和专票";
				}
			}
			return "未知开票状态";
		}
	},{
		field: 'showStatus',
		title: '订单状态'
	}]])
//	.loadNow(false) //设置不立刻加载数据
	.setOptions({
		title: '账单信息列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {
		},
		onLoadSuccess : function(data){
		}
	})
	.toolbars(toolbars)
	.init();
});