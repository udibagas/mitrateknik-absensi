(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{462:function(t,r,n){"use strict";n(34),n(28),n(33),n(48),n(29),n(49);var o=n(20),l=(n(15),n(56),n(463));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},paginated:!0,page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=d(d({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=d({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},afterGet:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=d({page:this.page,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:this.paginated},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData={data:e.data,from:n,to:o,total:l}}else t.tableData=e;t.afterGet()})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=d({sort_prop:this.sort_prop,sort_order:this.sort_order,action:"export"},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return Object(l.a)({data:data,fileName:t,exportType:"xls"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},561:function(t,e,r){var content=r(584);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(80).default)("82dac5f4",content,!0,{sourceMap:!1})},583:function(t,e,r){"use strict";r(561)},584:function(t,e,r){var n=r(79)(!1);n.push([t.i,".chart[data-v-9e67522c],.image[data-v-9e67522c]{width:100%}.chart[data-v-9e67522c]{height:550px}",""]),t.exports=n},599:function(t,e,r){"use strict";r.r(e);var n=r(7),o=r(20),l=(r(58),r(197),r(36),r(536),r(50),r(537),r(57),r(462)),c=r(502),d=r(602),h=r(589),f=r(588),m=r(592),v=r(591),_=r(590),y=r(567);Object(c.a)([d.a,h.a,f.a,m.a,v.a,_.a]);var x={mixins:[l.a],components:{VChart:y.b},provide:Object(o.a)({},y.a,"light"),asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,n=t.$axios,o=t.redirect,e.prev=1,e.next=4,n.$get("/api/person/".concat(r.pin));case 4:return l=e.sent,e.abrupt("return",{person:l});case 8:e.prev=8,e.t0=e.catch(1),o("/404");case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()},data:function(){var t=this;return{url:"/api/absensi",paginated:"",tableData:[],filters:{pin:this.$route.params.pin,date:[this.$moment().format("YYYY-MM-DD"),this.$moment().format("YYYY-MM-DD")]},prodPercentAvg:0,prodHourAvg:0,chartOption:{tooltip:{trigger:"axis"},grid:{bottom:"30px",containLabel:!0},title:{text:"GRAFIK PRODUKTIFITAS PEGAWAI",x:"center"},xAxis:{type:"category",boundaryGap:!0,data:[]},yAxis:{type:"value",name:"Jam Kerja"},series:[{type:"line",name:"Jam Kerja",label:{show:!0,position:"top",formatter:function(e){var r=e.name.split("\n")[0],n=5===t.$moment(r).day()?7:8;return e.value+" jam\n"+(e.value/n*100).toFixed(2)+"%"}},data:[]}]}}},methods:{refreshData:function(){this.filters={pin:this.$route.params.pin,date:[this.$moment().format("YYYY-MM-DD"),this.$moment().format("YYYY-MM-DD")],keyword:""},this.requestData()},afterGet:function(){var t=this;this.chartOption.xAxis.data=this.tableData.map((function(e){return e.att_date+"\n"+t.$moment(e.att_date).format("dddd")})),this.chartOption.series[0].data=this.tableData.map((function(t){return t.actual_work_duration>0?(t.actual_work_duration/3600).toFixed(2):0})),this.prodPercentAvg=this.tableData.reduce((function(t,e){return Number(t)+Number(e.percentage)}),0)/this.tableData.length,this.prodHourAvg=this.tableData.reduce((function(t,e){return Number(t)+Number(e.actual_work_duration/3600)}),0)/this.tableData.length}}},D=(r(583),r(35)),component=Object(D.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticStyle:{display:"flex"}},[r("el-card",{staticStyle:{width:"320px","margin-right":"10px","flex-shrink":"0"},attrs:{"body-style":{padding:"0 0 20px 0"}}},[r("img",{staticClass:"image",attrs:{src:t.person.photo_path,referrerpolicy:"no-referrer"}}),t._v(" "),r("h3",{staticClass:"text-center",staticStyle:{"margin-bottom":"2px"}},[t._v("\n\t\t\t\t"+t._s(t.person.name)+" "+t._s(t.person.last_name)+"\n\t\t\t")]),t._v(" "),r("div",{staticClass:"text-center",staticStyle:{"font-size":"1.5em"}},[t._v(t._s(t.person.pin))]),t._v(" "),r("div",{staticClass:"text-center"},[t._v("\n\t\t\t\t"+t._s(t.person.department?t.person.department.name:"")+"\n\t\t\t")]),t._v(" "),r("h4",{staticClass:"text-center",staticStyle:{"border-top":"1px solid #ddd","border-bottom":"1px solid #ddd",padding:"20px 0"}},[t._v("\n\t\t\t\tPRODUKTIFITAS RATA - RATA\n\t\t\t")]),t._v(" "),r("div",{class:["text-center",t.prodPercentAvg>=90?"text-success":t.prodPercentAvg>=60?"text-warning":"text-danger"]},[r("el-row",[r("el-col",{staticStyle:{"border-right":"1px solid #eee"},attrs:{span:12}},[r("h2",[t._v(t._s(t.prodHourAvg.toFixed(2))+" jam")])]),t._v(" "),r("el-col",{attrs:{span:12}},[r("h2",[t._v(t._s(t.prodPercentAvg.toFixed(2))+"%")])])],1)],1)]),t._v(" "),r("el-card",{staticStyle:{"flex-grow":"1"}},[r("v-chart",{staticClass:"chart",attrs:{option:t.chartOption}})],1)],1),t._v(" "),r("el-card",{staticStyle:{"margin-top":"10px"}},[r("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticStyle:{"font-size":"1.2em","line-height":"41px"}},[t._v("LOG ABSENSI")]),t._v(" "),r("el-form",{attrs:{inline:""}},[r("el-form-item",[r("el-date-picker",{staticStyle:{width:"250px","margin-top":"5px"},attrs:{type:"daterange","value-format":"yyyy-MM-dd",format:"dd/MMM/yyyy","range-separator":"-","start-placeholder":"Dari Tgl","end-placeholder":"Sampai Tgl",size:"small",clearable:!1},on:{change:t.searchData},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{size:"small",icon:"el-icon-download",type:"primary"},on:{click:function(e){return t.exportData("absensi")}}},[t._v("\n\t\t\t\t\t\tEXPORT KE EXCEL\n\t\t\t\t\t")])],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{stripe:"",data:t.tableData}},[r("el-table-column",{attrs:{type:"index",width:"50",label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"att_date",label:"Tanggal",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$moment(e.row.att_date).format("DD/MMM/YYYY"))+" "),r("br"),t._v("\n\t\t\t\t\t"+t._s(t.$moment(e.row.att_date).format("dddd"))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"first_in",label:"Masuk",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{label:"Jam Istirahat",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t\t"+t._s(n.rest_start)+" - "+t._s(n.rest_end)+" "),r("br")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Durasi Istirahat",prop:"rest_duration",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"last_out",label:"Pulang",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"work_duration",label:"Jam Kerja Efektif",sortable:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"percentage",label:"%",sortable:"",align:"right","header-align":"right"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[t._v("\n\t\t\t\t\t"+t._s(r.percentage.toFixed(2))+"\n\t\t\t\t")]}}])})],1)],1)],1)}),[],!1,null,"9e67522c",null);e.default=component.exports}}]);