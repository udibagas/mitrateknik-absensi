<template>
	<el-card>
		<div style="display: flex; justify-content: space-between">
			<div style="font-size: 1.2em; line-height: 41px">ABSENSI</div>
			<el-form inline>
				<el-form-item>
					<el-date-picker
						v-model="filters.date"
						type="daterange"
						value-format="yyyy-MM-dd"
						format="dd/MMM/yyyy"
						range-separator="-"
						start-placeholder="Dari Tanggal"
						end-placeholder="Sampai Tanggal"
						@change="requestData"
						size="small"
						style="margin-top: 5px; width: 240px"
						:clearable="false"
					>
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button
						icon="el-icon-download"
						@click="exportData('absensi')"
						type="primary"
						size="small"
						>EXPORT KE EXCEL</el-button
					>
				</el-form-item>

				<el-form-item>
					<el-input
						placeholder="Cari Pegawai"
						prefix-icon="el-icon-search"
						v-model="filters.keyword"
						size="small"
						@change="requestData"
						clearable
					>
					</el-input>
				</el-form-item>

				<el-form-item>
					<el-button
						icon="el-icon-refresh"
						@click="refreshData"
						size="small"
						type="primary"
					></el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table
			stripe
			:data="tableData"
			v-loading="loading"
			height="calc(100vh - 190px)"
			@row-dbclick="(row) => showDetail(row)"
		>
			<el-table-column type="index" width="50" label="#"></el-table-column>

			<el-table-column prop="att_date" label="Tanggal" sortable width="110">
				<template slot-scope="{ row }">
					{{ $moment(row.att_date).format('DD/MMM/YYYY') }} <br />
					{{ $moment(row.att_date).format('dddd') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="fullname"
				label="Nama"
				sortable
				show-overflow-tooltip
			>
				<template slot-scope="{ row }">
					<a
						href="#"
						style="text-decoration: none"
						@click.prevent="showDetail(row)"
					>
						{{ row.fullname }}
					</a>
					<br />
					NIK : {{ row.pin }}
				</template>
			</el-table-column>

			<el-table-column
				prop="dept_name"
				label="Departemen"
				:filters="departments.map((d) => ({ value: d.name, text: d.name }))"
				sortable
			></el-table-column>

			<el-table-column
				prop="first_in"
				label="Masuk"
				sortable
				width="100"
			></el-table-column>

			<el-table-column label="Jam Istirahat" sortable width="150">
				<template slot-scope="{ row }">
					{{ row.rest_start }} - {{ row.rest_end }}
				</template>
			</el-table-column>

			<el-table-column
				label="Durasi Istirahat"
				prop="rest_duration"
				sortable
				width="150"
			>
			</el-table-column>

			<el-table-column prop="last_out" label="Pulang" sortable width="100">
			</el-table-column>

			<el-table-column
				prop="work_duration"
				label="Jam Kerja Efektif"
				width="160"
				sortable
			>
			</el-table-column>

			<el-table-column
				prop="percentage"
				label="%"
				width="100"
				sortable
				align="right"
				header-align="right"
			>
				<template slot-scope="{ row }">
					{{ row.percentage.toFixed(2) }}
				</template>
			</el-table-column>
		</el-table>

		<AbsensiPegawai
			v-if="dialog"
			:show="dialog"
			:person="selectedData"
			:period="filters.date"
			@close="dialog = false"
		/>
	</el-card>
</template>

<script>
import exportFromJSON from 'export-from-json'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState(['persons', 'departments']),
	},

	mounted() {
		this.requestData()
	},

	data() {
		return {
			url: '/api/absensi',
			dialog: false,
			tableData: [],
			selectedData: {},
			loading: false,
			filters: {
				date: [
					this.$moment().format('YYYY-MM-DD'),
					this.$moment().format('YYYY-MM-DD'),
				],
				keyword: '',
			},
		}
	},

	methods: {
		showDetail(row) {
			this.selectedData = this.persons.find((p) => p.pin === row.pin)
			this.dialog = true
		},

		refreshData() {
			this.filters = {
				date: [
					this.$moment().format('YYYY-MM-DD'),
					this.$moment().format('YYYY-MM-DD'),
				],
				keyword: '',
			}

			this.requestData()
		},

		async requestData() {
			this.loading = true
			this.tableData = await this.$axios.$get(this.url, {
				params: { ...this.filters },
			})
			this.loading = false
		},

		async exportData(fileName) {
			this.loading = true

			const data = await this.$axios.$get(this.url, {
				params: { ...this.filters, action: 'export' },
			})

			exportFromJSON({ data, fileName, exportType: 'xls' })
			this.loading = false
		},
	},
}
</script>
