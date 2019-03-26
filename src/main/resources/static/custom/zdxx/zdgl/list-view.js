"use strict";
$(function(){
	if(vfUmsMisOcx.GetOcxVersion){
		vfUmsMisOcx.CtrlVersion=vfUmsMisOcx.GetOcxVersion();
	}
	

	
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
			},
			status : {
				label: '支付状态',
				type : 'select',
				val: [{
					key: 'NEW_ORDER',
					val: '新订单'
				},{
					key: 'WAIT_BUYER_PAY',
					val: '等待支付'
				},{
					key: 'TRADE_SUCCESS',
					val: '交易成功'
				},{
					key: 'TRADE_CLOSED',
					val: '交易失败'
				},{
					key: 'TRADE_REFUND',
					val: '已退款'
				},{
					key: 'UNKNOWN',
					val: '未知状态订单'
				},{
					key: 'FAIL_ORDER',
					val: '下单失败'
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
		if(Auth.hasPower('zdxx-zdgl&ddcx')){
			btn.addBtn("订单查验","icon-search",function(){
				Msg.confirm("请确认是否对账单进行查验！",function(r){
					if(r){
						grid.getSelected(function(entities) {
							if(entities.length > 1){
								Msg.warning('每次最多只能操作一张单据!');
								return;
							}else {
								var guid = entities[0].guid;
								if(entities[0].xdfs == "3"){
									Msg.warning("订单查询功能暂不支持POS机")
									return ;
								}
								if(guid){
									Msg.loading("正在查询...");
									$.post("/zdgl/ddcx",{guid:guid},function(res){
										Msg.loadingClose();
										if(JSTools.isStr(res))
											res = $.parseJSON(res);
										if(res.succ){
											var data = res.data.data;
											var sffx = res.data.sffx;
											if(data.errCode == "SUCCESS"){
												if(sffx =="-1"){
													Msg.warning("调用银联接口查询账单成功，账单已反写金蝶，无需再次反写。",function(){
														grid.reload();
													});
												}else if(sffx =="1"){
													Msg.warning("调用银联接口查询账单成功，账单已反写金蝶，但反写失败。",function(){
														grid.reload();
													});
												}else if(sffx =="2"){
													Msg.warning("调用银联接口查询账单成功，账单已反写金蝶，反写成功。",function(){
														grid.reload();
													});
												}
											}
//											console.log(res);
//											Msg.success(res.msg);
										}else{
											Msg.warning(res.msg);
										}
									});
								}
							}
						});
					}
				});
			});
		}
		if(Auth.hasPower('zdxx-zdgl&gbdd')){
			btn.addBtn('关闭订单', 'icon-calculator_add', function(){
				Msg.confirm("确认要进行关闭订单操作吗？",function(r){
					if(r){
						grid.getSelected(function(entities) {
							var guids = '';
							for(var i in entities){
								var entity = entities[i];
								if(entity.showStatus == '新订单' || entity.showStatus == '等待支付' ||  entity.showStatus == '不明确的交易状态'){
									guids += (entity.guid+"|");
								}
							}
							if(guids){
								guids = guids.substring(0,guids.length-1);
								Msg.loading("正在关闭订单...");
								$.post('/zdgl/closePay',{guids:guids},function(res){
									Msg.loadingClose();
									if(JSTools.isStr(res))
										res = $.parseJSON(res);
									if(res.succ){
										grid.reload();
										Msg.success(res.msg);
									}else{
										Msg.warning(res.msg);
									}
								})
							}else{
								Msg.warning('没有可以关闭的订单');
							}
						})
					}
				});
				
			},'gbdd');
		}
		
		
		
		if(Auth.hasPower('zdxx-zdgl&postk')){
			btn.addBtn('pos机配置', 'icon-connect', function(){
				$('#pos-pz').window('open');
			},'postk');
		}
		
		
		if(Auth.hasPower('zdxx-zdgl&refund')){
			btn.addBtn('退款', 'icon-computer_add', function(){
				Msg.confirm("确认要进行退款操作吗？",function(r){
					if(r){
						
						grid.getSelected(function(entities) {
							var guids = '';
							for(var i in entities){
								var entity = entities[i];
								//console.log(entity)
								/*if(entity.kpStatus != '0'){
							Msg.warning("选中的订单中有已经开具发票的，不能退款！");
						}*/
								if(entity.showStatus == '交易成功' ){
									guids += (entity.guid+"|");
								}
							}
							if(guids){
								guids = guids.substring(0,guids.length-1);
								if(entity.xdfs != '3'){
									
									Msg.loading("正在发起退款请求...");
									$.post('/zdgl/refundPay',{guids:guids},function(res){
										Msg.loadingClose();
										if(JSTools.isStr(res))
											res = $.parseJSON(res);
										if(res.succ){
											grid.reload();
											Msg.success(res.msg);
										}else{
											Msg.warning(res.msg);
										}
									})
									
								}else{
									Msg.loading("正在发起退款请求...");
									var returnJson = $.parseJSON(entity.returnJson);
									//交易初始化:
									vfUmsMisOcx.initTransaction();
									//设置通讯模式mode=0 为串口，mode=1 为 socket 模式
									vfUmsMisOcx.setCommuMode(1);
									//.设置 socket 通讯参数
									vfUmsMisOcx.setEhernetParameter(vfUmsMisOcx.HostIP,vfUmsMisOcx.HostPORT);
									//设置通讯超时时间
									vfUmsMisOcx.setTimeout(vfUmsMisOcx.CurTimeOut);
									//设置交易类型
									vfUmsMisOcx.setTransType(23);
									//设置交易金额returnJson.amt
									vfUmsMisOcx.setAmount(returnJson.amt);
									//设置支付应用 APP 名称：必须
									vfUmsMisOcx.setCallAppName("退货");
									
									//设置绑定操作员名称：可选
									vfUmsMisOcx.setOperName(Auth.userinfo.username);
									//设置原交易参考号，格式为 12 位数字组合串:可选
									vfUmsMisOcx.setRefNo(returnJson.refNo)
									//设置原交易日期，格式为月月日日 4 位数字组合串:可选
									vfUmsMisOcx.setDate(JSTools.formatServerDate(entity.requestTimestamp,"MMdd"))
									
									var Ret = vfUmsMisOcx.startTrans();
									//获取交易结果返回码：必选
									var ResultCode = vfUmsMisOcx.getTransResultCode();
									//获取交易结果中文意思：可选
									var ResultString = vfUmsMisOcx.getTransResultString();
									//获取支付应用交易返回 JSON 数据:可
									var resJSON = vfUmsMisOcx.getTransResultJson();
//									console.log("res="+resJSON)
									if(Ret != 0){
										alert('退款失败,'+ResultString);
									}else{
										var qqbw = '{"HostIP":"'+vfUmsMisOcx.HostIP
										+'","HostPORT":'+vfUmsMisOcx.HostPORT
										+',"CurTimeOut":'+vfUmsMisOcx.CurTimeOut
										+',"refundAmount":'+returnJson.amt
										+',"refNo":'+returnJson.refNo
										+'"date":'+JSTools.formatServerDate(entity.requestTimestamp,"MMdd")//原交易日期
										+',"AppName":"退货"}';
										
										$.post('/zdgl/refundPay',{guids:guids,qqbw:qqbw,fhbw:resJSON},function(res){
											Msg.loadingClose();
											if(JSTools.isStr(res))
												res = $.parseJSON(res);
											if(res.succ){
												grid.reload();
												Msg.success(res.msg);
											}else{
												Msg.warning(res.msg);
											}
										})
									}
									
								}
							}else{
								Msg.warning('没有可以退款的订单');
							}
							
							
							
						})
					}
				});
			},'refund');
		}
	}
	
	
	
	
	
	
	
	
	var grid = Grid('#data-grid')
	.setUrl('/zdgl/findDataGrid')
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
	},{
		field: 'jdfxStatus',
		title: '反写金蝶状态',
		formatter: function(val,row){
			var str = "失败";
			if(val == '2'){
				str = "成功";
			}
			return str;
		}
	}]])
//	.loadNow(false) //设置不立刻加载数据
	.setOptions({
		title: '账单信息列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {
			showDetail(row);
		},
		onLoadSuccess : function(data){
			
		}
	})
	.toolbars(toolbars)
	.init();
	function showDetail(row){
	}
	
	
	
	

	String.prototype.Blength = function(){  
		 var arr = this.match(/[^\x00-\xff]/ig);  
		 return  arr == null ? this.length : this.length + arr.length;  
	}  
	//检查控件
	window.GetOcxVersion = function (){
	 try{
		Msg.warning(vfUmsMisOcx.getOcxVersion());
	 }catch(ex){
		Msg.error(ex.message);
	 }       
	}

	window.ApplyConfig = function (){
		if(vfUmsMisOcx){
			vfUmsMisOcx.LogData = "";
			vfUmsMisOcx.CurTimeOut = 180;
			try{
				vfUmsMisOcx.HostIP=$("#HostIP").numberbox('getValue');
				 vfUmsMisOcx.HostPORT=$("#HostPORT").numberbox('getValue');
				 vfUmsMisOcx.CommuMode=1;
				 if(vfUmsMisOcx.GetOcxVersion){
					 Msg.success("已选择Socket方式通信\n"+
							 "主机地址:"+vfUmsMisOcx.HostIP+"\n"+
							 "主机端口:"+vfUmsMisOcx.HostPORT+"\n"+
							 "超时时间:"+vfUmsMisOcx.CurTimeOut); 
				 }
		    }catch(ex){
		    	Msg.error(ex.message);
			 }
		}
		
	}

	window.str2hex = function (s){
		var a,b,d;
		var hexStr = '';
		for (var i=0; i < s.length; i++) {
		d = s.charCodeAt(i);
		a = d % 16;
		b = (d - a)/16;
		hexStr += '%' + "0123456789ABCDEF".charAt(b) + "0123456789ABCDEF".charAt(a);
		}
		return hexStr;
	}

	window.charCode = function (v){
		return String.fromCharCode(v);
	}

	window.checkInstallOCx = function (){
		try{   
		 	 var   obj = new ActiveXObject("vfUmsMisOcx.vfUmsMisOcxCtrl.1"); 
		 	  Msg.success("已经注册");
		  } catch(e){   
			  Msg.error("没有注册,"+e.message);
		 }
	}
	window.qd = function (){
		try{
			vfUmsMisOcx.initTransaction();
			vfUmsMisOcx.setCommuMode(1);
			vfUmsMisOcx.setEhernetParameter(vfUmsMisOcx.HostIP,vfUmsMisOcx.HostPORT);
			vfUmsMisOcx.setTimeout(vfUmsMisOcx.CurTimeOut);
			vfUmsMisOcx.setTransType(10);
			vfUmsMisOcx.setOperName(Auth.userinfo.username)
			var Ret = vfUmsMisOcx.startTrans();
			if(Ret != 0){
				var ResultCode = vfUmsMisOcx.getTransResultCode();
				var ResultString = vfUmsMisOcx.getTransResultString();
				Msg.error("签到失败返回结果码:"+ResultCode+",签到失败返回数据:"+ResultString);
			}else{
				var ResultCode = vfUmsMisOcx.getTransResultCode();
				var ResultString = vfUmsMisOcx.getTransResultString();
				Msg.success("签到成功返回结果码:"+ResultCode+"签到成功返回数据:"+ResultString);
			}
		}catch(ex){
			Msg.error(ex.message);
		}
	}

	
	
});