Ext.define('PmsGravity.view.pmsmain.PmsMain', {
	extend: 'Ext.panel.Panel',
	xtype: 'pmsmain',

	requires: [
		'PmsGravity.view.pmsmain.PmsMainController',
		'PmsGravity.view.pmsmain.PmsMainModel',
		'PmsGravity.view.pmsmain.menuitem.MenuItem',
		'PmsGravity.view.pmsmain.popup.AddProjectPopup'
	],

	controller: 'pmsmain',
	viewModel: {
		type: 'pmsmain'
	},

	title: '프로젝트관리',
	layout: {
		type: 'table',
		columns: 5,
		tableAttrs: {
			style: {
				width: '100%',
				height: '100%'
			}
		},
		tdAttrs: {
			style: {
				padding: '0px 5px 0px 5px'
			}
		}
	},
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'tbfill'
				},
				{
					xtype: 'combobox',
					reference: 'prjCombo',
					width: 200,
					editable: false,
					fieldLabel: '프로젝트보기',
					fields: ['name', 'count'],
					store: {
						data: [
							{
								name: 20,
								count: 20
							},
							{
								name: 30,
								count: 30
							},
							{
								name: 50,
								count: 50
							}
						]
					},
					displayField: 'name',
					valueField: 'count',
					listeners: {
						render: function(v) {
							v.setSelection(v.getStore().getRange()[0]);
						},
						select: 'onComboItemChange'
					}
				}
			]
		}
	]
});