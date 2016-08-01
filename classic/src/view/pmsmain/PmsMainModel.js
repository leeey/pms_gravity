Ext.define('PmsGravity.view.pmsmain.PmsMainModel', {
	extend: 'Ext.app.ViewModel',

	alias: 'viewmodel.pmsmain',

	requires: [
		'PmsGravity.store.ProjectSamples',
		'PmsGravity.store.ProjectMembers'
	],

	data: {},

	stores: {
		projectStore: {
			type: 'projectsamples'
		},
		memberStore: {
			type: 'projectmembers'
		}
	}
});