"use strict";
$(function(){
	var toolbars = {
		toolBtnGroup: {
		},
		toolInputGroup: {
			'startDate,endDate': {
				between: true,
				type: 'date',
				label: '录入时间'
			},
			'oprContent': {
				mhcx: true,
				type: 'text',
				label: '操作内容'
			}
		}
	};
	var gridParams = {};
	if(Auth.hasPower('xtsz-log&delete')){
		toolbars.toolBtnGroup.remove  = '/log/delete';
	}
	if(Auth.lacksPower('xtsz-log&seeall')){
		gridParams.oprUser = userinfo.guid;
	}
	var grid = Grid('#data-grid')
	.setUrl('/log/findDataGrid')
	.setCols([[{
		field: 'oprUserName',
		title: '操作人'
	},{
		field: 'oprOrgName',
		title: '操作单位'
	},{
		field: 'oprcontent',
		title: '操作内容',
		width: '500px'
	},{
		field: 'opripadress',
		title: '操作IP',
		width: '120px'
	},{
		field: 'oprdate',
		title: '操作时间',
		width: '150px',
		formatter: function(val,row) {
			return JSTools.formatServerDate(val, 'yyyy-MM-dd HH:mm:ss');
		}
	}]])
	.setOptions({
		title: '日志列表',
		iconCls: 'icon-list',
		queryParams: {
			params: gridParams
		},
		onDblClickRow : function(index, row) {
			$('#oprUser').text(row.oprUserName);
			$('#oprOrg').text(row.oprOrgName);
			$('#oprIP').text(row.oprIpAddr);
			var date = JSTools.formatServerDate(row.oprDate, 'yyyy/MM/dd HH:mm:ss');
			$('#oprTime').text(date);
			$('#opr-detail').html(row.oprContent);
			$('#log-detail').window('open');
		}
	})
	.toolbars(toolbars)
	.init();
	
});