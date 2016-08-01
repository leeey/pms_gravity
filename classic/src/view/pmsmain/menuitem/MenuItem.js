Ext.define('PmsGravity.view.pmsmain.menuitem.MenuItem', {
	extend: 'Ext.panel.Panel',

	xtype: 'pmsmenuitem',

	requires: [
		'PmsGravity.view.pmsmain.popup.DetailPopup'
	],

	width: 420,
	padding: 5,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		editable: false
	},
	listeners: {
		render: function(v) {
			var project=v.getViewModel().get('project');
			v.add(
				{
					xtype: 'textfield',
					fieldLabel: '프로젝트명',
					value: project.get('name') 
				},
				{
					xtype: 'textfield',
					fieldLabel: '기간',
					value: project.get('period')
				},
				{
					xtype: 'fieldset',
					title: '구성원('+project.get('members').length+')',
					collapsed: true,
					collapsible: true,
					defaults: {
						margin: 2,
						style: {
							'border-radius': '3px',
						}
					},
					items: this.getMembers(project.get('members'))
				},
				{
					xtype: 'textarea',
					fieldLabel: '프로젝트 요약',
					flex: 3,
					value: project.get('content')
				},
				{
					xtype: 'button',
					text: '세부진행관리',
					margin: 3,
					listeners: {
						click: function() {
							var win=Ext.create({
								xtype: 'detailpopup',
								title: project.get('name'),
								listeners: {
									render: function(v) {
										var store=v.getViewModel().data.detailStore;
										var grid=v.down('#detailGrid');
										
										grid.setStore(store);
										store.load({
											callback: function(response, operation, success) {
												if(success) {
													//console.log(project);
													//console.log(response);
													for(var i in response) {
														if(project.get('id')===response[i].id) {
															store.loadData(response[i].get('details'));
														}
													}
												}
											}
										});
									}
								}	
							}).show();
						}
					}

				},
				{
					xtype: 'button',
					text: '수정',
					margin: 3
				}
			);
		}
	},

	getMembers: function(members) {
		var me=this;

		var items=[];

		if(members.length) {
			members.forEach(function(item, index, array) {
				items.push({
					xtype: 'button',
					minWidth: 70,
					text: item.name.fontcolor('black'),
					value: item.id,
					style: {
						'background': item.memberColor,
						'border-radius': '3px',
						'border': 'none'
					},
					tooltip: 'ID: '+item.id
				});
			});	
		}
		
		return items;
	}
});



