Ext.define('PmsGravity.view.pmsmain.PmsMainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.pmsmain',

	allReload: function() {
		var me=this;
		me.getView().removeAll();
		var store=me.getViewModel().data.projectStore;

		store.load({
			callback: function(response, operation, success) {
				if(success) {
		
					for(var i in response) {
						var members=response[i].get('members');
						me.getView().add({
							xtype: 'button',
							width: '100%',
							height: '100%',
							style: {
								//'border-radius': '2px'
							},
							text: response[i].get('name').fontsize(3),
							menu: {
								listeners: {
									show: function(menu) {
										menu.down('fieldset').expand();
									}
								},
								items: [
									{
										xtype: 'pmsmenuitem',
										viewModel: {
											data: {project: response[i]}
										}
									}
								]
							}
						});
					}
					me.getView().add({
						xtype: 'button',
						text: '+ project'.fontsize(3).fontcolor('gray'),
						width: '100%',
						height: '100%',
						style: {
							//'border-radius': '2px',
							'border': 'lightgray',
							'background-color': 'lightgray'
						},
						listeners: {
							click: 'onAddProjectButtonClick'
						}
					});
					var cnt=0;
					var value=me.lookupReference('prjCombo').getValue();
					while(cnt<value-response.length-1) {
						cnt++;
						me.getView().add({
							xtype: 'button',
							text: '+ project',
							width: '100%',
							height: '100%',
							style: {
								'border-radius': '5px',
								'border': 'lightgray',
								'background-color': 'transparent'
							}
						});
					}
				}
			}
		});

		
	},

	getMembers: function(members) {
		var me=this;

		var items=[];

		if(members.length) {
			members.forEach(function(item, index, array) {
				items.push({
					xtype: 'button',
					text: item.name,
					value: item.id,
					tooltip: 'ID: '+item.id
				});
			});	
		}
		
		return items;
	},

	onAddProjectButtonClick: function(button, e, eOpts) {
		var me=this;

		var popup=Ext.create({
			xtype: 'addprojectpopup'
		});

		popup.show();
		
	},

	onComboItemChange: function(combo, item, e, eOpts) {
		var me=this;
		
		me.allReload();
	}


});