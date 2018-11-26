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
                                <td class="text-center">{{p.jam_kerja_efektif}}</td>
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
                                <td class="text-center">{{p.jam_kerja_efektif}}</td>
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
        <el-table :data="absensis.filter(a => a.nik_var.includes(keyword) || a.name_var.toLowerCase().includes(keyword.toLowerCase()))"
            stripe
            v-loading="loading"
            style="border-top:1px solid #eee;width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="absence_date" label="Tanggal" sortable width="100"></el-table-column>
            <el-table-column prop="hari" label="Hari" sortable width="100"></el-table-column>
            <el-table-column prop="nik_var" label="NIK" sortable width="70"></el-table-column>
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
                    {{scope.row.rest_start}} - {{scope.row.rest_end}}<br>
                </template>
            </el-table-column>
            <el-table-column prop="istirahat" label="Lama Istirahat" sortable width="130">
            </el-table-column>
            <el-table-column prop="last_out" label="Pulang" sortable width="90"></el-table-column>
            <el-table-column prop="jam_kerja_efektif" label="Jam Kerja Efektif" width="160" sortable> </el-table-column>
            <el-table-column prop="persentase" label="%" width="70" sortable></el-table-column>
        </el-table>

        <el-dialog :visible.sync="absensiPegawaiDialog" width="95%" v-loading="loading" :close-on-click-modal="true" :show-close="true" :center="true" @close="selectedPerson = {}">
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
    computed: {
        hari() { return this.$store.state.hari },
        persons() { return this.$store.state.persons }
    },
    components: { AbsensiPegawai },
    data: function() {
        return {
            exportLabelBtn: 'EXPORT KE EXCEL',
            absensis: [],
            filterDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            keyword: '',
            loading: false,
            prodPercentAvg: 0,
            prodHourAvg: 0,
            pegawaiProduktif: [],
            pegawaiTidakProduktif: [],
            absensiPegawaiDialog: false,
            selectedPerson: {}
        }
    },
    watch: {
        filterDate(v, o) {
            this.requestData()
        }
    },
    methods: {
        showAbsensiPegawai(row) {
            this.selectedPerson = this.persons.find(p => p.pin === row.nik_var)
            this.absensiPegawaiDialog = true
        },
        requestData() {
            let _this = this
            _this.loading = true
            _this.keyword = ''
            let params = {
                date: _this.filterDate[0],
                date_end: _this.filterDate[1],
                api_token: USER.api_token
            }

            axios.get(API_URL + '/absensi', { params: params }).then(r => {
                _this.loading = false
                _this.absensis = r.data
                let totalPersentase = 0
                let totalJamKerja = 0

                _this.absensis.forEach(a => {
                    // hari
                    a.hari = _this.hari[moment(a.absence_date).day()]
                    // jam istirahat
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

                    let rest_start = moment(a.rest_start, 'HH:mm:ss');
                    let rest_end = moment(a.rest_end, 'HH:mm:ss');
                    let rest_duration = moment.duration(rest_end.diff(rest_start));
                    let rest_seconds = rest_duration.asSeconds();
                    let jam_rest = Math.floor(rest_seconds/3600)
                    let menit_rest = Math.floor((rest_seconds%3600)/60)
                    let detik_rest = rest_seconds%60
                    a.istirahat = `${jam_rest.toString().padStart(2, '0')}:${menit_rest.toString().padStart(2, '0')}:${detik_rest.toString().padStart(2, '0')}`
                    let pembagi = moment(a.absence_date).day() === 5 ? 7.5*36 : 8*36

                    a.jam_kerja_efektif = '00:00:00'
                    a.jam_kerja_efektif_raw = 0
                    a.persentase = 0

                    // jam kerja
                    if (a.first_in && a.last_out) {
                        let masuk = moment(a.first_in, 'HH:mm:ss');
                        let keluar = moment(a.last_out, 'HH:mm:ss');
                        let duration = moment.duration(keluar.diff(masuk));
                        let seconds = duration.asSeconds();
                        // jam kerja efektif
                        let jam_kerja_efektif = seconds - rest_seconds;
                        let jam_kerja = Math.floor(jam_kerja_efektif/3600)
                        let menit_kerja = Math.floor((jam_kerja_efektif%3600)/60)
                        let detik_kerja = jam_kerja_efektif%60
                        a.jam_kerja_efektif_raw = jam_kerja_efektif
                        a.jam_kerja_efektif = `${jam_kerja.toString().padStart(2, '0')}:${menit_kerja.toString().padStart(2, '0')}:${detik_kerja.toString().padStart(2, '0')}`
                        a.persentase = (jam_kerja_efektif / pembagi).toFixed(2)
                        totalPersentase += parseFloat(a.persentase)
                        totalJamKerja += jam_kerja_efektif
                    }
                })

                if (totalPersentase > 0) {
                    _this.prodPercentAvg = (totalPersentase/_this.absensis.length).toFixed(2)
                }
                if (totalJamKerja > 0) {
                    _this.prodHourAvg = (totalJamKerja/3600/_this.absensis.length).toFixed(2)
                }
                let sorted = _this.absensis.sort((a,b) => (a.jam_kerja_efektif_raw > b.jam_kerja_efektif_raw) ? 1 : ((a.jam_kerja_efektif_raw < b.jam_kerja_efektif_raw) ? -1 : 0))
                _this.pegawaiProduktif = sorted.filter(s => s.jam_kerja_efektif_raw >= (8*3600)).slice(-5).reverse()
                _this.pegawaiTidakProduktif = sorted.filter(s => s.jam_kerja_efektif_raw < (8*3600)).slice(0, 5)
            }).catch(e => {
                _this.loading = false
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
                    NIK: a.nik_var,
                    Nama: a.name_var,
                    Masuk: a.first_in || '',
                    Jam_Istirahat: `${a.rest_start} - ${a.rest_end}`,
                    Lama_Istirahat: a.istirahat,
                    Pulang: a.last_out || '',
                    Jam_Kerja_Efektif: a.jam_kerja_efektif,
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
        this.$store.commit('getPersons');
    }
}
</script>

<style lang="css" scoped>
</style>
