Ext.define('PmsGravity.view.membermain.MemberMain', {
	extend: 'Ext.panel.Panel',

	xtype: 'membermain',

	requires: [
		'PmsGravity.view.membermain.MemberMainController',
		'PmsGravity.store.ProjectMembers',
		'PmsGravity.store.ProjectDetails'
	],

	controller: 'membermain',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function() {
		var me=this;

		Ext.apply(this, {
			items: [
				{
					xtype: 'gridpanel',
					reference: 'myInfoGrid',
					itemId: 'myInfoGrid',
					title: '내 정보',
					margin: '0 0 15 0',
					
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									xtype: 'button',
									text: '저장'
								}
							]
						}
					],
					
					columns : [
						{
							text: 'ID',
							dataIndex: 'id',
							flex: .1,
							renderer: function(v, metaData, record) {
									metaData.style='height: 123px;'
									return '<b>'+v+'</b>';
								}
						},
						{
							text: 'Color',
							dataIndex: 'memberColor',
							flex: .2,
							items: [
								{
									xtype: 'segmentedbutton',
									width: '100%',
									items: [
										{
											text: '수정',
											menu: {
												listeners: {
													beforeshow: 'editColorButtonShow'
												},
												items: [
													{
														xtype: 'container',
														itemId: 'colorCt',
														padding: 3,
														layout: {
															type: 'vbox',
															align: 'stretch'
														},
														listeners: {
															render: 'colorCtRender'
														}
													},
													{
														xtype: 'fieldset',
														title: '구성원 Color',
														itemId: 'memberFieldSet',
														collapsible: true,
														margin: 5,
														listeners: {
															render: 'memberFieldSetRender'
														}
													}

												]
											}
										},
										{
											text: '원래대로',
											itemId: 'resetButton',
											listeners: {
												click: 'resetButtonClick'
											}
														
										}
									]			
								}								
							],
							renderer: function(v, metaData, record) {
								metaData.style='height: 123px; background: '+(record.get('memberColor') ? record.get('memberColor') : null)+';';
								if(record.get('memberColor')) {	
									return '<b>'+v.fontcolor('white')+'</b>';
								}
							}
						},
						{
							text: '이름',
							dataIndex: 'name',
							flex: .1,
							renderer: function(v, metaData, record) {
								metaData.style='height: 123px;'
								return '<b>'+v+'</b>';
							}
						},
						{
							xtype: 'widgetcolumn',
							text: '참여 프로젝트',
							flex: 1,
							widget: {
								xtype: 'fieldset',
								scrollable: true,
								height: 100,
								items: [],
								style: {
									'background': 'transparent'
								},
								listeners: {
									beforerender: 'widgetColumnBeforeRender'
								}
							}
						}
					]
				},
				{
					xtype: 'gridpanel',
					reference: 'memberInfoGrid',
					title: '구성원 정보',
					flex: 1,
					forceFit: true,
					dockedItems: [
						{
							xtype: 'toolbar',
							items: [
								{
									xtype: 'tbfill'
								},
								{
									xtype: 'combobox',
									itemId: 'searchCombo',
									fields: ['text', 'value'],
									displayField: 'text',
									valueField: 'value',
									editable: false,
									width: 120,
									store: {
										data: [
											{
												text: 'ID',
												value: 'id'
											},
											{
												text: 'Color ID',
												value: 'memberColor'
											},
											{
												text: '이름',
												value: 'name'
											}
										]
									},
									listeners: {
										render: function(v) {
											v.setSelection(v.getStore().getRange()[0]);
										}
									}
								},
								{
									xtype: 'textfield',
									triggers: {
										search: {
											cls: 'x-form-search-trigger',
											handler: function(v) {
												var searchMap= {
													key: me.down('#searchCombo').getValue(),
													value: v.getValue()
												};
											}
										}
									}
								}
							]
						}
					],
					columns: {
						items: [
							{
								text: 'ID',
								dataIndex: 'id',
								flex: .1,
								renderer: function(v, metaData, record) {
									metaData.style='height: 123px;'
									return '<b>'+v+'</b>';
								}
							},
							{
								text: 'Color',
								dataIndex: 'memberColor',
								flex: .1,
								renderer: function(v, metaData, record) {
									metaData.style='height: 123px; background: '+(record.get('memberColor') ? record.get('memberColor') : null)+';';
									if(record.get('memberColor')) {	
										return '<b>'+v.fontcolor('white')+'</b>';
									} 
								}
							},
							{
								text: '이름',
								dataIndex: 'name',
								flex: .1,
								renderer: function(v, metaData, record) {	
									metaData.style='height: 123px;'
									return '<b>'+v+'</b>';
								}
							},
							{
								xtype: 'widgetcolumn',
								text: '참여 프로젝트',
								flex: 1,
								widget: {
									xtype: 'fieldset',
									scrollable: true,
									height: 100,
									items: [],
									style: {
										'background': 'transparent'
									},
									listeners: {
										beforerender: 'widgetColumnBeforeRender' 
									}
								}
							}
						]
					}
				}
			]
		});

		me.callParent(arguments);
	}

});