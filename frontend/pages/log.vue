<template>
	<el-card>
		<div style="display: flex; justify-content: space-between">
			<div style="font-size: 1.2em; line-height: 41px">LOG AKSES</div>
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
						@click="exportData('log-akses')"
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
						format="dd-MMM-yyyy"
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
						clearable
					>
					</el-input>
				</el-form-item>
			</el-form>
		</div>

		<el-table
			stripe
			:data="tableData.data"
			v-loading="loading"
			@sort-change="sortChange"
			@filter-change="filterChange"
			height="calc(100vh - 235px)"
		>
			<el-table-column
				type="index"
				label="#"
				:index="tableData.from"
			></el-table-column>

			<el-table-column prop="event_time" label="Tanggal" sortable width="120">
				<template slot-scope="scope">
					{{ $moment(scope.row.event_time).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="pin"
				label="NIK"
				sortable="custom"
				width="100"
			></el-table-column>

			<el-table-column
				prop="name"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
				min-width="150"
			>
				<template slot-scope="scope">
					{{ scope.row.name }} {{ scope.row.last_name }}
				</template>
			</el-table-column>

			<el-table-column
				prop="dept_name"
				label="Departemen"
				show-overflow-tooltip
				sortable="custom"
				min-width="150"
				column-key="dept_name"
				:filters="departments.map((d) => ({ text: d.name, value: d.name }))"
			></el-table-column>

			<el-table-column prop="event_time" label="Jam" sortable width="100">
				<template slot-scope="scope">
					{{ $moment(scope.row.event_time).format('HH:mm:ss') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="event_point_name"
				label="Gate"
				sortable
				min-width="150"
				show-overflow-tooltip
			></el-table-column>

			<el-table-column
				width="70"
				v-if="$auth.user.admin"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button type="text" @click="refreshData" icon="el-icon-refresh">
					</el-button>
				</template>
				<template slot-scope="scope">
					<el-button
						icon="el-icon-edit"
						type="text"
						size="small"
						@click.prevent="openForm(scope.row)"
						>Edit</el-button
					>
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
			:page-sizes="[15, 30, 50, 100]"
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
					:class="{ 'is-error': formErrors.pin }"
				>
					<el-select
						:disabled="!!formModel.id"
						placeholder="Nama Pegawai"
						v-model="formModel.pin"
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

					<div class="el-form-item__error" v-if="formErrors.pin">
						{{ formErrors.pin.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Gate"
					:class="{ 'is-error': formErrors.event_point_id }"
				>
					<el-select
						placeholder="Gate"
						v-model="formModel.event_point_id"
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

					<div class="el-form-item__error" v-if="formErrors.event_point_id">
						{{ formErrors.event_point_id.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Tanggal"
					:class="{ 'is-error': formErrors.event_time_date }"
				>
					<el-date-picker
						v-model="formModel.event_time_date"
						type="date"
						value-format="yyyy-MM-dd"
						format="dd-MM-yyyy"
						placeholder="Tanggal"
						style="width: 100%"
						:clearable="false"
					>
					</el-date-picker>

					<div class="el-form-item__error" v-if="formErrors.event_time_date">
						{{ formErrors.event_time_date.join(', ') }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jam (mm:dd)"
					:class="{ 'is-error': formErrors.event_time_time }"
				>
					<el-input
						v-model="formModel.event_time_time"
						placeholder="Jam (mm:dd)"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.event_time_time">
						{{ formErrors.event_time_time.join(', ') }}
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
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		...mapState(['gates', 'departments', 'persons']),
	},

	data() {
		return {
			url: '/api/access',
			pageSize: 20,
			filters: { date: this.$moment().format('YYYY-MM-DD') },
			exportLabelBtn: 'EXPORT KE EXCEL',
			requestInterval: null,
			requestIntervalTime: 5000,
		}
	},

	methods: {
		addData() {
			this.openForm({
				event_time_date: this.$moment().format('YYYY-MM-DD'),
				event_time_time: this.$moment().format('HH:mm'),
			})
		},

		refreshData() {
			this.page = 1
			this.filters = { date: this.$moment().format('YYYY-MM-DD') }
			this.requestData()
		},
	},

	mounted() {
		// TODO: pake web socket,
	},
}
</script>
