<template lang="html">
    <el-card class="box-card">
        <el-row>
            <el-col :span="8">
                <h4>KELOLA USER</h4>
            </el-col>
            <el-col :span="16">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button @click="addData" type="primary"><i class="el-icon-plus"></i> TAMBAH USER BARU</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-select class="pager-options" v-model="pageSize" placeholder="Page Size">
                            <el-option v-for="item in pagerOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-right:0;">
                        <el-input placeholder="Cari user" prefix-icon="el-icon-search" v-model="keyword">
                            <el-button @click="refreshData" slot="append" icon="el-icon-refresh"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-table :data="tableData" stripe
        :default-sort = "{prop: 'name', order: 'ascending'}"
        v-loading="loading"
        style="border-top:1px solid #eee;"
        @sort-change="sortChange">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="Nama" sortable="custom"></el-table-column>
            <el-table-column prop="email" label="Email" sortable="custom"></el-table-column>
            <el-table-column prop="admin" label="Jenis" sortable="custom">
                <template slot-scope="scope">
                    {{scope.row.admin ? 'Admin' : 'User'}}
                </template>
            </el-table-column>
            <el-table-column prop="active" label="Status" sortable="custom">
                <template slot-scope="scope">
                    <span :class="scope.row.active ? 'text-success' : 'text-danger'">{{scope.row.active ? 'Aktif' : 'Non Aktif'}}</span>
                </template>
            </el-table-column>

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="editData(scope.row)"><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="deleteData(scope.row.id)"><i class="el-icon-delete"></i> Hapus</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <br>

        <el-row>
            <el-col :span="12">
                <el-pagination @current-change="goToPage"
                    :page-size="pageSize"
                    background
                    layout="prev, pager, next"
                    :total="totalRow">
                </el-pagination>
            </el-col>
            <el-col :span="12" style="text-align:right">
                Menampilkan {{ rowFrom }} sampai {{ rowTo }} dari {{ totalRow }} data
            </el-col>
        </el-row>

        <el-dialog :visible.sync="showForm" :title="formTitle" width="600px" v-loading="loading" :close-on-click-modal="false">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <form @submit.prevent="formData.id == undefined ? store : update">
                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Username</label>
                    <div class="col-md-8">
                        <el-input placeholder="Username" v-model="formData.name"></el-input>
                        <div class="error-feedback" v-if="formErrors.name">{{formErrors.name[0]}}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Email</label>
                    <div class="col-md-8">
                        <el-input placeholder="Email" v-model="formData.email"></el-input>
                        <div class="error-feedback" v-if="formErrors.email">{{formErrors.email[0]}}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Jenis</label>
                    <div class="col-md-8">
                        <el-select placeholder="Jenis" v-model="formData.admin" style="width:100%;">
                            <el-option :value="0" label="User"></el-option>
                            <el-option :value="1" label="Admin"></el-option>
                        </el-select>
                        <div class="error-feedback" v-if="formErrors.admin">{{formErrors.admin[0]}}</div>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Password</label>
                    <div class="col-md-8">
                        <el-input type="password" placeholder="Password" v-model="formData.password"></el-input>
                        <div class="error-feedback" v-if="formErrors.password">{{formErrors.password[0]}}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Konfirmasi Password</label>
                    <div class="col-md-8">
                        <el-input type="password" placeholder="Konfirmasi Password" v-model="formData.password_confirmation"></el-input>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label col-form-label-md">Status</label>
                    <div class="col-md-8">
                        <el-select placeholder="Status" v-model="formData.active" style="width:100%;">
                            <el-option :value="0" label="Non Aktif"></el-option>
                            <el-option :value="1" label="Aktif"></el-option>
                        </el-select>
                        <div class="error-feedback" v-if="formErrors.active">{{formErrors.active[0]}}</div>
                    </div>
                </div>

                <div class="form-group text-right">
                    <el-button type="primary" @click="store" v-if="formData.id == undefined"><i class="el-icon-check"></i> SAVE</el-button>
                    <el-button type="primary" @click="update" v-if="formData.id != undefined"><i class="el-icon-check"></i> SIMPAN</el-button>
                    <el-button type="default" @click="showForm = false"><i class="el-icon-close"></i> BATAL</el-button>
                </div>
            </form>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    watch: {
        keyword: function(v, o) {
            this.requestData()
        },
        pageSize: function(v, o) {
            this.requestData()
        }
    },
    data: function() {
        return {
            loading: false,
            showForm: false,
            formTitle: '',
            rowFrom: 0,
            rowTo: 0,
            totalRow: 0,
            formErrors: {},
            error: {},
            formData: {},
            keyword: '',
            page: 1,
            pageSize: 10,
            tableData: [],
            sort: 'name',
            order: 'ascending',
            pagerOptions: [
                {value: 10, label: 10},
                {value: 25, label: 25},
                {value: 50, label: 50},
                {value: 100, label: 100},
            ]
        }
    },
    methods: {
        sortChange: function(column) {
            if (this.sort !== column.prop || this.order !== column.order) {
                this.sort = column.prop;
                this.order = column.order;
                this.requestData();
            }
        },
        goToPage: function(p) {
            this.page = p;
            this.requestData();
        },
        store: function() {
            let _this = this;
            _this.loading = true;

            axios.post(API_URL + '/user', _this.formData)
                .then(function(r) {
                    _this.loading = false;
                    _this.showForm = false;
                    _this.$message({
                        message: 'Data BERHASIL disimpan.',
                        type: 'success'
                    });
                    _this.requestData();
                })
                .catch(function(e) {
                    _this.loading = false;
                    if (e.response.status == 422) {
                        _this.error = {}
                        _this.formErrors = e.response.data.errors;
                    }

                    if (e.response.status == 500) {
                        _this.formErrors = {}
                        _this.error = e.response.data;
                    }
                })
        },
        update: function() {
            let _this = this;
            _this.loading = true;

            axios.put(API_URL + '/user/' + _this.formData.id, _this.formData)
                .then(function(r) {
                    _this.loading = false;
                    _this.showForm = false
                    _this.$message({
                        message: 'Data BERHASIL disimpan.',
                        type: 'success'
                    });
                    _this.requestData()
                })
                .catch(function(e) {
                    _this.loading = false;
                    if (e.response.status == 422) {
                        _this.error = {}
                        _this.formErrors = e.response.data.errors;
                    }

                    if (e.response.status == 500) {
                        _this.formErrors = {}
                        _this.error = e.response.data;
                    }
                })
        },
        addData: function() {
            this.formTitle = 'Tambah User Baru'
            this.error = {}
            this.formErrors = {}
            this.formData = {
                type: 0,
                salutation: 0
            }
            this.showForm = true
        },
        editData: function(data) {
            this.formTitle = 'Edit User'
            this.formData = JSON.parse(JSON.stringify(data));
            this.error = {}
            this.formErrors = {}
            this.showForm = true
        },
        deleteData: function(id) {
            let _this = this;

            _this.$confirm('Anda yakin akan menghapus user ini?')
                .then(() => {
                    axios.delete(API_URL + '/user/' + id)
                        .then(function(r) {
                            _this.requestData();
                            _this.$message({
                                message: 'User BERHASIL dihapus.',
                                type: 'success'
                            });
                        })
                        .catch(function(e) {
                            _this.$message({
                                message: 'User GAGAL dihapus.',
                                type: 'error'
                            });
                        })
                })
                .catch(() => {

                });
        },
        refreshData: function() {
            this.keyword = '';
            this.page = 1;
            this.requestData();
        },
        requestData: function() {
            let _this = this;
            let params = {
                page: _this.page,
                keyword: _this.keyword,
                pageSize: _this.pageSize,
                sort: _this.sort,
                order: _this.order
            }
            _this.loading = true;

            axios.get(API_URL + '/user', {params: params})
                .then(function(r) {
                    _this.loading = false;
                    _this.tableData = r.data.data
                    _this.totalRow = r.data.total
                    _this.rowFrom = r.data.from
                    _this.rowTo = r.data.to
                })
                .catch(function(e) {
                    _this.loading = false;
                    _this.$message({
                        message: e.response.data.message || e.response.message,
                        type: 'error'
                    });
                })
        }
    },
    created: function() {
        this.requestData();
    }
}
</script>

<style lang="css" scoped>
.el-form {
    text-align: right;
}
</style>
