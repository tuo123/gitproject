$(function() {
	
	$('[data-open]').on('click',function() {
		var url = this.getAttribute('data-open');
		window.open(url);
	});
	
	$('#logout').click(function() {
		var url = this.getAttribute('data-url')
		Msg.confirm(Msg.LOGOUTPROMPT, function(r) {
			if (r) {
				window.top.location.href = url;
			}
		})
	})

//	var $currTimeDom = $('.curr-time>span');
//	var toutindex = -1;
//	(function showCurrTime() {
//		var d = new Date(), yyyy = d.getFullYear(), MM = (d.getMonth() + 1), dd = d
//				.getDate(), HH = d.getHours(), mm = d.getMinutes(), ss = d
//				.getSeconds();
//		$currTimeDom.html('yyyy年MM月dd日HH时mm分ss秒'.replace('yyyy', yyyy).replace(
//				'MM', (MM < 10) ? ('0' + MM) : MM).replace('dd',
//				(dd < 10) ? ('0' + dd) : dd).replace('HH',
//				(HH < 10) ? ('0' + HH) : HH).replace('mm',
//				(mm < 10) ? ('0' + mm) : mm).replace('ss',
//				(ss < 10) ? ('0' + ss) : ss));
//		if (toutindex !== -1)
//			window.clearTimeout(toutindex)
//		toutindex = setTimeout(showCurrTime, 1000)
//	})();
	
	var $themeLink = $('#themes-link'),
	$setTheme = $('#set-theme');
	//$setTheme.val($themeLink.data('theme-index'))
	$setTheme.find('[data-value]').on('click',function() {
		var themeHref = '';
		var v = $(this).data('value');
		switch (v) {
		case 0:
			themeHref = '/easyui/themes/bootstrap/easyui.css';
			$('#top-title').removeClass('bg-top-cloud').addClass('bg-top');
			break;
		case 1:
			themeHref = '/easyui/themes/black/easyui.css'
			break;
		case 2:
			themeHref = '/easyui/themes/default/easyui.css';
			$('#top-title').removeClass('bg-top').addClass('bg-top-cloud');
			break;
		case 3:
			themeHref = '/easyui/themes/gray/easyui.css'
			break;
		case 4:
			themeHref = '/easyui/themes/material/easyui.css'
			break;
		case 5:
			themeHref = '/easyui/themes/metro/easyui.css'
			break;
		case 6:
			themeHref = '/easyui/themes/ui-cupertino/easyui.css'
			break;
		case 7:
			themeHref = '/easyui/themes/ui-dark-hive/easyui.css'
			break;
		case 8:
			themeHref = '/easyui/themes/ui-pepper-grinder/easyui.css'
			break;
		case 9:
			themeHref = '/easyui/themes/ui-sunny/easyui.css'
			break;
		}
		$themeLink.attr('href', themeHref);
		$.cookie('easyui-theme-url', themeHref,{expires: 7 , path: '/'});
		$.cookie('easyui-theme-index', v,{expires: 7 , path: '/'});
		setThemeDeaultIcon(v);
		
	});
	
	var themeHref = $.cookie('easyui-theme-url');
	var themeIndex = $.cookie('easyui-theme-index');
	if(themeHref) {
		$themeLink.attr('href', themeHref);
		setThemeDeaultIcon(themeIndex);
	}
	function setThemeDeaultIcon(tindex) {
		$setTheme.find('[data-value]').each(function(i,dom){
			if(this.getAttribute('data-value') == tindex) {
				$(dom).append('<div class="menu-icon icon-accept"></div>');
			}else {
				$(dom).find('.menu-icon').remove();
			}
		});
	} 
	
	var num = 0;
	/* 自定义      easyui  validate box*/
	$.extend($.fn.validatebox.defaults.rules, {
	    equals: {
	    	validator: function(value, param) {
	    		return $(param[0]).val() === value;
	    	},
	    	message: '输入的结果不一致！'
	    }
	});
})
