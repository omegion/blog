(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{643:function(t,e,l){"use strict";l.r(e);var r=l(2),n=Object(r.d)({name:"Breadcrumb",props:{items:{type:Array,required:!0},type:{type:String,default:"is-white"},disableLastItem:{type:Boolean,default:!0}},setup:function(t){return{textColor:Object(r.a)((function(){return"is-primary"===t.type?"has-text-primary":"has-text-white"}))}}}),c=l(48),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("nav",{staticClass:"level"},[l("div",{staticClass:"level-left"},[l("div",{staticClass:"level-item"},[l("nav",{class:["breadcrumb is-small has-arrow-separator",t.type],attrs:{"aria-label":"breadcrumbs"}},[l("ul",t._l(t.items,(function(e,r){return l("li",{key:r,class:{"is-active":r===t.items.length-1&&t.disableLastItem}},[l("nuxt-link",{class:["has-text-weight-semibold is-size-7 is-capitalized",t.textColor],attrs:{tag:"a",to:{name:"index"}}},[t._v("\n              "+t._s(e.name)+"\n            ")])],1)})),0)])])])])}),[],!1,null,null,null);e.default=component.exports}}]);