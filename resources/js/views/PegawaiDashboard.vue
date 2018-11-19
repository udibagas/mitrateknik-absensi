<template lang="html">
    <el-card>
        <div class="row">
            <div class="col-md-3">
                foto pegawai
            </div>
            <div class="ol-md-9">
                detail pegawai
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tanggal</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>Total Jam Kerja</th>
                            <th>Istirahat</th>
                            <th colspan="2">Produktifitas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(l, i) in logAbsensi">
                            <td>{{++i}}</td>
                            <td>{{l.tanggal}}</td>
                            <td>{{l.masuk}}</td>
                            <td>{{l.pulang}}</td>
                            <td>{{l.total}}</td>
                            <td>{{l.istirahat}}</td>
                            <td>{{(l.total - l.istirahat)}}</td>
                            <td>{{(l.total - l.istirahat) / 8 * 100 }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <v-chart :options="chart" class="echarts"></v-chart>
            </div>
        </div>
    </el-card>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
    props: ['pegawai'],
    data: function() {
        return {
            chart: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                legend: {
                    x: 'right',
                    orient: 'vertical'
                },
                grid: {
                    right: '200px',
                    left: '3%',
                    bottom: '0px',
                    top: '15px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data:['Draft', 'Final', 'Void', 'Finish'],
                },
                yAxis: { type: 'value' },
                series: []
            },
            logAbsensi: []
        }
    },
    methods: {
        getLogAbsensi: function() {
            let vm = this
            axios.get(API_URL + 'absensi', {params: {pegawai: pegawai}}).then(function(r) {
                return vm.logAbsensi = r.data
            }).catch(function(e) {
                console.log(e);
            })
        }
    },
    mounted: function() {
        this.getLogAbsensi()
    }
}
</script>

<style lang="css">
.echarts {
    width:100%;
    height:300px;
    margin:15px 0;
    padding-bottom:15px;
}
</style>
