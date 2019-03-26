"use strict";
;(function(window,$){
	$(function(){
		//右上角下拉 
		var $topuinfo = $('#top-user-info');
		$topuinfo.hover(function() {
			this.style.color = 'black';
		}).mouseleave(function(){
			this.style.color = 'white';
		});
		$('#umenu').hover(function() {
			$topuinfo.css({color:'black'});
		}).mouseleave(function() {
			$topuinfo.css({color:'white'});
		});
		
		//密码修改
		$('#mmxg').on('click',function() {
			$('#changepwd-win').window('open')
		});
		var changepwdform = MyForm('#changepwd-form');
		changepwdform.bindForm('/user/editPwd',function(res) {
			if(res.succ) {
				Msg.success('密码修改成功，请重新登录！', function() {
					window.top.location.href = '/home/logout';	
				});
			}
		});
		//密码修改 end
		
		//左边菜单生成   
		Msg.loading();
		var currentMenus = null;
		$.get('/home/indexInfo', function(res) {
			if(typeof res == 'string')
				res = $.parseJSON(res);
			var menus = currentMenus = res.menus;
			var currentMenu = res.currentMenu;
			generateSysMenu(menus, currentMenu);
			window.userinfo = res.userinfo;
			initAuth(userinfo);
			var userprompt = '( ' + window.userinfo.orgname + ' )' + window.userinfo.realname;
			$('#top-user-info').text('欢迎    '+ userprompt);
			$('#top-user-info').data('guid',userinfo.guid);
			Msg.loadingClose();
		});
		
		function generateSysMenu(menus,currentMenu) {
			var li = '',
			$sysInfo =$('.sys-info'),
			$sysMenus = $('.sys-menus');
			$sysInfo.html('');
			$sysMenus.html('');
			
			$('#sysname').text(currentMenu.menuname);
			$('#main-layout').layout('panel','west').panel({title: currentMenu.menuname});
			
			for(var i in menus) {
				var menu = menus[i], active = '';
				if(menu.guid === currentMenu.guid){
					active = 'active';
					
					for(var j in currentMenu.childrenMenu) {
						var cm = currentMenu.childrenMenu[j];
						
						var tnlist = new Array();
						var fdiv = '<div class="easyui-accordion accordion-'+cm.guid+'" style="width: 100%;"><div id="fid-'+cm.guid+'" title="'+cm.menuname+'" data-options="iconCls:\''+cm.iconclass+'\'" style="overflow:auto;padding:5px;" >';
						fdiv += '<ul id="cid-'+cm.guid+'" class="easyui-tree"></ul>';
						fdiv += '</div></div>';
						var tn = {};
						tn.id = 'fid-' + cm.guid;
						tn.text = cm.menuname;
						tn.iconCls = cm.iconclass;
						tn.parentid = cm.parentguid;
						tn.children = new Array();
						
						getCTn(tn, cm.childrenMenu);
						
						$sysMenus.append(fdiv);
						$('.accordion-'+cm.guid).accordion({});
						
						$('#'+tn.id).tree({
							data: tn.children,
							animate: true,
							onClick: function(data) {
								addTab(data.text,data.link,data.iconCls);
							}
						});
					}
				}
				
				li += JSTools.format('<li class="{0}" data-systype="{1}" ><a href="javascript:void(0);"   >{2}</a></li>', 
					active,
					menu.guid,
					menu.menuname
				);
			}
			$sysInfo.append(li);
			$sysInfo.find('li').on('click', function() {
				var $this = $(this);
				var systype = $this.data('systype');
				if(systype !=  currentMenu.guid) {
					$.get('/home/indexInfo',{systype: systype}, function(res) {
						if(typeof res == 'string')
							res = $.parseJSON(res);
						generateSysMenu(res.menus, res.currentMenu);
						$('#top-user-info').val( window.userinfo.realname);
					});
				}
			});
			var $topTabs = $('#top-tabs');
			// 添加tab
			function addTab(title, url,icon) {
				var bodyhig = $(document.body).height();
				// 计算 iframe 容器高度
				//var hegt = (bodyhig - (100 + 40 + 30 + 30));
				if ($topTabs.tabs('exists', title)) {
					$topTabs.tabs('select', title);
				} else {
					var content = '<iframe scrolling="auto" frameborder="0"  src="'
							+ url + '" style="width:100%;height:100%;"></iframe>';
					$topTabs.tabs('add', {
						title : title,
						content : content,
						closable : true,
						iconCls : icon
					});
				}
			}
			
			function getCTn(ftn,cmenulist) {
				if(cmenulist.length > 0){					
					for(var j in cmenulist) {
						var cm = cmenulist[j];
						cm.guid = j;
						var tn = {};
						tn.id = 'cid-' + cm.guid;
						tn.text = cm.menuname;
						tn.iconCls = cm.iconclass;
						tn.parentid = cm.parentguid;
						tn.link = cm.menuurl;
						tn.children = new Array();
						getCTn(tn,cm.childrenMenu);
						ftn.children.push(tn);
					}
				}
			}
		}
		
		//左边菜单生成 end
		
		//在页面中进行权限操作
		function initAuth(userinfo) {
			
//			for(var i in userinfo.roles){				
//				console.log(userinfo.roles[i].powers)
//			} 
			window.Auth = {
				userinfo: userinfo,
				hasRole: function(rolecode) {
					return this.hasRoles(rolecode);
				},
				hasRoles: function(rolecodes) {
					var rolecodeArr = rolecodes.split(',');
					var roles = this.userinfo.roles;
					for(var i in roles){
						var role = roles[i];
						for(var j in rolecodeArr) {
							var rolecode = rolecodeArr[j];						
							if(role.rolealias === rolecode) {
								return true;
							}
						}
					}
					return false;
				},
				lacksRole: function(rolecode) {
					return !this.hasRole(rolecode);
				},
				lacksRoles: function(rolecodes) {
					return !this.hasRoles(rolecodes);
				},
				hasPower: function(powercode) {
					return this.hasPowers(powercode);
				},
				hasPowers: function(powercodes){
					var powercodeArr = powercodes.split(',');
					var roles = this.userinfo.roles;
					for(var i in roles){
						var role = roles[i];
						var powers = role.powers;
						for(var j in powers) {
							var power = powers[j];
							for(var k in powercodeArr) {
								var powercode = powercodeArr[k];
								if(powercode === power.powername) {
									return true;
								}
							}
						}
					}
					return false;
				},
				lacksPower: function(powercode) {
					return !this.hasPower(powercode);
				},
				lacksPowers: function(powercodes){
					return !this.hasPowers(powercodes);
				}
			};
		}
	});
})(window,jQuery);