Ext.define('PmsGravity.view.pmsmain.popup.DetailPopupController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.detailpopup',

	onUpdatebuttonClick:function(button, e, eOpts) {
		var me=this;


		var record=button.ownerCt.getWidgetRecord();
		
		var win=Ext.create('Ext.window.Window', {
			width: '80%',
			padding: 15,
			modal: true,
			title: record.get('name'),
			resizable: false,
			monitorResize: true,
			layout: {
				type: 'vbox',
				align: 'stretch' 
			},
			defaults: {
				margin: 5
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{
							xtype: 'tbfill'
						},
						{
							xtype: 'button',
							text: 'Save'
						},
						{
							xtype: 'button',
							text: 'Cancel'
						}
					]
				}
			],
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Task',
					editable: false,
					value: record.get('name')
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Member',
					editable: false,
					value: record.get('member')
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Period',
					editable: false,
					value: record.get('period')+' / '+record.get('days')+' days'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Hours(h)',
					editable: false,
					value: record.get('spent')+' / '+record.get('hours')
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Progress(%)',
					editable: false,
					value: record.get('progress')*100
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'fieldset',
							title: 'Setting',
							margin: 5,
							items: [
								{
									xtype: 'combobox',
									fieldLabel: 'Member',
									value: record.get('member'),
									displayField: 'name',
									valueField: 'id',
									store: me.getViewModel().data.memberStore
								},
								{
									xtype: 'tbseparator'
								},
								{
									xtype: 'datefield',
									fieldLabel: 'Date',
									format: 'Y/m/d',
									value: new Date(),
									emptyText: 'YYYY/MM/DD'
								},
								{
									xtype: 'tbseparator'
								},
								{
									xtype: 'numberfield',
									fieldLabel: 'Hours(h)',
									minValue: 0,
									value: 8,
									editable: false
								},
								{
									xtype: 'tbseparator'
								},
								{
									xtype: 'combobox',
									fieldLabel: 'Progress(%)',
									value: record.get('progress')*100,
									displayField: 'text',
									valueField: 'value',
									editable: false,
									store: {
										data: [
											{text: '10', value: 10},
											{text: '20', value: 20},
											{text: '30', value: 30},
											{text: '40', value: 40},
											{text: '50', value: 50},
											{text: '60', value: 60},
											{text: '70', value: 70},
											{text: '80', value: 80},
											{text: '90', value: 90},
											{text: '10', value: 100}
										]
									}
								}
							]
						},
						{
							xtype: 'fieldset',
							title: 'Content',
							margin: 5,
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							height: 400,
							scrollable: true,
							defaults: {
								labelWidth: 50
							},
							items: [
								{
									xtype: 'toolbar',
									style: {
										background: 'transparent'
									},
									items: [
										{
											xtype: 'tbfill'
										},
										{
											xtype: 'button',
											text: 'Add',
											listeners: {
												click: function(v) {
													var cnt=Ext.ComponentQuery.query('textfield', v.up('fieldset')).length;
													v.up('fieldset').add({
														xtype: 'textfield',
														fieldLabel: (cnt+1).toString()
													});
												}
											}
										}
									]
								},							
								{
									xtype: 'textfield',
									fieldLabel: '1'
								},
								{
									xtype: 'textfield',
									fieldLabel: '2'
								},
								{
									xtype: 'textfield',
									fieldLabel: '3'
								},
								{
									xtype: 'textfield',
									fieldLabel: '4'
								},
								{
									xtype: 'textfield',
									fieldLabel: '5'
								}
							]
						}
					]
				}
			]
		}).show();
	}
});