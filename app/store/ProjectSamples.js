Ext.define('PmsGravity.store.ProjectSamples', {
	extend: 'Ext.data.Store',

	alias: 'store.projectsamples',

	fields: [
        {name: 'name'}, {name: 'period'}, {name: 'members'}, {name: 'content'}
    ],

    data: {},

    proxy: {
        type: 'ajax',
        url: 'resources/project_samples.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});