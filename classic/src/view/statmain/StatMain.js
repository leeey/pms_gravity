Ext.define('PmsGravity.view.statmain.StatMain', {
	extend: 'Ext.panel.Panel',

	xtype: 'statmain',

	requires: [
		'PmsGravity.view.statmain.StatMainController'
	],

	controller: 'statmain',

	viewModel: {

	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1
	},
	initComponent: function() {
		var me=this;

		Ext.apply(this, {
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'

					},
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'statchart',
							title: '프로젝트 현황'
						},
						{
							xtype: 'statchart',
							title: '프로젝트 진행률'
						}
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'

					},
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'statchart',
							title: '프로젝트 현황'
						},
						{
							xtype: 'statchart',
							title: '프로젝트 진행률'
						}
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch'

					},
					defaults: {
						flex: 1
					},
					items: [
						{
							xtype: 'statchart',
							title: '프로젝트 현황'
						},
						{
							xtype: 'statchart',
							title: '프로젝트 진행률'
						}
					]
				}
			]
		});

		me.callParent(arguments);
	}
});