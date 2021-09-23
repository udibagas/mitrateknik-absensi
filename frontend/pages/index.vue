<template>
	<div>
		<el-card
			:body-style="{ padding: '10px 0 10px 20px' }"
			style="margin-bottom: 10px"
		>
			<div
				class="flex"
				style="align-items: center; justify-content: space-between"
			>
				<strong> DASHBOARD </strong>
				<el-form inline>
					<el-form-item style="margin-bottom: 0">
						<el-select
							placeholder="Departemen"
							v-model="filters.dept_name"
							filterable
							default-first-option
							clearable
							style="width: 320px"
							@change="requestData"
						>
							<el-option
								v-for="(d, i) in departments"
								:value="d.name"
								:label="d.name"
								:key="i"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item style="margin-bottom: 0">
						<el-date-picker
							v-model="filters.date"
							type="daterange"
							value-format="yyyy-MM-dd"
							format="dd/MMM/yyyy"
							range-separator="-"
							start-placeholder="Dari Tanggal"
							end-placeholder="Sampai Tanggal"
							:clearable="false"
							@change="requestData"
						>
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<el-row :gutter="10" v-loading="loading">
			<el-col :span="8">
				<el-card>
					<div slot="header" class="text-center">PRODUKTIFITAS RATA - RATA</div>
					<div
						:class="[
							'text-center',
							tableData.productivity_avg_in_percent >= 90
								? 'text-success'
								: tableData.productivity_avg_in_percent >= 60
								? 'text-warning'
								: 'text-danger',
						]"
					>
						<el-row>
							<el-col :span="12" style="border-right: 1px solid #eee">
								<div style="font-size: 40px">
									{{ tableData.productivity_avg_in_hour }} jam
								</div>
							</el-col>
							<el-col :span="12">
								<div style="font-size: 40px">
									{{ tableData.productivity_avg_in_percent }}%
								</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>

			<el-col :span="8">
				<el-card :body-style="{ padding: 0 }">
					<div
						slot="header"
						class="flex"
						style="justify-content: space-between; align-items: center"
					>
						PEGAWAI TERPRODUKTIF
						<el-button
							icon="el-icon-download"
							size="small"
							title="Download"
							@click="
								exportData(
									'pegawai-terproduktif',
									tableData.pegawai_terproduktif
								)
							"
						></el-button>
					</div>
					<EmployeeList :data="tableData.pegawai_terproduktif" />
				</el-card>
			</el-col>

			<el-col :span="8">
				<el-card :body-style="{ padding: 0 }">
					<div
						slot="header"
						class="flex"
						style="justify-content: space-between; align-items: center"
					>
						PEGAWAI TIDAK PRODUKTIF
						<el-button
							icon="el-icon-download"
							size="small"
							title="Download"
							@click="
								exportData(
									'pegawai-tidak-produktif',
									tableData.pegawai_tidak_produktif
								)
							"
						></el-button>
					</div>
					<EmployeeList :data="tableData.pegawai_tidak_produktif" />
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		...mapState(['departments']),
	},

	data() {
		return {
			url: '/api/absensi',
			filters: {
				summary: true,
				date: [
					this.$moment().format('YYYY-MM-01'),
					this.$moment().format('YYYY-MM-DD'),
				],
			},
			paginated: '',
		}
	},

	methods: {
		exportData(fileName, data) {
			console.log(data)
			exportFromJSON({
				fileName,
				exportType: 'xls',
				data: data.map((d) => ({
					NIK: d.pin,
					Nama: d.fullname,
					Departemen: d.dept_name,
					'Jam kerja Efektif': d.work_duration,
					Prosentase: d.percentage.toFixed(2),
				})),
			})
		},

		requestData() {
			return false
		},
	},
}
</script>
