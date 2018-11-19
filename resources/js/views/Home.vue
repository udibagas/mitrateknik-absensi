<template lang="html">
    <el-card>
        <el-row>
            <el-col :span="15">
                <el-form :inline="true" style="float:right;clear:both;margin-right:0;">
                    <el-form-item>
                        <el-date-picker v-model="filterDate" type="date" value-format="yyyy-MM-dd" placeholder="Pilih Tanggal"> </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="exportToExcel" type="primary"><i class="el-icon-document"></i> EXPORT KE EXCEL</el-button>
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
                    height="700px"
                    style="border-top:1px solid #eee;width:100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="nik_var" label="NIK" sortable width="70"></el-table-column>
                    <el-table-column prop="name_var" label="Nama" sortable>
                        <template slot-scope="scope">
                            <a href="#" @click.prevent="$router.push({ path: `pegawai/${scope.row.nik_var}`})">
                                {{scope.row.name_var}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="first_in" label="Masuk" sortable width="90"></el-table-column>
                    <el-table-column prop="last_out" label="Keluar" sortable width="90"></el-table-column>
                    <el-table-column prop="istirahat" label="Istirahat" width="100" sortable></el-table-column>
                    <el-table-column prop="jam_kerja_efektif" label="Jam Kerja Efektif" width="160" sortable> </el-table-column>
                    <el-table-column prop="persentase" label="%" width="60" sortable></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
    data: function() {
        return {
            absensis: [],
            filterDate: moment().format('YYYY-MM-DD'),
            keyword: '',
            loading: false
        }
    },
    watch: {
        filterDate(v, o) {
            this.requestData()
        }
    },
    methods: {
        requestData() {
            let _this = this
            _this.loading = true
            _this.keyword = ''
            let params = { date: _this.filterDate }

            axios.get(API_URL + '/absensi', { params: params }).then(r => {
                _this.loading = false
                _this.absensis = r.data
                _this.absensis.forEach(a => {
                    // jam kerja
                    let masuk = moment(a.first_in, 'HH:mm:ss');
                    let keluar = moment(a.last_out, 'HH:mm:ss');
                    let duration = moment.duration(keluar.diff(masuk));
                    let seconds = duration.asSeconds();
                    // jam istirahat
                    let rest_start = moment(a.rest_start, 'HH:mm:ss');
                    let rest_end = moment(a.rest_end, 'HH:mm:ss');
                    let rest_duration = moment.duration(rest_end.diff(rest_start));
                    let rest_seconds = rest_duration.asSeconds();
                    let jam_rest = Math.floor(rest_seconds/3600)
                    let menit_rest = Math.floor((rest_seconds%3600)/60)
                    let detik_rest = rest_seconds%60
                    // jam kerja efektif
                    let jam_kerja_efektif = seconds - rest_seconds;
                    let jam_kerja = Math.floor(jam_kerja_efektif/3600)
                    let menit_kerja = Math.floor((jam_kerja_efektif%3600)/60)
                    let detik_kerja = jam_kerja_efektif%60
                    a.jam_kerja_efektif = `${jam_kerja}:${menit_kerja}:${detik_kerja}`
                    a.istirahat = `${jam_rest}:${menit_rest}:${detik_rest}`
                    a.persentase = (jam_kerja_efektif / (8*3600) / 100).toFixed(2)
                })
            }).catch(e => {
                _this.loading = false
                console.log(e);
            })

            // setTimeout(this.getAbsensi, 3000)
        },
        exportToExcel() {
            console.log('OK');
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
