(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{487:function(t,e,n){var content=n(507);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("622183e2",content,!0,{sourceMap:!1})},505:function(t,e,n){"use strict";var r=n(2),o=n(81).find,c=n(196),l="find",d=!0;l in[]&&Array(1).find((function(){d=!1})),r({target:"Array",proto:!0,forced:d},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),c(l)},506:function(t,e,n){"use strict";n(487)},507:function(t,e,n){var r=n(79)(!1);r.push([t.i,".image[data-v-7d4459d0]{width:100%}.right-section[data-v-7d4459d0]{flex-grow:1;display:flex;flex-direction:column;justify-content:center;justify-items:center;font-size:100px;padding-left:60px;background-color:#9fff7a}.brand[data-v-7d4459d0]{font-size:24px;line-height:60px;margin-left:10px}.grey[data-v-7d4459d0]{color:grey}",""]),t.exports=r},563:function(t,e,n){"use strict";n.r(e);n(34),n(28),n(33),n(48),n(29),n(49);var r=n(20),o=(n(505),n(69),n(82));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={data:function(){return{popup:!1,access:{},person:{},echo:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)(["persons"])),mounted:function(){var t=this;this.echo=this.$echo({key:"pusher_key_123",host:"10.4.21.112",port:6001}),this.echo.channel("log").listen(".log",(function(e){t.$emit("new-data"),t.access=e.access,t.person=t.persons.find((function(p){return p.pin==e.access.pin}))||{},t.popup||(t.popup=!0),setTimeout((function(){t.popup&&(t.popup=!1)}),5e3)}))},destroyed:function(){this.echo.leave("log")}},d=(n(506),n(35)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.person.id?n("el-dialog",{attrs:{visible:t.popup,fullscreen:""},on:{"update:visible":function(e){t.popup=e}}},[n("div",{staticClass:"flex",attrs:{slot:"title"},slot:"title"},[n("img",{staticStyle:{height:"55px"},attrs:{src:"/images/logo.jpeg",alt:""}}),t._v(" "),n("div",{staticClass:"brand"},[t._v("UPT BALAI YASA TEGAL")])]),t._v(" "),n("div",{staticStyle:{display:"flex"}},[n("el-card",{staticClass:"text-center",staticStyle:{width:"400px","margin-right":"10px","flex-shrink":"0"},attrs:{"body-style":{padding:"0 0 20px 0"}}},[n("img",{staticClass:"image",attrs:{src:t.access.photo_path||t.person.photo_path,referrerpolicy:"no-referrer"}}),t._v(" "),n("div",{staticStyle:{margin:"20px 0 10px 0","font-size":"30px","font-weight":"bold"}},[t._v("\n\t\t\t\t"+t._s(t.person.name)+" "+t._s(t.person.last_name)+"\n\t\t\t")]),t._v(" "),n("div",{staticStyle:{"font-size":"25px","margin-bottom":"10px"}},[t._v("\n\t\t\t\t"+t._s(t.person.pin)+"\n\t\t\t")]),t._v(" "),n("div",{staticStyle:{"font-size":"20px"}},[t._v("\n\t\t\t\t"+t._s(t.person.department?t.person.department.name:"")+"\n\t\t\t")])]),t._v(" "),n("el-card",{staticClass:"right-section"},[n("div",{staticStyle:{"margin-bottom":"25px"}},[n("i",{staticClass:"el-icon-time grey"}),t._v("\n\t\t\t\t"+t._s(t.$moment(t.access.event_time).format("HH:mm:ss"))+"\n\t\t\t")]),t._v(" "),n("div",[n("i",{staticClass:"el-icon-user grey"}),t._v("\n\t\t\t\t"+t._s(t.access.temperature||"-")+" °C\n\t\t\t")]),t._v(" "),n("div",{staticStyle:{"font-size":"50px","margin-top":"50px"}},[t._v("\n\t\t\t\tPRODUKTIVITAS ANDA : xx%\n\t\t\t")])])],1)]):t._e()}),[],!1,null,"7d4459d0",null);e.default=component.exports}}]);