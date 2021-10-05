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
						@change="searchData"
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
						@change="searchData"
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
			:data="tableData.data"
			v-loading="loading"
			height="calc(100vh - 237px)"
			@row-dbclick="(row) => $router.push(`/absensi/${row.pin}`)"
			@filter-change="filterChange"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				width="50"
				label="#"
				:index="tableData.from"
			></el-table-column>

			<el-table-column
				prop="date"
				label="Tanggal"
				sortable="custom"
				width="100"
			>
				<template slot-scope="{ row }">
					{{ $moment(row.date).format('DD/MMM/YYYY') }} <br />
					{{ row.hari }}
				</template>
			</el-table-column>

			<el-table-column
				prop="name"
				label="Nama"
				sortable
				show-overflow-tooltip
				min-width="180"
			>
				<template slot-scope="{ row }">
					<div class="flex" style="align-items: center">
						<!-- <el-avatar :size="45" :src="row.person.photo_path"></el-avatar> -->
						<div
							style="
								width: 45px;
								height: 45px;
								border: 1px solid #ddd;
								border-radius: 50%;
								object-fit: cover;
							"
						>
							<img
								:src="row.person.photo_path"
								alt=""
								style="width: 45px"
								referrerpolicy="no-referrer"
							/>
						</div>
						<div style="margin-left: 10px; flex-grow: 0">
							<nuxt-link
								style="text-decoration: none"
								:to="`/absensi/${row.pin}`"
								>{{ row.name }}</nuxt-link
							>
							<br />
							NIK : {{ row.pin }}
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column
				prop="department"
				label="Departemen"
				column-key="department"
				min-width="150"
				:filters="departments.map((d) => ({ value: d.name, text: d.name }))"
				sortable="custom"
			></el-table-column>

			<el-table-column
				prop="first_in"
				label="Masuk"
				sortable="custom"
				width="95"
			>
				<template slot-scope="{ row }">
					<span :class="row.late ? 'text-red' : 'text-green'">{{
						row.first_in
					}}</span>
				</template>
			</el-table-column>

			<el-table-column
				label="Jam Istirahat"
				width="150"
				align="center"
				header-align="center"
			>
				<template slot-scope="{ row }">
					{{ row.rest_start || row.rest_start_time }} -
					{{ row.rest_end || row.rest_end_time }} <br />
					<strong> {{ row.rest_duration }} </strong>
				</template>
			</el-table-column>

			<!-- <el-table-column
				label="Durasi Istirahat"
				prop="rest_duration"
				width="150"
			>
			</el-table-column> -->

			<el-table-column
				prop="last_out"
				label="Pulang"
				sortable="custom"
				width="95"
			>
				<template slot-scope="{ row }">
					<span :class="row.early ? 'text-red' : 'text-green'">{{
						row.last_out
					}}</span>
				</template>
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
						:color="row.prosentase < 100 ? 'red' : 'green'"
					></el-progress>
					{{ row.work_duration }}
				</template>
			</el-table-column>

			<!-- <el-table-column
				prop="prosentase"
				label="%"
				width="70"
				align="right"
				header-align="right"
			>
			</el-table-column> -->
		</el-table>

		<br />

		<el-pagination
			class="text-right"
			background
			@current-change="currentChange"
			@size-change="sizeChange"
			layout="total, sizes, prev, pager, next"
			:page-size="pageSize"
			:page-sizes="[10, 20, 50]"
			:total="tableData.total"
			:current-page="page"
		></el-pagination>
	</el-card>
</template>

<script>
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		...mapState(['persons', 'departments']),
	},

	data() {
		return {
			url: '/api/attendance',
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
		refreshData() {
			this.filters = {
				date: [
					this.$moment().format('YYYY-MM-DD'),
					this.$moment().format('YYYY-MM-DD'),
				],
				keyword: '',
				page: 1,
			}

			this.requestData()
		},
	},
}
</script>
