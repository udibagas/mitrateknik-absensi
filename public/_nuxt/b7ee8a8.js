(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(e,t,r){"use strict";var o=r(1),n=r(131),l=r.n(n),c=r(273),d=r.n(c);o.default.use(l.a,{locale:d.a})},190:function(e,t,r){"use strict";r(58),r(72),r(15),r(61);t.a=function(e,t){e.app;t("decimal",(function(e){return null==e?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}))}},191:function(e,t,r){"use strict";var o=r(131);t.a=function(e){var t=e.$axios;e.redirect;t.onError((function(e){parseInt(e.response&&e.response.status)&&Object(o.Message)({message:e.response.data.message,type:"error",center:!0,showClose:!0,duration:5e3})}))}},192:function(e,t,r){"use strict";var o=r(274);window.Pusher=r(449),window.Echo=new o.a({broadcaster:"pusher",key:"pusher_key_123",wsHost:"10.4.21.112",wsPort:6001,forceTLS:!1,disableStats:!0})},237:function(e,t,r){var content=r(321);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(80).default)("2e69e44b",content,!0,{sourceMap:!1})},276:function(e,t,r){"use strict";r(69);var o={middleware:["auth"],data:function(){return{collapse:!0,showProfile:!1,timer:this.$moment().format("DD/MMM/YYYY HH:mm:ss"),menus:[{label:"BERANDA",icon:"el-icon-data-analysis",path:"/"},{label:"ABSENSI",icon:"el-icon-alarm-clock",path:"/absensi"},{label:"LOG AKSES",icon:"el-icon-bell",path:"/log"},{label:"JAM KERJA",icon:"el-icon-date",path:"/time-slot",admin_only:!0},{label:"USER",icon:"el-icon-user",path:"/user",admin_only:!0}]}},methods:{goBack:function(){window.history.back()},handleCommand:function(e){var t=this;"logout"===e&&this.$confirm("Anda yakin ingin keluar?","Konfirmasi",{type:"warning"}).then((function(){return t.$auth.logout().then(t.$router.push("/login"))})),"profile"===e&&(this.showProfile=!0)}},created:function(){var e=this;this.$store.dispatch("getGates"),this.$store.dispatch("getPersons"),this.$store.dispatch("getDepartments"),setInterval((function(){e.timer=e.$moment().format("DD/MMM/YYYY HH:mm:ss")}),1e3)}},n=(r(320),r(35)),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",[r("el-header",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticClass:"flex"},[r("img",{staticStyle:{height:"55px"},attrs:{src:"/images/logo.jpeg",alt:""}}),e._v(" "),r("div",{staticClass:"brand"},[e._v("UPT BALAI YASA TEGAL")])]),e._v(" "),r("div",[r("el-dropdown",{staticStyle:{height:"60px","line-height":"60px"},on:{command:e.handleCommand}},[r("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[e._v("\n\t\t\t\t\tSelamat Datang, "+e._s(e.$auth.user.name)+"!\n\t\t\t\t")]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-user",command:"profile"}},[e._v("\n\t\t\t\t\t\tProfil Saya\n\t\t\t\t\t")]),e._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-arrow-right",command:"logout"}},[e._v("\n\t\t\t\t\t\tKeluar\n\t\t\t\t\t")])],1)],1),e._v(" "),r("span",{staticStyle:{color:"#666","font-size":"0.9em","margin-left":"20px"}},[r("i",{staticClass:"el-icon-date"}),e._v("\n\t\t\t\t"+e._s(e.timer)+"\n\t\t\t")])],1)]),e._v(" "),r("el-container",[r("el-aside",{attrs:{width:"auto"}},[r("el-menu",{attrs:{router:"",collapse:e.collapse,"default-active":e.$route.path,"active-text-color":"#FF5E0A"}},e._l(e.menus.filter((function(t){return!!e.$auth.user.admin||!t.admin_only})),(function(t,i){return r("el-menu-item",{key:i,attrs:{index:t.path}},[r("i",{class:t.icon}),e._v(" "),r("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.label))])])})),1)],1),e._v(" "),r("el-main",[r("router-view",{on:{back:e.goBack}}),e._v(" "),r("Profile",{attrs:{show:e.showProfile},on:{close:function(t){e.showProfile=!1}}})],1)],1)],1)}),[],!1,null,"02e95910",null);t.a=component.exports;installComponents(component,{Profile:r(451).default})},277:function(e,t,r){"use strict";var o=r(35),component=Object(o.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("el-container",[t("Nuxt")],1)}),[],!1,null,null,null);t.a=component.exports},280:function(e,t,r){r(281),r(282),e.exports=r(285)},318:function(e,t,r){var content=r(319);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(80).default)("02097838",content,!0,{sourceMap:!1})},319:function(e,t,r){var o=r(79)(!1);o.push([e.i,"body,html{margin:0;padding:0;font-family:Arial,Helvetica,sans-serif}.el-icon-more{transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg)}.el-table{width:100%;border-top:1px solid #eee}.no-padding-dialog>.el-dialog__body{padding:0}.pointer{cursor:pointer}.text-right{text-align:right}.text-center{text-align:center}.text-white,.text-white:active,.text-white:focus,.text-white:hover{color:#fff!important}.bg-blue{background-color:#00f!important}.bg-indigo{background-color:indigo!important}.bg-purple{background-color:purple!important}.bg-pink{background-color:pink!important}.bg-red{background-color:red!important}.bg-orange{background-color:orange!important}.bg-yellow{background-color:#ff0!important}.bg-green{background-color:green!important}.bg-teal{background-color:teal!important}.bg-cyan{background-color:#0ff!important}.el-table th,.el-table thead.is-group th{padding:4px 0}.text-danger,.text-red{color:red}.text-green,.text-success{color:green}table{border-spacing:0;border-collapse:separate}.table{width:100%;border-top:2px solid #ddd}.table td,.table th{padding:10px;border-bottom:1px solid #ddd}.el-table .inactive-row{background:#ffeff0}.el-dialog__body,.el-table .cell{word-break:normal}.flex{display:flex}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.ml-3{margin-left:15px}.mr-2{margin-right:10px}.mt-0{margin-top:0}.mb-0{margin-bottom:0}.mb-1{margin-bottom:5px}.mb-2{margin-bottom:10px}.mb-3{margin-bottom:15px}.ml-5{margin-left:25px}.p-2{padding:10px}.p-3{padding:15px}.text-lg{font-size:large}.text-2xl,.text-xl{font-size:2em}.text-5xl{font-size:2.5em}.text-purple-700{color:purple}.text-blue-700{color:#00f}.text-orange-700{color:orange}.border{border:1px solid #ddd}.bg-orange-600{background-color:orange}.bg-red-300,.bg-red-700{background-color:red}.bg-green-300{background-color:green}.bg-purple-600{background-color:purple}.bg-blue-600{background-color:#00f}.bg-blue-700{background-color:#254ec1}.bg-green-600{background-color:green}.bg-gray-200{background-color:#ccc}.rounded-md{border-radius:4px}.min-w-full{min-width:100%}.border-b{border-bottom:1px solid #ddd}.px-3,.px-4{padding-left:15px;padding-right:15px}.py-1{padding-top:5px;padding-bottom:5px}.mx-auto{margin:0 auto}.justify-content-center{justify-content:center}.align-items-center{align-items:center}",""]),e.exports=o},320:function(e,t,r){"use strict";r(237)},321:function(e,t,r){var o=r(79)(!1);o.push([e.i,".el-menu[data-v-02e95910]{border-right:none}.el-menu-item [class^=el-icon-][data-v-02e95910]{font-size:22px}.brand[data-v-02e95910]{font-size:24px;line-height:60px;margin-left:10px}.el-main[data-v-02e95910]{height:calc(100vh - 60px);overflow:auto;background:#efefef;padding:10px}",""]),e.exports=o},322:function(e,t,r){"use strict";r.r(t),r.d(t,"state",(function(){return n})),r.d(t,"mutations",(function(){return l})),r.d(t,"actions",(function(){return c}));var o=r(7),n=(r(57),function(){return{areas:[],departments:[],devices:[],gates:[],persons:[],timeslots:[]}}),l={setAreas:function(e,data){e.areas=data},setDepartments:function(e,data){e.departments=data},setDevices:function(e,data){e.devices=data},setGates:function(e,data){e.gates=data},setPersons:function(e,data){e.persons=data},setTimeSlots:function(e,data){e.timeslots=data}},c={getAreas:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/area");case 3:data=r.sent,o("setAreas",data);case 5:case"end":return r.stop()}}),r)})))()},getDepartments:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/department");case 3:data=r.sent,o("setDepartments",data);case 5:case"end":return r.stop()}}),r)})))()},getDevices:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/device");case 3:data=r.sent,o("setDevices",data);case 5:case"end":return r.stop()}}),r)})))()},getGates:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/gate");case 3:data=r.sent,o("setGates",data);case 5:case"end":return r.stop()}}),r)})))()},getPersons:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/person");case 3:data=r.sent,o("setPersons",data);case 5:case"end":return r.stop()}}),r)})))()},getTimeslots:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=e.commit,r.next=3,t.$axios.$get("/api/timeSlot");case 3:data=r.sent,o("setTimeSlots",data);case 5:case"end":return r.stop()}}),r)})))()}}},389:function(e,t,r){var map={"./id":163,"./id.js":163};function o(e){var t=n(e);return r(t)}function n(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}o.keys=function(){return Object.keys(map)},o.resolve=n,e.exports=o,o.id=389},451:function(e,t,r){"use strict";r.r(t);r(34),r(28),r(33),r(48),r(29),r(49);var o=r(20);r(15);function n(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var c={props:["show"],data:function(){return{formModel:l({},this.$auth.user),loading:!1,formErrors:{}}},methods:{save:function(){var e=this;this.loading=!0,this.$axios.$put("/api/user/".concat(this.formModel.id),this.formModel).then((function(t){e.$message({message:"Data berhasil diupdate",type:"success",showClose:!0}),e.$store.state.user=t})).catch((function(t){422==t.response.status?e.formErrors=t.response.data.errors:e.formErrors={}})).finally((function(){e.loading=!1}))}}},d=r(35),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"PROFIL SAYA",visible:e.show,"show-close":!1}},[r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:e.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.name,callback:function(t){e.$set(e.formModel,"name",t)},expression:"formModel.name"}}),e._v(" "),e.formErrors.name?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.name[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{attrs:{label:"Level"}},[r("el-input",{attrs:{disabled:"",value:e.formModel.role?"Admin":"Operator"}})],1),e._v(" "),r("el-form-item",{class:e.formErrors.password?"is-error":"",attrs:{label:"Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:e.formModel.password,callback:function(t){e.$set(e.formModel,"password",t)},expression:"formModel.password"}}),e._v(" "),e.formErrors.password?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.password[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{class:e.formErrors.password?"is-error":"",attrs:{label:"Konfirmasi Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:e.formModel.password_confirmation,callback:function(t){e.$set(e.formModel,"password_confirmation",t)},expression:"formModel.password_confirmation"}})],1)],1),e._v(" "),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(t){return e.$emit("close")}}},[e._v("TUTUP")]),e._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:e.save}},[e._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}},[[280,11,1,12]]]);