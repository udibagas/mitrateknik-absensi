(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(t,e,r){"use strict";var o=r(1),n=r(131),l=r.n(n),c=r(273),d=r.n(c);o.default.use(l.a,{locale:d.a})},190:function(t,e,r){"use strict";r(58),r(72),r(15),r(61);e.a=function(t,e){t.app;e("decimal",(function(t){return null==t?0:t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}))}},191:function(t,e,r){"use strict";var o=r(131);e.a=function(t){var e=t.$axios;t.redirect;e.onError((function(t){parseInt(t.response&&t.response.status)&&Object(o.Message)({message:t.response.data.message,type:"error",center:!0,showClose:!0,duration:5e3})}))}},192:function(t,e,r){"use strict";r(36);var o=r(274);window.Pusher=r(449),e.a=function(t,e){t.app;var r=t.$axios;e("echo",(function(t){return new o.a({broadcaster:"pusher",key:t.key,wsHost:t.host,wsPort:t.port,forceTLS:!1,disableStats:!0,authorizer:function(t,e){return{authorize:function(e,o){r.$post("/api/broadcasting/auth",{socket_id:e,channel_name:t.name}).then((function(t){return o(!1,t)})).catch((function(t){return o(!0,t)}))}}}})}))}},237:function(t,e,r){var content=r(321);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(80).default)("2e69e44b",content,!0,{sourceMap:!1})},276:function(t,e,r){"use strict";r(68);var o={middleware:["auth"],data:function(){return{collapse:!0,showProfile:!1,timer:this.$moment().format("DD/MMM/YYYY HH:mm:ss"),menus:[{label:"BERANDA",icon:"el-icon-data-analysis",path:"/"},{label:"ABSENSI",icon:"el-icon-alarm-clock",path:"/absensi"},{label:"LOG AKSES",icon:"el-icon-bell",path:"/log"},{label:"JAM KERJA",icon:"el-icon-date",path:"/time-slot",admin_only:!0},{label:"USER",icon:"el-icon-user",path:"/user",admin_only:!0}]}},methods:{goBack:function(){window.history.back()},handleCommand:function(t){var e=this;"logout"===t&&this.$confirm("Anda yakin ingin keluar?","Konfirmasi",{type:"warning"}).then((function(){return e.$auth.logout().then(e.$router.push("/login"))})),"profile"===t&&(this.showProfile=!0)}},created:function(){var t=this;this.$store.dispatch("getGates"),this.$store.dispatch("getPersons"),this.$store.dispatch("getDepartments"),setInterval((function(){t.timer=t.$moment().format("DD/MMM/YYYY HH:mm:ss")}),1e3)}},n=(r(320),r(35)),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-container",[r("el-header",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticClass:"flex"},[r("img",{staticStyle:{height:"55px"},attrs:{src:"/images/logo.jpeg",alt:""}}),t._v(" "),r("div",{staticClass:"brand"},[t._v("UPT BALAI YASA TEGAL")])]),t._v(" "),r("div",[r("el-dropdown",{staticStyle:{height:"60px","line-height":"60px"},on:{command:t.handleCommand}},[r("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[t._v("\n\t\t\t\t\tSelamat Datang, "+t._s(t.$auth.user.name)+"!\n\t\t\t\t")]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-user",command:"profile"}},[t._v("\n\t\t\t\t\t\tProfil Saya\n\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-arrow-right",command:"logout"}},[t._v("\n\t\t\t\t\t\tKeluar\n\t\t\t\t\t")])],1)],1),t._v(" "),r("span",{staticStyle:{color:"#666","font-size":"0.9em","margin-left":"20px"}},[r("i",{staticClass:"el-icon-date"}),t._v("\n\t\t\t\t"+t._s(t.timer)+"\n\t\t\t")])],1)]),t._v(" "),r("el-container",[r("el-aside",{attrs:{width:"auto"}},[r("el-menu",{attrs:{router:"",collapse:t.collapse,"default-active":t.$route.path,"active-text-color":"#FF5E0A"}},t._l(t.menus.filter((function(e){return!!t.$auth.user.admin||!e.admin_only})),(function(e,i){return r("el-menu-item",{key:i,attrs:{index:e.path}},[r("i",{class:e.icon}),t._v(" "),r("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.label))])])})),1)],1),t._v(" "),r("el-main",[r("router-view",{on:{back:t.goBack}}),t._v(" "),r("Profile",{attrs:{show:t.showProfile},on:{close:function(e){t.showProfile=!1}}})],1)],1)],1)}),[],!1,null,"02e95910",null);e.a=component.exports;installComponents(component,{Profile:r(451).default})},277:function(t,e,r){"use strict";var o=r(35),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",[e("Nuxt")],1)}),[],!1,null,null,null);e.a=component.exports},280:function(t,e,r){r(281),r(282),t.exports=r(297)},318:function(t,e,r){var content=r(319);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(80).default)("02097838",content,!0,{sourceMap:!1})},319:function(t,e,r){var o=r(79)(!1);o.push([t.i,"body,html{margin:0;padding:0;font-family:Arial,Helvetica,sans-serif}.el-icon-more{transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg)}.el-table{width:100%;border-top:1px solid #eee}.no-padding-dialog>.el-dialog__body{padding:0}.pointer{cursor:pointer}.text-right{text-align:right}.text-center{text-align:center}.text-white,.text-white:active,.text-white:focus,.text-white:hover{color:#fff!important}.bg-blue{background-color:#00f!important}.bg-indigo{background-color:indigo!important}.bg-purple{background-color:purple!important}.bg-pink{background-color:pink!important}.bg-red{background-color:red!important}.bg-orange{background-color:orange!important}.bg-yellow{background-color:#ff0!important}.bg-green{background-color:green!important}.bg-teal{background-color:teal!important}.bg-cyan{background-color:#0ff!important}.el-table th,.el-table thead.is-group th{padding:4px 0}.text-danger,.text-red{color:red}.text-green,.text-success{color:green}table{border-spacing:0;border-collapse:separate}.table{width:100%;border-top:2px solid #ddd}.table td,.table th{padding:10px;border-bottom:1px solid #ddd}.el-table .inactive-row{background:#ffeff0}.el-dialog__body,.el-table .cell{word-break:normal}.flex{display:flex}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.ml-3{margin-left:15px}.mr-2{margin-right:10px}.mt-0{margin-top:0}.mb-0{margin-bottom:0}.mb-1{margin-bottom:5px}.mb-2{margin-bottom:10px}.mb-3{margin-bottom:15px}.ml-5{margin-left:25px}.p-2{padding:10px}.p-3{padding:15px}.text-lg{font-size:large}.text-2xl,.text-xl{font-size:2em}.text-5xl{font-size:2.5em}.text-purple-700{color:purple}.text-blue-700{color:#00f}.text-orange-700{color:orange}.border{border:1px solid #ddd}.bg-orange-600{background-color:orange}.bg-red-300,.bg-red-700{background-color:red}.bg-green-300{background-color:green}.bg-purple-600{background-color:purple}.bg-blue-600{background-color:#00f}.bg-blue-700{background-color:#254ec1}.bg-green-600{background-color:green}.bg-gray-200{background-color:#ccc}.rounded-md{border-radius:4px}.min-w-full{min-width:100%}.border-b{border-bottom:1px solid #ddd}.px-3,.px-4{padding-left:15px;padding-right:15px}.py-1{padding-top:5px;padding-bottom:5px}.mx-auto{margin:0 auto}.justify-content-center{justify-content:center}.align-items-center{align-items:center}",""]),t.exports=o},320:function(t,e,r){"use strict";r(237)},321:function(t,e,r){var o=r(79)(!1);o.push([t.i,".el-menu[data-v-02e95910]{border-right:none}.el-menu-item [class^=el-icon-][data-v-02e95910]{font-size:22px}.brand[data-v-02e95910]{font-size:24px;line-height:60px;margin-left:10px}.el-main[data-v-02e95910]{height:calc(100vh - 60px);overflow:auto;background:#efefef;padding:10px}",""]),t.exports=o},322:function(t,e,r){"use strict";r.r(e),r.d(e,"state",(function(){return n})),r.d(e,"mutations",(function(){return l})),r.d(e,"actions",(function(){return c}));var o=r(7),n=(r(57),function(){return{areas:[],departments:[],devices:[],gates:[],persons:[],timeslots:[]}}),l={setAreas:function(t,data){t.areas=data},setDepartments:function(t,data){t.departments=data},setDevices:function(t,data){t.devices=data},setGates:function(t,data){t.gates=data},setPersons:function(t,data){t.persons=data},setTimeSlots:function(t,data){t.timeslots=data}},c={getAreas:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/area");case 3:data=r.sent,o("setAreas",data);case 5:case"end":return r.stop()}}),r)})))()},getDepartments:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/department");case 3:data=r.sent,o("setDepartments",data);case 5:case"end":return r.stop()}}),r)})))()},getDevices:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/device");case 3:data=r.sent,o("setDevices",data);case 5:case"end":return r.stop()}}),r)})))()},getGates:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/gate");case 3:data=r.sent,o("setGates",data);case 5:case"end":return r.stop()}}),r)})))()},getPersons:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/person");case 3:data=r.sent,o("setPersons",data);case 5:case"end":return r.stop()}}),r)})))()},getTimeslots:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=t.commit,r.next=3,e.$axios.$get("/api/timeSlot");case 3:data=r.sent,o("setTimeSlots",data);case 5:case"end":return r.stop()}}),r)})))()}}},389:function(t,e,r){var map={"./id":163,"./id.js":163};function o(t){var e=n(t);return r(e)}function n(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=n,t.exports=o,o.id=389},451:function(t,e,r){"use strict";r.r(e);r(34),r(28),r(33),r(48),r(29),r(49);var o=r(20);r(15);function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var c={props:["show"],data:function(){return{formModel:l({},this.$auth.user),loading:!1,formErrors:{}}},methods:{save:function(){var t=this;this.loading=!0,this.$axios.$put("/api/user/".concat(this.formModel.id),this.formModel).then((function(e){t.$message({message:"Data berhasil diupdate",type:"success",showClose:!0}),t.$store.state.user=e})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))}}},d=r(35),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:"PROFIL SAYA",visible:t.show,"show-close":!1}},[r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.name,callback:function(e){t.$set(t.formModel,"name",e)},expression:"formModel.name"}}),t._v(" "),t.formErrors.name?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.name[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"Level"}},[r("el-input",{attrs:{disabled:"",value:t.formModel.role?"Admin":"Operator"}})],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Konfirmasi Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:t.formModel.password_confirmation,callback:function(e){t.$set(t.formModel,"password_confirmation",e)},expression:"formModel.password_confirmation"}})],1)],1),t._v(" "),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){return t.$emit("close")}}},[t._v("TUTUP")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}},[[280,11,1,12]]]);