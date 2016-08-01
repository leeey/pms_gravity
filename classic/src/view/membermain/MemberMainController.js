Ext.define('PmsGravity.view.membermain.MemberMainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.membermain',

	allReload: function() {
		var me=this;

		myInfoGrid=me.lookupReference('myInfoGrid');
		memberInfoGrid=me.lookupReference('memberInfoGrid');

		var memberStore=Ext.create({
			xtype: 'projectmembers'
		});

		memberInfoGrid.setStore(memberStore);
		
		memberStore.load({
			callback: function(response, operation, success) {
				if(success) {
					var store=Ext.create('Ext.data.Store', {
						fields: [],
						data: response[0]
					});
					me.getView().down('#resetButton').value=response[0].get('memberColor');
					myInfoGrid.setStore(store);
				}
			}
		});
		
	},

	editColorButtonShow: function(button) {
		var me=this;

		var colorButtons=Ext.ComponentQuery.query('button', me.getView().down('#colorCt'));
		
		for(var i in colorButtons) {
			var value=Math.random().toFixed(6).toString();
			var color='#'+value.replace('0.', '');
			colorButtons[i].setConfig({
				text: color,
				tooltip: color,
				style: {
					'background': color,
					'border': 'solid white 1px'
				}
			});
		}

		var memberButtons=Ext.ComponentQuery.query('button', me.getView().down('#memberfieldSet'));
		var members=me.lookupReference('memberInfoGrid').getStore().getRange();
		for(var i in memberButtons) {
			members.forEach(function(item, index, array) {
				if(memberButtons[i].value===item.get('id')) {
					memberButtons[i].setConfig({
						value: item.get('id'), 
						text: item.get('name')+'<br>('+item.get('memberColor')+')',
						margin: 3,
						style: {
							'background': item.get('memberColor') 
						} 
					});
				}
			});
			
		}
	},

	colorCtRender: function(v) {
		/*
			색상을 가져오는 로직이 필요함
			구성원의 기존색상은 제외
			로직 미작성...
		*/
		var me=this;

		var data=me.lookupReference('myInfoGrid').getStore().getRange()[0];
		var pCnt=0;
		while(pCnt<10) {
			pCnt++;
			v.add({
				xtype: 'panel',
				flex: 1,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				listeners: {
					render: function(v) {
						var bCnt=0;
						while(bCnt<10) {
							bCnt++;
							var value=Math.random().toFixed(6).toString();
							var color='#'+value.replace('0.', '');
							v.add({
								xtype: 'button',
								text: color,
								tooltip: color,
								style: {
									'background': color,
									'border': 'solid white 1px'
								},
								listeners: {
									click: function(button) {
										var data=me.lookupReference('myInfoGrid').getStore().getRange()[0];
					
										button.up('menu').hide();
										
										data.set('memberColor', button.getText());
									}
								}
							})
						}
					}
				}													
			});
		}
	},

	resetButtonClick: function(button) {
		
		var data=button.up('#myInfoGrid').getStore().getRange()[0];
		
		data.set('memberColor', button.value);
		
	},

	memberFieldSetRender: function(fieldSet) {
		var me=this;

		var members=me.lookupReference('memberInfoGrid').getStore().getRange();
		for(var i in members) {
			if(members[i].get('memberColor')) {
				fieldSet.add({
					xtype: 'button',
					value: members[i].get('id'), 
					text: members[i].get('name')+'<br>('+members[i].get('memberColor')+')',
					margin: 3,
					style: {
						'background': members[i].get('memberColor') 
					} 
				})
			}
		}
	},

	widgetColumnBeforeRender: function(column) {
		var projects=column.getWidgetRecord().get('projects');

		if(projects) {
			column.setTitle(projects.length+' projects');	
		} else {
			column.setTitle('0 projects');
		}
		
		for(var i in projects) {
			var tasks=[];
			projects[i].tasks.forEach(function(item) {
				tasks.push({
					text: item.name+' ('+item.period+')',
					value: item
				});
			});
			column.add({
				xtype: 'button',
				text: projects[i].name+' ('+projects[i].period+')',
				value: projects[i],
				menu: {
					minWidth: 250,
					items: tasks
				}
			});
		}
		
	} 

});