<template>
	<el-card>
		<el-form :inline="true" style="float: right; clear: both">
			<el-form-item>
				<el-date-picker
					v-model="filters.date"
					type="daterange"
					value-format="yyyy-MM-dd"
					format="dd-MMM-yyyy"
					range-separator="-"
					start-placeholder="Dari Tanggal"
					end-placeholder="Sampai Tanggal"
				>
				</el-date-picker>
			</el-form-item>

			<el-form-item>
				<el-button
					icon="el-icon-download"
					@click="exportData('absensi')"
					type="primary"
				></el-button>
			</el-form-item>

			<el-form-item>
				<el-input
					placeholder="Cari Pegawai"
					prefix-icon="el-icon-search"
					v-model="keyword"
				>
					<el-button
						@click="requestData"
						slot="append"
						icon="el-icon-refresh"
					></el-button>
				</el-input>
			</el-form-item>
		</el-form>
		<el-table
			:data="filteredData"
			stripe
			style="border-top: 1px solid #eee; width: 100%"
		>
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column
				prop="absence_date"
				label="Tanggal"
				sortable
				width="100"
			></el-table-column>
			<el-table-column prop="hari" label="Hari" sortable width="100">
				<template slot-scope="scope">
					{{ getDayName(scope.row.absence_date) }}
				</template>
			</el-table-column>
			<el-table-column prop="nik_var" label="NIK" sortable width="70">
				<template slot-scope="scope">
					<a href="#" @click.prevent="showAbsensiPegawai(scope.row)">
						{{ scope.row.nik_var }}
					</a>
				</template>
			</el-table-column>
			<el-table-column prop="name_var" label="Nama" sortable>
				<template slot-scope="scope">
					<a href="#" @click.prevent="showAbsensiPegawai(scope.row)">
						{{ scope.row.name_var }}
					</a>
				</template>
			</el-table-column>
			<el-table-column
				prop="dept_name"
				label="Departemen"
				:filters="
					departments.map((d) => {
						let o = {}
						o.text = o.value = d.name
						return o
					})
				"
				:filter-method="filterDepartment"
				sortable
			></el-table-column>
			<el-table-column
				prop="first_in"
				label="Masuk"
				sortable
				width="90"
			></el-table-column>
			<el-table-column label="Jam Istirahat" sortable width="150">
				<template slot-scope="scope">
					{{ scope.row.rest_start }} - {{ scope.row.rest_end }}
				</template>
			</el-table-column>
			<el-table-column
				prop="istirahat"
				label="Lama Istirahat"
				sortable
				width="130"
			>
				<template slot-scope="scope">
					{{ secToTime(scope.row.istirahat) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="last_out"
				label="Pulang"
				sortable
				width="90"
			></el-table-column>
			<el-table-column
				prop="jam_kerja_efektif"
				label="Jam Kerja Efektif"
				width="160"
				sortable
			>
				<template slot-scope="scope">
					{{ secToTime(scope.row.jam_kerja_efektif) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="persentase"
				label="%"
				width="70"
				sortable
			></el-table-column>
		</el-table>

		<el-dialog
			:visible.sync="absensiPegawaiDialog"
			width="95%"
			:center="true"
			@close="selectedPerson = {}"
		>
			<AbsensiPegawai :person="selectedPerson" :period="filterDate" />
		</el-dialog>
	</el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		sortedData() {
			return this.absensis.sort((a, b) =>
				a.jam_kerja_efektif > b.jam_kerja_efektif
					? 1
					: a.jam_kerja_efektif < b.jam_kerja_efektif
					? -1
					: 0
			)
		},
		pegawaiProduktif() {
			return this.sortedData
				.filter((s) => s.jam_kerja_efektif >= 8 * 3600)
				.slice(-5)
				.reverse()
		},
		pegawaiTidakProduktif() {
			return this.sortedData
				.filter((s) => s.jam_kerja_efektif < 8 * 3600)
				.slice(0, 5)
		},
		filteredData() {
			return this.absensis.filter(
				(a) =>
					a.nik_var.includes(this.keyword) ||
					a.name_var.toLowerCase().includes(this.keyword.toLowerCase())
			)
		},
		...mapState(['persons', 'departments']),
	},

	data() {
		return {
			exportLabelBtn: 'EXPORT KE EXCEL',
			absensis: [],
			filterDate: [
				moment().format('YYYY-MM-DD'),
				moment().format('YYYY-MM-DD'),
			],
			keyword: '',
			loading: false,
			prodPercentAvg: 0,
			prodHourAvg: 0,
			absensiPegawaiDialog: false,
			selectedPerson: {},
			requestInterval: null,
			requestIntervalTime: 10000,
			isRequesting: false,
			timeslots: [],
		}
	},

	watch: {
		filterDate(v, o) {
			clearInterval(this.requestInterval)
			this.requestData()
			this.requestInterval = setInterval(
				this.requestData,
				this.requestIntervalTime
			)
		},
	},

	methods: {
		filterDepartment(value, row, column) {
			const property = column['property']
			return row[property] === value
		},
		getDayName(date) {
			return this.hari[moment(date).day()]
		},
		getDuration(start, end) {
			let s = moment(start, 'HH:mm:ss')
			let e = moment(end, 'HH:mm:ss')
			let d = moment.duration(e.diff(s))
			return d.asSeconds()
		},
		secToTime(second) {
			if (second) {
				let h = Math.floor(second / 3600)
				let m = Math.floor((second % 3600) / 60)
				let s = second % 60
				return `${h.toString().padStart(2, '0')}:${m
					.toString()
					.padStart(2, '0')}:${s.toString().padStart(2, '0')}`
			}

			return ''
		},
		showAbsensiPegawai(row) {
			this.selectedPerson = this.persons.find((p) => p.pin === row.nik_var)
			this.absensiPegawaiDialog = true
		},
		requestData() {
			if (this.isRequesting) {
				return
			}

			this.loading = true
			let params = {
				date: this.filterDate[0],
				date_end: this.filterDate[1],
				api_token: USER.api_token,
			}

			axios
				.get(API_URL + '/absensi', { params: params })
				.then((r) => {
					this.loading = false
					this.isRequesting = false
					this.absensis = r.data
					let totalPersentase = 0
					let totalJamKerja = 0

					this.absensis.forEach((a) => {
						let day = moment(a.absence_date).day()

						if (!a.rest_start) {
							a.rest_start = this.timeslots[day].rest_start
						}
						if (!a.rest_end) {
							a.rest_end = this.timeslots[day].rest_end
						}

						a.istirahat = this.getDuration(a.rest_start, a.rest_end)
						let pembagi = this.timeslots[day].jam_kerja_max * 36

						a.jam_kerja_efektif = 0
						a.persentase = 0

						if (a.first_in && a.last_out) {
							let jam_masuk_efektif =
								moment(a.first_in, 'HH:mm:ss') <
								moment(this.timeslots[day].in, 'HH:mm:ss')
									? moment(this.timeslots[day].in, 'HH:mm:ss')
									: moment(a.first_in, 'HH:mm:ss')

							let jam_keluar_efektif =
								moment(a.last_out, 'HH:mm:ss') >=
								moment(this.timeslots[day].out, 'HH:mm:ss')
									? moment(this.timeslots[day].out, 'HH:mm:ss')
									: moment(a.last_out, 'HH:mm:ss')

							let durasi_kerja_sec = this.getDuration(
								jam_masuk_efektif,
								jam_keluar_efektif
							)

							let jam_istirahat_start_efektif =
								moment(a.rest_start, 'HH:mm:ss') >=
								moment(this.timeslots[day].rest_start, 'HH:mm')
									? moment(this.timeslots[day].rest_start, 'HH:mm:ss')
									: moment(a.rest_start, 'HH:mm:ss')

							let jam_istirahat_end_efektif =
								moment(a.rest_end, 'HH:mm:ss') <
								moment(this.timeslots[day].rest_end, 'HH:mm')
									? moment(this.timeslots[day].rest_end, 'HH:mm:ss')
									: moment(a.rest_end, 'HH:mm:ss')

							let durasi_istirahat_sec = this.getDuration(
								jam_istirahat_start_efektif,
								jam_istirahat_end_efektif
							)

							a.jam_kerja_efektif = durasi_kerja_sec - durasi_istirahat_sec
							a.persentase = (a.jam_kerja_efektif / pembagi).toFixed(2)
							totalPersentase += parseFloat(a.persentase)
							totalJamKerja += a.jam_kerja_efektif
						}
					})

					if (totalPersentase > 0) {
						this.prodPercentAvg = (
							totalPersentase / this.absensis.length
						).toFixed(2)
					}

					if (totalJamKerja > 0) {
						this.prodHourAvg = (
							totalJamKerja /
							3600 /
							this.absensis.length
						).toFixed(2)
					}
				})
				.catch((e) => {
					this.loading = false
					this.isRequesting = false
					console.log(e)
				})
		},
		exportToExcel() {
			let data = []
			this.exportLabelBtn = 'Menyiapkan File...'
			this.absensis.forEach((a) => {
				data.push({
					Tanggal: a.absence_date,
					Hari: this.getDayName(a.absence_date),
					NIK: a.nik_var,
					Nama: a.name_var,
					Masuk: a.first_in || '',
					Jam_Istirahat: `${a.rest_start} - ${a.rest_end}`,
					Lama_Istirahat: this.secToTime(a.istirahat),
					Pulang: a.last_out || '',
					Jam_Kerja_Efektif: this.secToTime(a.jam_kerja_efektif),
					Persentase: a.persentase,
				})
			})

			let fileName = 'absensi.xls'
			let exportType = 'xls'
			exportFromJSON({ data, fileName, exportType })
			this.exportLabelBtn = 'EXPORT KE EXCEL'
		},
		getTimeSlots() {
			let params = { api_token: USER.api_token }
			axios.get(API_URL + '/timeSlot', { params: params }).then((r) => {
				r.data.forEach((t) => {
					this.timeslots[t.day] = t
				})
				// console.log(this.timeslots)
			})
		},
	},
	created: function () {
		this.getTimeSlots()
		this.requestData()
		this.requestInterval = setInterval(
			this.requestData,
			this.requestIntervalTime
		)
		this.$store.commit('getPersons')
	},
	destroyed: function () {
		clearInterval(this.requestInterval)
	},
}
</script>
