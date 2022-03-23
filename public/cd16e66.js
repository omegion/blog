(window.webpackJsonp=window.webpackJsonp||[]).push([[31,22,23],{774:function(t,e,r){"use strict";r.r(e);var o=r(2),n=Object(o.d)({name:"Item",components:{},props:{repository:{type:Object,required:!0}},setup:function(){return{}}}),c=r(48),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{},[r("p",{staticClass:"title is-size-4"},[r("a",{staticClass:"has-text-hover-primary-dark",attrs:{href:t.repository.url,target:"_blank"}},[t._v(t._s(t.repository.name))])]),t._v(" "),r("p",{},[t._v(t._s(t.repository.description))]),t._v(" "),r("div",{staticClass:"pt-3"},[r("table",{staticClass:"table"},[r("tbody",[t.repository.languages.nodes.length>0?r("tr",[r("td",{staticClass:"has-text-weight-semibold"},[t._v("Languages")]),t._v(" "),r("td",t._l(t.repository.languages.nodes,(function(e,o){return r("b-tag",{key:o,staticClass:"mr-1"},[t._v(t._s(e.name)+"\n            ")])})),1)]):t._e(),t._v(" "),t.repository.repositoryTopics.nodes.length>0?r("tr",[r("td",{staticClass:"has-text-weight-semibold"},[t._v("Topics")]),t._v(" "),r("td",t._l(t.repository.repositoryTopics.nodes,(function(e,o){return r("b-tag",{key:o,staticClass:"mr-1"},[t._v(t._s(e.topic.name)+"\n            ")])})),1)]):t._e(),t._v(" "),t.repository.latestRelease?r("tr",[r("td",{staticClass:"has-text-weight-semibold"},[t._v("Latest Release")]),t._v(" "),r("td",[r("a",{attrs:{href:t.repository.latestRelease.url,target:"_blank"}},[t._v(t._s(t.repository.latestRelease.tagName))])])]):t._e(),t._v(" "),r("tr",[r("td",{staticClass:"has-text-weight-semibold"},[t._v("Created at")]),t._v(" "),r("td",[t._v(t._s(t._f("formatDateMonthYear")(t.repository.createdAt)))])])])])])])}),[],!1,null,null,null);e.default=component.exports},775:function(t,e,r){"use strict";r.r(e);var o=r(2),n=Object(o.d)({name:"ItemPlaceholder",components:{},setup:function(){return{}}}),c=r(48),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{},[r("p",{staticClass:"title is-size-4"},[r("b-skeleton",{attrs:{height:"30px"}})],1),t._v(" "),r("p",{},[r("b-skeleton"),t._v(" "),r("b-skeleton")],1),t._v(" "),r("div",{staticClass:"pt-3"},[r("table",{staticClass:"table"},[r("tbody",t._l(5,(function(e){return r("tr",{key:e},[r("td",{staticClass:"has-text-weight-semibold"},[r("b-skeleton",{attrs:{width:"100px"}})],1),t._v(" "),r("td",[r("b-skeleton",{attrs:{width:"150px"}})],1)])})),0)])])])}),[],!1,null,null,null);e.default=component.exports},883:function(t,e,r){"use strict";r.r(e);var o=r(5),n=(r(37),r(27),r(32),r(52),r(50),r(2)),c=r(49),l=r(774),d=r(775),_=Object(n.d)({name:"Index",components:{ItemPlaceholder:d.default,Item:l.default},setup:function(){var t=Object(c.g)(),e=Object(c.d)().$config,r=Object(n.l)(null),l=Object(c.e)(Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))),d=l.fetch,_=l.fetchState;return Object(c.f)((function(){var title="Open Source Projects - ".concat(e.titlePostfix),t="Open Source Projects - ".concat(e.titlePostfix);return null!==r.value&&(title="".concat(r.value.name," - ").concat(e.titlePostfix),t=r.value.description),{title:title,meta:[{hid:"description",name:"description",content:t},{property:"og:description",content:t}]}})),Object(c.f)({meta:[{name:"twitter:site",content:"@omegion"},{name:"twitter:creator",content:"@omegion"},{property:"og:site_name",content:e.titlePostfix},{property:"og:type",content:"website"},{property:"og:url",content:e.baseUrl},{property:"og:locale",content:"en_US"}]}),d(),Object(n.q)(t,(function(){d()})),{repository:r,fetchState:_}},head:{}}),v=r(48),component=Object(v.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card repository-details"},[r("div",{staticClass:"card-content"},[t.fetchState.pending?r("item-placeholder"):t.repository?r("item",{attrs:{repository:t.repository}}):t._e()],1)])}),[],!1,null,null,null);e.default=component.exports}}]);