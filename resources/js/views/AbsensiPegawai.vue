<template lang="html">
    <div>
        <div class="row">
            <div class="col-md-3">
                <el-card :body-style="{ padding: '14px' }">
                    <img :src="base_url + '/img/user-' + (person.gender ? person.gender.toLowerCase() : '') + '.png'" class="image">
                    <div style="padding: 14px;" class="text-center">
                        <h4 style="margin-bottom:2px">{{person.name}} {{person.last_name}}</h4>
                        <span style="font-size:1.5em">{{person.pin}}</span><br>
                        <span>Dep. : {{person.department ? person.department.name : ''}}</span>
                        <hr>
                        <h6 class="text-center">PRODUKTIFITAS RATA - RATA</h6>
                        <hr>
                        <div :class="['text-center', prodPercentAvg >= 90 ? 'text-success' : (prodPercentAvg >= 60 ? 'text-warning' : 'text-danger')]">
                            <el-row>
                                <el-col :span="12" style="border-right:1px solid #eee;">
                                    <h3>{{prodHourAvg}} jam</h3>
                                </el-col>
                                <el-col :span="12">
                                    <h3>{{prodPercentAvg}}%</h3>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="col-md-9">
                <v-chart :options="chartOption" class="echarts"></v-chart>
            </div>
        </div>
        <hr>
        <el-form :inline="true" style="float:right;clear:both;">
            <el-form-item>
                <el-date-picker v-model="filterDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="Dari Tanggal" end-placeholder="Sampai Tanggal"> </el-date-picker>
            </el-form-item>
            <el-form-item style="padding-right:0;margin-right:0;">
                <el-button @click="exportToExcel" type="primary"><i class="el-icon-document"></i> {{exportLabelBtn}}</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="absensis"
            stripe
            style="border-top:1px solid #eee;width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="absence_date" label="Tanggal" sortable width="100"></el-table-column>
            <el-table-column prop="hari" label="Hari" sortable width="100"></el-table-column>
            <el-table-column prop="first_in" label="Masuk" sortable></el-table-column>
            <el-table-column label="Jam Istirahat" sortable>
                <template slot-scope="scope">
                    {{scope.row.rest_start}} - {{scope.row.rest_end}}
                </template>
            </el-table-column>
            <el-table-column prop="istirahat" label="Lama Istirahat" sortable>
                <template slot-scope="scope">
                    <span>{{secToTime(scope.row.istirahat)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="last_out" label="Pulang" sortable></el-table-column>
            <el-table-column prop="jam_kerja_efektif" label="Jam Kerja Efektif" sortable>
                <template slot-scope="scope">
                    {{secToTime(scope.row.jam_kerja_efektif)}}
                </template>
            </el-table-column>
            <el-table-column prop="persentase" label="%" sortable width="70"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import exportFromJSON from 'export-from-json'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default {
    components: { 'v-chart': ECharts },
    props: ['person', 'period'],
    computed: {
        hari() { return this.$store.state.hari }
    },
    data: function() {
        return {
            base_url: BASE_URL,
            exportLabelBtn: 'EXPORT KE EXCEL',
            absensis: [],
            timeslots: [],
            filterDate: this.period,
            loading: false,
            prodPercentAvg: 0,
            prodHourAvg: 0,
            chartOption: {
                tooltip: {
                    trigger: 'axis',
                    // axisPointer: { type: 'shadow' }
                },
                // legend: {
                //     x: 'right',
                //     orient: 'vertical'
                // },
                grid: {
                    // right: '200px',
                    // left: '3%',
                    bottom: '30px',
                    // top: '15px',
                    containLabel: true
                },
                title: {
                    text: 'GRAFIK PRODUKTIFITAS PEGAWAI',
                    x: 'center'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data:[]
                },
                yAxis: { type: 'value', name: 'Jam Kerja' },
                series: [{
                    type: 'line',
                    name: 'Jam Kerja',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function(v) {
                            let tgl = v.name.split("\n")[0];
                            let pembagi = moment(tgl).day() === 5 ? 7 : 8;
                            return v.value + ' jam\n' + (v.value/pembagi*100).toFixed(2) + '%'
                        }
                    },
                    data: []
                }]
            },
        }
    },
    watch: {
        person(v, o) { this.requestData() },
        filterDate(v, o) { this.requestData() }
    },
    methods: {
        getDayName(date) {
            return this.hari[moment(date).day()]
        },
        getDuration(start, end) {
            let s = moment(start, 'HH:mm:ss');
            let e = moment(end, 'HH:mm:ss');
            let d = moment.duration(e.diff(s));
            return d.asSeconds();
        },
        secToTime(second) {
            if (second) {
                let h = Math.floor(second/3600)
                let m = Math.floor((second%3600)/60)
                let s = second%60
                return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
            }

            return '';
        },
        requestData() {
            if (this.person.pin === undefined) {
                return
            }

            this.loading = true
            this.keyword = ''
            let params = {
                date: this.filterDate[0],
                date_end: this.filterDate[1],
                api_token: USER.api_token,
                person_pin: this.person.pin
            }

            axios.get(API_URL + '/absensi', { params: params }).then(r => {
                this.loading = false
                this.absensis = r.data
                this.chartOption.xAxis.data = []
                this.chartOption.series[0].data = []
                this.prodPercentAvg = 0
                this.prodHourAvg = 0
                let totalPersentase = 0
                let totalJamKerja = 0

                this.absensis.forEach(a => {
                    let day = moment(a.absence_date).day()
                    a.hari = this.hari[moment(a.absence_date).day()]
                    if (!a.rest_start) {
                        a.rest_start = this.timeslots[day].rest_start
                    }
                    if (!a.rest_end) {
                        a.rest_end = this.timeslots[day].rest_end
                    }
                    
                    a.istirahat = this.getDuration(a.rest_start, a.rest_end)
                    let pembagi = this.timeslots[day].jam_kerja_max * 36

                    a.jam_kerja_efektif = 0
                    a.persentase = 0

                    if (a.first_in && a.last_out) {
                        let jam_masuk_efektif = moment(a.first_in, 'HH:mm:ss') < moment(this.timeslots[day].in, 'HH:mm:ss')
                            ? moment(this.timeslots[day].in, 'HH:mm:ss')
                            : moment(a.first_in, 'HH:mm:ss')

                        let jam_keluar_efektif = moment(a.last_out, 'HH:mm:ss') >= moment(this.timeslots[day].out, 'HH:mm:ss')
                            ? moment(this.timeslots[day].out, 'HH:mm:ss')
                            : moment(a.last_out, 'HH:mm:ss')

                        let durasi_kerja_sec = this.getDuration(jam_masuk_efektif, jam_keluar_efektif)

                        let jam_istirahat_start_efektif = moment(a.rest_start, 'HH:mm:ss') >= moment(this.timeslots[day].rest_start, 'HH:mm')
                            ? moment(this.timeslots[day].rest_start, 'HH:mm:ss')
                            : moment(a.rest_start, 'HH:mm:ss')

                        let jam_istirahat_end_efektif = moment(a.rest_end, 'HH:mm:ss') < moment(this.timeslots[day].rest_end, 'HH:mm')
                            ? moment(this.timeslots[day].rest_end, 'HH:mm:ss')
                            : moment(a.rest_end, 'HH:mm:ss')
                        
                        let durasi_istirahat_sec = this.getDuration(jam_istirahat_start_efektif, jam_istirahat_end_efektif)

                        a.jam_kerja_efektif = durasi_kerja_sec - durasi_istirahat_sec
                        a.persentase = (a.jam_kerja_efektif / pembagi).toFixed(2)
                        totalPersentase += parseFloat(a.persentase)
                        totalJamKerja += a.jam_kerja_efektif
                    }

                    this.chartOption.xAxis.data.push(a.absence_date + '\n' + a.hari)
                    this.chartOption.series[0].data.push(a.jam_kerja_efektif > 0 ? (a.jam_kerja_efektif/3600).toFixed(2) : 0)
                })

                if (totalPersentase > 0) {
                    this.prodPercentAvg = (totalPersentase/this.absensis.length).toFixed(2)
                }
                if (totalJamKerja > 0) {
                    this.prodHourAvg = (totalJamKerja/3600/this.absensis.length).toFixed(2)
                }
            }).catch(e => {
                this.loading = false
                console.log(e);
            })

            // setTimeout(this.getAbsensi, 3000)
        },
        exportToExcel() {
            let data = []
            this.exportLabelBtn = 'Menyiapkan File...'
            this.absensis.forEach(a => {
                data.push({
                    Tanggal: a.absence_date,
                    Hari: a.hari,
                    Masuk: a.first_in || '',
                    Jam_Istirahat: `${a.rest_start} - ${a.rest_end}`,
                    Lama_Istirahat: this.secToTime(a.istirahat),
                    Pulang: a.last_out || '',
                    Jam_Kerja_Efektif: this.secToTime(a.jam_kerja_efektif),
                    Persentase: a.persentase
                })
            })

            let fileName = 'absensi-' + this.person.pin +'.xls'
            let exportType = 'xls'
            exportFromJSON({ data, fileName, exportType })
            this.exportLabelBtn = 'EXPORT KE EXCEL'
        },
        getTimeSlots() {
            let params = { api_token: USER.api_token }
            axios.get(API_URL + '/timeSlot', { params: params }).then(r => {
                r.data.forEach(t => {
                    this.timeslots[t.day] = t
                })
            })
        }
    },
    mounted: function() {
        this.getTimeSlots()
        this.requestData()
    }
}
</script>

<style lang="css" scoped>
.image {
    width: 100%;
}

.echarts {
    width: 100%;
    height: 477px;
}
</style>
