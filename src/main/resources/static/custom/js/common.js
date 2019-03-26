"use strict";
(function(window, $) {
	//如果不存在 console 则重写  console
	window.console = window.console || (function(){
		var methods = [
	        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	        'timeStamp', 'trace', 'warn'
	    ];
		var console_ = {};
		for(var i in methods) {
			console_[methods[i]] = function(){
				return false;
			}
		}
		return console_;
	})();
	
	//配置全局blockui
//	$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
	
	//设置授权服务
	if(window.top.location.href !== window.location.href) {
		window.Auth = parent.Auth;
		window.userinfo = parent.userinfo;
	}
	
	// 工具
	window.JSTools = (function() {
		function isEmpty_many() {
			var args = arguments
			for ( var i in args) {
				if (this.isEmpty(args[i])) {
					return true;
				}
			}
			return false;
		}

		function isEmpty_one(val) {
			if (this.isStr(val)) {
				return null === val || val === '' || val.length === 0;
			} else if (typeof val === 'object') {
				return null == val || JSON.stringify(val) === '{}';
			}
			return true;
		}
		function decNum(a){/*获取小数位数*/
		    var r=0;
		    a=a.toString();
		    if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
		    return r;
		}
		function int(a){/*去除小数点并转成数值*/
		    return parseInt(a.toString().replace(".",""));
		}
		return {
			isEmpty : function() {
				return arguments.length === 1 ? isEmpty_one.apply(this,
						arguments) : isEmpty_many.apply(this, arguments);
			},
			isNotEmpty: function() {
				return this.isEmpty(arguments);
			},
			inIFrame : function() {
				return window.top.location.href !== window.location.href;
			},
			isArr: function(val){
				return $.isArray(val);
			},
			isFun : function(val) {
				return typeof val === 'function'
			},
			isObj : function(val) {
				return typeof val === 'object'
			},
			isNum : function(val) {
				return typeof val === 'number'
			},
			isStr : function(val) {
				return typeof val === 'string'
			},
			isBool : function(val) {
				return typeof val === 'boolean'
			},
			format : function() {
				var args = arguments, str = args[0];
				for (var i = 1; i < args.length; i++) {
					str = str.replace('\{' + (i - 1) + '\}', args[i])
				}
				return str;
			},
			extend : function(target, source) {
				for ( var key in source) {
					target[key] = source[key]
				}
				return target;
			},
			space : function(num) {
				var s = '';
				for (var i = 0; i < (num || 1); i++) {
					s += '&nbsp;';
				}
				return s;
			},
			formatServerDate : function(num, format) {
				return num
						&& (function() {
							var date = new Date(num), yyyy = date.getFullYear(), MM = (date
									.getMonth() + 1), dd = date.getDate(), HH = date
									.getHours(), mm = date.getMinutes(), ss = date
									.getSeconds();
							return (format || 'yyyy-MM-dd').replace('yyyy',
									yyyy).replace('MM',
									(MM < 10) ? '0' + MM : MM).replace('dd',
									(dd < 10) ? '0' + dd : dd).replace('HH',
									(HH < 10) ? '0' + HH : HH).replace('mm',
									(mm < 10) ? '0' + mm : mm).replace('ss',
									(ss < 10) ? '0' + ss : ss);
						})();
			},
			getCurrentDate: function(format) {
				return this.formatServerDate(new Date().getTime(), format);
			},
			addMethod : function(object, funcName, func) {
				var old = object[funcName];
				object[funcName] = function() {
					if (func.length === arguments.length) {
						func.apply(this, arguments);
					} else if (JSTools.isFun(old)) {
						old.apply(this, arguments);
					}
				}
			},
			isContainArray: function (arr,val) {
				if(arr.length === 0) return false;
				for(var i in arr) {
					var arrVal = arr[i];
					if(arrVal === val)
						return true;
				}
				return false;
			},
			guid: function() {
			    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			        return v.toString(16);
			    });
			},
			calc:function(a,b,type){
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
			},
			encode64: function(input) {  
				var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"  
	            + "wxyz0123456789+/" + "=";
		        var output = "";  
		        var chr1, chr2, chr3 = "";  
		        var enc1, enc2, enc3, enc4 = "";  
		        var i = 0;  
		        do {  
		            chr1 = input.charCodeAt(i++);  
		            chr2 = input.charCodeAt(i++);  
		            chr3 = input.charCodeAt(i++);  
		            enc1 = chr1 >> 2;  
		            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
		            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
		            enc4 = chr3 & 63;  
		            if (isNaN(chr2)) {  
		                enc3 = enc4 = 64;  
		            } else if (isNaN(chr3)) {  
		                enc4 = 64;  
		            }  
		            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)  
		                    + keyStr.charAt(enc3) + keyStr.charAt(enc4);  
		            chr1 = chr2 = chr3 = "";  
		            enc1 = enc2 = enc3 = enc4 = "";  
		        } while (i < input.length);  
		        return output;  
		    }
		}
	})();

	window.MyForm = function(formSelector) {
		var $form = $(formSelector) , onsubmit;
		$form.find('.form-submit').on('click', function() {
			if(JSTools.isFun(onsubmit)) {
				if(onsubmit.apply($form,new Array())) {
					$form.form('submit');
				}
			}else {
				$form.form('submit');
			}
		})
		$form.find('.form-clear').on('click', function() {
			$form.form('clear');
		})
		$form.find('.form-reset').on('click', function() {
			$form.form('reset');
		})
		var myform = {
			bindBtn: function() {
				return this.bindEvent.apply(this,arguments);
			},
			bindEvent: function(selected,etype,fn) {
				$form.find(selected).on(etype,fn);
				return this;
			},
			bindForm: function(url,callback) {
				$form.form({
					url: url,
					onSubmit: function() {
						if($form.form('validate')){
							Msg.loading();
							return true;
						}else {
							return false;
						}
					},
					success: function(data) {
						Msg.loadingClose();
						try{
							var res = $.parseJSON(data);
							if(res.auth) {
								if(callback) {
									callback.call($form,res);
								} else {
									if(res.succ) {
										Msg.success(res.msg)
									} else {
										Msg.warning(res.msg);
									}
								}
							}else {
								Msg.warning(res.msg);
							}
						}catch(e) {
							Msg.error(e.message);
						}
					}
				});
				return this;
			},
			reset: function() {
				$form.form('reset');
				return this;
			},
			load : function(entity) {
				$form.form('load', entity)
				return this;
			},
			onSubmit : function(callback) {
				onsubmit = callback;
				return this;
			},
			clear : function() {
				$form.form('clear');
				return this;
			},
			serialize: function() {
				return $form.serialize();
			},
			decodeSerialize: function() {
				return window.decodeURIComponent(this.serialize());
			},
			formData: function() {
				var ser = this.decodeSerialize();
				var arr1 = ser.split('&');
				var data = {};
				for(var i in arr1) {
					var e = arr1[i];
					var h = e.split('=');
					var k = h[0];
					var v = h[1];
					if(data.hasOwnProperty(k)) {
						var sz = new Array();
						var v1 = data[k];
						if(JSTools.isStr(v1)) {
							sz.push(v1);
							sz.push(v);
							data[k] = sz;
						}else if(JSTools.isArr(v1)) {
							data[k].push(v)
						}
					} else {						
						data[k] = v;
					}
				}
				return data;
			},
			$form: $form
		}
		return myform;
	}

	// 封装easyUi dataGrid
	window.Grid = function(selector) {
		var CurrentGrid = null, gridOption = new GridOption();
		// grid 处理传入参数 类
		function GridOption() {
			var toolbarbtns = new Array();
			this.loadNow = true;

			function toolBtn_2(text, handler) {
				return toolBtn_3(text, null, handler);
			}
			function toolBtn_3(text, iconCls, handler) {
				toolbarbtns.push({
					text : text,
					iconCls : iconCls,
					handler : handler,
					plain: false
				})
				toolbarbtns.push('-')
				return this;
			}
			JSTools.addMethod(this, 'toolBtn', toolBtn_2);
			JSTools.addMethod(this, 'toolBtn', toolBtn_3);

			this.primaryKey = 'guid';
			this.showCkBox = true;
			this.toolbarbtnsArr = toolbarbtns;

			this.toolRemove = function(arg) {
				if (JSTools.isStr(arg)) {
					return this.toolBtn('删除', 'icon-remove', function() {
						var pkStr = CurrentGrid.getSelectedGuidsStr();
						if (pkStr) {
							Msg.confirm(function(r) {
								if (r) {
									Http.post(arg, {
										guids : pkStr
									},function(res){
										if(res.succ) {
											Msg.success(res.msg)
											CurrentGrid.reload();
										}else {
											Msg.warning();
										}
									})
								}
							})
						} else {
							Msg.warning(Msg.UNSELECTED)
						}
					})
				} else if (JSTools.isFun(arg)) {
					return this.toolBtn('删除', 'icon-remove', arg)
				}
			}

			this.setCols = function(cols) {
				if (this.showCkBox) {
					cols[0].splice(0, 0, {
						field : 'ckbox',
						checkbox : true
					});
				}
				for(var i in cols[0]) {
					var col = cols[0][i];
					if(col.field === 'ckbox') continue;
					if(col.hasOwnProperty('width') ) {
						if(col.width > 0) {
							col.width = col.width + 'px';
						}
						continue;
					}
					if(col.hasOwnProperty('title')) {
						col.width = (col.title.length * 20) + 'px';
					}
				}
				this.options.columns = cols;
			}

			this.options = {
				singleSelect : false,
				url : null,
				columns : null,
				rowStyler : null,
				method : 'post',
				rownumbers : true,
				footer : null,
				toolbar : null,
				collapsible : true,
				pagination : true,
				pageList: [5,10,20,50,100,1000,10000,100000],
				pageSize : 20,
				pageNumber : 1,
				fitColumns : true,
			};

			this.getOptions = function() {
				if(toolbarbtns.length > 0) {
					this.options.toolbar = toolbarbtns;
				}
				return this.options;
			}

			var queryControl, queryContrlObj, controlContainer;
			this.ntqc = false; //表示通过json 的方式配置查询列
			this.setQueryControl = function() {
				if (arguments.length == 1) {
					controlContainer = '#control-container',
							queryContrlObj = arguments[0];
				} else {
					controlContainer = arguments[0],
							queryContrlObj = arguments[1];
				}
				ntqc = true;
			}

			this.getQueryControl = function() {
				return queryContrlObj
						&& (queryControl || (queryControl = new QueryControl(
								controlContainer, queryContrlObj)));
			}
			
			var toolbars_ = null;
			this.ntb = false; //表示需要用到默认的生成控件的方式而不是 自定义 toolbar
			
			this.setToolbars = function(toolbars) {
				toolbars_ = toolbars;
				this.ntb = true;
			}
			
			this.getToolbars  = function() {
				return new toolbars('#toolbar-grid',toolbars_);
			}
			
			// 以下的代码是 封装基础的按钮 和查询条件
			function getStyleStr(style) {
				var styleStr = ''
				if (style) {
					if(!style.hasOwnProperty('width')) {
						style.width = '120px';
					}
					for ( var s in style) {
						var val = style[s];
						styleStr += s + ':' + val + ';';
					}
				}else {
					styleStr = 'width: 120px;';
				}
				return styleStr;
			}
			
			function bindCtrl($dom, fdesc) {
				if ($dom.length > 0) {
					var options  = fdesc.options;
					switch (fdesc.type) {
					case 'text':
						$dom.textbox(options);
						break;
					case 'date':
						$dom.datebox(options);
						break;
					case 'select':
						if(JSTools.isArr(fdesc.val))
							options.data = fdesc.val;
						$dom.combobox(options);
						break;
					case 'number':
						$dom.numberbox(options);
						break;
					case 'numberspinner':
						$dom.numberspinner(options);
						break;
					case 'datetimespinner':
						$dom.datetimespinner(options);
						break;
					case 'datetime':
						$dom.datetimebox(options);
						break;
					case 'combotree':
						$dom.combotree(options);
						break;
					}
				}
			}

			function getCtrlHtml(field, fdesc) {
				var domStr = '', ctrlClss = CtrlCls[fdesc.type], styleStr = getStyleStr(fdesc.style);
				if (fdesc.between) {
					var fields = field.split(',');
					domStr += getInput(fields[0]);
					domStr += ' - ';
					domStr += getInput(fields[1]);
				} else {
					domStr += getInput(field);
				}
				function getInput(f) {
					return JSTools.format(CtrlCls.inputTag, ctrlClss, f, f + '-input-group',
							styleStr, '','');
				}
				return domStr;
			}
			function extend(source) {
				var fd = {
					type : 'text',
					label : undefined,
					val : '',
					between : false,
					style : undefined,
					options : undefined,  
					mhcx : false
				};
				for ( var i in source) {
					if (fd.hasOwnProperty(i))
						fd[i] = source[i]
				}
				return fd;
			}
			
			
			var CtrlCls = {
					inputTag : '<input class="{0}" name="{1}" id="{2}" style="{3}" value="{4}" title="{5}"/>',
					searchBtnTag : ' <a href="javascript:void(0);" class="easyui-linkbutton grid-search-btn" iconCls="icon-search">查询 </a> ',
					text : 'easyui-combobox',
					date : 'easyui-datebox',
					select : 'easyui-textbox',
					number : 'easyui-numberbox',
					numberspinner : 'easyui-numberspinner',
					datetimespinner : 'easyui-datetimespinner',
					datetime : 'easyui-datetimebox',
					combotree : 'easyui-combotree'
				};
				
				var toolbar_grid_div = '<div id="toolbar-grid" ></div>';
				var tool_btn_group_div = '<div id="toolbar-btn-group"><fieldset class="scheduler-border"><legend class="scheduler-border">选择操作</legend><table cellspacing="0" cellpadding="2" border="0" ><tbody><tr></tr></tbody></table></fieldset></div>';
				var toolbar_input_group_div = '<div id="toolbar-input-group"><fieldset class="scheduler-border"><legend class="scheduler-border">条件查询</legend><table cellspacing="0" cellpadding="2" border="0" width="100%"><tbody></tbody></table></fieldset></div>';
				var tool_linkbtn_tag = '<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:\'{0}\',plain:true">{1}</a>';
				
				//生成工具栏
				function toolbars(containerSelector,toolbars) {
					this.containerSelector = containerSelector;
					
					var $toolbarContaier  = $(containerSelector);
					var $toolBtnGroupDiv = $(tool_btn_group_div);
					var $toolInputGroupDiv = $(toolbar_input_group_div);
					var initToolbarBtnGroup = null;
					if(toolbars.hasOwnProperty('toolBtnGroup')) {
						var hasBtn = false;
						var toolbar = {
							addBtn: function(text,icon,fn){
								var toolLinkbtn  = JSTools.format(tool_linkbtn_tag,icon,text);
								var $td = $('<td></td>'),$td1 = $('<td><div class="datagrid-btn-separator"></div></td>');
								var $tlb = $(toolLinkbtn);
								$tlb.on('click',fn);
								$td.append($tlb);
								var $tr = $toolBtnGroupDiv.find('tr');
								$tr.append($td);
								$tr.append($td1);
								$tlb.linkbutton();
								hasBtn = true;
							}
						}
						var tool_btn_group = toolbars.toolBtnGroup;
						for(var i in tool_btn_group) {
							var tool_btn = tool_btn_group[i];
							switch(i) {
							case 'add':
								toolbar.addBtn('增加','icon-save',tool_btn);
								break;
							case 'edit':
								toolbar.addBtn('编辑','icon-edit',tool_btn);
								break;
							case 'remove':
								if (JSTools.isStr(tool_btn)) {
									var delurl = tool_btn;
									toolbar.addBtn('删除', 'icon-remove', function() {
										var pkStr = CurrentGrid.getSelectedGuidsStr();
										if (pkStr) {
											Msg.confirm(function(r) {
												if (r) {
													Http.post(delurl, {
														guids : pkStr
													},function(res){
														if(res.succ) {
															Msg.success(res.msg,function(){																
																CurrentGrid.reload();
															});
														}else {
															Msg.warning();
														}
													})
												}
											})
										} else {
											Msg.warning(Msg.UNSELECTED)
										}
									});
								} else if (JSTools.isFun(tool_btn)) {
									toolbar.addBtn('删除','icon-remove',tool_btn);
								}						
								break;
							case 'print':
								toolbar.addBtn('打印','icon-print',tool_btn);
								break;
							case 'see':
								toolbar.addBtn('查看','icon-eye',tool_btn);
								break;
							case 'detail':
								toolbar.addBtn('详情','icon-table',tool_btn);
								break;
							case 'excel':
								toolbar.addBtn('EXCEL导出','icon-excel',tool_btn);
								break;
							case 'btns':
								tool_btn(toolbar);
								break;
							}
						}
						//初始化 工具栏
						initToolbarBtnGroup = function() {
							if(hasBtn) $toolbarContaier.append($toolBtnGroupDiv);
						}
					}
					var initInputGroup = null;
					var $searchBtn = null;
					if(toolbars.hasOwnProperty('toolInputGroup')) { 
						var toolinputgroup = toolbars.toolInputGroup;
						var inputGroup = new Array();
						var fieldGroup = new Array();
						for(var field in toolinputgroup) {
							inputGroup.push(toolinputgroup[field]);
							fieldGroup.push(field);
						}
						var len = inputGroup.length;
						 //每行4个查询条件
						var inputCount = 4;
						var winWidth = $(window).width();
						if(winWidth < 600){
							inputCount = 1;
						} else if(winWidth < 800){
							inputCount = 2;
						} else if(winWidth < 1000){
							inputCount = 3;
						}
						var rowspan = Math.ceil(len / inputCount); //得到跨行

						var trs = '';
						for(var j = 1; j <= rowspan; j++) {
							var tr = '<tr>';
							var tds = '';
							var start = ((j - 1) * inputCount);
							var end = (j * inputCount);
							end = end >= len ? len : end;
							for(var i = start; i < end; i++) {
								var td = '<td>';
								var source = inputGroup[i];
								var target = extend(source);
								var field = fieldGroup[i];
								td += getCtrlHtml(field, target);
								td += '</td>';
								var fieldtd = '<td style="text-align: right;"><label>' + target.label + ': </label>&nbsp;&nbsp;</td>';
								fieldtd += td;
								tds += fieldtd;
							}
							if(j === 1) {
								tds += '<td rowspan="'+rowspan+'">'+CtrlCls.searchBtnTag+'</td>';
							}
							tr += tds;
							tr += '</tr>';
							trs += tr;
						}
						$toolInputGroupDiv.find('tbody').append(trs);
						
						// 初始化 查询栏
						initInputGroup = function() {
							$searchBtn = $toolInputGroupDiv.find('.grid-search-btn');
							$searchBtn.linkbutton();
							for(var field in toolinputgroup) {
								var fdesc = toolinputgroup[field];
								initCtrl(field,fdesc);
							}
							$toolbarContaier.append($toolInputGroupDiv);
						}
						
						// 生成查询参数
						this.getQueryParams = function() {

							var queryParams = '', val, val0, val1, fields, fobj;
							
							for ( var field in toolinputgroup) {
								fobj = extend(toolinputgroup[field]);
								if (fobj.between) {
									fields = field.split(','), val0 = findVal(fields[0]),
											val1 = findVal(fields[1])
									if (!JSTools.isEmpty(val0, val1)) {
										queryParams += getKeyVal(fields[0], val0);
										queryParams += getKeyVal(fields[1], val1);
									}
								} else {
									val = findVal(field)
									if (!JSTools.isEmpty(val)) {
										queryParams += getKeyVal(field, val);
									}
								}
							}
							function getKeyVal(key, val) {
								return JSTools.format('"{0}":"{1}",', key,
										fobj.mhcx ? mhcx(val) : val);
							}
							function findVal(field) {
								return $.trim(findField(field).val());
							}
							if (!JSTools.isEmpty(queryParams))
								return $.parseJSON(JSTools.format('{{0}}', queryParams
										.substring(0, queryParams.length - 1)))
							else
								return {};

							function mhcx(val) {
								return ('%' + val + '%');
							}
						}
						
					}
					
					//添加事件监听
					this.searchClick = function(fn){
						$searchBtn.on('click',fn);
						return this;
					}
					
					function initCtrl(field, fdesc) {
						if (fdesc.between) {
							var fields = field.split(',');
							bindCtrl(findField(fields[0]), fdesc);
							bindCtrl(findField(fields[1]), fdesc);
						} else {
							bindCtrl(findField(field), fdesc);
						}
					}
					
					function findField(field) {
						return $toolInputGroupDiv.find('[name="'+field+'"]');
					}
					
					this.init = function() {
						if(initInputGroup)
							initInputGroup();
						if(initToolbarBtnGroup) 
							initToolbarBtnGroup();
					}
				}
				
				// grid 查询 控件
				function QueryControl(containerSelector, contorls) {
					var $ControlContainer = $(containerSelector);
					function findField(field) {
						return $ControlContainer.find(JSTools.format('[name={0}]', field))
					}
					
					this.getCtrl = function(ctrlName) {
						return findField(ctrlName); 
					}
					
					function initCtrl(field, fdesc) {
						if (fdesc.between) {
							var fields = field.split(',');
							bindCtrl(findField(fields[0]), fdesc);
							bindCtrl(findField(fields[1]), fdesc);
						} else {
							bindCtrl(findField(field), fdesc);
						}
					}
					
					// 初始化控件
					this.initControls = function() {
						for ( var field in contorls) {
							var source = contorls[field]
							var target = extend(source);
							
							var field = '<label>'+target.label+'</label>';
							var ctrl = getCtrlHtml(field, target) + JSTools.space();

							$ControlContainer.append(field + ctrl);
							initCtrl(field, target);
						}
						$ControlContainer.append(CtrlCls.searchBtnTag);
						$ControlContainer.find('.grid-search-btn').linkbutton();
						return this;
					}

					// 监听查询事件
					this.searchClick = function(fn) {
						$ControlContainer.find('.grid-search-btn').on('click', fn)
						return this;
					}

					// 生成查询参数
					this.getQueryParams = function() {
						var queryParams = '', val, val0, val1, fields, fobj;
						for ( var field in contorls) {
							fobj = extend(contorls[field]);
							if (fobj.between) {
								fields = field.split(','), val0 = findVal(fields[0]),
										val1 = findVal(fields[1])
								if (!JSTools.isEmpty(val0, val1)) {
									queryParams += getKeyVal(fields[0], val0);
									queryParams += getKeyVal(fields[1], val1);
								}
							} else {
								val = findVal(field)
								if (!JSTools.isEmpty(val)) {
									queryParams += getKeyVal(field, val);
								}
							}
						}
						function getKeyVal(key, val) {
							return JSTools.format('"{0}":"{1}",'
									, key,
										fobj.mhcx ? mhcx(val) : val
									);
						}
						function findVal(field) {
							return $.trim(findField(field).val());
						}
						if (!JSTools.isEmpty(queryParams))
							return $.parseJSON(JSTools.format('{{0}}', queryParams
									.substring(0, queryParams.length - 1)))
						else
							return {};
						function mhcx(val) {
							return ('%' + val + '%');
						}
					}
				}

				/*
					右击菜单生成
				*/
				this.setContextMenu = function(inopts) {
					//输入参数的格式
					/*
					var inputOptions = [{
						text: '',
						icon: '',
						onClick: function(row,index){

						},
						children: [{
							text: '',
							icon: '',
							onClick: function(row,index){

							}
						}]
					},{
						text: '',
						icon: '',
						onClick: function(row,index){

						}
					}];
					*/
					var cxtMenuDivId = 'grid-cxt-menu-' + JSTools.guid();
					var $cxtMenuDiv = $('<div  id="'+cxtMenuDivId+'" class="easyui-menu" style="width:120px; display: none" ></div>');
					function getMenuNode(option,isfather) {
						var div = '<div iconCls="{0}" >{1}</div>';
						if(isfather) {
							return JSTools.format(div, option.icon,'<span>'+ option.text +'</span>');
						} else {
							return JSTools.format(div, option.icon,option.text);
						}
					}

					var currentRow , currentIndex;

					function resolveOptions($fatherdiv,opts) {
						for(var x in opts) {
							var opt = opts[x];
							if (JSTools.isEmpty(opt)) {
								$fatherdiv.append('<div class="menu-sep"></div>');
							} else if (opt.hasOwnProperty('children')) {
								var $node = $(getMenuNode(opt,true));
								var $div = $('<div></div>');
								resolveOptions($div, opt.children);
								$node.append($div);
								$fatherdiv.append($node);
							} else {
								var $node = $(getMenuNode(opt,false));
								if(opt.hasOwnProperty('onClick')){
									$node.on('click',{ row: function(){
										return currentRow;
									}, index: function(){
										return currentIndex;
									}
									},opt.onClick);
								}
								$fatherdiv.append($node);
							}
						}
					}
					
					// 解析参数并生成 右击菜单内容
					resolveOptions($cxtMenuDiv,inopts);

					$(document.body).append($cxtMenuDiv);
					$cxtMenuDiv.menu();
					this.options.onRowContextMenu = function(e, rowIndex, rowData) {
						$('#'+cxtMenuDivId).menu('show', { left: e.pageX, top: e.pageY }); 
						//$(this).datagrid("clearSelections"); //取消所有选中项  
						//$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
						currentIndex = rowIndex;
						currentRow = rowData;
						e.preventDefault(); 
					}
					return this;
				}

		}
		
		
		var Grid_ = function(selector, gridOption) {
			var $grid = $(selector);
			var options_ = gridOption.getOptions();
			var toolopts = options_.toolbar;
			if(gridOption.ntb) {
				var grid = this,
				toolbars = gridOption.getToolbars();
				options_.toolbar = toolbars.containerSelector;
				toolbars.init();
				toolbars.searchClick(function(){
					var options = gridOption.getOptions();
					var params = options['queryParams'] || new Object();
					if(params.hasOwnProperty('params')) {
						JSTools.extend(params.params, toolbars.getQueryParams())
					}else {
						params.params = toolbars.getQueryParams();
					}
					grid.query(params);
				});
				this.getQueryParams = function() {
					return toolbars.getQueryParams()
				}
				this.search = function(params) {
					var target = toolbars.getQueryParams()
					grid.query({
						params : JSTools.extend(target, params)
					});
					return this;
				}
			} else if(gridOption.ntqc){
				if (gridOption.getQueryControl()) {
					var grid = this, queryControl = gridOption.getQueryControl()
							.initControls().searchClick(function() {
								var options = gridOption.getOptions();
								var params = options['queryParams'] || new Object();
								if(params.hasOwnProperty('params')) {
									JSTools.extend(params.params, queryControl.getQueryParams())
								}else {
									params.params = queryControl.getQueryParams();
								}
								grid.query(params);
							});
					this.getQueryParams = function() {
						return queryControl.getQueryParams()
					}
					this.search = function(params) {
						var target = queryControl.getQueryParams()
						this.query({
							params : JSTools.extend(target, params)
						});
						return this;
					}
					this.getCtrl = function(name) {
						return queryControl.getCtrl(name);
					}
				}
			}
			
			if(toolopts == null && gridOption.toolbarbtnsArr.length > 0 ) {
				options_.toolbar = gridOption.toolbarbtnsArr;
			}
			
			var isTigger = false;
			if(JSTools.isFun(options_.onLoadSuccess)) {
				var loadSucc = options_.onLoadSuccess;
				options_.onLoadSuccess  = function() {
					$grid.parent('.datagrid-view').prev('.datagrid-toolbar').find('a').removeClass('l-btn-plain');
					loadSucc.apply($grid,arguments);
					$('.datagrid-header .datagrid-header-row td>div>span').css({fontSize: '14px',fontWeight: 'bold'});
					isTigger = true;
				}
			}else {
				options_.onLoadSuccess  = function() {
					$grid.parent('.datagrid-view').prev('.datagrid-toolbar').find('a').removeClass('l-btn-plain');
					isTigger = true;
					$('.datagrid-header .datagrid-header-row td>div>span').css({fontSize: '14px',fontWeight: 'bold'});
				}
			}
			if(!isTigger) {
				window.setTimeout(function(){
					$grid.parent('.datagrid-view').prev('.datagrid-toolbar').find('a').removeClass('l-btn-plain');
					$('.datagrid-header .datagrid-header-row td>div>span').css({fontSize: '14px',fontWeight: 'bold'});
				},5);
			}
			var loadUrl = options_.url;
			if(gridOption.loadNow === false)
				delete options_.url;
			
			//初始化   datagrid 表格 
			$grid.datagrid(options_);
			
			this.query = function(params) {
				if(gridOption.loadNow === false){
					$grid.datagrid('options').url = loadUrl;
				}
				$grid.datagrid('load', params);
				return this;
			}
			
			this.loadData = function(data) {
				$grid.datagrid('loadData',data);
				return this;
			}
			
			this.getData = function() {
				return $grid.datagrid('getData');
			}
			
			this.getRows = function() {
				return this.getData().rows;
			}
			
			this.reload = function() {
				$grid.datagrid('reload')
				return this;
			}

			this.getSelections = function() {
				return $grid.datagrid('getSelections')
			}
			this.getSelected = function(callback) {
				var selected = this.getSelections();
				if (selected.length > 0) {
					callback.call(this, selected);
				} else {
					Msg.warning(Msg.UNSELECTED)
				}
			}

			this.getSelectedFieldValues = function(field) {
				var objs = this.getSelections();
				var fieldValues = new Array();
				for ( var i in objs) {
					fieldValues.push(objs[i][field]);
				}
				return fieldValues;
			}

			this.getSelectedGuidsStr = function() {
				return this.getSelectedFieldsStr(gridOption.primaryKey);
			}
			
			this.getAllGuids = function() {
				var rows = this.getRows(), guidArr = [];
				if(rows.length > 0 ) {
					for(var i in rows) {
						var row = rows[i];
						guidArr.push(gridOption.primaryKey);
					}
					return guidArr.join('|').toString();
				}
				return null;
			}

			this.getSelectedFieldsStr = function(field) {
				var objs = this.getSelections();
				if(objs.length > 0) {
					var fields = [];
					for(var i in objs) {
						fields.push(objs[i][field]);
					}
					return fields.join('|').toString();
				}
				return null;
			}
		}

		return {
			setUrl : function(url) {
				gridOption.options.url = url;
				return this;
			},
			showCkBox : function(flag) {
				gridOption.showCkBox = flag;
				return this;
			},
			setMethod : function(method) {
				gridOption.options.method = method;
				return this;
			},
			setCols : function(cols) {
				gridOption.setCols(cols);
				return this;
			},
			setPrimaryKey : function(pk) {
				gridOption.primaryKey = pk
				return this;
			},
			setOptions : function(options) {
				JSTools.extend(gridOption.options, options)
				return this;
			},
			setRowStyler : function(fn) {
				gridOption.options.rowStyler = fn;
				return this;
			},
			setQueryControl : function() {
				gridOption.setQueryControl.apply(gridOption, arguments);
				return this;
			},
			toolBtn : function() {
				gridOption.toolBtn.apply(gridOption, arguments);
				return this;
			},
			toolAdd : function(handler) {
				gridOption.toolBtn('新增', 'icon-add', handler);
				return this;
			},
			toolEdit : function(handler) {
				gridOption.toolBtn('编辑', 'icon-edit', handler);
				return this
			},
			toolRemove : function(arg) {
				gridOption.toolRemove(arg)
				return this;
			},
			toolPrint : function(fun) {
				gridOption.toolBtn('打印', 'icon-print', fun);
				return this;
			},
			loadSuccess: function(fn) {
				gridOption.options.onLoadSuccess = fn;
				return this;
			},
			toolbars: function(obj){
				gridOption.setToolbars(obj);
				return this;
			},
			loadNow: function(p){
				gridOption.loadNow = p;
				return this;
			},
			setContextMenu: function(opts){
				gridOption.setContextMenu(opts);
				return this;
			},
			init : function() {
				return (CurrentGrid = new Grid_(selector || '#data-grid', gridOption));
			}
		}
	};

	// 封装 提示消息
	window.Msg = (function() {
		var msg_ = new Object();
		msg_.ERRORPROMPT = '错误提示';
		msg_.MSGPROMPT = '消息提示';
		msg_.WARNPROMPT = '警告提示';
		msg_.UNERROR = '未知错误，操作失败！';
		msg_.QUESTIONPROMPT = '是否执行此操作 ？'
		msg_.LOGOUTPROMPT = '是否注销当前登陆 ？ ';
		msg_.UNSELECTED = '未选择操作数据!';
		msg_.AJAXERROR = '异步请求出错，状态：{0} ，错误信息 ：{1}';
		msg_.LOADINGTEXT = '正在处理，请稍候。。。';
		msg_.UNAUTH = "未授权此操作！";
		msg_.NOTCOMPLETE = '输入信息不完整';
		msg_.EXISTXCHILDREN = '存在子集!';
		
		msg_.error = function(text) {
			$.messager.alert(Msg.ERRORPROMPT, text, 'error');
		};
		msg_.info = function(text,fn) {
			$.messager.alert(Msg.MSGPROMPT, text, 'info',fn);
		};
		msg_.warning = function(text,fn) {
			$.messager.alert(Msg.WARNPROMPT, text || Msg.UNERROR, 'warning',fn);
		};
		msg_.loading = function(loadingtext) {
			$.blockUI({message: '<h6><img src="/easyui/themes/default/images/loading.gif" >'+ (loadingtext || msg_.LOADINGTEXT) +'</h6>'});
		}
		msg_.loadingClose = function() {
			$.unblockUI();
		}
		function succ1(text,time,fn){
			$.messager.show({
				title : Msg.MSGPROMPT,
				msg : text,
				showType : 'fade',
				timeout : time,
				style : {
					right : '',
					bottom : ''
				}
			});
			if(fn) window.setTimeout(fn,time);
		}
		
		function succ2(text,fn) {
			succ1(text,1000,fn);
		}
		
		function succ3(text) {
			succ2(text,null);
		}
		
		function confirm_2(text, fn) {
			$.messager.confirm(Msg.MSGPROMPT, text, fn);
		}
		function confirm_1(fn) {
			confirm_2(Msg.QUESTIONPROMPT, fn)
		}
		JSTools.addMethod(msg_, 'confirm', confirm_1);
		JSTools.addMethod(msg_, 'confirm', confirm_2);
		JSTools.addMethod(msg_, 'success', succ1);
		JSTools.addMethod(msg_, 'success', succ2);
		JSTools.addMethod(msg_, 'success', succ3);
		return msg_;
	})();

	// 封装异步请求 增加权限拦截
	window.Http = (function() {
		var POST = "POST", GET = "GET";
		function ajax(url, data, callback, method) {
			Msg.loading();
			$.ajax({
				type : method,
				url : url,
				data : data,
				beforeSend: function() {
				},
				success : function(res) {
					Msg.loadingClose();
					if(JSTools.isStr(res)) 
						res = $.parseJSON(res);
					if (res.auth) { // 授权认证
						if (callback) {
							callback(res)
						} else {
							if(res.error) {
								Msg.error(msg.msg);
							}else {
								if (res.succ) {
									Msg.success(res.msg)
								} else {
									Msg.warning()
								}
							}
						}
					} else {
						Msg.warning(Msg.UNAUTH);
					}
				},
				error : function(err) {
					Msg.loadingClose();
					console.log(err);
					Msg.error(JSTools.format(Msg.AJAXERROR, err.status,
							err.responseText));
				}
			})
		}
		function get_1(url) {
			ajax(url, {}, null, GET)
		}
		function get_2(url, fn) {
			ajax(url, {}, fn, GET)
		}
		function post_2(url, data) {
			ajax(url, data, null, POST);
		}
		function post_3(url, data, fn) {
			ajax(url, data, fn, POST)
		}

		var http_ = new Object();
		JSTools.addMethod(http_, 'get', get_1);
		JSTools.addMethod(http_, 'get', get_2);
		JSTools.addMethod(http_, 'post', post_2);
		JSTools.addMethod(http_, 'post', post_3);
		return http_;
	})();

})(window, jQuery);
