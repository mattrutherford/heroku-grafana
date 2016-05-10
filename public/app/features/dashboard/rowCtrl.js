/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","app/core/config"],function(a,b,c){"use strict";var d=a.module("grafana.controllers");d.controller("RowCtrl",["$scope","$rootScope","$timeout",function(a,d,e){var f={title:"Row",height:"150px",collapse:!1,editable:!0,panels:[]};b.defaults(a.row,f),a.init=function(){a.editor={index:0}},a.togglePanelMenu=function(b){a.showPanelMenu=!a.showPanelMenu,a.panelMenuPos=b},a.toggleRow=function(b){b.collapse=b.collapse?!1:!0,b.collapse||e(function(){a.$broadcast("render")})},a.addPanel=function(b){a.dashboard.addPanel(b,a.row)},a.deleteRow=function(){a.appEvent("confirm-modal",{title:"Are you sure you want to delete this row?",icon:"fa-trash",yesText:"Delete",onConfirm:function(){a.dashboard.rows=b.without(a.dashboard.rows,a.row)}})},a.moveRow=function(c){var d=a.dashboard.rows,e=b.indexOf(d,a.row),f=e;switch(c){case"up":f=e-1;break;case"down":f=e+1;break;case"top":f=0;break;case"bottom":f=d.length-1;break;default:f=e}f>=0&&f<=d.length-1&&b.move(d,e,f)},a.addPanelDefault=function(b){var d=12,f=12-a.dashboard.rowSpan(a.row),g={title:c.new_panel_title,error:!1,span:d>f&&f>0?f:d,editable:!0,type:b,isNew:!0};a.addPanel(g),e(function(){a.dashboardViewState.update({fullscreen:!0,edit:!0,panelId:g.id})})},a.setHeight=function(b){a.row.height=b,a.$broadcast("render")},a.removePanel=function(c){a.appEvent("confirm-modal",{title:"Are you sure you want to remove this panel?",icon:"fa-trash",yesText:"Delete",onConfirm:function(){a.row.panels=b.without(a.row.panels,c)}})},a.updatePanelSpan=function(a,b){a.span=Math.min(Math.max(Math.floor(a.span+b),1),12)},a.replacePanel=function(c,d){var f=a.row,g=b.indexOf(f.panels,d);f.panels.splice(g,1),e(function(){c.id=d.id,c.span=d.span,f.panels.splice(g,0,c)})},a.init()}]),d.directive("rowHeight",function(){return function(a,c){a.$watchGroup(["row.collapse","row.height"],function(){c.css({minHeight:a.row.collapse?"5px":a.row.height})}),a.onAppEvent("panel-fullscreen-enter",function(d,e){var f=b.findWhere(a.row.panels,{id:e.panelId});f||c.hide()}),a.onAppEvent("panel-fullscreen-exit",function(){c.show()})}}),d.directive("panelWidth",function(){return function(a,b){function c(){b[0].style.width=a.panel.span/1.2*10+"%"}a.onAppEvent("panel-fullscreen-enter",function(c,d){a.panel.id!==d.panelId?b.hide():b[0].style.width="100%"}),a.onAppEvent("panel-fullscreen-exit",function(d,e){a.panel.id!==e.panelId?b.show():c()}),a.$watch("panel.span",c)}}),d.directive("panelDropZone",function(){return function(a,b){a.$on("ANGULAR_DRAG_START",function(){var c=12-a.dashboard.rowSpan(a.row);c>0&&(b.find(".panel-container").css("height",a.row.height),b[0].style.width=c/1.2*10+"%",b.show())}),a.$on("ANGULAR_DRAG_END",function(){b.hide()})}})});