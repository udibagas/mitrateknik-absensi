<template lang="html">
    <div>
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">
                        PRODUKTIFITAS RATA - RATA
                    </div>
                    <div :class="['card-body', 'text-center', prodPercentAvg >= 90 ? 'text-success' : (prodPercentAvg >= 60 ? 'text-warning' : 'text-danger')]">
                        <el-row>
                            <el-col :span="12" style="border-right:1px solid #eee;">
                                <h1>{{prodHourAvg}} jam</h1>
                            </el-col>
                            <el-col :span="12">
                                <h1>{{prodPercentAvg}}%</h1>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">
                        PEGAWAI TERPRODUKTIF
                    </div>
                    <table class="table table-sm table-striped" style="margin-bottom:0">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th class="text-center">Jam Kerja</th>
                                <th class="text-center">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in pegawaiProduktif">
                                <td>{{p.name_var}}</td>
                                <td class="text-center">{{ secToTime(p.jam_kerja_efektif) }}</td>
                                <td class="text-center">{{p.persentase}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header text-center">
                        PEGAWAI TIDAK PRODUKTIF
                    </div>
                    <table class="table table-sm table-striped" style="margin-bottom:0">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th class="text-center">Jam Kerja</th>
                                <th class="text-center">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in pegawaiTidakProduktif">
                                <td>{{p.name_var}}</td>
                                <td class="text-center">{{ secToTime(p.jam_kerja_efektif) }}</td>
                                <td class="text-center">{{p.persentase}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <hr>
        <el-form :inline="true" style="float:right;clear:both;">
            <el-form-item>
                <el-date-picker v-model="filterDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="Dari Tanggal" end-placeholder="Sampai Tanggal"> </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="exportToExcel" type="primary"><i class="el-icon-document"></i> {{exportLabelBtn}}</el-button>
            </el-form-item>
            <el-form-item style="padding-right:0;margin-right:0;">
                <el-input placeholder="Cari Pegawai" prefix-icon="el-icon-search" v-model="keyword">
                    <el-button @click="requestData" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-table :data="filteredData"
            stripe
            style="border-top:1px solid #eee;width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="absence_date" label="Tanggal" sortable width="100"></el-table-column>
            <el-table-column prop="hari" label="Hari" sortable width="100">
                <template slot-scope="scope">
                    {{ getDayName(scope.row.absence_date) }}
                </template>
            </el-table-column>
            <el-table-column prop="nik_var" label="NIK" sortable width="70">
                <template slot-scope="scope">
                    <a href="#" @click.prevent="showAbsensiPegawai(scope.row)">
                        {{scope.row.nik_var}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="name_var" label="Nama" sortable>
                <template slot-scope="scope">
                    <a href="#" @click.prevent="showAbsensiPegawai(scope.row)">
                        {{scope.row.name_var}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="first_in" label="Masuk" sortable width="90"></el-table-column>
            <el-table-column label="Jam Istirahat" sortable width="150">
                <template slot-scope="scope">
                    {{scope.row.rest_start}} - {{scope.row.rest_end}}
                </template>
            </el-table-column>
            <el-table-column prop="istirahat" label="Lama Istirahat" sortable width="130">
                <template slot-scope="scope">
                    {{ secToTime(scope.row.istirahat) }}
                </template>
            </el-table-column>
            <el-table-column prop="last_out" label="Pulang" sortable width="90"></el-table-column>
            <el-table-column prop="jam_kerja_efektif" label="Jam Kerja Efektif" width="160" sortable>
                <template slot-scope="scope">
                    {{ secToTime(scope.row.jam_kerja_efektif) }}
                </template>
            </el-table-column>
            <el-table-column prop="persentase" label="%" width="70" sortable></el-table-column>
        </el-table>

        <el-dialog :visible.sync="absensiPegawaiDialog" width="95%" :center="true" @close="selectedPerson = {}">
            <AbsensiPegawai :person="selectedPerson" :period="filterDate"/>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import exportFromJSON from 'export-from-json'
import AbsensiPegawai from './AbsensiPegawai'

export default {
    components: { AbsensiPegawai },
    computed: {
        hari() { return this.$store.state.hari },
        persons() { return this.$store.state.persons },
        sortedData() {
            return  this.absensis.sort((a,b) => (a.jam_kerja_efektif > b.jam_kerja_efektif) ? 1 : ((a.jam_kerja_efektif < b.jam_kerja_efektif) ? -1 : 0))
        },
        pegawaiProduktif() {
            return this.sortedData.filter(s => s.jam_kerja_efektif >= (8*3600)).slice(-5).reverse()
        },
        pegawaiTidakProduktif() {
            return this.sortedData.filter(s => s.jam_kerja_efektif < (8*3600)).slice(0, 5)
        },
        filteredData() {
            return this.absensis.filter(a => a.nik_var.includes(this.keyword) || a.name_var.toLowerCase().includes(this.keyword.toLowerCase()))
        }
    },
    data: function() {
        return {
            exportLabelBtn: 'EXPORT KE EXCEL',
            absensis: [],
            filterDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            keyword: '',
            loading: false,
            prodPercentAvg: 0,
            prodHourAvg: 0,
            absensiPegawaiDialog: false,
            selectedPerson: {},
            requestInterval: null,
            requestIntervalTime: 10000,
            isRequesting: false
        }
    },
    watch: {
        filterDate(v, o) {
            clearInterval(this.requestInterval)
            this.requestData()
            this.requestInterval = setInterval(this.requestData, this.requestIntervalTime)
        }
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
        showAbsensiPegawai(row) {
            this.selectedPerson = this.persons.find(p => p.pin === row.nik_var)
            this.absensiPegawaiDialog = true
        },
        requestData() {
            if (this.isRequesting) {
                return
            }

            let _this = this
            _this.loading = true
            let params = {
                date: _this.filterDate[0],
                date_end: _this.filterDate[1],
                api_token: USER.api_token
            }

            axios.get(API_URL + '/absensi', { params: params }).then(r => {
                _this.loading = false
                _this.isRequesting = false
                _this.absensis = r.data
                let totalPersentase = 0
                let totalJamKerja = 0

                _this.absensis.forEach(a => {
                    if (!a.rest_start) {
                        if (moment(a.absence_date).day() === 5) {
                            a.rest_start = '11:30:00'
                        } else {
                            a.rest_start = '12:00:00'
                        }
                    }
                    if (!a.rest_end) {
                        a.rest_end = '13:00:00'
                    }

                    a.istirahat = _this.getDuration(a.rest_start, a.rest_end)
                    let pembagi = moment(a.absence_date).day() === 5 ? 7*36 : 8*36

                    a.jam_kerja_efektif = 0
                    a.persentase = 0

                    if (a.first_in && a.last_out) {
                        let jam_masuk_efektif = moment(a.first_in, 'HH:mm:ss').format('H') < 8
                            ? moment('08:00:00', 'HH:mm:ss')
                            : moment(a.first_in, 'HH:mm:ss')
                        
                        let jam_keluar_efektif = moment(a.last_out, 'HH:mm:ss').format('H') >= 17
                            ? moment('17:00:00', 'HH:mm:ss')
                            : moment(a.last_out, 'HH:mm:ss')
                        
                        if (moment(a.absence_date).day() === 5) {
                            jam_masuk_efektif = moment(a.first_in, 'HH:mm:ss').format('H') < 7
                                ? moment('07:00:00', 'HH:mm:ss')
                                : moment(a.first_in, 'HH:mm:ss')
                            jam_keluar_efektif = moment(a.last_out, 'HH:mm:ss') >= moment('15:30', 'HH:mm')
                                ? moment('15:30:00', 'HH:mm:ss')
                                : moment(a.last_out, 'HH:mm:ss')
                        }

                        let durasi_kerja_sec = _this.getDuration(jam_masuk_efektif, jam_keluar_efektif)

                        let jam_istirahat_start_efektif = moment(a.rest_start, 'HH:mm:ss').format('H') >= 12
                            ? moment(moment(a.absence_date).day() === 5 ? '11:30:00' : '12:00:00', 'HH:mm:ss')
                            : moment(a.rest_start, 'HH:mm:ss')
                        let jam_istirahat_end_efektif = moment(a.rest_end, 'HH:mm:ss').format('H') < 13
                            ? moment('13:00:00', 'HH:mm:ss')
                            : moment(a.rest_end, 'HH:mm:ss')
                        let durasi_istirahat_sec = _this.getDuration(jam_istirahat_start_efektif, jam_istirahat_end_efektif)

                        a.jam_kerja_efektif = durasi_kerja_sec - durasi_istirahat_sec
                        a.persentase = (a.jam_kerja_efektif / pembagi).toFixed(2)
                        totalPersentase += parseFloat(a.persentase)
                        totalJamKerja += a.jam_kerja_efektif
                    }
                })

                if (totalPersentase > 0) {
                    _this.prodPercentAvg = (totalPersentase/_this.absensis.length).toFixed(2)
                }

                if (totalJamKerja > 0) {
                    _this.prodHourAvg = (totalJamKerja/3600/_this.absensis.length).toFixed(2)
                }

            }).catch(e => {
                _this.loading = false
                _this.isRequesting = false
                console.log(e);
            })
        },
        exportToExcel() {
            let data = []
            this.exportLabelBtn = 'Menyiapkan File...'
            let _this = this
            _this.absensis.forEach(a => {
                data.push({
                    Tanggal: a.absence_date,
                    Hari: _this.getDayName(a.absence_date),
                    NIK: a.nik_var,
                    Nama: a.name_var,
                    Masuk: a.first_in || '',
                    Jam_Istirahat: `${a.rest_start} - ${a.rest_end}`,
                    Lama_Istirahat: _this.secToTime(a.istirahat),
                    Pulang: a.last_out || '',
                    Jam_Kerja_Efektif: _this.secToTime(a.jam_kerja_efektif),
                    Persentase: a.persentase
                })
            })

            let fileName = 'absensi.xls'
            let exportType = 'xls'
            exportFromJSON({ data, fileName, exportType })
            this.exportLabelBtn = 'EXPORT KE EXCEL'
        }
    },
    mounted: function() {
        this.requestData()
        this.requestInterval = setInterval(this.requestData, this.requestIntervalTime)
        this.$store.commit('getPersons');
    },
    destroyed: function() {
        clearInterval(this.requestInterval)
    }
}
</script>

<style lang="css" scoped>
</style>
