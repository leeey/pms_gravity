Ext.define('PmsGravity.view.ganttmain.GanttMain', {
	extend: 'Ext.panel.Panel',

	xtype: 'ganttmain',

	requires: [
		'PmsGravity.view.ganttmain.GanttMainController'
	],

	controller: 'ganttmain',

	viewModel: {
		stores: {
			prjStore: {
				fields: [],
				proxy: {
					type: 'ajax',
					url: 'resources/project_details.json',
					reader: {
						type: 'json',
						rootProperty: 'data'
					}
				}
			},
			historyStore: {
				fields: [],
				proxy: {
					type: 'ajax',
					url: 'resources/project_task_history.json',
					reader: {
						type: 'json',
						rootProperty: 'data'
					}
				}
			}
		}
	},

	title: 'Gantt Chart',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	initComponent: function() {
		var me=this;

		Ext.apply(this, {
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					margin: '0 0 15 0',
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'label',
							html: '<b>-</b>'
						},
						{
							xtype: 'sliderfield',
							reference: 'zoomSlider',
							width: 300,
							value: 60,
							increment: 5,
							minValue: 15,
							maxValue: 100,
							tipText: function(thumb) {
								return thumb.value+'%';
							},
							listeners: {
								changecomplete: 'allReload'
							}
						},
						{
							xtype: 'label',
							html: '<b>+</b>'
						}
					]
				},
				{
					xtype: 'panel',
					dock: 'top',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'panel',
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							flex: 1,
							items: [
								{
									xtype: 'toolbar',
									items: [
										{
											xtype: 'tbfill'
										},
										{
											xtype: 'label',
											text: 'YEAR'
										},
										{
											xtype: 'combobox',
											reference: 'yearFrom',
											editable: false,
											width: 100,
											value: new Date().getFullYear().toString(),
											fields: ['name', 'value'],
											displayField: 'name',
											valueField: 'value',
											store: {
												data: me.getController().getYearComboData()
											}
										},
										{
											xtype: 'label',
											text: '~'
										},
										{
											xtype: 'combobox',
											reference: 'yearTo',
											editable: false,
											width: 100,
											value: new Date().getFullYear().toString(),
											fields: ['name', 'value'],
											displayField: 'name',
											valueField: 'value',
											store: {
												data: me.getController().getYearComboData()
											}
										}
									]
								},
								{
									xtype: 'toolbar',
									items: [
										{
											xtype: 'tbfill'
										},
										{
											xtype: 'label',
											text: 'MONTH'
										},
										{
											xtype: 'combobox',
											reference: 'monthFrom',
											editable: false,
											width: 100,
											value: (new Date().getMonth()+1>=10 ? (new Date().getMonth()+1).toString() : '0'+(new Date().getMonth()+1)),
											fields: ['name', 'value'],
											displayField: 'name',
											valueField: 'value',
											store: {
												data: me.getController().getMonthComboData()
											}
										},
										{
											xtype: 'label',
											text: '~'
										},
										{
											xtype: 'combobox',
											reference: 'monthTo',
											editable: false,
											width: 100,
											value: (new Date().getMonth()+1>=10 ? (new Date().getMonth()+1).toString() : '0'+(new Date().getMonth()+1)),
											fields: ['name', 'value'],
											displayField: 'name',
											valueField: 'value',
											store: {
												data: me.getController().getMonthComboData()
											}
										}
									]
								}
							]
						},
						{
							xtype: 'button',
							text: '적용',
							width: 80,
							margin: '5 5 5 0',
							listeners: {
								click: function(button) {
									me.getController().allReload();
								}
							}
						}
					]
				},
				{
					xtype: 'container',
					itemId: 'showCt',
					reference: 'showCt'
				}
			],
			items: [
				{
					
					xtype: 'gridpanel',
					reference: 'taskGrid',
					layout: 'fit',
					forceFit: true,
					width: 500,
					columns: {
						items: [
							{
								text: '프로젝트',
								columns: [
									{
										text: '업무명',
										dataIndex: 'name',
										width: 150,
									},
									{
										text: '담당자',
										dataIndex: 'member'
									},
									{
										text: '기간',
										dataIndex: 'period',
										width: 150
									},
									{
										xtype: 'widgetcolumn',
										text: '수정',
										widget: {
											xtype: 'button',
											text: '수정'
										}
									}
								]
							}
						]
					}
				},
				{
					xtype: 'gridpanel',
					reference: 'ganttGrid',
					flex: 1,
					listeners: {
						cellClick: 'onCellClick',
					}
				},
				{
					xtype: 'panel',
					itemId: 'loadingPanel',
					hidden: true,
					flex: 1
				}
			]
		});

		me.callParent(arguments);
	}
});

