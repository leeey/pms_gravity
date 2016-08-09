Ext.define('PmsGravity.view.pmsmain.popup.AddProjectPopup', {
	extend: 'Ext.window.Window',

	xtype: 'addprojectpopup',

	requires: [
		'PmsGravity.store.ProjectMembers'
	],

	title: 'Add new project',
	width: '50%',
	padding: 15,
	monitorResize: true,
	closable: true,
	resizable: false,
	modal: true,
	autoShow: true,

	initComponent: function() {
		var me=this;

		Ext.apply(this, {
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
							text: 'Add'
						},
						{
							ㅌxtype: 'button',
							text: 'Cancel'
						}
					]
				}
			],
			items: [
				{
					xtype: 'form',
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					defaults: {
						margin: 5,
						flex: 1
					},
					items:[
						{
							xtype: 'textfield',
							fieldLabel: 'Project'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Period',
							emptyText: 'YYYYMMDD~YYYYMMDD'
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [
								{
							        xtype: 'tagfield',
							        itemId: 'memberTag',
							        fieldLabel: 'Members',
							        value: ['id'],
							        displayField: 'name',
							        valueField: 'id',
							        filterPickList: true,
							        queryMode: 'local',
							        publishes: 'value',
							        emptyText: 'Select members',
							        listeners: {
							        	render: function(v) {
							        		var store=Ext.create({
							        			xtype: 'projectmembers'
							        		});
							        		v.setStore(store);
							        		store.load();
							        	}
							        },
							        flex: 1
							    },
							    {
							    	xtype: 'button',
							    	text: 'Init',
							    	margin: '0 0 0 5',
							    	listeners: {
							    		click: function(button) {
							    			me.down('#memberTag').reset();
							    		}
							    	}
							    }
							]
						},		
						{
							xtype: 'textarea',
							fieldLabel: 'Description',
							flex: 3
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});