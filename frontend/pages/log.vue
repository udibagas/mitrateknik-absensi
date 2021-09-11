<template>
	<el-card>
		<div style="display: flex; justify-content: space-between">
			<div style="font-size: 1.2em; line-height: 41px">LOG ABSENSI</div>
			<el-form inline class="text-right" @submit.native.prevent>
				<el-form-item v-if="$auth.user.admin">
					<el-button
						@click="addData"
						icon="el-icon-plus"
						type="primary"
						size="small"
						title="INPUT ABSENSI"
					>
					</el-button>
				</el-form-item>

				<el-form-item>
					<el-button
						icon="el-icon-download"
						type="primary"
						:loading="loading"
						@click="exportToExcel"
						size="small"
						title="EXPORT KE EXCEL"
					>
					</el-button>
				</el-form-item>

				<el-form-item>
					<el-date-picker
						v-model="filters.date"
						type="date"
						value-format="yyyy-MM-dd"
						size="small"
						style="width: 150px"
						@change="searchData"
					>
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-input
						placeholder="Cari Pegawai"
						prefix-icon="el-icon-search"
						v-model="filters.keyword"
						size="small"
						@change="searchData"
					>
					</el-input>
				</el-form-item>
			</el-form>
		</div>

		<el-table stripe :data="tableData">
			<el-table-column type="index" width="50"></el-table-column>

			<el-table-column
				prop="att_date"
				label="Tanggal"
				sortable
				width="100"
			></el-table-column>

			<el-table-column
				prop="person_pin"
				label="NIK"
				sortable
				width="100"
			></el-table-column>

			<el-table-column
				prop="person_name"
				label="Nama"
				sortable
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					{{ scope.row.person_name }} {{ scope.row.person_last_name }}
				</template>
			</el-table-column>

			<el-table-column
				prop="dept_name"
				label="Departemen"
				show-overflow-tooltip
				:filters="departments.map((d) => ({ text: d.name, value: d.name }))"
				sortable
			></el-table-column>

			<el-table-column
				prop="att_time"
				label="Jam"
				sortable
				width="100"
			></el-table-column>

			<el-table-column
				prop="gate.name"
				label="Gate"
				sortable
				width="120"
			></el-table-column>

			<el-table-column
				width="70"
				v-if="$auth.user.admin"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					<el-button
						icon="el-icon-edit"
						type="text"
						@click.prevent="openForm(scope.row)"
					></el-button>
				</template>
			</el-table-column>
		</el-table>

		<br />

		<el-pagination
			class="text-right"
			background
			@current-change="currentChange"
			@size-change="sizeChange"
			layout="total, sizes, prev, pager, next"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		></el-pagination>

		<el-dialog
			:visible.sync="showForm"
			width="500px"
			:close-on-click-modal="true"
			:show-close="true"
			:title="formModel.id ? 'EDIT ABSENSI' : 'INPUT ABSENSI'"
		>
			<el-form
				@submit.native.prevent="save"
				label-position="left"
				label-width="150px"
			>
				<el-form-item
					label="Nama Pegawai"
					:class="{ 'is-error': formErrors.person_pin }"
				>
					<el-select
						:disabled="!!formModel.id"
						placeholder="Nama Pegawai"
						v-model="formModel.person_pin"
						style="width: 100%"
						filterable
						default-first-option
					>
						<el-option
							:value="p.pin"
							:label="p.pin + ' - ' + p.name + ' ' + p.last_name"
							v-for="p in persons"
							:key="p.pin"
						></el-option>
					</el-select>

					<div class="el-form-item__error" v-if="formErrors.person_pin">
						{{ formErrors.person_pin.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item label="Gate" :class="{ 'is-error': formErrors.gate_id }">
					<el-select
						placeholder="Gate"
						v-model="formModel.gate_id"
						style="width: 100%"
						filterable
						default-first-option
					>
						<el-option
							:value="g.id"
							:label="g.name"
							v-for="g in gates"
							:key="g.id"
						></el-option>
					</el-select>

					<div class="el-form-item__error" v-if="formErrors.gate_id">
						{{ formErrors.gate_id.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Tanggal"
					:class="{ 'is-error': formErrors.att_date }"
				>
					<el-date-picker
						v-model="formModel.att_date"
						type="date"
						value-format="yyyy-MM-dd"
						format="dd-MMM-yyyy"
						placeholder="Tanggal"
						style="width: 100%"
						:clearable="false"
					>
					</el-date-picker>

					<div class="el-form-item__error" v-if="formErrors.att_date">
						{{ formErrors.att_date.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jam (mm:dd)"
					:class="{ 'is-error': formErrors.att_time }"
				>
					<el-input
						v-model="formModel.att_time"
						placeholder="Jam (mm:dd)"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.att_time">
						{{ formErrors.att_time.join(', ') }}
					</div>
				</el-form-item>
			</el-form>

			<div slot="footer">
				<el-button @click="closeForm"> BATAL </el-button>

				<el-button type="primary" native-type="submit"> SIMPAN </el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
import exportFromJSON from 'export-from-json'
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		...mapState(['gates', 'departments', 'persons']),
	},

	data() {
		return {
			url: '/api/log',
			filters: { date: this.$moment().format('YYYY-MM-DD') },
			exportLabelBtn: 'EXPORT KE EXCEL',
			requestInterval: null,
			requestIntervalTime: 5000,
		}
	},

	methods: {
		addData() {
			this.openForm({
				att_date: this.$moment().format('YYYY-MM-DD'),
				att_time: this.$moment().format('HH:mm'),
			})
		},

		exportToExcel() {
			let data = []
			this.exportLabelBtn = 'Menyiapkan File...'
			this.loading = true

			this.logs.forEach((a) => {
				data.push({
					Tanggal: a.att_date,
					NIK: a.person_pin,
					Nama: a.person_name + ' ' + a.person_last_name,
					Departemen: a.dept_name,
					Jam: a.att_time,
					Gate: a.gate ? a.gate.name : '',
				})
			})

			let fileName = 'log-absensi.xls'
			let exportType = 'xls'
			exportFromJSON({ data, fileName, exportType })
			this.exportLabelBtn = 'EXPORT KE EXCEL'
			this.loading = false
		},
	},

	mounted() {
		this.requestData()

		// TODO: pake web socket
	},
}
</script>
