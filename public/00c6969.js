(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{661:function(t,e,n){"use strict";n.r(e);var c=n(5),r=(n(50),n(2)),o=n(49),l=Object(r.d)({name:"CategoryItem",props:{item:{type:Object,required:!0}},setup:function(t){var e=Object(o.g)(),n=Object(o.d)(),l=n.$content,d=n.$config,m=Object(r.l)(0);return(0,Object(o.e)(Object(c.a)(regeneratorRuntime.mark((function e(){var n,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={category:t.item.slug},d.isProduction&&Object.assign(n,{isPublished:!0}),e.next=4,l("articles").where(n).only(["slug"]).fetch();case 4:c=e.sent,m.value=c.length;case 6:case"end":return e.stop()}}),e)})))).fetch)(),{isActive:function(){return e.value.query.category===t.item.slug},articleCount:m}}}),d=n(48),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("nuxt-link",{class:["card category-item notification",t.item.type,{"is-active":t.isActive()}],attrs:{tag:"div",to:{name:"index",query:{category:t.item.slug}}}},[n("div",{staticClass:"card-content p-2"},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-content"},[n("b-icon",{attrs:{icon:t.item.icon,size:"is-medium"}})],1)]),t._v(" "),n("div",{staticClass:"media pt-5"},[n("div",{staticClass:"media-content"},[n("p",{staticClass:"is-size-5 has-text-weight-semibold"},[t._v(t._s(t.item.name))]),t._v(" "),n("p",{staticClass:"is-size-6"},[t._v(t._s(t.articleCount)+" articles")])])])])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);