<template>
    <el-card>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Hari</th>
                    <th>Jam Masuk</th>
                    <th>Jam Pulang</th>
                    <th>Jam Istirahat Keluar</th>
                    <th>Jam Istirahat Masuk</th>
                    <th>Jam Kerja Maksimal</th>
                    <th class="text-right">
                        <el-button type="primary" size="small" @click="requestData">REFRESH</el-button>
                    </th>
                </tr>
            </thead>
            <tbody v-loading="loading">
                <tr v-for="(t, i) in timeslots" :key="i">
                    <td>{{++i}}</td>
                    <td>{{$store.state.hari[t.day].toUpperCase()}}</td>
                    <td> <el-input v-model="t.in"></el-input> </td>
                    <td> <el-input v-model="t.out"></el-input> </td>
                    <td> <el-input v-model="t.rest_start"></el-input> </td>
                    <td> <el-input v-model="t.rest_end"></el-input> </td>
                    <td> <el-input v-model="t.jam_kerja_max"></el-input> </td>
                    <td class="text-right">
                        <el-button type="primary" size="small" @click="save(t)">SIMPAN</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            timeslots: [],
            loading: false
        }
    },
    methods: {
        requestData() {
            let params = { api_token: USER.api_token }
            this.loading = true
            axios.get(API_URL + '/timeSlot', { params: params }).then(r => {
                this.loading = false
                this.timeslots = r.data
            })
        },
        save(t) {
            t.api_token = USER.api_token
            axios.put(API_URL + '/timeSlot/' + t.id, t)
                .then(r => {
                    this.timeslots = r.data
                    this.$message({
                        message: 'Data BERHASIL disimpan.',
                        type: 'success'
                    });
                })
                .catch(e => {
                    this.$message({
                        message: 'Data GAGAL disimpan.',
                        type: 'error'
                    });
                })
        }
    },
    mounted() {
        this.requestData()
    }
    
}
</script>

<style scoped>
th, td {
    vertical-align: middle;
}
</style>