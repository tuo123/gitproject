$(function(){
	if(vfUmsMisOcx.GetOcxVersion){
		vfUmsMisOcx.CtrlVersion=vfUmsMisOcx.GetOcxVersion();
	}
	var toolbars = {
		toolBtnGroup: {
		},
		toolInputGroup: {
			'jsrqs,jsrqz': {
				label: '结算日期',
				type: 'date',
				between: true,
				style : {
					'width' : '110px'
				}
			},
			vehicle: {
				type:'text',
				label: '车牌号码'
			},
			customer: {
				type:'text',
				label: '客户名称'
			},
			company: {
				type:'text',
				label: '公司'
			},
			bran: {
				type:'text',
				label: '品牌'
			},
			settleperson: {
				type:'text',
				label: '服务顾问'
			},
			vin: {
				type:'text',
				label: '底盘号'
			}
//			,
//			status : {
//				label: '单据状态',
//				type : 'select',
//				val: [{
//					key: 'all',
//					val: '全部'
//				},{
//					key: '1',
//					val: '保存'
//				},{
//					key: '2',
//					val: '提交'
//				},{
//					key: '3',
//					val: '审核'
//				},{
//					key: '4',
//					val: '结算'
//				}],
//				style : {
//					'width' : '110px'
//				},
//				options:{
//					valueField: 'key',
//					textField: 'val'
//				}
//			}
		}
	};
	toolbars.toolBtnGroup.btns = function(btn){
		if(Auth.hasPower('skgl-wxjsdsk&ewmsk')){
			btn.addBtn('二维码收款', 'icon-calculator_add', function(){
				grid.getSelected(function(entities) {
					if(entities.length > 1){
						Msg.warning('每次最多只能操作一张单据!');
						return;
					}else{
						var row = entities[0];
						Msg.confirm('确定对'+row.vehicle.cphm+'进行二维码收款吗?',function(r){
							if(r){
								ewmsk(row);
							}
						})
					}
				})
			},'ewmsk');
		}
		if(Auth.hasPower('skgl-wxjsdsk&tswxsk')){
			btn.addBtn('微信推送收款', 'icon-computer_add', function(){
				grid.getSelected(function(entities) {
					var data = '';
					var ztFlag = false;
					for(var i in entities){
						var entity = entities[i];
						
						if(entity.status != '审核'){
							ztFlag = true;
							break;
						}
						if(data.indexOf(entity.vehicle) < 0){
							data += (entity.vehicle.cphm + "|"+ entity.vehicle.cz + "|" +entity.repairType + ",");
						}
					}
					if(ztFlag){
						Msg.warning('您选择了状态不为审核的单据,请重选');
						return;
					}
					Msg.loading('正在推送微信缴费通知...')
					$.post('/repairSettlement/pushWechatMsg',{data:data.substring(0,data.length-1)},function(res){
						Msg.loadingClose();
						if(JSTools.isStr(res))
							res = $.parseJSON(res);
						if(res.succ){
							Msg.success(res.msg);
						}else{
							Msg.warning(res.msg);
						}
					})
				})
			},'tswxsk');
		}
		
		if(Auth.hasPower('skgl-wxjsdsk&postjsk')){
			btn.addBtn('pos机配置', 'icon-connect', function(){
				$('#pos-pz').window('open');
			},'postjsk');
		}
		
		if(Auth.hasPower('skgl-wxjsdsk&postjsk')){
			btn.addBtn('pos机收款', 'icon-connect', function(){
				grid.getSelected(function(entities) {
					if(entities.length > 1){
						Msg.warning('每次最多只能操作一张单据!');
						return;
					}else{
						var row = entities[0];
						var entrys = row.entrys;
						var amount = 0.00;
						for(var i in entrys){
							if(entrys[i].paymentType == '1'){
								amount += entrys[i].noReceivedAmount;
							}
						}
						$('#jsdhPos').val(row.id);
						$('#TransAmount').numberbox('setValue',amount);
						$('#pos-pay').window('open');
					}
				})
			},'postjsk');
		}
	}
	
	var grid = Grid('#data-grid')
	.setUrl('/repairSettlement/findDataGrid')
	.setCols([[{
		field: 'settleDate',
		title: '结算日期'
	},{
		field: 'bran',
		title: '品牌',
		formatter : function(val,row){
			return row.vehicle.pp;
		}
	},{
		field: 'cphm',
		title: '车牌号码',
		formatter : function(val,row){
			return row.vehicle.cphm;
		}
	},{
		field: 'vIN',
		title: '底盘号',
		formatter: function(val,row){
			return row.vehicle.dph;
		}
	},{
		field: 'customer',
		title: '客户名称',
		formatter: function(val,row){
			return row.vehicle.cz;
		}
	},{
		field: 'status',
		title: '单据状态'
	},{
		field: 'repairType',
		title: '维修类型'
	},{
		field: 'settleAmount',
		title: '结算总金额'
	},{
		field: 'settlePerson',
		title: '服务顾问'
	},{
		field: 'orgUnitName',
		title: '公司名称'
	}]])
	.loadNow(false) //设置不立刻加载数据
	.setOptions({
		title: '维修结算单列表',
		iconCls: 'icon-save',
		onDblClickRow : function(index, row) {
			showDetail('detail',row);
		},
		onLoadSuccess : function(data){
		}
	})
	.toolbars(toolbars)
	.init();
	$('#jsrqs-input-group').datebox('setValue',JSTools.getCurrentDate('yyyy-MM-dd'));
	$('#jsrqz-input-group').datebox('setValue',JSTools.getCurrentDate('yyyy-MM-dd'));
	$('#status-input-group').combobox('select','3');
	
	window.setTimeout(function(){
		$('#company-input-group').textbox({readonly:true});
		$('#company-input-group').textbox('setValue',Auth.userinfo.orgname);
		if(Auth.hasPower('skgl-wxjsdsk&ckqbgswxd')){
			$('#dw-tree').tree({
				url : '/org/findOrgTree',
				method : 'get',
				animate : true,
				onClick : function(node) {
					$('#company-input-group').textbox('setValue',node.text);
					$('#dw-dlg').dialog('close')
				}
			})
			$('#company-input-group').textbox({
				events : {
					focus : function() {
						$('#dw-dlg').dialog('open')
					},
				}
			});
		}
	},200)
	
	function showDetail(dore,row){
		$('#'+dore+'-dyrq').text(JSTools.getCurrentDate('yyyy-MM-dd HH:mm'));
		$('#'+dore+'-zdr').text(Auth.userinfo.username);
		var repairWO = row.repairWO;
		var vehicle = row.vehicle;
		var wxxms = repairWO.wxxms;
		var pjs = repairWO.pjs
		var jehz = repairWO.jehz;
		var fjxms = repairWO.fjxms;
		//公司名称
		$('#'+dore+'-company').text(row.orgUnitName);
		//车主
		$('#'+dore+'-sj').text(vehicle['cz']);
		//收费对象
		$('#'+dore+'-sfdx').text(vehicle['cz']);
		//实收金额
		$('#'+dore+'-ssje').text(row['yszk']);
		//结算单基本信息
		for(var field in row){
			if($('#'+dore+'-'+field).length > 0){
				$('#'+dore+'-'+field).text(row[field] || '');
			}
		}
		//工单基本信息
		for(var field in repairWO){
			if($('#'+dore+'-'+field).length > 0){
				$('#'+dore+'-'+field).text(repairWO[field] || '');
			}
		}
		//车辆信息
		for(var field in vehicle){
			if($('#'+dore+'-'+field).length > 0){
				$('#'+dore+'-'+field).text(vehicle[field] || '');
			}
		}
		$('#'+dore+'-'+'wxxmsAndPjs').html('');
		//维修项目和零件
		var trHtml = '<tr><td style="text-align:center;border-bottom:1px dotted #1E90FF">{0}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{1}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{2}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{3}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{4}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{5}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{6}</td>'
			+'<td style="text-align:center;border-left:1px solid #1E90FF;border-bottom:1px dotted #1E90FF">{7}</td></tr>';
		var tbodyHtml = '';
		for(var i in wxxms){
			var wxxm = wxxms[i];
			tbodyHtml += JSTools.format(trHtml,wxxm.lb,wxxm.name,'',wxxm.bz,'','',wxxm.gsf,wxxm.gsf);
		}
		$('#'+dore+'-'+'wxxmsAndPjs').append(tbodyHtml);
		$('#'+dore+'-'+'wxxmsAndPjs tr:last').find('td').each(function(i,dom){
			$(this).attr('style','text-align:center;border-left:1px solid #1E90FF;border-bottom:1px solid #1E90FF');
		})
		$('#'+dore+'-'+'wxxmsAndPjs tr:last td:first').attr('style','text-align:center;border-bottom:1px solid #1E90FF');
		tbodyHtml = '';
		for(var i in pjs){
			var pj = pjs[i];
			tbodyHtml += JSTools.format(trHtml,pj.lb,pj.name,pj.lbjh,'',pj.sl,pj.je,'',pj.je);
		}
		$('#'+dore+'-'+'wxxmsAndPjs').append(tbodyHtml);
//		$('#'+dore+'-'+'wxxmsAndPjs').html(tbodyHtml);
		$('#'+dore+'-'+'wxxmsAndPjs tr:last').find('td').each(function(i,dom){
			$(this).attr('style','text-align:center;border-left:1px solid #1E90FF;border-bottom:1px solid #1E90FF');
		})
		$('#'+dore+'-'+'wxxmsAndPjs tr:last td:first').attr('style','text-align:center;border-bottom:1px solid #1E90FF');
		
		$('#'+dore+'-gsfhj').text('');
		$('#'+dore+'-clfhj').text('');
		$('#'+dore+'-fjxmhj').text('');
		if(jehz && jehz.length > 0){
			for(var i in jehz){
				var hz = jehz[i];
				if(hz.lb == '1'){
					$('#'+dore+'-gsfhj').text(hz.jsje);
				}else if(hz.lb == '2'){
					$('#'+dore+'-clfhj').text(hz.jsje);
				}else if(hz.lb == '3'){
					$('#'+dore+'-fjxmhj').text(hz.jsje);
				}
			}
		}
		$('#'+dore+'-tyf').text('0');
		$('#'+dore+'-jtf').text('0');
		if(fjxms && fjxms.length > 0){
			for(var i in fjxms){
				if(fjxms[i].name = '拖运费' || fjxms[i].name == '拖车费'){
					$('#'+dore+'-tyf').text(fjxms[i].je);
				}else if(fjxms[i].name = '交通费'){
					$('#'+dore+'-jtf').text(fjxms[i].je);
				}
			}
		}
		if(dore == 'detail'){
			$('#jsd-detail').window('open');
		}else{
			$('#ewm-pay').window('open');
		}
	}
	
	function ewmsk(row){
		Msg.loading('正在发起支付生成二维码...');
		$.post('/repairSettlement/ewmsk',{cphm:row.vehicle.cphm,jsdh:row.id},function(res){
			Msg.loadingClose();
			if(JSTools.isStr(res))
				res = $.parseJSON(res);
			if(res.succ){
				var pay = res.data.pay;
				var amount = res.data.amount;
				$("#ewm-div").html('');
				$("#ewm-div").qrcode({
					render:"canvas",//canvas或table
					width:200,
					height:190,
					text:pay.ewmUrl
//					text:'https://qr-test2.chinaums.com/bills/qrCode.do?id=84e2721f9317429991f51e37cbf91881'
				});
				$("canvas").attr("id","erwCanvas");
				var canvas = document.getElementById('erwCanvas');
			    var context = canvas.getContext('2d'); 
			    var image = new Image();
			    var strDataURI =canvas.toDataURL("image/png");
			    document.getElementById('ewmImg').src = '';
			    document.getElementById('ewmImg').src = strDataURI;
				showDetail('ewm',row);
				$('#ewm-pay').window('open');
			}else{
				Msg.warning(res.msg);
			}
		})
	}
	$('#jsd-print-btn').on('click',function(){
		$('#jsd-print-btn').hide();
		printHtml($('#jsd-print-div').html());
		$('#jsd-print-btn').show();
	})
	
	$('#ewm-print-btn').on('click',function(){
		$('#ewm-print-btn').hide();
		printHtml($('#ewm-print-div').html());
		$('#ewm-print-btn').show();
	})
	
	//直接打印html 
	function printHtml(html) {
		var lodop = getLodop();
		if(lodop) {					
			lodop.PRINT_INIT(0);
				lodop.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
			lodop.ADD_PRINT_HTM(0, 0, '100%', '100%',"<!DOCTYPE html><html>"+html+"</html>");
//				lodop.PRINT_DESIGN();  //显示打印设计
//				lodop.PREVIEW();  //显示预览
			Msg.success('正在打印...')
			lodop.PRINT(); //不显示预览直接打印
		}else {
			alert('打印控件获取失败！');
		}
	}
	
	window.xf = function(){
		try{
			var qqbw = '{"HostIP":"'+vfUmsMisOcx.HostIP+'","HostPORT":'+vfUmsMisOcx.HostPORT
			+',"CurTimeOut":'+vfUmsMisOcx.CurTimeOut+',"TransAmount":'+$("#TransAmount").numberbox('getValue');
			var zfgj = $('#zffs-form').combobox('getValue');
			if(zfgj == '1'){
				zffs = '银行卡收单';
				qqbw +=',"AppName":"银行卡收单"}';
			}else{
				zffs = 'POS通';
				qqbw +=',"AppName":"POS通"}';
			}
			var jsdh = $('#jsdhPos').val();
			var zfje = $('#TransAmount').numberbox('getValue');
			Msg.loading('正在进行支付前检查...');
			$.post('/repairSettlement/posXd',{jsdh:jsdh,qqbw:qqbw,zfgj:zffs,zfje:zfje},function(res){
				Msg.loadingClose();
				if(JSTools.isStr(res))
					res = $.parseJSON(res);
				if(res.succ){
					var payGuid = res.data.guid;
					vfUmsMisOcx.initTransaction();
					vfUmsMisOcx.setCommuMode(1);
					vfUmsMisOcx.setEhernetParameter(vfUmsMisOcx.HostIP,vfUmsMisOcx.HostPORT);
					vfUmsMisOcx.setTimeout(vfUmsMisOcx.CurTimeOut);
//					alert(vfUmsMisOcx.setTransType)
					if(zffs == '银行卡收单'){
						vfUmsMisOcx.setTransType(20);
					}else if(zffs == 'POS通'){
						vfUmsMisOcx.setTransType(42);
					}
					vfUmsMisOcx.setAmount(zfje*100);
//					vfUmsMisOcx.setAmount(1);
					vfUmsMisOcx.setCallAppName(zffs);
					vfUmsMisOcx.setOperName(Auth.userinfo.username);
					var Ret = vfUmsMisOcx.startTrans();
					if(Ret != 0){
						var ResultCode = vfUmsMisOcx.getTransResultCode();
						var ResultString = vfUmsMisOcx.getTransResultString();
						var resJSON = vfUmsMisOcx.getTransResultJson();
						alert('交易失败,'+ResultString);
						Msg.loading('交易失败,正在处理...');
						$.post('/repairSettlement/posSkSb',{fhbw:resJSON,payGuid:payGuid},function(res){
							Msg.loadingClose();
						})	
					}else{
						Msg.loading('交易成功,正在处理数据...');
						var ResultCode = vfUmsMisOcx.getTransResultCode();
						var ResultString = vfUmsMisOcx.getTransResultString();
						var resJSON = vfUmsMisOcx.getTransResultJson();
						var fhbw = '{"resultCode":'+ResultCode+',"resultString":"'+ResultString+'"}';
						$.post('/repairSettlement/posSk',{jsdh:jsdh,payGuid:payGuid,fhbw:resJSON,zfje:zfje},function(res){
							Msg.loadingClose();
							if(JSTools.isStr(res))
								res = $.parseJSON(res);
							if(res.succ){
								$('#pos-pay').window('close');
								grid.reload();
								Msg.success(res.msg);
							}else{
								Msg.warning(res.msg);
							}
						})
					}
				}else{
					Msg.error(res.msg);
				}
			})
		}catch(ex){
			Msg.error(ex.message);
		}
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

	window.qk = function(){
		MyForm('#pospay-form').clear();
	}
	
});