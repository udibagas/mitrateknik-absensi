<template lang="html">
    <el-card>
        <el-form :inline="true" style="float:right;clear:both;">
            <el-form-item>
                <el-date-picker v-model="date" type="date" value-format="yyyy-MM-dd"> </el-date-picker>
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
        <el-table :data="logs.filter(a => a.person_pin.includes(keyword) || a.person_name.toLowerCase().includes(keyword.toLowerCase()))" stripe style="border-top:1px solid #eee;width:100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="att_date" label="Tanggal" sortable width="100"></el-table-column>
            <el-table-column prop="person_pin" label="NIK" sortable width="100"></el-table-column>
            <el-table-column prop="person_name" label="Nama" sortable>
                <template slot-scope="scope">
                    {{scope.row.person_name}} {{scope.row.person_last_name}}
                </template>
            </el-table-column>
            <el-table-column prop="dept_name" label="Departemen" sortable></el-table-column>
            <el-table-column prop="att_time" label="Jam" sortable width="100"></el-table-column>
            <el-table-column prop="gate" label="Gate" sortable width="100"></el-table-column>
            <el-table-column prop="in_out" label="In/Out" sortable width="100"></el-table-column>
            <el-table-column width="70">
                <template slot-scope="scope">
                    <a href="#" @click.prevent="edit(scope.row)">Edit</a>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="editDialog" width="500px" :close-on-click-modal="true" :show-close="true" title="Edit Data" @close="selectedRow = {}">
            <EditAbsensi :data="selectedRow" @close-form="editDialog = false" @refresh="requestData"/>
        </el-dialog>
    </el-card>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import EditAbsensi from './EditAbsensi'
import exportFromJSON from 'export-from-json'

export default {
    components: { EditAbsensi },
    data: function() {
        return {
            logs: [],
            date: moment().format('YYYY-MM-DD'),
            keyword: '',
            exportLabelBtn: 'EXPORT KE EXCEL',
            selectedRow: {},
            editDialog: false
        }
    },
    watch: {
        date() { this.requestData() }
    },
    methods: {
        edit(row) {
            this.selectedRow = row
            this.editDialog = true
        },
        requestData() {
            // Gate 1
            //     IN: 14, OUT: 13
            // Gate 2
            //     IN: 16, OUT: 15
            // Gate 3
            //     IN: 3, OUT: 4

            let _this = this
            let params = { api_token: USER.api_token, date: _this.date }
            axios.get(API_URL + '/attendance', { params: params }).then(function(r) {
                _this.logs = r.data
                _this.logs.forEach(l => {
                    l.in_out = 'OUT'
                    if (l.device_id === 3 || l.device_id === 14 || l.device_id === 16) {
                        l.in_out = 'IN'
                    }

                    if (l.device_id == 13 || l.device_id === 14) {
                        l.gate = 'Gate 1'
                    }

                    if (l.device_id == 3 || l.device_id === 4) {
                        l.gate = 'Gate 3'
                    }

                    if (l.device_id == 15 || l.device_id === 16) {
                        l.gate = 'Gate 2'
                    }
                })
            }).catch(function(e) {
                console.log(e);
            })
        },
        exportToExcel() {
            let data = []
            this.exportLabelBtn = 'Menyiapkan File...'
            this.logs.forEach(a => {
                data.push({
                    Tanggal: a.att_date,
                    NIK: a.person_pin,
                    Nama: a.person_name + ' ' + a.person_last_name,
                    Departemen: a.dept_name,
                    Jam: a.att_time,
                    Gate: a.gate,
                    Ket: a.in_out
                })
            })

            let fileName = 'log-absensi.xls'
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

<style lang="css">
</style>
