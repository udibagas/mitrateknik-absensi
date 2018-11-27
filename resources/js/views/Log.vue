<template lang="html">
    <el-card>
        <el-form :inline="true" style="float:right;clear:both;">
            <el-form-item>
                <el-button @click="add" type="primary"><i class="el-icon-plus"></i> INPUT ABSENSI</el-button>
            </el-form-item>
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
        <el-table
        :data="logs.filter(a => a.person_pin.includes(keyword) || a.person_name.toLowerCase().includes(keyword.toLowerCase()))"
        stripe
        style="border-top:1px solid #eee;width:100%">

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
            <el-table-column prop="gate.name" label="Gate" sortable width="120"></el-table-column>
            <el-table-column width="70">
                <template slot-scope="scope">
                    <a href="#" @click.prevent="edit(scope.row)">Edit</a>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
        :visible.sync="formDialog"
        width="500px"
        :close-on-click-modal="true"
        :show-close="true"
        :title="row_id ? 'Edit Absensi' : 'Input Absensi'">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <form @submit.prevent="saveData">
                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Nama Pegawai</label>
                    <div class="col-md-8">
                        <el-select :disabled="row_id > 0 ? true : false" placeholder="Nama Pegawai" v-model="person_pin" style="width:100%;" filterable default-first-option>
                            <el-option :value="p.pin" :label="p.pin + ' - ' + p.name + ' ' + p.last_name" v-for="p in persons" :key="p.pin"></el-option>
                        </el-select>
                        <div class="error-feedback" v-if="formErrors.person_pin">{{formErrors.person_pin[0]}}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Gate</label>
                    <div class="col-md-8">
                        <el-select placeholder="Gate" v-model="gate_id" style="width:100%;" filterable default-first-option>
                            <el-option :value="g.id" :label="g.name" v-for="g in gates" :key="g.id"></el-option>
                        </el-select>
                        <div class="error-feedback" v-if="formErrors.device_id">{{formErrors.device_id[0]}}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Tanggal</label>
                    <div class="col-md-8">
                        <el-date-picker v-model="att_date" type="date" value-format="yyyy-MM-dd" placeholder="Creation Date" style="width:100%;"> </el-date-picker>
                        <div class="error-feedback" v-if="formErrors.att_date">{{formErrors.att_date[0]}}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Jam</label>
                    <div class="col-md-8">
                        <el-input v-model="att_time"></el-input>
                        <div class="error-feedback" v-if="formErrors.att_time">{{formErrors.att_time[0]}}</div>
                    </div>
                </div>

                <div class="form-group text-right">
                    <el-button type="primary" @click="saveData"><i class="el-icon-check"></i> SIMPAN</el-button>
                    <el-button type="default" @click="formDialog = false"><i class="el-icon-close"></i> BATAL</el-button>
                </div>
            </form>
        </el-dialog>
    </el-card>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import exportFromJSON from 'export-from-json'

export default {
    computed: {
        gates() { return this.$store.state.gates },
        persons() { return this.$store.state.persons },
        gate() { return this.gates.find(g => g.id === this.gate_id) },
        person() { return this.persons.find(p => p.pin === this.person_pin) },
    },
    data: function() {
        return {
            logs: [],
            date: moment().format('YYYY-MM-DD'),
            keyword: '',
            exportLabelBtn: 'EXPORT KE EXCEL',
            selectedRow: {},
            formDialog: false,
            error: {},
            formErrors: [],
            person_pin: '',
            gate_id: '',
            att_date: '',
            att_time: '',
            row_id: '',
            loading: false
        }
    },
    watch: {
        date(v, o) {
            this.requestData()
        },
        person_pin(v, o) {
            if (v) {
                this.formErrors.person_pin = false
                this.$forceUpdate()
            }
        },
        gate_id(v, o) {
            if (v) {
                this.formErrors.device_id = false
                this.$forceUpdate()
            }
        }
    },
    methods: {
        add() {
            this.row_id = false
            this.error = {};
            this.formErrors = [];
            this.person_pin = ''
            this.gate_id = ''
            this.att_date = moment().format('YYYY-MM-DD')
            this.att_time = moment().format('HH:mm:ss')
            this.formDialog = true
        },
        edit(row) {
            this.row_id = row.id
            this.error = {};
            this.formErrors = [];
            this.person_pin = row.person_pin
            this.gate_id = row.device_id
            this.att_date = row.att_date
            this.att_time = row.att_time
            this.formDialog = true
        },
        requestData() {
            let _this = this
            _this.loading = true
            let params = { api_token: USER.api_token, date: _this.date }
            axios.get(API_URL + '/attendance', { params: params }).then(function(r) {
                _this.loading = false
                _this.logs = r.data
            }).catch(function(e) {
                _this.loading = false
                console.log(e);
            })

            setTimeout(this.requestData, 10000)
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
                    Gate: a.gate ? a.gate.name : ''
                })
            })

            let fileName = 'log-absensi.xls'
            let exportType = 'xls'
            exportFromJSON({ data, fileName, exportType })
            this.exportLabelBtn = 'EXPORT KE EXCEL'
        },
        saveData() {
            if (!this.person_pin) {
                this.formErrors.person_pin = ['Pilih pegawai'];
                this.$forceUpdate()
                return
            }

            if (!this.gate_id) {
                this.formErrors.device_id = ['Pilih gate'];
                this.$forceUpdate()
                return
            }

            let data = {
                dept_id: this.person.department.id,
                dept_no: this.person.department.code,
                dept_name: this.person.department.name,
                person_pin: this.person.pin,
                person_name: this.person.name,
                person_last_name: this.person.last_name,
                area_id: this.gate.device.area.id,
                area_name: this.gate.device.area.name,
                device_id: this.gate.id,
                device_sn: this.gate.device.sn,
                att_datetime: this.att_date + ' ' + this.att_time,
                att_date: this.att_date,
                att_time: this.att_time,
                mark: 'Access Control Device',
                api_token: USER.api_token
            }

            if (this.row_id) {
                this.updateData(data)
            } else {
                this.storeData(data)
            }

        },
        storeData(data) {
            let _this = this
            _this.loading = true
            axios.post(API_URL + '/attendance', data).then(function(r) {
                _this.loading = false
                _this.formDialog = false
                _this.$message({
                    message: 'Data BERHASIL disimpan.',
                    type: 'success'
                });
                _this.requestData()
            }).catch(function(e) {
                _this.loading = false
                if (e.response.status == 422) {
                    _this.error = {};
                    _this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    _this.formErrors = {};
                    _this.error = e.response.data;
                }
            })
        },
        updateData(data) {
            let _this = this
            _this.loading = true
            axios.put(API_URL + '/attendance/' + _this.row_id, data).then(function(r) {
                _this.loading = false
                _this.formDialog = false
                _this.$message({
                    message: 'Data BERHASIL disimpan.',
                    type: 'success'
                });
                _this.requestData()
            }).catch(function(e) {
                _this.loading = false
                if (e.response.status == 422) {
                    _this.error = {};
                    _this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    _this.formErrors = {};
                    _this.error = e.response.data;
                }
            })
        }
    },
    mounted: function() {
        this.requestData()
        this.$store.commit('getGates')
        this.$store.commit('getPersons')
    }
}
</script>

<style lang="css">
.col-form-label {
    font-weight: bold;
    text-align: right;
}
</style>
