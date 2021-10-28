<template>
	<div>
		<div style="display: flex">
			<el-card
				style="width: 320px; margin-right: 10px; flex-shrink: 0"
				:body-style="{ padding: '0 0 20px 0' }"
			>
				<img
					:src="person.photo_path"
					class="image"
					referrerpolicy="no-referrer"
				/>

				<h3 style="margin-bottom: 2px" class="text-center">
					{{ person.name }} {{ person.last_name }}
				</h3>

				<div style="font-size: 1.5em" class="text-center">{{ person.pin }}</div>
				<div class="text-center">
					{{ person.department ? person.department.name : '' }}
				</div>

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
							<h2>{{ prodHourAvg.toFixed(2) }} jam</h2>
						</el-col>
						<el-col :span="12">
							<h2>{{ prodPercentAvg.toFixed(2) }}%</h2>
						</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card style="flex-grow: 1">
				<v-chart :option="chartOption" class="chart"></v-chart>
			</el-card>
		</div>

		<!-- LOG ABSENSI -->
		<el-card style="margin-top: 10px">
			<div style="display: flex; justify-content: space-between">
				<div style="font-size: 1.2em; line-height: 41px">LOG ABSENSI</div>

				<el-form inline>
					<el-form-item>
						<el-date-picker
							v-model="filters.date"
							type="daterange"
							value-format="yyyy-MM-dd"
							format="dd/MMM/yyyy"
							range-separator="-"
							start-placeholder="Dari Tgl"
							end-placeholder="Sampai Tgl"
							@change="searchData"
							size="small"
							style="width: 250px; margin-top: 5px"
							:clearable="false"
						>
						</el-date-picker>
					</el-form-item>

					<el-form-item>
						<el-button
							size="small"
							icon="el-icon-download"
							@click="exportData('absensi')"
							type="primary"
						>
							EXPORT KE EXCEL
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<el-table stripe v-loading="loading" :data="tableData">
				<el-table-column type="index" width="50" label="#"></el-table-column>

				<el-table-column prop="date" label="Tanggal" sortable>
					<template slot-scope="{ row }">
						{{ $moment(row.date).format('DD/MMM/YYYY') }} <br />
						{{ row.hari }}
					</template>
				</el-table-column>

				<el-table-column
					prop="first_in"
					label="Masuk"
					sortable
				></el-table-column>

				<el-table-column label="Jam Istirahat" sortable>
					<template slot-scope="{ row }">
						{{ row.rest_start }} - {{ row.rest_end }} <br />
					</template>
				</el-table-column>

				<el-table-column label="Durasi Istirahat" prop="rest_duration" sortable>
				</el-table-column>

				<el-table-column prop="last_out" label="Pulang" sortable>
				</el-table-column>

				<el-table-column
					prop="work_duration"
					label="Jam Kerja Efektif"
					width="160"
				>
					<template slot-scope="{ row }">
						<el-progress
							:text-inside="true"
							:stroke-width="18"
							:percentage="row.prosentase"
							:color="row.prosentase < 97 ? 'red' : 'green'"
						></el-progress>
						{{ row.work_duration }}
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
import crud from '~/mixins/crud'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'

import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from 'echarts/components'

import VChart, { THEME_KEY } from 'vue-echarts'

use([
	CanvasRenderer,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
])

export default {
	mixins: [crud],

	components: { VChart },

	provide: {
		[THEME_KEY]: 'light',
	},

	async asyncData({ params, $axios, redirect }) {
		try {
			const person = await $axios.$get(`/api/person/${params.pin}`)
			return { person }
		} catch (error) {
			redirect('/404')
		}
	},

	data() {
		return {
			url: '/api/attendance',
			paginated: '',
			tableData: [],
			filters: {
				pin: this.$route.params.pin,
				date: [
					this.$moment().format('YYYY-MM-DD'),
					this.$moment().format('YYYY-MM-DD'),
				],
			},
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
							formatter: (v) => {
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
		refreshData() {
			this.filters = {
				pin: this.$route.params.pin,
				date: [
					this.$moment().format('YYYY-MM-DD'),
					this.$moment().format('YYYY-MM-DD'),
				],
				keyword: '',
			}

			this.requestData()
		},

		afterGet() {
			this.chartOption.xAxis.data = this.tableData.map((d) => {
				return d.date + '\n' + d.hari
			})

			this.chartOption.series[0].data = this.tableData.map((d) => {
				return d.jam_kerja_efektif > 0
					? (d.jam_kerja_efektif / 3600).toFixed(2)
					: 0
			})

			this.prodPercentAvg =
				this.tableData.reduce(
					(total, current) => Number(total) + Number(current.prosentase),
					0
				) / this.tableData.length

			this.prodHourAvg =
				this.tableData.reduce(
					(total, current) =>
						Number(total) + Number(current.jam_kerja_efektif / 3600),
					0
				) / this.tableData.length
		},
	},
}
</script>

<style lang="css" scoped>
.image {
	width: 100%;
}

.chart {
	width: 100%;
	height: 550px;
}
</style>
