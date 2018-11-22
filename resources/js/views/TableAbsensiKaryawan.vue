<template lang="html">
    <div>
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
            v-loading="loading"
            style="border-top:1px solid #eee;width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="absence_date" label="Tanggal" sortable width="100"></el-table-column>
            <el-table-column prop="hari" label="Hari" sortable width="100"></el-table-column>
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
    </div>
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
            hari: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
            prodPercentAvg: 96,
            prodHourAvg: 7.2,
            pegawaiProduktif: [
                {nama: 'Bagas', jam: 8, persen: 100},
                {nama: 'Udi', jam: 8, persen: 100},
                {nama: 'Sahsangka', jam: 8, persen: 100},
            ],
            pegawaiTidakProduktif: [
                {nama: 'Romi', jam: 2, persen: 20},
                {nama: 'Ari', jam: 3, persen: 30},
                {nama: 'Susanto', jam: 4, persen: 40},
            ],
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
                    a.istirahat = `${jam_rest.toString().padStart(2, '0')}:${menit_rest.toString().padStart(2, '0')}:${detik_rest.toString().padStart(2, '0')}`
                    let pembagi = moment(a.absence_date).day() === 5 ? 7.5*36 : 8*36

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
                    Masuk: a.first_in || '',
                    Jam_Istirahat: `${a.rest_start} - ${a.rest_end}`,
                    Lama_Istirahat: a.istirahat,
                    Pulang: a.last_out || '',
                    Jam_Kerja_Efektif: a.jam_kerja_efektif,
                    Persentase: a.persentase
                })
            })

            let fileName = 'absensi-' + a.nik_var +'.xls'
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
</style>
