Ext.define('PmsGravity.view.pmsmain.popup.DetailPopup', {
	extend: 'Ext.window.Window',

	xtype: 'detailpopup',

	requires: [
		'PmsGravity.view.pmsmain.popup.DetailPopupController'
	],

	controller: 'detailpopup',

	viewModel: {
		stores: {
			detailStore: {
				fields: [],
				data:{},
				proxy: {
					type: 'ajax',
					url: 'resources/project_details.json',
					reader: {
						type: 'json',
						rootProperty: 'data'
					}

				}
			},
			memberStore: {
				fields: [],
				data:{},
				proxy: {
					type: 'ajax',
					url: 'resources/project_members.json',
					reader: {
						type: 'json',
						rootProperty: 'data'
					}
				}	
			}
		}
	},

	modal: true,
	width: '70%',
	height: '60%',
	padding: 15,
	monitorResize: true,
	layout: 'fit',
	items: [
		{
			xtype: 'gridpanel',
			itemId: 'detailGrid',
			layout: 'fit',
			forceFit: true,
			columns: {
				items: [
					{
						text: '업무ID',
						dataIndex: 'id'
					},
					{
						text: '업무',
						dataIndex: 'name'
					},
					{
						text: '담당자',
						dataIndex: 'member'
					},
					{
						text: 'memberId',
						dataIndex: 'memberId',
						hidden: true
					},
					{
						text: '기간',
						dataIndex: 'period'
					},
					{
						text: '진행시간(h)',
						dataIndex: 'spent'
					},
					{
						text: '진행률(%)',
						xtype: 'widgetcolumn',
						dataIndex: 'progress',
						widget: {
							xtype: 'progressbarwidget',
							textTpl: [
								'{percent:number("0")}%'
							]
						}
					},
					{
						text: '관리',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'segmentedbutton',
							items: [
								{
									text: '수정',
									listeners: {
										click: 'onUpdatebuttonClick'
									}
								},
								{

									text: '삭제'
								}
							]
						}
					}
				]

			}
		}
	]

});