Ext.define('PmsGravity.view.component.StatChart', {
	extend: 'Ext.panel.Panel',

	xtype: 'statchart',

	layout: 'fit',
	margin: 5,

	items: [
		{
			xtype: 'cartesian'
		}
	]

});