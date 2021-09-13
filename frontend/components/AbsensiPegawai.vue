<template>
	<div>
		<div class="row">
			<div class="col-md-3">
				<el-card :body-style="{ padding: '14px' }">
					<img
						:src="
							base_url +
							'/img/user-' +
							(person.gender ? person.gender.toLowerCase() : '') +
							'.png'
						"
						class="image"
					/>
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
						<hr />
						<h6 class="text-center">PRODUKTIFITAS RATA - RATA</h6>
						<hr />
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
									<h3>{{ prodHourAvg }} jam</h3>
								</el-col>
								<el-col :span="12">
									<h3>{{ prodPercentAvg }}%</h3>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
			</div>
			<div class="col-md-9">
				<v-chart :options="chartOption" class="echarts"></v-chart>
			</div>
		</div>
		<hr />

		<el-form :inline="true" style="float: right; clear: both">
			<el-form-item>
				<el-date-picker
					v-model="filters.dateRange"
					type="daterange"
					value-format="yyyy-MM-dd"
					format="dd-MMM-yyyy"
					range-separator="-"
					start-placeholder="Dari Tanggal"
					end-placeholder="Sampai Tanggal"
					@change="searchData"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item style="padding-right: 0; margin-right: 0">
				<el-button @click="exportToExcel" type="primary"
					><i class="el-icon-document"></i> {{ exportLabelBtn }}</el-button
				>
			</el-form-item>
		</el-form>

		<el-table :data="tableData" stripe>
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column
				prop="absence_date"
				label="Tanggal"
				sortable
				width="100"
			></el-table-column>
			<el-table-column
				prop="hari"
				label="Hari"
				sortable
				width="100"
			></el-table-column>
			<el-table-column prop="first_in" label="Masuk" sortable></el-table-column>
			<el-table-column label="Jam Istirahat" sortable>
				<template slot-scope="scope">
					{{ scope.row.rest_start }} - {{ scope.row.rest_end }}
				</template>
			</el-table-column>
			<el-table-column prop="istirahat" label="Lama Istirahat" sortable>
				<template slot-scope="scope">
					<span>{{ secToTime(scope.row.istirahat) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="last_out"
				label="Pulang"
				sortable
			></el-table-column>
			<el-table-column
				prop="jam_kerja_efektif"
				label="Jam Kerja Efektif"
				sortable
			>
				<template slot-scope="scope">
					{{ secToTime(scope.row.jam_kerja_efektif) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="persentase"
				label="%"
				sortable
				width="70"
			></el-table-column>
		</el-table>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default {
	components: { 'v-chart': ECharts },
	props: ['person', 'period'],
	watch: {
		person(v, o) {
			this.requestData()
		},
	},

	data() {
		return {
			url: '/api/absensi',
			filters: { person_pin: this.person.pin },
			exportLabelBtn: 'EXPORT KE EXCEL',
			prodPercentAvg: 0,
			prodHourAvg: 0,
			chartOption: {
				tooltip: {
					trigger: 'axis',
					// axisPointer: { type: 'shadow' }
				},
				// legend: {
				//     x: 'right',
				//     orient: 'vertical'
				// },
				grid: {
					// right: '200px',
					// left: '3%',
					bottom: '30px',
					// top: '15px',
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
								let pembagi = moment(tgl).day() === 5 ? 7 : 8
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
