<template>
	<el-dialog
		:visible.sync="show"
		width="95%"
		center
		title="DETAIL ABSENSI"
		:before-close="(done) => $emit('close')"
	>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card :body-style="{ padding: '14px' }">
					<img :src="person.photo_path" class="image" />
					<div style="padding: 14px" class="text-center">
						<h4 style="margin-bottom: 2px">
							{{ person.name }} {{ person.last_name }}
						</h4>
						<span style="font-size: 1.5em">{{ person.pin }}</span
						><br />
						<span
							>Dep. :
							{{ person.department ? person.department.name : '' }}</span
						>
						<h4
							class="text-center"
							style="
								border-top: 1px solid #ddd;
								border-bottom: 1px solid #ddd;
								padding: 20px 0;
							"
						>
							PRODUKTIFITAS RATA - RATA
						</h4>
						<div
							:class="[
								'text-center',
								prodPercentAvg >= 90
									? 'text-success'
									: prodPercentAvg >= 60
									? 'text-warning'
									: 'text-danger',
							]"
						>
							<el-row>
								<el-col :span="12" style="border-right: 1px solid #eee">
									<h2>{{ prodHourAvg }} jam</h2>
								</el-col>
								<el-col :span="12">
									<h2>{{ prodPercentAvg }}%</h2>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="18">
				<v-chart :options="chartOption" class="echarts"></v-chart>
			</el-col>
		</el-row>

		<el-form inline style="float: right; clear: both">
			<el-form-item>
				<el-date-picker
					v-model="date"
					type="daterange"
					value-format="yyyy-MM-dd"
					format="dd/MMM/yyyy"
					range-separator="-"
					start-placeholder="Dari Tanggal"
					end-placeholder="Sampai Tanggal"
					@change="requestData"
					size="small"
					style="width: 280px; margin-top: 5px"
				>
				</el-date-picker>
			</el-form-item>

			<el-form-item>
				<el-button
					size="small"
					icon="el-icon-download"
					@click="exportData"
					type="primary"
				>
					EXPORT KE EXCEL
				</el-button>
			</el-form-item>
		</el-form>

		<el-table stripe :data="tableData" v-loading="loading">
			<el-table-column type="index" width="50" label="#"></el-table-column>

			<el-table-column prop="att_date" label="Tanggal" sortable>
				<template slot-scope="scope">
					{{ $moment(scope.row.att_date).format('DD/MMM/YYYY') }} <br />
					{{ $moment(scope.row.att_date).format('dddd') }}
				</template>
			</el-table-column>

			<el-table-column prop="first_in" label="Masuk" sortable></el-table-column>

			<el-table-column label="Jam Istirahat" sortable>
				<template slot-scope="{ row }">
					{{ row.rest_start }} - {{ row.rest_end }} <br />
				</template>
			</el-table-column>

			<el-table-column label="Durasi Istirahat" prop="rest_duration" sortable>
			</el-table-column>

			<el-table-column prop="last_out" label="Pulang" sortable>
			</el-table-column>

			<el-table-column prop="work_duration" label="Jam Kerja Efektif" sortable>
			</el-table-column>

			<el-table-column
				prop="percentage"
				label="%"
				sortable
				align="right"
				header-align="right"
			>
				<template slot-scope="{ row }">
					{{ row.percentage.toFixed(2) }}
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
import exportFromJSON from 'export-from-json'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
	components: { 'v-chart': ECharts },
	props: ['person', 'period', 'show'],

	watch: {
		person(v, o) {
			this.requestData()
		},

		period(v, o) {
			this.date = this.period
			this.requestData()
		},
	},

	data() {
		return {
			url: '/api/absensi',
			date: null,
			loading: false,
			tableData: [],
			prodPercentAvg: 0,
			prodHourAvg: 0,
			chartOption: {
				tooltip: {
					trigger: 'axis',
				},
				grid: {
					bottom: '30px',
					containLabel: true,
				},
				title: {
					text: 'GRAFIK PRODUKTIFITAS PEGAWAI',
					x: 'center',
				},
				xAxis: {
					type: 'category',
					boundaryGap: true,
					data: [],
				},
				yAxis: { type: 'value', name: 'Jam Kerja' },
				series: [
					{
						type: 'line',
						name: 'Jam Kerja',
						label: {
							show: true,
							position: 'top',
							formatter: function (v) {
								let tgl = v.name.split('\n')[0]
								let pembagi = this.$moment(tgl).day() === 5 ? 7 : 8
								return (
									v.value +
									' jam\n' +
									((v.value / pembagi) * 100).toFixed(2) +
									'%'
								)
							},
						},
						data: [],
					},
				],
			},
		}
	},

	methods: {
		async requestData() {
			this.loading = true
			this.tableData = await this.$axios.$get(this.url, {
				params: { date: this.date, pin: this.person.pin },
			})
			this.loading = false
		},

		async exportData(fileName) {
			this.loading = true

			const data = await this.$axios.$get(this.url, {
				params: { date: this.date, pin: this.person.pin },
			})

			exportFromJSON({ data, fileName, exportType: 'xls' })
			this.loading = false
		},
	},
}
</script>

<style lang="css" scoped>
.image {
	width: 100%;
}

.echarts {
	width: 100%;
	height: 477px;
}
</style>
