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
					title: 'My info',
					margin: '0 0 15 0',
					
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									xtype: 'button',
									text: 'Save'
								}
							]
						}
					],
					
					columns : {
						defaults: {
							align: 'center'
						},
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
								flex: .2,
								items: [
									{
										xtype: 'segmentedbutton',
										width: '100%',
										items: [
											{
												text: 'Edit',
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
															title: 'Member\'s Color',
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
												text: 'Reset',
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
								text: 'Name',
								dataIndex: 'name',
								flex: .1,
								renderer: function(v, metaData, record) {
									metaData.style='height: 123px;'
									return '<b>'+v+'</b>';
								}
							},
							{
								xtype: 'widgetcolumn',
								text: 'Projects',
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
				},
				{
					xtype: 'gridpanel',
					reference: 'memberInfoGrid',
					title: 'Member info',
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
												text: 'Color',
												value: 'memberColor'
											},
											{
												text: 'Name',
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
						defaults: {
							align: 'center'
						},
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
								text: 'Name',
								dataIndex: 'name',
								flex: .1,
								renderer: function(v, metaData, record) {	
									metaData.style='height: 123px;'
									return '<b>'+v+'</b>';
								}
							},
							{
								xtype: 'widgetcolumn',
								text: 'Projects',
								flex: 1,
								align: 'left',
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