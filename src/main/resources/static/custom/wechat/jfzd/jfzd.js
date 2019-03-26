$(function() {
	
	
	var openid = $("#openid").val();
//	$.showLoading();
	$.showLoading("验证用户是否绑定微信！")
	
	if(openid){
		$.post("/wechat/yhgl/checkWxBd",{openid:openid},function(res){
			$.hideLoading();
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			if(res.succ){
				//根据车牌查询维修结算单信息
				findWxjsd(res.data.wxyh.cphm);
			}else {
				if(res.data.wxyh == "-1"){
					$.confirm("此微信还未绑定用户，请绑定后进行后续操作！",function(){
						//确认按钮
						window.location.href='/wechat/yhgl/yhbd?openid='+openid;
					})
				}
			}
			
		})
	}
	
	function findWxjsd(cphm) {
		$.showLoading("正在查询待结算单，请稍候……")
		$.post("/wechat/unionPay/getwxd",{cphm : cphm,openid:openid},function(res){
			$.hideLoading();
			if (JSTools.isStr(res))
				res = $.parseJSON(res);
			console.log(res)
			if(res.succ){
				var data = res.data.data;
				var payGuid = res.data.payGuid;
				$("#perview").empty();
				if(data && data.length > 0){
					for ( var i in data) {
						var jsd = data[i];
						var jsdId = jsd.id;
						if(jsdId.indexOf("+") > 0){
							jsdId = jsdId.replace("+","*")
						}
						//服务顾问
						var settlePerson = jsd.settlePerson;
						//结算单号
						var jsdNumber = jsd.jsdNumber;
						//维修类型
						var repairtype = jsd.repairType;
						//结算日期
						var settleDate = jsd.settleDate;
						//公司名称
						var orgUnitName = jsd.orgUnitName;
						//结算总金额
						var settleAmount = jsd.settleAmount;
						var status = jsd.status;
						//车辆信息
						var vehicle = jsd.vehicle;
						var cz = vehicle.cz;
						var cphm = vehicle.cphm;
						var pp = vehicle.pp;
						
						var entrys = jsd.entrys;
						//待支付金额
						var amount = 0.00;
						for ( var i in entrys) {
							if(entrys[i].paymentType == '1'){
								if(entrys[i].noReceivedAmount != null){
									amount = calc(amount,entrys[i].noReceivedAmount,"add");
								}
							}
						}
						
						var dom = '<div class="weui-form-preview" style="margin: 10px 0 10px 0;">'
							+'<a href="javascript:void(0)" name="checkboxA" class="weui-form-preview__btn">'
							+'<div class="weui-form-preview__hd" >'
							
							+'<label class="weui-form-preview__label weui-cells_checkbox">'
							+'<input type="checkbox" class="weui-check" name="checkbox" value="{0}" >'
							+'<i class="weui-icon-checked"></i>待付款金额</label>'
							+'<em class="weui-form-preview__value">{1}</em>'
							
							+'</div><div class="weui-form-preview__bd"><label class="weui-form-preview__label">结算状态：</label>'
							+'<span class="weui-form-preview__value">{2}</span>'
							
							+'<label class="weui-form-preview__label">结算总金额：</label>'
							+'<span class="weui-form-preview__value">{3}</span>'
							+'<label class="weui-form-preview__label">车牌号码：</label>'
							+'<span class="weui-form-preview__value">{4}</span>'
							+'<label class="weui-form-preview__label">客户名称：</label>'
							+'<span class="weui-form-preview__value">{5}</span>'
							+'<label class="weui-form-preview__label">维修类型：</label>'
							+'<span class="weui-form-preview__value">{6}</span>'
							+'<label class="weui-form-preview__label">服务顾问：</label>'
							+'<span class="weui-form-preview__value">{7}</span>'
							+'<label class="weui-form-preview__label">结算日期：</label>'
							+'<span class="weui-form-preview__value">{8}</span>'
							+'<label class="weui-form-preview__label">结算单号：</label>'
							+'<span class="weui-form-preview__value">{9}</span>'
							+'<label class="weui-form-preview__label">公司名称：</label>'
							+'<span class="weui-form-preview__value">{10}</span>'
							+'</div></a>'
							+'<div class="weui-form-preview__ft"><a class="weui-form-preview__btn weui-form-preview__btn_primary" name="{11}" href="javascript:">详情</a>'
							+'<input type="hidden" value="{12}"  name = "{13}" /></div></div>';
						//									存 金额   显示金额 	 维修类型 服务顾问  
						$("#perview").append(JSTools.format(dom,amount,amount+"元",status,settleAmount,cphm,cz,repairtype,settlePerson,settleDate,jsdNumber,orgUnitName,"jsxq",jsdId,"jsdId"));
					}
					
					$("#zdlist").show();
					
				}else if(payGuid){
					$.alert("查询到你还有未支付的订单，请先支付完成下一单再进行下一个账单的支付！",function(){
						window.location.href = "/wechat/unionPay/wgqzf?payGuid="+payGuid+"&openid="+openid;
					})
				}else{
					$.alert("未获取到需要支付的账单！",function(){
						window.location.href = "/wechat/unionPay/lszd?openid="+openid;
					})
				}
				
			}else{
				$.alert("未获取到需要支付的账单，查询结果为"+res.msg+"，您可前往历史账单查看！",function(){
					window.location.href = "/wechat/unionPay/lszd?openid="+openid;
				})
			}
		})
	}
	
	
	
	
	
	$("#qx").click(function() {
		if($(this).prop("checked")){
			//全选
			$("[name='checkbox']").prop("checked",true);
		}else  {
			//取消全选
			$("[name='checkbox']").prop("checked",false);
		}
		sum();
		
	})
	
	//点击面板选中
	$('#perview').on('click',"[name='checkboxA']",function(){
		$(this).find("[name='checkbox']").each(function(){
			if(!$(this).prop("checked")){
				$(this).prop("checked",true);
			}else  {
				$(this).prop("checked",false);
			}
		});
		var checks = 0;
		var checkeds = 0;
		$("#perview").find("[name='checkbox']").each(function(){
			checks++
			if($(this).prop("checked")){
				checkeds++
			}
		});
		
		if(checks == checkeds){
			$("#qx").prop("checked",true);
		}else{
			$("#qx").prop("checked",false);
		}
		sum();
	})
	
	
	//点击详情
	$('#perview').on("click","[name='jsxq']",function(){
		var jsdId = $(this).next().val();
		window.location.href = "/wechat/unionPay/jsdxq?jsdId="+jsdId+"&openid="+openid;
	})
	
	function sum (){
		var sum = 0;
		$("[name='checkbox']:checked").each(function(e) {
			sum = calc(sum,$(this).val(),'add')
		})
		$("#hj").html(sum+"元")
	}
	//点击结算
	$("#jf_js").click(function() {
		var jsdIds ="";
		$("#perview").find(".weui-form-preview").each(function() {
			if($(this).find("[name='checkbox']").prop("checked")){
				jsdIds += $(this).find("[name='jsdId']").val() + "|";
			}
		})
		if(jsdIds != ""){
			
			$.showLoading("正在发起支付……");
			$.post("/wechat/unionPay/jsdxqPay",{jsdIds:jsdIds,openid:openid},function(res){
				if (JSTools.isStr(res)){
					res = $.parseJSON(res);
				}
				if(res.succ){
					window.location.href = res.data.url;
				}else{
					$.hideLoading();
					$.alert(res.msg)
				}
			})
		}else{
			$.alert("未选择需要支付的账单！")
		}
		
		
	})
	
	
})


/*
function decNum(a){//获取小数位数
    var r=0;
    a=a.toString();
    if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
    return r;
}
function int(a){//去除小数点并转成数值
    return parseInt(a.toString().replace(".",""));
}
function calc(a,b,type){//加减乘除
    var r,
        da = decNum(a),
        db = decNum(b),
        dsum = da+db,
        dmin = Math.min(da,db),
        dmax = Math.max(da,db);
    dsum += dmax-dmin;
    dsum = Math.pow(10,dsum);
    dmax = Math.pow(10,dmax);
    a = int(a);
    b = int(b);
    //将a、b调整到同一位数
    if(da>db){
        b *= Math.pow(10,da-db);
    }else{
        a *= Math.pow(10,db-da);
    }
    switch(type){
        case "add":
            r=(a+b)/dmax;
            break;
        case "subtract":
            r=(a-b)/dmax;
            break;
        case "multiply":
            r=(a*b)/dsum;
            break;
        case "divide":
            r=a/b;
            break;
    }
    return r;
}*/