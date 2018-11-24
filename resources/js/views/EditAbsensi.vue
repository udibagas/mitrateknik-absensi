<template lang="html">
    <div class="">
        <el-alert type="error" title="ERROR"
            :description="error.message + '\n' + error.file + ':' + error.line"
            v-show="error.message"
            style="margin-bottom:15px;">
        </el-alert>

        <form @submit.prevent="saveData">
            <div class="form-group row">
                <label class="col-md-4 col-form-label col-form-label-md">NIK</label>
                <div class="col-md-8">
                    <el-input disabled v-model="data.person_pin"></el-input>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label col-form-label-md">Nama</label>
                <div class="col-md-8">
                    <el-input disabled v-model="data.person_name"></el-input>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label col-form-label-md">Tanggal</label>
                <div class="col-md-8">
                    <el-input disabled v-model="data.att_date"></el-input>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label col-form-label-md">In/Out</label>
                <div class="col-md-8">
                    <el-input disabled v-model="data.in_out"></el-input>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-4 col-form-label col-form-label-md">Jam</label>
                <div class="col-md-8">
                    <el-input v-model="data.att_time"></el-input>
                </div>
            </div>

            <div class="form-group text-right">
                <el-button type="primary" @click="saveData"><i class="el-icon-check"></i> SIMPAN</el-button>
                <el-button type="default" @click="$emit('close-form')"><i class="el-icon-close"></i> BATAL</el-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data: function() {
        return {
            error: {}
        }
    },
    methods: {
        saveData() {
            let _this = this
            _this.data.api_token = USER.api_token
            _this.data.att_datetime = _this.data.att_date + ' ' + _this.data.att_time
            axios.put(API_URL + '/attendance/' + _this.data.id, _this.data).then(function(r) {
                _this.$emit('close-form')
                _this.$emit('refresh')
            }).catch(function(e) {
                _this.error = e.response.data
            })
        }
    }
}
</script>

<style lang="css">
.col-form-label {
    font-weight: bold;
    text-align: right;
}
</style>
