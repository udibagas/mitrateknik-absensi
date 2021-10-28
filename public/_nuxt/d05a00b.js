(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{463:function(t,e,r){"use strict";function n(data){return"[object Array]"===Object.prototype.toString.call(data)}function o(t,e){if(!t)throw new Error(e)}function l(data){return Object.keys(data)}function c(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function f(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function d(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var h,m=function(){return(m=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},v=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function y(data){return data.map(c).reduce((function(t,e,r){return e.reduce((function(map,t){var e=v(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function w(t,e){return void 0===e&&(e=function(i){return i}),e(c(t).map((function(t){var e=v(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function x(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){o(data.length>0);var e=w(y(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function _(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+O(data,"base")+"\n"}function O(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var o,l=(o=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),o.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),f=function(t){return Array(t+1).join(" ")}(r);return null==data?f+"<"+l+" />":f+"<"+l+">\n"+(n(data)?data.map((function(t){return O(t,e,e,r+2)})).join("\n"):"object"==typeof data?c(data).map((function(t){var n=v(t,2),o=n[0];return O(n[1],o,e,r+2)})).join("\n"):f+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+f+"</"+l+">"}function j(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,h=t.extension,O=t.fileNameFormatter,j=void 0===O?function(t){return t.replace(/\s+/,"_")}:O,D=t.fields,S=t.exportType,k=void 0===S?"txt":S,E=t.replacer,C=void 0===E?null:E,M=t.space,P=void 0===M?4:M,R=t.processor,U=void 0===R?d:R,Y=t.withBOM,$=void 0!==Y&&Y,z=t.delimiter,L=void 0===z?",":z,N=t.beforeTableEncode,I=void 0===N?function(i){return i}:N,T="Invalid export data. Please provide an array of object",B="Can't export unknown data type "+k+".",F="Can't export string data to "+k+".";if("string"==typeof data)switch(k){case"txt":case"css":case"html":return U(data,k,f(r,null!=h?h:k,j));default:throw new Error(F)}var J=function(t){if(!t||n(t)&&!t.length||!n(t)&&!l(t).length)return function(t){return t};var e=n(t)?t.reduce((function(map,t){var e;return m(m({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return n(t)?t.map((function(i){return c(i).reduce((function(map,t){var r=v(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return l(i).length})):c(t).reduce((function(map,t){var r=v(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),A=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(J,C,P);switch(k){case"txt":case"css":case"html":return U(A,k,f(r,null!=h?h:k,j));case"json":return U(A,k,f(r,null!=h?h:"json",j));case"csv":o(n(J),T);var K=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=w(y(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(J,L,I);return U($?"\ufeff"+K:K,k,f(r,null!=h?h:"csv",j));case"xls":return o(n(J),T),U(x(J,I),k,f(r,null!=h?h:"xls",j));case"xml":return U(_(J),k,f(r,null!=h?h:"xml",j));default:throw new Error(B)}}(h=j||(j={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},h.processors={downloadFile:d};var D=j;e.a=D},464:function(t,r,n){"use strict";n(34),n(28),n(33),n(48),n(29),n(49);var o=n(20),l=(n(15),n(56),n(463));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},paginated:!0,page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=f(f({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=f({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},afterGet:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=f({page:this.page,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:this.paginated},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData={data:e.data,from:n,to:o,total:l}}else t.tableData=e;t.afterGet()})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=f({sort_prop:this.sort_prop,sort_order:this.sort_order,action:"export"},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return Object(l.a)({data:data,fileName:t,exportType:"xls"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},597:function(t,e,r){"use strict";r.r(e);r(34),r(28),r(33),r(48),r(29),r(49);var n=r(20),o=r(82);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={mixins:[r(464).a],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)(["persons","departments"])),data:function(){return{url:"/api/attendance",filters:{date:[this.$moment().format("YYYY-MM-DD"),this.$moment().format("YYYY-MM-DD")],keyword:""}}},methods:{refreshData:function(){this.filters={date:[this.$moment().format("YYYY-MM-DD"),this.$moment().format("YYYY-MM-DD")],keyword:"",page:1},this.requestData()}}},f=r(35),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticStyle:{"font-size":"1.2em","line-height":"41px"}},[t._v("ABSENSI")]),t._v(" "),r("el-form",{attrs:{inline:""}},[r("el-form-item",[r("el-date-picker",{staticStyle:{"margin-top":"5px",width:"240px"},attrs:{type:"daterange","value-format":"yyyy-MM-dd",format:"dd/MMM/yyyy","range-separator":"-","start-placeholder":"Dari Tanggal","end-placeholder":"Sampai Tanggal",size:"small",clearable:!1},on:{change:t.searchData},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{icon:"el-icon-download",type:"primary",size:"small"},on:{click:function(e){return t.exportData("absensi")}}},[t._v("EXPORT KE EXCEL")])],1),t._v(" "),r("el-form-item",[r("el-input",{attrs:{placeholder:"Cari Pegawai","prefix-icon":"el-icon-search",size:"small",clearable:""},on:{change:t.searchData},model:{value:t.filters.keyword,callback:function(e){t.$set(t.filters,"keyword",e)},expression:"filters.keyword"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{icon:"el-icon-refresh",size:"small",type:"primary"},on:{click:t.refreshData}})],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{stripe:"",data:t.tableData.data,height:"calc(100vh - 237px)"},on:{"row-dbclick":function(e){return t.$router.push("/absensi/"+e.pin)},"filter-change":t.filterChange,"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",width:"50",label:"#",index:t.tableData.from}}),t._v(" "),r("el-table-column",{attrs:{prop:"date",label:"Tanggal",sortable:"custom",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(t.$moment(n.date).format("DD/MMM/YYYY"))+" "),r("br"),t._v("\n\t\t\t\t"+t._s(n.hari)+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"Nama",sortable:"","show-overflow-tooltip":"","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("div",{staticClass:"flex",staticStyle:{"align-items":"center"}},[r("div",{staticStyle:{width:"45px",height:"45px",border:"1px solid #ddd","object-fit":"cover","border-radius":"50%"}},[r("img",{staticStyle:{width:"45px","border-radius":"50%"},attrs:{src:n.person.photo_path,alt:"",referrerpolicy:"no-referrer"}})]),t._v(" "),r("div",{staticStyle:{"margin-left":"10px","flex-grow":"0"}},[r("nuxt-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/absensi/"+n.pin}},[t._v(t._s(n.name))]),t._v(" "),r("br"),t._v("\n\t\t\t\t\t\tNIK : "+t._s(n.pin)+"\n\t\t\t\t\t")],1)])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"department",label:"Departemen","column-key":"department","min-width":"150",filters:t.departments.map((function(t){return{value:t.name,text:t.name}})),sortable:"custom"}}),t._v(" "),r("el-table-column",{attrs:{prop:"first_in",label:"Masuk",sortable:"custom",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("span",{class:n.late?"text-red":"text-green"},[t._v(t._s(n.first_in))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Jam Istirahat",width:"150",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(n.rest_start||n.rest_start_time)+" -\n\t\t\t\t"+t._s(n.rest_end||n.rest_end_time)+" "),r("br"),t._v(" "),r("strong",[t._v(" "+t._s(n.rest_duration)+" ")])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"last_out",label:"Pulang",sortable:"custom",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("span",{class:n.early?"text-red":"text-green"},[t._v(t._s(n.last_out))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"work_duration",label:"Jam Kerja Efektif",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[r("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:n.prosentase,color:n.prosentase<100?"red":"green"}}),t._v("\n\t\t\t\t"+t._s(n.work_duration)+"\n\t\t\t")]}}])})],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,20,50],total:t.tableData.total,"current-page":t.page},on:{"current-change":t.currentChange,"size-change":t.sizeChange}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);