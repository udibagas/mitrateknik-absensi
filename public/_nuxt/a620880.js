(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{462:function(t,n,r){"use strict";r(34),r(28),r(33),r(48),r(29),r(49);var o=r(20),c=(r(15),r(56),r(463));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}n.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},paginated:!0,page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,n=t.order;e==this.sort_prop&&n==this.sort_order||(this.sort_order="ascending"==n?"asc":"descending"==n?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=f(f({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=f({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},afterGet:function(){},deleteData:function(t){var n=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){n.$axios.$delete("".concat(n.url,"/").concat(t)).then((function(t){n.requestData(),n.afterDelete(),n.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=f({page:this.page,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:this.paginated},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,e.meta){var n=e.meta,r=n.from,o=n.to,c=n.total;t.tableData={data:e.data,from:r,to:o,total:c}}else t.tableData=e;t.afterGet()})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,n=f({sort_prop:this.sort_prop,sort_order:this.sort_order,action:"export"},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:n}).then((function(data){return Object(c.a)({data:data,fileName:t,exportType:"xls"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},463:function(t,e,n){"use strict";function r(data){return"[object Array]"===Object.prototype.toString.call(data)}function o(t,e){if(!t)throw new Error(e)}function c(data){return Object.keys(data)}function l(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function f(t,e,n){var r="."+e,o=new RegExp("(\\"+e+")?$");return n(t).replace(o,r)}function d(content,t,e,n){void 0===e&&(e="download"),void 0===n&&(n=!0);var r=function(content,t,e){switch(t){case"txt":var n="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"css":return n="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"html":return n="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"json":return n="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"csv":return n="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"xls":return n="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"xml":return n="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);default:return""}}(content,t,n),o=document.createElement("a");o.href=r,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var h,m=function(){return(m=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},v=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),c=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)c.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return c};function y(data){return data.map(l).reduce((function(t,e,n){return e.reduce((function(map,t){var e=v(t,2),r=e[0],o=e[1],c=map[r]||Array.from({length:data.length}).map((function(t){return""}));return c[n]=("string"!=typeof o?JSON.stringify(o):o)||"",map[r]=c,map}),t)}),Object.create(null))}function x(t,e){return void 0===e&&(e=function(i){return i}),e(l(t).map((function(t){var e=v(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function _(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){o(data.length>0);var e=x(y(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,n){return""+t+e[n]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function w(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+j(data,"base")+"\n"}function j(data,t,e,n){void 0===e&&(e="element"),void 0===n&&(n=0);var o,c=(o=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),o.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),f=function(t){return Array(t+1).join(" ")}(n);return null==data?f+"<"+c+" />":f+"<"+c+">\n"+(r(data)?data.map((function(t){return j(t,e,e,n+2)})).join("\n"):"object"==typeof data?l(data).map((function(t){var r=v(t,2),o=r[0];return j(r[1],o,e,n+2)})).join("\n"):f+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+f+"</"+c+">"}function O(t){var data=t.data,e=t.fileName,n=void 0===e?"download":e,h=t.extension,j=t.fileNameFormatter,O=void 0===j?function(t){return t.replace(/\s+/,"_")}:j,D=t.fields,k=t.exportType,U=void 0===k?"txt":k,C=t.replacer,R=void 0===C?null:C,S=t.space,E=void 0===S?4:S,$=t.processor,L=void 0===$?d:$,P=t.withBOM,M=void 0!==P&&P,z=t.delimiter,I=void 0===z?",":z,J=t.beforeTableEncode,N=void 0===J?function(i){return i}:J,F="Invalid export data. Please provide an array of object",T="Can't export unknown data type "+U+".",B="Can't export string data to "+U+".";if("string"==typeof data)switch(U){case"txt":case"css":case"html":return L(data,U,f(n,null!=h?h:U,O));default:throw new Error(B)}var A=function(t){if(!t||r(t)&&!t.length||!r(t)&&!c(t).length)return function(t){return t};var e=r(t)?t.reduce((function(map,t){var e;return m(m({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return r(t)?t.map((function(i){return l(i).reduce((function(map,t){var n=v(t,2),r=n[0],o=n[1];return r in e&&(map[e[r]]=o),map}),Object.create(null))})).filter((function(i){return c(i).length})):l(t).reduce((function(map,t){var n=v(t,2),r=n[0],o=n[1];return r in e&&(map[e[r]]=o),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),K=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(A,R,E);switch(U){case"txt":case"css":case"html":return L(K,U,f(n,null!=h?h:U,O));case"json":return L(K,U,f(n,null!=h?h:"json",O));case"csv":o(r(A),F);var V=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var n=x(y(data),e);return n.map((function(t){return t.fieldName})).join(t)+"\r\n"+n.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,n){return e.map((function(e,r){return""+e+t+n[r]}))})).join("\r\n")}(A,I,N);return L(M?"\ufeff"+V:V,U,f(n,null!=h?h:"csv",O));case"xls":return o(r(A),F),L(_(A,N),U,f(n,null!=h?h:"xls",O));case"xml":return L(w(A),U,f(n,null!=h?h:"xml",O));default:throw new Error(T)}}(h=O||(O={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},h.processors={downloadFile:d};var D=O;e.a=D},535:function(t,e,n){var content=n(580);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(80).default)("12866f22",content,!0,{sourceMap:!1})},579:function(t,e,n){"use strict";n(535)},580:function(t,e,n){var r=n(79)(!1);r.push([t.i,"td[data-v-3e0463c2],th[data-v-3e0463c2]{vertical-align:middle}",""]),t.exports=r},599:function(t,e,n){"use strict";n.r(e);var r={mixins:[n(462).a],data:function(){return{url:"/api/timeSlot"}},methods:{save:function(data){var t=this;this.$axios.$put("/api/timeSlot/".concat(data.id),data).then((function(e){t.$message({message:e.message,type:"success"}),t.tableData=e.data}))}}},o=(n(579),n(35)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",[n("div",{staticClass:"mb-3",staticStyle:{"font-size":"1.2em"}},[t._v("KELOLA TIMESLOT")]),t._v(" "),n("table",{staticClass:"table table-striped table-hover"},[n("thead",[n("tr",[n("th",[t._v("#")]),t._v(" "),n("th",[t._v("Hari")]),t._v(" "),n("th",[t._v("Jam Masuk")]),t._v(" "),n("th",[t._v("Jam Pulang")]),t._v(" "),n("th",[t._v("Jam Istirahat Keluar")]),t._v(" "),n("th",[t._v("Jam Istirahat Masuk")]),t._v(" "),n("th",[t._v("Jam Kerja Maksimal")]),t._v(" "),n("th",{staticClass:"text-center"},[n("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)])]),t._v(" "),n("tbody",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},t._l(t.tableData,(function(e,i){return n("tr",{key:i},[n("td",[t._v(t._s(++i))]),t._v(" "),n("td",[t._v(t._s(e.hari))]),t._v(" "),n("td",[n("el-input",{attrs:{size:"small"},model:{value:e.in,callback:function(n){t.$set(e,"in",n)},expression:"t.in"}})],1),t._v(" "),n("td",[n("el-input",{attrs:{size:"small"},model:{value:e.out,callback:function(n){t.$set(e,"out",n)},expression:"t.out"}})],1),t._v(" "),n("td",[n("el-input",{attrs:{size:"small"},model:{value:e.rest_start,callback:function(n){t.$set(e,"rest_start",n)},expression:"t.rest_start"}})],1),t._v(" "),n("td",[n("el-input",{attrs:{size:"small"},model:{value:e.rest_end,callback:function(n){t.$set(e,"rest_end",n)},expression:"t.rest_end"}})],1),t._v(" "),n("td",[n("el-input",{attrs:{size:"small"},model:{value:e.jam_kerja_max,callback:function(n){t.$set(e,"jam_kerja_max",n)},expression:"t.jam_kerja_max"}})],1),t._v(" "),n("td",{staticClass:"text-center"},[n("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-check",plain:""},on:{click:function(n){return t.save(e)}}})],1)])})),0)])])}),[],!1,null,"3e0463c2",null);e.default=component.exports}}]);