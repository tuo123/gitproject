$(function() {
	var jsdId = $("#jsdId").val();
	var openid = $("#openid").val();
	$.showLoading("正在获取结算单详细数据，请稍候……");
	if(jsdId){
		$.post("/wechat/unionPay/getJsdData",{jsdId:jsdId,openid:openid},function(res){
			if (JSTools.isStr(res)){
				res = $.parseJSON(res);
			}
			console.log(res)
			$.hideLoading();
			if(res.succ){
				var data = res.data.data;
				var payGuid = res.data.payGuid;
				if(data){
					
					$("#jsdxq").empty();
					//结算单ID
					var id = data.id;
					//结算单号
					var jsdNumber = data.jsdNumber||"";
					//公司名称
					var orgUnitName = data.orgUnitName||"";
					//维修类型
					var repairType = data.repairType||"";
					//结算金额
					var settleAmount = data.settleAmount||"";
					//结算时间
					var settleDate = data.settleDate||"";
					//服务顾问
					var settlePerson = data.settlePerson||"";
					//结算状态
					var status = data.status||"";
					
					var jsDom = '<div class="weui-cells"><h4 >结算信息</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算状态：</label>'
						+'<span class="weui-form-preview__value">{0}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算总金额：</label>'
						+'<span class="weui-form-preview__value">{1}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">维修类型：</label>'
						+'<span class="weui-form-preview__value">{2}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">服务顾问：</label>'
						+'<span class="weui-form-preview__value">{3}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算日期：</label>'
						+'<span class="weui-form-preview__value">{4}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算单号：</label>'
						+'<span class="weui-form-preview__value">{5}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">公司名称：</label>'
						+'<span class="weui-form-preview__value">{6}</span></div>'
						
						+'</div></div></div>';
					
					$("#jsdxq").append(JSTools.format(jsDom,status,settleAmount,repairType,settlePerson,settleDate,jsdNumber,orgUnitName));
					
					
					//车辆信息
					var vehicle = data.vehicle;
					if(vehicle){
						var cphm = vehicle.cphm||"";
						var cx = vehicle.cx||"";
						var cz = vehicle.cz||"";
						var czdz = vehicle.czdz||"";
						var dph = vehicle.dph||"";
						var fdjh = vehicle.fdjh||"";
						var pp = vehicle.pp||"";
						var ys = vehicle.ys||"";
						
						var vehicleDom = '<div class="weui-cells"><h4 >车辆信息</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
							
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">品牌：</label>'
							+'<span class="weui-form-preview__value">{0}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">车型：</label>'
							+'<span class="weui-form-preview__value">{1}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">底盘号：</label>'
							+'<span class="weui-form-preview__value">{2}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">发动机号：</label>'
							+'<span class="weui-form-preview__value">{3}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">颜色：</label>'
							+'<span class="weui-form-preview__value">{4}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">车牌号码：</label>'
							+'<span class="weui-form-preview__value">{5}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">车主：</label>'
							+'<span class="weui-form-preview__value">{6}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">车主地址：</label>'
							+'<span class="weui-form-preview__value">{7}</span></div>'
							
							+'</div></div></div>';
						
						$("#jsdxq").append(JSTools.format(vehicleDom,pp,cx,dph,fdjh,ys,cphm,cz,czdz));
					}
					
					
					
					//工单信息
					var repairWO =data.repairWO;
					if(repairWO){
						//工单号
						var gdNumber = repairWO.gdNumber||"";
						//进店里程
						var jdlc = repairWO.jdlc||"";
						//进店时间
						var jdsj = repairWO.jdsj||"";
						//进店油量
						var jdyl = repairWO.jdyl;
						jdyl = jdyl == "1" ? "0": jdyl == "2" ? "1/4": jdyl == "3" ? "2/4": jdyl == "4" ? "3/4" : jdyl == "5" ? "满": "" ;
						//下次保养日期
						var xcbysj = repairWO.xcbysj||"";
						//下次保养公里
						var xcbygl = repairWO.xcbygl||"";
						//实际完工日期
						var sjwgrq = repairWO.sjwgrq||"";
						//送修人
						var sxr = repairWO.sxr||"";
						//送修人电话
						var sxrdh = repairWO.sxrdh||"";
						//预交车时间
						var yjcsj = repairWO.yjcsj||"";
						//预约单号
						var yydh = repairWO.yydh||"";
						
						var repairWODom = '<div class="weui-cells"><h4 >工单信息</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
							
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">工单号：</label>'
							+'<span class="weui-form-preview__value">{0}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">预约单号：</label>'
							+'<span class="weui-form-preview__value">{1}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">送修人：</label>'
							+'<span class="weui-form-preview__value">{2}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">送修人电话：</label>'
							+'<span class="weui-form-preview__value">{3}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">进店时间：</label>'
							+'<span class="weui-form-preview__value">{4}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">进店里程：</label>'
							+'<span class="weui-form-preview__value">{5}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">进店油量：</label>'
							+'<span class="weui-form-preview__value">{6}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">预交车时间：</label>'
							+'<span class="weui-form-preview__value">{7}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">实际完工日期：</label>'
							+'<span class="weui-form-preview__value">{8}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">下次保养日期：</label>'
							+'<span class="weui-form-preview__value">{9}</span></div>'
							+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">下次保养公里：</label>'
							+'<span class="weui-form-preview__value">{10}</span></div>'
							
							+'</div></div></div>';
						
						$("#jsdxq").append(JSTools.format(repairWODom,gdNumber,yydh,sxr,sxrdh,jdsj,jdlc,jdyl,yjcsj,sjwgrq,xcbysj,xcbygl));
					}
					
					
					var wxxmDom = '<div class="weui-cells"><h4 >维修项目</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						+'<table id="wxxm"><thead >'
						+'<tr><th>类别</th><th>名称</th><th>班组</th><th>工时费</th></tr>'
						+'</thead>'
						+'<tbody></tbody></table></div></div></div>';
						
					var trDom = '<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td></tr>';
					var wxxms = repairWO.wxxms;
					if(wxxms && wxxms.length > 0){
						$("#jsdxq").append(wxxmDom);
						
						for ( var i in wxxms) {
							
							$("#jsdxq #wxxm tbody").append(JSTools.format(trDom,wxxms[i].lb,wxxms[i].name,wxxms[i].bz,wxxms[i].gsf));
						}
					}
					
					var pjDom = '<div class="weui-cells"><h4 >维修配件</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						+'<table id="pj"><thead >'
						+'<tr><th>类别</th><th>名称</th><th>数量/单位</th><th>金额</th></tr>'
						+'</thead>'
						+'<tbody></tbody></table></div></div></div>';
					var pjs = repairWO.pjs;
					if(pjs && pjs.length > 0){
						$("#jsdxq").append(pjDom);
						for ( var i in pjs) {
							$("#jsdxq #pj tbody").append(JSTools.format(trDom,pjs[i].lb,pjs[i].name,pjs[i].sl+pjs[i].dw,pjs[i].je));
						}
					}
					var fjxmDom = '<div class="weui-cells"><h4 >附加项目</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						+'<table id="fjxm"><thead >'
						+'<tr><th>名称</th><th>金额</th></tr>'
						+'</thead>'
						+'<tbody></tbody></table></div></div></div>';
					var trDom2 = '<tr><td>{0}</td><td>{1}</td></tr>';
					var fjxms = repairWO.fjxms;
					if(fjxms && fjxms.length > 0){
						$("#jsdxq").append(fjxmDom);
						for ( var i in fjxms) {
							$("#jsdxq #fjxm tbody").append(JSTools.format(trDom2,fjxms[i].name,fjxms[i].je));
						}
					}
					
					
					
					
					
					//金额汇总
					var jehzDom = '<div class="weui-cells"><h4 >金额汇总</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						+'<table id="jehz"><thead >'
						+'<tr><th>类别</th><th>结算金额</th></tr>'
						+'</thead>'
						+'<tbody></tbody></table></div></div></div>';
					var jehz = repairWO.jehz;
					if(jehz && jehz.length > 0){
						$("#jsdxq").append(jehzDom);
						for ( var i in jehz) {
							var lb = jehz[i].lb;
							lb = lb == "1" ? "维修项目": lb == "2" ? "维修配件": lb == "3" ? "附加项目": "合计" ;
							$("#jsdxq #jehz tbody").append(JSTools.format(trDom2,lb,jehz[i].jsje));
						}
					}
					
					var entrysDom = '<div class="weui-cells"><h4 >结算分录</h4><div class="weui-form-preview"><div class="weui-form-preview__bd">'
						
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算对象：</label>'
						+'<span class="weui-form-preview__value">{0}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">支付方式：</label>'
						+'<span class="weui-form-preview__value">{1}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">工时结算金额：</label>'
						+'<span class="weui-form-preview__value">{2}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">配件结算金额：</label>'
						+'<span class="weui-form-preview__value">{3}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">附加结算金额：</label>'
						+'<span class="weui-form-preview__value">{4}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">未收款金额：</label>'
						+'<span class="weui-form-preview__value">{5}</span></div>'
						+'<div class="weui-form-preview__item"><label class="weui-form-preview__label">结算用户：</label>'
						+'<span class="weui-form-preview__value">{6}</span></div>'
						
						+'</div></div></div>';
					
					//分录
					var entrys = data.entrys;
					if(entrys){
						
						for ( var i in entrys) {
							var entry = entrys[i];
							
							var entryId = entry.id;
							var wtSettleAmount = entry.wtSettleAmount;//工时结算金额
							var spSettleAmount = entry.spSettleAmount;//配件结算金额
							var attaSettleAmount = entry.attaSettleAmount;//附加结算金额
							var noReceivedAmount = entry.noReceivedAmount;//未收款金额
							var settleAccount = entry.settleAccount;//结算用户
							
							var settleObject = entry.settleObject == '1' ? "客户" : 
								entry.settleObject == '2' ? "厂家" : 
									entry.settleObject == '3' ? "保险公司" : 
										entry.settleObject == '4' ? "内部" : 
											entry.settleObject == '5' ? "其他" : "" ;
							
							var paymentType = entry.paymentType == '1' ? "现结" :
								entry.paymentType == '2' ? "挂账" :
									entry.paymentType == '3' ? "预估收入" : "" ;
							
							$("#jsdxq").append(JSTools.format(entrysDom,settleObject,paymentType,wtSettleAmount,spSettleAmount,attaSettleAmount,noReceivedAmount,settleAccount));
							
						}
					}
					
					
					
					
					
					
				
					$("#yszk").html(data.yszk);
					$("#jsdxqDiv").show();
				}else if(payGuid){
					$.alert("查询到你还有未支付的订单，请先支付完成下一单再进行下一个账单的支付！",function(){
						window.location.href = "/wechat/unionPay/wgqzf?payGuid="+payGuid+"&openid="+openid;
					})
				}else{
					$.alert("未查询到结算单详情，请点击确定返回结算列表页重进！",function(){
						window.location.href = "/wechat/unionPay/jfzd?openid="+openid;
					})
				}
				
				
			}else{
				$.alert("未查询到结算单详情，请点击确定返回结算列表页重进！",function(){
					window.location.href = "/wechat/unionPay/jfzd?openid="+openid;
				})
			}
			
			
			
		})
	}
	
	
	$("#jsdxq_js").click(function() {
		$.showLoading("正在发起支付……");
		$.post("/wechat/unionPay/jsdxqPay",{jsdIds:jsdId,openid:openid},function(res){
			if (JSTools.isStr(res)){
				res = $.parseJSON(res);
			}
			if(res.succ){
				var url = res.data.url;
				window.location.href = url;
			}else{
				$.hideLoading();
				$.alert(res.msg)
			}
		})
		
	})
	
	
	
	
})


