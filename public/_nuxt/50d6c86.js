(window.webpackJsonp=window.webpackJsonp||[]).push([[9,4],{462:function(t,r,n){"use strict";n(34),n(28),n(33),n(48),n(29),n(49);var o=n(20),c=(n(15),n(56),n(463));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},paginated:!0,page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=d(d({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=d({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},afterGet:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=d({page:this.page,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:this.paginated},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,e.meta){var r=e.meta,n=r.from,o=r.to,c=r.total;t.tableData={data:e.data,from:n,to:o,total:c}}else t.tableData=e;t.afterGet()})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=d({sort_prop:this.sort_prop,sort_order:this.sort_order,action:"export"},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return Object(c.a)({data:data,fileName:t,exportType:"xls"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},463:function(t,e,r){"use strict";function n(data){return"[object Array]"===Object.prototype.toString.call(data)}function o(t,e){if(!t)throw new Error(e)}function c(data){return Object.keys(data)}function l(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function d(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function f(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var m,h=function(){return(h=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},v=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),c=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)c.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return c};function y(data){return data.map(l).reduce((function(t,e,r){return e.reduce((function(map,t){var e=v(t,2),n=e[0],o=e[1],c=map[n]||Array.from({length:data.length}).map((function(t){return""}));return c[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=c,map}),t)}),Object.create(null))}function x(t,e){return void 0===e&&(e=function(i){return i}),e(l(t).map((function(t){var e=v(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function w(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){o(data.length>0);var e=x(y(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function _(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+O(data,"base")+"\n"}function O(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var o,c=(o=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),o.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),d=function(t){return Array(t+1).join(" ")}(r);return null==data?d+"<"+c+" />":d+"<"+c+">\n"+(n(data)?data.map((function(t){return O(t,e,e,r+2)})).join("\n"):"object"==typeof data?l(data).map((function(t){var n=v(t,2),o=n[0];return O(n[1],o,e,r+2)})).join("\n"):d+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+d+"</"+c+">"}function j(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,m=t.extension,O=t.fileNameFormatter,j=void 0===O?function(t){return t.replace(/\s+/,"_")}:O,D=t.fields,S=t.exportType,k=void 0===S?"txt":S,E=t.replacer,P=void 0===E?null:E,R=t.space,U=void 0===R?4:R,C=t.processor,M=void 0===C?f:C,A=t.withBOM,I=void 0!==A&&A,T=t.delimiter,L=void 0===T?",":T,$=t.beforeTableEncode,N=void 0===$?function(i){return i}:$,z="Invalid export data. Please provide an array of object",F="Can't export unknown data type "+k+".",B="Can't export string data to "+k+".";if("string"==typeof data)switch(k){case"txt":case"css":case"html":return M(data,k,d(r,null!=m?m:k,j));default:throw new Error(B)}var Y=function(t){if(!t||n(t)&&!t.length||!n(t)&&!c(t).length)return function(t){return t};var e=n(t)?t.reduce((function(map,t){var e;return h(h({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return n(t)?t.map((function(i){return l(i).reduce((function(map,t){var r=v(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return c(i).length})):l(t).reduce((function(map,t){var r=v(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),J=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(Y,P,U);switch(k){case"txt":case"css":case"html":return M(J,k,d(r,null!=m?m:k,j));case"json":return M(J,k,d(r,null!=m?m:"json",j));case"csv":o(n(Y),z);var K=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=x(y(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(Y,L,N);return M(I?"\ufeff"+K:K,k,d(r,null!=m?m:"csv",j));case"xls":return o(n(Y),z),M(w(Y,N),k,d(r,null!=m?m:"xls",j));case"xml":return M(_(Y),k,d(r,null!=m?m:"xml",j));default:throw new Error(F)}}(m=j||(j={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},m.processors={downloadFile:f};var D=j;e.a=D},495:function(t,e,r){var content=r(529);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(80).default)("690ffd95",content,!0,{sourceMap:!1})},528:function(t,e,r){"use strict";r(495)},529:function(t,e,r){var n=r(79)(!1);n.push([t.i,".item[data-v-354f9b2e]{display:flex;justify-content:space-between;align-items:center;border:1px solid #efefef;padding:10px;border-radius:4px;margin:5px}",""]),t.exports=n},563:function(t,e,r){var content=r(589);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(80).default)("a19b4758",content,!0,{sourceMap:!1})},567:function(t,e,r){"use strict";r.r(e);var n={props:["data"]},o=(r(528),r(35)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",t._l(t.data,(function(p,i){return r("div",{key:i,staticClass:"item"},[r("div",{staticStyle:{display:"flex","align-items":"center"}},[r("div",{staticStyle:{width:"60px","font-size":"1.5em",color:"grey"}},[t._v("\n\t\t\t\t#"+t._s(i+1)+"\n\t\t\t")]),t._v(" "),r("div",[t._v("\n\t\t\t\t"+t._s(p.name)+" "),r("br"),t._v(" "),r("span",{staticStyle:{color:"grey"}},[t._v(t._s(p.department))])])]),t._v(" "),r("div",{staticClass:"flex",staticStyle:{"font-size":"20px","justify-content":"space-between"}},[r("div",{staticStyle:{"margin-right":"20px"}},[t._v(t._s(p.work_duration))]),t._v(" "),r("div",{staticStyle:{width:"75px","text-align":"right"}},[t._v(t._s(p.prosentase)+"%")])])])})),0)}),[],!1,null,"354f9b2e",null);e.default=component.exports},588:function(t,e,r){"use strict";r(563)},589:function(t,e,r){var n=r(79)(!1);n.push([t.i,".text-success[data-v-0eba3dac]{color:green}.text-warning[data-v-0eba3dac]{color:orange}.text-danger[data-v-0eba3dac]{color:red}",""]),t.exports=n},604:function(t,e,r){"use strict";r.r(e);r(34),r(28),r(33),r(48),r(29),r(49);var n=r(20),o=(r(50),r(36),r(463)),c=r(81);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={mixins:[r(462).a],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["departments"])),data:function(){return{url:"/api/attendance",filters:{summary:!0,date:[this.$moment().format("YYYY-MM-01"),this.$moment().format("YYYY-MM-DD")]},paginated:""}},methods:{exportData:function(t,data){console.log(data),Object(o.a)({fileName:t,exportType:"xls",data:data.map((function(t){return{NIK:t.pin,Nama:t.name,Departemen:t.department,"Jam kerja Efektif":t.work_duration,Prosentase:t.prosentase}}))})}}},f=(r(588),r(35)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-card",{staticStyle:{"margin-bottom":"10px"},attrs:{"body-style":{padding:"10px 0 10px 20px"}}},[r("div",{staticClass:"flex",staticStyle:{"align-items":"center","justify-content":"space-between"}},[r("strong",[t._v(" DASHBOARD ")]),t._v(" "),r("el-form",{attrs:{inline:""}},[r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-select",{staticStyle:{width:"320px"},attrs:{placeholder:"Departemen",filterable:"","default-first-option":"",clearable:""},on:{change:t.requestData},model:{value:t.filters.department,callback:function(e){t.$set(t.filters,"department",e)},expression:"filters.department"}},t._l(t.departments,(function(t,i){return r("el-option",{key:i,attrs:{value:t.name,label:t.name}})})),1)],1),t._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd",format:"dd/MMM/yyyy","range-separator":"-","start-placeholder":"Dari Tanggal","end-placeholder":"Sampai Tanggal",clearable:!1},on:{change:t.requestData},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}})],1)],1)],1)]),t._v(" "),r("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{gutter:10}},[r("el-col",{attrs:{span:24}},[r("el-card",{staticStyle:{"margin-bottom":"10px"}},[r("div",{staticClass:"text-center",attrs:{slot:"header"},slot:"header"},[t._v("PRODUKTIFITAS RATA - RATA")]),t._v(" "),r("div",{class:["text-center",t.tableData.productivity_avg_in_percent>=90?"text-success":t.tableData.productivity_avg_in_percent>=60?"text-warning":"text-danger"]},[r("el-row",[r("el-col",{staticStyle:{"border-right":"1px solid #eee"},attrs:{span:12}},[r("div",{staticStyle:{"font-size":"40px"}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.tableData.productivity_avg_in_hour)+" jam\n\t\t\t\t\t\t\t")])]),t._v(" "),r("el-col",{attrs:{span:12}},[r("div",{staticStyle:{"font-size":"40px"}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.tableData.productivity_avg_in_percent)+"%\n\t\t\t\t\t\t\t")])])],1)],1)])],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-card",{attrs:{"body-style":{padding:0}}},[r("div",{staticClass:"flex",staticStyle:{"justify-content":"space-between","align-items":"center"},attrs:{slot:"header"},slot:"header"},[r("span",{staticStyle:{color:"green","font-weight":"bold"}},[t._v("\n\t\t\t\t\t\tPEGAWAI TERPRODUKTIF\n\t\t\t\t\t")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-download",size:"small",title:"Download"},on:{click:function(e){return t.exportData("pegawai-terproduktif",t.tableData.pegawai_terproduktif)}}})],1),t._v(" "),r("EmployeeList",{attrs:{data:t.tableData.pegawai_terproduktif}})],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-card",{attrs:{"body-style":{padding:0}}},[r("div",{staticClass:"flex",staticStyle:{"justify-content":"space-between","align-items":"center"},attrs:{slot:"header"},slot:"header"},[r("span",{staticStyle:{color:"red","font-weight":"bold"}},[t._v("\n\t\t\t\t\t\tPEGAWAI TIDAK PRODUKTIF\n\t\t\t\t\t")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-download",size:"small",title:"Download"},on:{click:function(e){return t.exportData("pegawai-tidak-produktif",t.tableData.pegawai_tidak_produktif)}}})],1),t._v(" "),r("EmployeeList",{attrs:{data:t.tableData.pegawai_tidak_produktif}})],1)],1)],1)],1)}),[],!1,null,"0eba3dac",null);e.default=component.exports;installComponents(component,{EmployeeList:r(567).default})}}]);