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
				defaults: {
					align: 'center'
				},
				items: [
					{
						text: 'Task ID',
						dataIndex: 'id'
					},
					{
						text: 'Task',
						dataIndex: 'name'
					},
					{
						text: 'Member',
						dataIndex: 'member'
					},
					{
						text: 'Member ID',
						dataIndex: 'memberId',
						hidden: true
					},
					{
						text: 'Period',
						dataIndex: 'period'
					},
					{
						text: 'Hours(h)',
						dataIndex: 'spent'
					},
					{
						text: 'Progress(%)',
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
						text: 'Edit/Del',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'segmentedbutton',
							items: [
								{
									text: 'Edit',
									listeners: {
										click: 'onUpdatebuttonClick'
									}
								},
								{

									text: 'Del'
								}
							]
						}
					}
				]

			}
		}
	]

});