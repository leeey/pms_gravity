Ext.define('PmsGravity.store.ProjectDetails', {
	extend: 'Ext.data.Store',

	alias: 'store.projectdetails',

    xtype: 'projectdetails',

	fields: [
    ],

    data: {},
    proxy: {
        type: 'ajax',
        url: 'resources/project_details.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});