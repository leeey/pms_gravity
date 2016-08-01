Ext.define('PmsGravity.view.ganttmain.GanttMainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.ganttmain',

	allReload: function() {
		var me=this;
		var yearFrom=me.lookupReference('yearFrom').getValue(),
			yearTo=me.lookupReference('yearTo').getValue(),
			monthFrom=me.lookupReference('monthFrom').getValue(),
			monthTo=me.lookupReference('monthTo').getValue();

		var from=yearFrom+monthFrom;
		var to=yearTo+monthTo;

		if(parseInt(from)>parseInt(to)) {
			Ext.Msg.alert('적용', '기간을 다시 설정해주세요');
			return;
		}

		var taskGrid=me.lookupReference('taskGrid');
		var ganttGrid=me.lookupReference('ganttGrid');

		//taskGrid.getView().setLoading(true);
		ganttGrid.setHidden(true);
		me.getView().down('#loadingPanel').setHidden(false);
		me.getView().down('#loadingPanel').setLoading(true);

		var showCt=me.lookupReference('showCt');
		showCt.removeAll();
		showCt.add({
			xtype: 'button',
			text: '<<',
			margin: '0 0 3 3',
			listeners: {
				click: function(button) {
					ganttGrid.getView().scrollTo(0, 0);
				}
			}
		});
		
		ganttGrid.getStore().removeAll();

		ganttGrid.getColumnManager().headerCt.removeAll();
		
		var store=me.getViewModel().data.prjStore;

		store.load({
			callback: function(response, operation, success) {
				if(success) {
					var childrenList=[],
						children;
					var eventYearMonth=[];
					for(var i in response) {
						if(response[i].get('details').length) {
							var period=response[i].get('period').split('~');
							var periodFrom=period[0].substring(0, 6);
							var periodTo=period[1].substring(0, 6);
							conditionGap=to-from;
							periodGap=periodTo-periodFrom;
							var cCnt=0;
							var cYearMonth=[];
							while(cCnt<=conditionGap) {
								cYearMonth.push((parseInt(from)+cCnt).toString());
								cCnt++;
							}
							var pCnt=0;
							var pYearMonth=[];
							while(pCnt<=periodGap) {
								pYearMonth.push((parseInt(periodFrom)+pCnt).toString());
								pCnt++;
							}
							pYearMonth.forEach(function(yearMonth, index, array) {
								if(cYearMonth.indexOf(yearMonth)>-1) {
									eventYearMonth.push(yearMonth);
									children=[];
									response[i].get('details').forEach(function(item, index, array){		
										children.push({
											leaf: true,
											name: '&emsp;'+item.name,
											id: item.id,
											member: item.member,
											memberId: item.memberId,
											memberColor: item.memberColor,
											period: item.period,
											updated: item.updated,
											days: item.days,
											hours: item.hours,
											spent: item.spent,
											progress: item.progress,
											qtip: response[i].get('name')+'-'+item.name+'('+item.progress*100+'%)<br>'+item.member
										});
									});
									childrenList.push({
										name: '<b>'+response[i].get('name')+'</b>',
										id: response[i].get('id'),
										period: response[i].get('period'),
										children: children,
										expanded: true
									});	
								}
							});
								
						}
					}
					var treeStore=new Ext.data.TreeStore({
						fields: [],
						data: childrenList
					});
					
					var gap=yearTo-yearFrom;
					if(gap===0) {
						var year=yearFrom; 
						var month=monthFrom;
						while(month<=monthTo) {
							var days=new Date(year, month, 0).getDate();
							ganttGrid.headerCt.insert({
								xtype: 'gridcolumn',
								text: year+'/'+month,
								itemId: 'nav'+year+month,
								style: {
									'text-align': 'left'
								},
								columns: (eventYearMonth.indexOf(year+month)>-1 ? me.getColumnDays(year, month, childrenList) : {text: '1~'+days, align: 'center', width: 80})
							});	
															
							month++;
							month=(month>=10? month.toString() : '0'+month);
							
						}
					}
					else if(gap>0) { //해가 다를 경우
						var year=yearFrom; 
						while(year<=yearTo) { //해가 끝날때까지 loop
							if(year===yearFrom) { //시작하는 해
								var month=monthFrom; //지정한 달부터
								while(month<=12) {
									var days=new Date(year, month, 0).getDate();
									ganttGrid.headerCt.insert({
										xtype: 'gridcolumn',
										style: {
											'text-align': 'left'
										},
										text: year+'/'+month,
										itemId: 'nav'+year+month,
										columns: (eventYearMonth.indexOf(year+month)>-1 ? me.getColumnDays(year, month, childrenList) : {text: '1~'+days, align: 'center'})
									});
									month++;
									month=(month>=10? month.toString() : '0'+month);
									
								}
							}
							else if(year===yearTo) { //끝나는 해
								var month='01';
								while(month<=monthTo) {
									var days=new Date(year, month, 0).getDate();
									ganttGrid.headerCt.insert({
										xtype: 'gridcolumn',
										style: {
											'text-align': 'left'
										},
										text: year+'/'+month,
										itemId: 'nav'+year+month,
										columns: (eventYearMonth.indexOf(year+month)>-1 ? me.getColumnDays(year, month, childrenList) : {text: '1~'+days, align: 'center'})
									});
									month++;
									month=(month>=10? month.toString() : '0'+month);
										
								}
							}
							else { //중간 해
								var month='01';
								while(month<=12) {
									var days=new Date(year, month, 0).getDate();
									ganttGrid.headerCt.insert({
										xtype: 'gridcolumn',
										style: {
											'text-align': 'left'
										},
										text: year+'/'+month,
										itemId: 'nav'+year+month,
										columns: (eventYearMonth.indexOf(year+month)>-1 ? me.getColumnDays(year, month, childrenList) : {text: '1~'+days, align: 'center'})
									});
									month++;
									month=(month>=10? month.toString() : '0'+month);
										
								}
							}
							year++;
							year=(year>=10? year.toString() : '0'+year);
						}
					}
					taskGrid.setStore(treeStore);
					ganttGrid.setStore(treeStore);
					
					//taskGrid.getView().setLoading(false);
					me.getView().down('#loadingPanel').setHidden(true);
					me.getView().down('#loadingPanel').setLoading(false);
					ganttGrid.setHidden(false);

				}
			}
		});
	},

	getColumnDays: function(year, month, childrenList) {
		var me=this;
		var ganttGrid=me.lookupReference('ganttGrid');	
		var taskGrid=me.lookupReference('taskGrid');
		var columns=[];
		
		var showCt=me.lookupReference('showCt');
		showCt.add({
			xtype: 'button',
			text: year+'/'+month,
			margin: '0 0 3 3',
			listeners: {
				click: function(button) {
					var target=ganttGrid.down('#nav'+year+month);
					ganttGrid.getView().scrollBy(target.getX()-taskGrid.getWidth()-20, 0);
				}
			}
		});
		var days=new Date(year, month, 0).getDate();
		var cnt=0;
		var columnWidth=me.lookupReference('zoomSlider').getValue();
		
		while(cnt<days) {
			cnt++;
			var columnText=cnt.toString();
			if(cnt<10) {
				columnText=0+columnText;
			}
			columns.push({
				xtype: 'gridcolumn',
				text: columnText,
				tooltip: columnText,
				align: 'center',
				width: columnWidth,
				year: year,
				month: month,
				menuDisabled: true,
				isDay: true,
				dataIndex: 'parentId',
				resizable: false,
				sortable: false,
				style: {
					'font-size': '1px'
				},
				renderer: function(value, metaData, record, rowIndex, cellIndex, store, view) {
					metaData.style='padding-right: 1px; padding-left: 1px;';
					
					var column=this.getColumnManager().columns[cellIndex];
					var date=column.year+column.month+column.text;
					
					if(!record.childNodes.length) {
						metaData.tdAttr='data-qtip="'+date+record.get('name')+'('+record.get('progress')*100+'%)"';
					}
					else {
						metaData.tdAttr='data-qtip="'+record.get('name')+'"';	
					}
					for(var i in childrenList) {
						if(childrenList[i].id===value) {
							var children=childrenList[i].children;
							for(var i in children) {
								if(children[i].period && record.get('period')) {			
									var period= record.get('period').split('~');
									if(parseInt(date)>=parseInt(period[0]) && parseInt(date)<=parseInt(period[1])) {
										var today=Ext.Date.format(new Date(), 'Ymd');
										var strokeColor;
										var updated=record.get('updated');
										if(updated) {
											for(var i in updated) {
												if(date===updated[i]) {
												metaData.style='padding-right: 1px; padding-left: 1px; cursor: pointer;';	
													return '<svg width= "100%" height="10"><circle cx="50%" cy="50%" r="3" style="fill:'+record.get('memberColor')+';stroke-width:3;stroke:'+record.get('memberColor')+';"></svg>';
												}
											}
										}
										
										(parseInt(date)<parseInt(today) ? strokeColor='gray' : strokeColor='green')
										if(parseInt(date)>=parseInt(today)) strokeColor=record.get('memberColor');
										
										return '<svg width= "100%" height="10"><rect width="100%" height="100%" style="fill:'+record.get('memberColor')+';stroke-width:3;stroke:'+strokeColor+';"></svg>';
									}
								}	
							}
						}
					}
				}
			});	
		}
		return columns;
	},

	onCellClick: function(treeView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		var me=this;
		var ganttGrid=me.lookupReference('ganttGrid');
		var store=me.getViewModel().data.historyStore;
		var column=ganttGrid.getColumnManager().columns[cellIndex];
		var date=column.year+column.month+column.text;
		
		store.load({
			callback: function(response, operation, success) {
				if(success) {
					for(var i in response) {
						if(record.get('id')===response[i].get('id')) {
							response[i].get('history').forEach(function(item, index, array) {
								if(date===item.id) {
									var win=Ext.create({
										xtype: 'window',
										width: '30%',
										resizable: false,
										modal: true,
										padding: 15,
										title: response[i].get('name'),
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										defaults: {
											readOnly: true
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: '일자',
												value: item.date
											},
											{
												xtype: 'textfield',
												fieldLabel: '시간(h)',
												value: item.hours
											},
											{
												xtype: 'textfield',
												fieldLabel: '진행률(%)',
												value: item.progress*100
											},
											{
												xtype: 'textarea',
												fieldLabel: '내용',
												value: item.content
											}

										]
									}).show();
								}
							});
						}
					}
					
				}
			}
		});
	},

	getMonthComboData: function() {
		var data=[],
			cnt=0;

		while(cnt<12) {
			cnt++;
			data.push({
				name: cnt,
				value: (cnt>=10 ? cnt.toString(): '0'+cnt.toString())
			});
		}

		return data;
	},

	getYearComboData: function() {
		var data=[],
			cnt=new Date().getFullYear()-50;

		while(cnt<new Date().getFullYear()+50) {
			cnt++;
			data.push({
				name: cnt,
				value: cnt.toString()
			});
		}

		return data;	
	}

});


