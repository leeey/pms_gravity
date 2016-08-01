/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('PmsGravity.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'PmsGravity.view.main.MainController',
        'PmsGravity.view.main.MainModel',
        'PmsGravity.view.main.List',

        'PmsGravity.view.pmsmain.PmsMain', //프로젝트 관리
        'PmsGravity.view.ganttmain.GanttMain', //gantt chart
        'PmsGravity.view.membermain.MemberMain', //구성원 관리
        'PmsGravity.view.statmain.StatMain', //통계

        'PmsGravity.view.component.StatChart'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        }
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        },
        items: [
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                text: 'Sign in',
                width: 80,
                margin: '5 5 5 0'
            },
            {
                xtype: 'button',
                text: 'Sign up',
                width: 80,
                margin: '5 5 5 0'
            }
        ]
        
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'top'
        }
    },

    // defaults: {
    //     bodyPadding: 20,
    //     tabConfig: {
    //         plugins: 'responsive',
    //         responsiveConfig: {
    //             wide: {
    //                 iconAlign: 'left',
    //                 textAlign: 'left'
    //             },
    //             tall: {
    //                 iconAlign: 'top',
    //                 textAlign: 'center',
    //                 width: '5%'
    //             }
    //         }
    //     }
    // },
    minTabWidth: 150,
    layout: 'fit',
    defaults: {
        margin: 5,
        padding: 10,
        frame: true,
        monitorResize: true
    },
    listeners: {
        tabchange: function(tabPanel, newCard, oldCard) {
            newCard.getController().allReload();
        }
    },
    items: [
        {
            title: 'Projects',
            xtype: 'pmsmain'      
        },
        {
            title: 'Gantt Chart',
            xtype: 'ganttmain'
        }, 
        {
            title: 'Members',
            xtype: 'membermain'
        }, 
        {
            title: 'Statistics',
            xtype: 'statmain'
        }, 
        // {
        //     title: '관리자'
        // }
    ]
});
