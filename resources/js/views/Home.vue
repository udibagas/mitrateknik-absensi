<template lang="html">
    <el-card>
        <h1>GRAPH NANTI DISINI</h1>
        <hr>
        <el-form :inline="true" style="float:right;clear:both;margin-right:0;">
            <el-form-item>
                <el-date-picker v-model="filterDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="Dari Tanggal" end-placeholder="Sampai Tanggal"> </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="exportToExcel" type="primary"><i class="el-icon-document"></i> {{exportLabelBtn}}</el-button>
            </el-form-item>
            <el-form-item>
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
                    <a href="#" @click.prevent="$router.push({ path: `pegawai/${scope.row.nik_var}`})">
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
    </el-card>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import exportFromJSON from 'export-from-json'

export default {
    data: function() {
        return {
            exportLabelBtn: 'EXPORT KE EXCEL',
            absensis: [],
            filterDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            keyword: '',
            loading: false,
            hari: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu']
        }
    },
    watch: {
        filterDate(v, o) {
            console.log(v);
            this.requestData()
        }
    },
    methods: {
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
                        a.jam_kerja_efektif = `${jam_kerja.toString().padStart(2, '0')}:${menit_kerja.toString().padStart(2, '0')}:${detik_kerja.toString().padStart(2, '0')}`
                        a.istirahat = `${jam_rest.toString().padStart(2, '0')}:${menit_rest.toString().padStart(2, '0')}:${detik_rest.toString().padStart(2, '0')}`
                        let pembagi = moment(a.absence_date).day() === 5 ? 7.5*36 : 8*36
                        a.persentase = (jam_kerja_efektif / pembagi).toFixed(2)
                    }
                })
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
    }
}
</script>

<style lang="css" scoped>
.el-table .cell {
    white-space: nowrap !important;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
