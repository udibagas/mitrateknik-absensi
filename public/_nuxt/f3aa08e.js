(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{416:function(t,e,r){"use strict";function n(data){return"[object Array]"===Object.prototype.toString.call(data)}function o(t,e){if(!t)throw new Error(e)}function l(data){return Object.keys(data)}function c(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function d(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function f(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var m,v=function(){return(v=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},h=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function w(data){return data.map(c).reduce((function(t,e,r){return e.reduce((function(map,t){var e=h(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function y(t,e){return void 0===e&&(e=function(i){return i}),e(c(t).map((function(t){var e=h(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function _(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){o(data.length>0);var e=y(w(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function x(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+j(data,"base")+"\n"}function j(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var o,l=(o=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),o.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),d=function(t){return Array(t+1).join(" ")}(r);return null==data?d+"<"+l+" />":d+"<"+l+">\n"+(n(data)?data.map((function(t){return j(t,e,e,r+2)})).join("\n"):"object"==typeof data?c(data).map((function(t){var n=h(t,2),o=n[0];return j(n[1],o,e,r+2)})).join("\n"):d+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+d+"</"+l+">"}function O(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,m=t.extension,j=t.fileNameFormatter,O=void 0===j?function(t){return t.replace(/\s+/,"_")}:j,E=t.fields,S=t.exportType,D=void 0===S?"txt":S,k=t.replacer,M=void 0===k?null:k,C=t.space,U=void 0===C?4:C,R=t.processor,N=void 0===R?f:R,A=t.withBOM,L=void 0!==A&&A,P=t.delimiter,$=void 0===P?",":P,F=t.beforeTableEncode,z=void 0===F?function(i){return i}:F,I="Invalid export data. Please provide an array of object",T="Can't export unknown data type "+D+".",B="Can't export string data to "+D+".";if("string"==typeof data)switch(D){case"txt":case"css":case"html":return N(data,D,d(r,null!=m?m:D,O));default:throw new Error(B)}var J=function(t){if(!t||n(t)&&!t.length||!n(t)&&!l(t).length)return function(t){return t};var e=n(t)?t.reduce((function(map,t){var e;return v(v({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return n(t)?t.map((function(i){return c(i).reduce((function(map,t){var r=h(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return l(i).length})):c(t).reduce((function(map,t){var r=h(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(E)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),K=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(J,M,U);switch(D){case"txt":case"css":case"html":return N(K,D,d(r,null!=m?m:D,O));case"json":return N(K,D,d(r,null!=m?m:"json",O));case"csv":o(n(J),I);var H=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=y(w(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(J,$,z);return N(L?"\ufeff"+H:H,D,d(r,null!=m?m:"csv",O));case"xls":return o(n(J),I),N(_(J,z),D,d(r,null!=m?m:"xls",O));case"xml":return N(x(J),D,d(r,null!=m?m:"xml",O));default:throw new Error(T)}}(m=O||(O={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},m.processors={downloadFile:f};var E=O;e.a=E},447:function(t,r,n){"use strict";n(37),n(27),n(36),n(47),n(28),n(48);var o=n(17),l=(n(10),n(84),n(416));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=d(d({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=d({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=d({page:this.page,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData={data:e.data,from:n,to:o,total:l}}else t.tableData=e})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=d({sort_prop:this.sort_prop,sort_order:this.sort_order,action:"export"},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return Object(l.a)({data:data,fileName:t,exportType:"xls"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},719:function(t,e,r){"use strict";r.r(e);var n={mixins:[r(447).a],data:function(){return{url:"/api/user"}}},o=r(22),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticStyle:{"font-size":"1.2em","line-height":"41px"}},[t._v("KELOLA USER")]),t._v(" "),r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(e){return t.openForm({admin:0,password:""})}}},[t._v("TAMBAH USER")])],1),t._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.filters.keyword,callback:function(e){t.$set(t.filters,"keyword",e)},expression:"filters.keyword"}})],1)],1)],1),t._v(" "),r("br"),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{stripe:"",data:t.tableData.data},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"Nama",sortable:"custom"}}),t._v(" "),r("el-table-column",{attrs:{prop:"email",label:"Email",sortable:"custom"}}),t._v(" "),r("el-table-column",{attrs:{prop:"admin",label:"Level",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.admin?"Admin":"User")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"status",label:"Status",sortable:"custom",align:"center","header-align":"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{staticStyle:{width:"100%"},attrs:{type:e.row.active?"success":"info",size:"mini",effect:"dark"}},[t._v("\n\t\t\t\t\t"+t._s(e.row.active?"AKTIF":"NONAKTIF")+"\n\t\t\t\t")])]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\tHapus\n\t\t\t\t\t\t")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:t.formModel.id?"EDIT USER":"TAMBAH USER",width:"500px","close-on-click-modal":!1},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-width":"160px","label-position":"left"}},[r("el-form-item",{class:{"is-error":t.formErrors.name},attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.name,callback:function(e){t.$set(t.formModel,"name",e)},expression:"formModel.name"}}),t._v(" "),t.formErrors.name?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.name.join(", "))+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.email},attrs:{label:"Email"}},[r("el-input",{attrs:{placeholder:"Email"},model:{value:t.formModel.email,callback:function(e){t.$set(t.formModel,"email",e)},expression:"formModel.email"}}),t._v(" "),t.formErrors.email?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.email.join(", "))+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.admin},attrs:{label:"Level"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Level"},model:{value:t.formModel.admin,callback:function(e){t.$set(t.formModel,"admin",e)},expression:"formModel.admin"}},t._l([{value:0,label:"User"},{value:1,label:"Admin"}],(function(t,i){return r("el-option",{key:i,attrs:{value:t.value,label:t.label}})})),1),t._v(" "),t.formErrors.admin?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.admin.join(", "))+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.password},attrs:{label:"Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.password.join(", "))+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"Konfirmasi Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:t.formModel.password_confirmation,callback:function(e){t.$set(t.formModel,"password_confirmation",e)},expression:"formModel.password_confirmation"}})],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.active},attrs:{label:"Status"}},[r("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.formModel.active,callback:function(e){t.$set(t.formModel,"active",e)},expression:"formModel.active"}}),t._v(" "),r("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:t.formModel.active?"success":"info",size:"small",effect:"dark"}},[t._v(t._s(t.formModel.active?"AKTIF":"NONAKTIF"))]),t._v(" "),t.formErrors.active?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.active.join(", "))+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){t.showForm=!1}}},[t._v("\n\t\t\t\tBATAL\n\t\t\t")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);