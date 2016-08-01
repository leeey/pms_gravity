Ext.define('PmsGravity.store.ProjectMembers', {
	extend: 'Ext.data.Store',

	alias: 'store.projectmembers',

    xtype: 'projectmembers',

	fields: [
        {name: 'name'}, 
        {name: 'id'}
    ],

    data: {},
    proxy: {
        type: 'ajax',
        url: 'resources/project_members.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});