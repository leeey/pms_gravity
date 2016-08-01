Ext.define('PmsGravity.view.pmsmain.popup.AddProjectPopup', {
	extend: 'Ext.window.Window',

	xtype: 'addprojectpopup',

	requires: [
		'PmsGravity.store.ProjectMembers'
	],

	title: '새 프로젝트 등록',
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
							text: '등록'
						},
						{
							ㅌxtype: 'button',
							text: '취소'
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
							fieldLabel: '프로젝트 명'
						},
						{
							xtype: 'textfield',
							fieldLabel: '프로젝트 기간',
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
							        fieldLabel: '구성원 선택',
							        value: ['id'],
							        displayField: 'name',
							        valueField: 'id',
							        filterPickList: true,
							        queryMode: 'local',
							        publishes: 'value',
							        emptyText: '구성원을 선택해주세요',
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
							    	text: '초기화',
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
							fieldLabel: '프로젝트 요약',
							flex: 3
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});